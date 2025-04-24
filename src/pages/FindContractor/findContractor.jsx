import React, { useEffect, useState } from "react";
import "./findContractor.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";

import { backend_url } from "../../server";

const FindContractor = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [allContractors, setAllContractors] = useState([]); // Store all contractors
  const [filteredContractors, setFilteredContractors] = useState([]); // Store filtered contractors

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  useEffect(() => {
    fetch(
      `${backend_url}/contractor/getAllContractors?page=${currentPage}&limit=100`, // Fetch more items to handle frontend filtering
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
        setAllContractors(data.contractors);
        setTotalPages(data.totalPages);
      });
  }, [currentPage]);

  // Apply filters whenever they change
  useEffect(() => {
    let result = [...allContractors];

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (contractor) =>
          contractor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contractor.company
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          contractor.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
    }

    // Apply location filter
    if (selectedLocation) {
      result = result.filter(
        (contractor) => contractor.location === selectedLocation
      );
    }

    // Apply rating filter
    if (selectedRating > 0) {
      result = result.filter(
        (contractor) => Math.floor(contractor.maxRating) === selectedRating
      );
    }

    setFilteredContractors(result);
    // Reset to page 1 when filters change
    setCurrentPage(1);
  }, [allContractors, searchQuery, selectedLocation, selectedRating]);

  // Pagination logic
  const itemsPerPage = 5;
  const totalFilteredPages = Math.ceil(
    filteredContractors.length / itemsPerPage
  );
  const paginatedContractors = filteredContractors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const viewDetails = (id) => {
    navigate(`/contractor/${id}`);
  };

  const handleLocationClick = (location) => {
    setSelectedLocation(location === selectedLocation ? "" : location);
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
      <div className="find-contractor-page">
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
                "Peshawar",
                "Hyderabad",
                "Multan",
                "Sialkot",
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

        {/* Contractors List Section */}
        <main className="contractor-list">
          <h1>Find Contractors</h1>

          {/* Search Bar */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search contractor..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e)}
            />
            <button>
              <i className="fas fa-search"></i>
            </button>
          </div>

          {/* Contractor Cards */}
          {paginatedContractors.length > 0 ? (
            paginatedContractors.map((contractor) => (
              <div key={contractor._id} className="provider-card">
                <div className="contractor-picture">
                  <img
                    src={`http://localhost:5000${contractor.avatar}`}
                    alt={contractor.name}
                  />
                </div>
                <div className="contractor-details">
                  <h2>{contractor.name}</h2>
                  <p>
                    <strong>Company:</strong> {contractor.company}
                  </p>
                  <p>
                    <strong>Location:</strong> {contractor.location}
                  </p>
                  <p>
                    <strong>Rating:</strong>{" "}
                    {contractor.maxRating === 0 ? 1 : contractor.maxRating}{" "}
                    Stars
                  </p>
                  <p>{contractor.description}</p>
                </div>
                <button onClick={() => viewDetails(contractor._id)}>
                  View Details
                </button>
              </div>
            ))
          ) : (
            <p>No contractors found for the selected filters.</p>
          )}

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
                paginatedContractors.length === 0
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

export default FindContractor;
