import React, { useState } from 'react';
import './findContractor.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';

const FindContractor = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  // Use `0` to represent "no rating selected"
  const [selectedRating, setSelectedRating] = useState(0);

  const contractors = [
    {
      id: 1,
      name: 'Ahmed Khan',
      company: 'Pak Builders',
      location: 'Islamabad',
      rating: 5,
      description: 'Expert in residential construction. Over 15 years of experience.',
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 2,
      name: 'Ali Raza',
      company: 'Skyline Constructions',
      location: 'Karachi',
      rating: 4,
      description: 'Specialist in commercial projects. Focused on quality and timelines.',
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 3,
      name: 'Usman Tariq',
      company: 'Green Homes',
      location: 'Lahore',
      rating: 4,
      description: 'Known for eco-friendly designs. Sustainable housing expert.',
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 4,
      name: 'Bilal Ahmed',
      company: 'Vision Builders',
      location: 'Rawalpindi',
      rating: 5,
      description: 'Modern architectural designs. Focused on innovation.',
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 5,
      name: 'Hamza Iqbal',
      company: 'Unity Constructions',
      location: 'Faisalabad',
      rating: 3,
      description: 'Expert in industrial construction. Focused on efficiency.',
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 6,
      name: 'Tariq Hussain',
      company: 'Elite Builders',
      location: 'Quetta',
      rating: 5,
      description: 'Luxury homes specialist. Known for premium quality work.',
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 7,
      name: 'Saad Ali',
      company: 'Prime Contractors',
      location: 'Peshawar',
      rating: 2,
      description: 'Infrastructure projects expert. Focused on roads and bridges.',
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 8,
      name: 'Umar Sheikh',
      company: 'Creative Builders',
      location: 'Hyderabad',
      rating: 3,
      description: 'Interior and exterior designs expert. Aesthetic-driven projects.',
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 9,
      name: 'Zeeshan Ahmed',
      company: 'Smart Constructions',
      location: 'Multan',
      rating: 4,
      description: 'Pioneering AI-integrated construction. Known for innovation.',
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 10,
      name: 'Adnan Javed',
      company: 'Reliable Builders',
      location: 'Sialkot',
      rating: 1,
      description: 'Expert in commercial and residential projects.',
      image: 'https://via.placeholder.com/100',
    },
  ];

  // Filter contractors based on:
  // 1) searchQuery (name)
  // 2) selectedLocation
  // 3) selectedRating (exact match) if != 0
  const filteredContractors = contractors.filter((contractor) => {
    const matchesSearch = contractor.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = selectedLocation === '' || contractor.location === selectedLocation;
    const matchesRating = selectedRating === 0 || contractor.rating === selectedRating;

    return matchesSearch && matchesLocation && matchesRating;
  });

  // Navigate to contractor detail page
  const viewDetails = (id) => {
    navigate(`/contractor/${id}`);
  };

  // Toggle location filter
  const handleLocationClick = (location) => {
    // If user clicks the same location again, deselect it
    setSelectedLocation(location === selectedLocation ? '' : location);
  };

  // Toggle rating filter
  const handleRatingClick = (rating) => {
    // If user clicks the same rating again, deselect it by setting to 0
    setSelectedRating(rating === selectedRating ? 0 : rating);
  };

  return (
    <>
      <Header />
      <div className="find-contractor-page">
        {/* Filters Section */}
        <aside className="filter-section">
          <h3>Filters</h3>

          {/* Location Filter */}
          <div className="filter-group">
            <h4>Location</h4>
            <ul>
              {[
                'Islamabad',
                'Karachi',
                'Lahore',
                'Rawalpindi',
                'Faisalabad',
                'Quetta',
                'Peshawar',
                'Hyderabad',
                'Multan',
                'Sialkot',
              ].map((location) => (
                <li
                  key={location}
                  className={selectedLocation === location ? 'active-filter' : ''}
                  onClick={() => handleLocationClick(location)}
                >
                  {location}
                </li>
              ))}
            </ul>
          </div>

          {/* Rating Filter (Toggle on/off for exact rating) */}
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

        {/* Contractors List Section */}
        <main className="contractor-list">
          <h1>Find Contractors</h1>

          {/* Search Bar */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search contractor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button>
              <i className="fas fa-search"></i>
            </button>
          </div>

          {/* Contractor Cards */}
          {filteredContractors.length > 0 ? (
            filteredContractors.map((contractor) => (
              <div key={contractor.id} className="contractor-card">
                <div className="contractor-picture">
                  <img src={contractor.image} alt={contractor.name} />
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
                    <strong>Rating:</strong> {contractor.rating} Stars
                  </p>
                  <p>{contractor.description}</p>
                </div>
                <button onClick={() => viewDetails(contractor.id)}>View Details</button>
              </div>
            ))
          ) : (
            <p>No contractors found for the selected filters.</p>
          )}
        </main>
      </div>
      <Footer />
    </>
  );
};

export default FindContractor;
