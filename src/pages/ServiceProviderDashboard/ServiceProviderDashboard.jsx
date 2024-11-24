import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/Header/Header'; // Import the Header
import Footer from '../../components/Footer/Footer'; // Import the Footer
import './ServiceProviderDashboard.css'; // Import the CSS file

const ServiceProviderDashboard = () => {
  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    email: '',
    services: '',
    experience: '',
    qualifications: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Toggle between view and edit

  // Fetch existing data from the backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/service-provider/profile', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setFormData(response.data.profile);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      }
    };
    fetchProfile();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(
        'http://localhost:5000/api/service-provider/profile', // Backend endpoint
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setSuccess(response.data.message);
      setError(null); // Clear any existing error messages
      setIsEditing(false); // Switch back to view mode
    } catch (error) {
      setError(
        error.response?.data?.message || 'Failed to update profile. Please try again.'
      );
      setSuccess(null); // Clear any existing success messages
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="service-provider-dashboard">
      <Header /> {/* Include the Header */}
      <div className="dashboard-container">
        <h2>Welcome, Service Provider</h2>
        {isEditing ? (
          <form className="profile-form" onSubmit={handleSubmit}>
            {success && <p className="success-message">{success}</p>}
            {error && <p className="error-message">{error}</p>}

            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contactNumber">Contact Number</label>
              <input
                type="text"
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="Enter your contact number"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="services">Services</label>
              <textarea
                id="services"
                name="services"
                value={formData.services}
                onChange={handleChange}
                placeholder="Enter the services you provide"
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="experience">Experience</label>
              <input
                type="text"
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Enter your experience"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="qualifications">Qualifications</label>
              <textarea
                id="qualifications"
                name="qualifications"
                value={formData.qualifications}
                onChange={handleChange}
                placeholder="Enter your qualifications"
                required
              ></textarea>
            </div>

            <button type="submit" className="update-profile-btn" disabled={loading}>
              {loading ? 'Updating Profile...' : 'Save Changes'}
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </form>
        ) : (
          <div className="profile-view">
            <h3>Profile Details</h3>
            <p>
              <strong>Name:</strong> {formData.name}
            </p>
            <p>
              <strong>Contact Number:</strong> {formData.contactNumber}
            </p>
            <p>
              <strong>Email:</strong> {formData.email}
            </p>
            <p>
              <strong>Services:</strong> {formData.services}
            </p>
            <p>
              <strong>Experience:</strong> {formData.experience}
            </p>
            <p>
              <strong>Qualifications:</strong> {formData.qualifications}
            </p>
            <button
              className="edit-profile-btn"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
      <Footer /> {/* Include the Footer */}
    </div>
  );
};

export default ServiceProviderDashboard;
