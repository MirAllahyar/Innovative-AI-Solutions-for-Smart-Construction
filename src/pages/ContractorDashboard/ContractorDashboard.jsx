import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ContractorDashboard.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const ContractorDashboard = () => {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    email: '',
    experience: '',
    skills: '',
    qualifications: '',
  });
  const [isEditing, setIsEditing] = useState(true); // Initially allow editing for the first-time user
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // Fetch contractor profile from the database when the component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const email = localStorage.getItem('email'); // Assuming the email is stored in localStorage
        if (!email) {
          setErrorMessage('Email not found. Please log in again.');
          return;
        }

        const response = await axios.get(`http://localhost:5000/api/contractor/profile/${email}`);
        if (response.data.profile) {
          setFormData(response.data.profile);
          setIsEditing(false); // Switch to view mode if profile already exists
        }
      } catch (error) {
        console.error('Error fetching profile:', error.message);
        setErrorMessage('Failed to fetch profile. Please try again later.');
      }
    };

    fetchProfile();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    try {
      const response = await axios.post('http://localhost:5000/api/contractor/profile', formData, {
        headers: { 'Content-Type': 'application/json' },
      });
      setSuccessMessage(response.data.message);
      setIsEditing(false); // Switch to view mode after saving
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Failed to update profile.');
      console.error('Error updating profile:', error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="contractor-dashboard">
      <Header />
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Welcome, Contractor</h1>
          <p>{isEditing ? 'Complete or update your profile below.' : 'View or edit your profile.'}</p>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="number">Contact Number</label>
              <input
                type="text"
                id="number"
                name="number"
                placeholder="Enter your contact number"
                value={formData.number}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
                required
                readOnly // Email should not be editable
              />
            </div>
            <div className="form-group">
              <label htmlFor="experience">Professional Experience</label>
              <textarea
                id="experience"
                name="experience"
                placeholder="Describe your professional experience"
                value={formData.experience}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="skills">Skills</label>
              <textarea
                id="skills"
                name="skills"
                placeholder="List your key skills"
                value={formData.skills}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="qualifications">Qualifications</label>
              <textarea
                id="qualifications"
                name="qualifications"
                placeholder="Enter your qualifications"
                value={formData.qualifications}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="update-button">Save Profile</button>
          </form>
        ) : (
          <div className="profile-view">
            <h2>Your Profile</h2>
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Contact Number:</strong> {formData.number}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Experience:</strong> {formData.experience}</p>
            <p><strong>Skills:</strong> {formData.skills}</p>
            <p><strong>Qualifications:</strong> {formData.qualifications}</p>
            <button onClick={() => setIsEditing(true)} className="edit-button">
              Edit Profile
            </button>
          </div>
        )}

        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
      <Footer />
    </div>
  );
};

export default ContractorDashboard;
