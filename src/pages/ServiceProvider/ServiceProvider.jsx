import React, { useState } from 'react';
import './ServiceProvider.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';

const ServiceProvider = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState('');
  const [selectedRating, setSelectedRating] = useState(0);

  const serviceProviders = [
    {
      id: 1,
      name: 'Ahmed Khan',
      expertise: 'Plumber',
      location: 'Islamabad',
      rating: 5,
      description: 'Expert in residential plumbing with over 10 years of experience.',
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 2,
      name: 'Ali Raza',
      expertise: 'Electrician',
      location: 'Karachi',
      rating: 4,
      description: 'Specialist in wiring and electrical installations.',
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 3,
      name: 'Usman Tariq',
      expertise: 'Carpenter',
      location: 'Lahore',
      rating: 4,
      description: 'Experienced carpenter focused on custom furniture and fittings.',
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 4,
      name: 'Bilal Ahmed',
      expertise: 'Painter',
      location: 'Rawalpindi',
      rating: 5,
      description: 'Specializes in interior and exterior painting.',
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 5,
      name: 'Hamza Iqbal',
      expertise: 'Mason',
      location: 'Faisalabad',
      rating: 3,
      description: 'Skilled in brickwork and concrete construction.',
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 6,
      name: 'Tariq Hussain',
      expertise: 'Labour',
      location: 'Quetta',
      rating: 5,
      description: 'Efficient and hardworking construction laborer.',
      image: 'https://via.placeholder.com/100',
    },
  ];

  // Filter logic
  const filteredProviders = serviceProviders.filter((provider) => {
    const matchesSearch = provider.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation =
      selectedLocation === '' || provider.location === selectedLocation;
    const matchesExpertise =
      selectedExpertise === '' || provider.expertise === selectedExpertise;
    const matchesRating =
      selectedRating === 0 || provider.rating === selectedRating;

    return matchesSearch && matchesLocation && matchesExpertise && matchesRating;
  });

  const viewDetails = (id) => {
    navigate(`/service-provider/${id}`);
  };

  const handleLocationClick = (location) => {
    setSelectedLocation(location === selectedLocation ? '' : location);
  };

  const handleExpertiseClick = (expertise) => {
    setSelectedExpertise(expertise === selectedExpertise ? '' : expertise);
  };

  const handleRatingClick = (rating) => {
    setSelectedRating(rating === selectedRating ? 0 : rating);
  };

  return (
    <>
      <Header />
      <div className="service-provider-page">
        {/* Filters Section */}
        <aside className="filter-section">
          <h3>Filters</h3>

          {/* Location Filter */}
          <div className="filter-group">
            <h4>Location</h4>
            <ul>
              {['Islamabad', 'Karachi', 'Lahore', 'Rawalpindi', 'Faisalabad', 'Quetta'].map(
                (location) => (
                  <li
                    key={location}
                    className={selectedLocation === location ? 'active-filter' : ''}
                    onClick={() => handleLocationClick(location)}
                  >
                    {location}
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Expertise Filter */}
          <div className="filter-group">
            <h4>Expertise</h4>
            <ul>
              {['Plumber', 'Electrician', 'Carpenter', 'Painter', 'Mason', 'Labour'].map(
                (expertise) => (
                  <li
                    key={expertise}
                    className={selectedExpertise === expertise ? 'active-filter' : ''}
                    onClick={() => handleExpertiseClick(expertise)}
                  >
                    {expertise}
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Rating Filter (EXACT MATCH, toggles on/off) */}
          <div className="filter-group">
            <h4>Rating</h4>
            <div className="rating-filter">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div
                  key={rating}
                  className={`rating-item ${selectedRating === rating ? 'active' : ''}`}
                  onClick={() => handleRatingClick(rating)}
                >
                  <span className="rating-circle">{rating}</span>
                  <span className="rating-stars">
                    {'★'.repeat(rating)}
                    {'☆'.repeat(5 - rating)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Providers List Section */}
        <main className="service-provider-list">
          <h1>Find Service Providers</h1>

          {/* Search Bar */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search service provider..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button>
              <i className="fas fa-search"></i>
            </button>
          </div>

          {/* Provider Cards */}
          {filteredProviders.length > 0 ? (
            filteredProviders.map((provider) => (
              <div key={provider.id} className="provider-card">
                <div className="provider-picture">
                  <img src={provider.image} alt={provider.name} />
                </div>
                <div className="provider-details">
                  <h2>{provider.name}</h2>
                  <p>
                    <strong>Expertise:</strong> {provider.expertise}
                  </p>
                  <p>
                    <strong>Location:</strong> {provider.location}
                  </p>
                  <p>
                    <strong>Rating:</strong> {provider.rating} Stars
                  </p>
                  <p>{provider.description}</p>
                </div>
                <button onClick={() => viewDetails(provider.id)}>View Details</button>
              </div>
            ))
          ) : (
            <p>No service providers found for the selected filters.</p>
          )}
        </main>
      </div>
      <Footer />
    </>
  );
};

export default ServiceProvider;
