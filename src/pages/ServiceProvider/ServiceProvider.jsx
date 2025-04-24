import React, { useEffect, useState } from "react";
import "./ServiceProvider.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { backend_url } from "../../server";

const ServiceProvider = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [allProviders, setAllProviders] = useState([]); // Store all providers
  const [filteredProviders, setFilteredProviders] = useState([]); // Store filtered providers
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedExpertise, setSelectedExpertise] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  useEffect(() => {
    fetch(
      `${backend_url}/service-provider/get-all-service-providers?page=${currentPage}&limit=100`, // Fetch more items for frontend filtering
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setAllProviders(data.serviceprovider);
        setTotalPages(data.totalPages);
      });
  }, [currentPage]);

  // Apply filters whenever they change
  useEffect(() => {
    let result = [...allProviders];

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (provider) =>
          provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (provider.company &&
            provider.company
              .toLowerCase()
              .includes(searchQuery.toLowerCase())) ||
          provider.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply location filter
    if (selectedLocation) {
      result = result.filter(
        (provider) => provider.location === selectedLocation
      );
    }

    // Apply expertise filter
    if (selectedExpertise) {
      result = result.filter(
        (provider) => provider.experties === selectedExpertise
      );
    }

    // Apply rating filter
    if (selectedRating > 0) {
      result = result.filter(
        (provider) => Math.floor(provider.maxRating) === selectedRating
      );
    }

    setFilteredProviders(result);
    setCurrentPage(1); // Reset to page 1 when filters change
  }, [
    allProviders,
    searchQuery,
    selectedLocation,
    selectedExpertise,
    selectedRating,
  ]);

  // Pagination logic
  const itemsPerPage = 5;
  const totalFilteredPages = Math.ceil(filteredProviders.length / itemsPerPage);
  const paginatedProviders = filteredProviders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const viewDetails = (id) => {
    navigate(`/service-provider/${id}`);
  };

  const handleLocationClick = (location) => {
    setSelectedLocation(location === selectedLocation ? "" : location);
    setCurrentPage(1);
    setIsFiltersVisible(false);
  };

  const handleExpertiseClick = (expertise) => {
    setSelectedExpertise(expertise === selectedExpertise ? "" : expertise);
    setCurrentPage(1);
    setIsFiltersVisible(false);
  };

  const handleRatingClick = (rating) => {
    setSelectedRating(rating === selectedRating ? 0 : rating);
    setCurrentPage(1);
    setIsFiltersVisible(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <>
      <Header />
      <div className="service-provider-page">
        <div
          className="filter-icon"
          onClick={() => setIsFiltersVisible(!isFiltersVisible)}
        >
          <i className="fas fa-filter"></i>
        </div>

        {/* Filters Section */}
        <aside
          className={`filter-section ${isFiltersVisible ? "visible" : ""}`}
        >
          <h3>Filters</h3>

          {/* Location Filter */}
          <div className="filter-group">
            <h4>Location</h4>
            <ul>
              {[
                "Islamabad",
                "Karachi",
                "Lahore",
                "Rawalpindi",
                "Faisalabad",
                "Quetta",
              ].map((location) => (
                <li
                  key={location}
                  className={
                    selectedLocation === location ? "active-filter" : ""
                  }
                  onClick={() => handleLocationClick(location)}
                >
                  {location}
                </li>
              ))}
            </ul>
          </div>

          {/* Expertise Filter */}
          <div className="filter-group">
            <h4>Expertise</h4>
            <ul>
              {[
                "Plumber",
                "Electrician",
                "Carpenter",
                "Painter",
                "Mason",
                "Labour",
              ].map((expertise) => (
                <li
                  key={expertise}
                  className={
                    selectedExpertise === expertise ? "active-filter" : ""
                  }
                  onClick={() => handleExpertiseClick(expertise)}
                >
                  {expertise}
                </li>
              ))}
            </ul>
          </div>

          {/* Rating Filter */}
          <div className="filter-group">
            <h4>Rating</h4>
            <div className="rating-filter">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div
                  key={rating}
                  className={`rating-item ${
                    selectedRating === rating ? "active" : ""
                  }`}
                  onClick={() => handleRatingClick(rating)}
                >
                  <span className="rating-circle">{rating}</span>
                  <span className="rating-stars">
                    {"★".repeat(rating)}
                    {"☆".repeat(5 - rating)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Providers List Section */}
        <main className="service-provider-list">
          <h1 id="text">Find Service Providers</h1>

          {/* Search Bar */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search service provider..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button>
              <i className="fas fa-search"></i>
            </button>
          </div>

          {/* Provider Cards */}
          {paginatedProviders.length > 0 ? (
            paginatedProviders.map((provider) => (
              <div key={provider._id} className="provider-card">
                <div className="provider-picture">
                  <img
                    src={`http://localhost:5000${provider.avatar}`}
                    alt={provider.name}
                  />
                </div>
                <div className="provider-details">
                  <h2>{provider.name}</h2>
                  <p>
                    <strong>Expertise:</strong> {provider.experties}
                  </p>
                  <p>
                    <strong>Location:</strong> {provider.location}
                  </p>
                  <p>
                    <strong>Rating:</strong>{" "}
                    {provider.maxRating === 0 ? 1 : provider.maxRating} Stars
                  </p>
                  <p>{provider.description}</p>
                </div>
                <button onClick={() => viewDetails(provider._id)}>
                  View Details
                </button>
              </div>
            ))
          ) : (
            <p>No service providers found for the selected filters.</p>
          )}

          {/* Pagination Controls */}
          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Prev
            </button>

            <span>
              Page {currentPage} of {totalFilteredPages}
            </span>

            <button
              disabled={
                currentPage === totalFilteredPages ||
                paginatedProviders.length === 0
              }
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default ServiceProvider;
