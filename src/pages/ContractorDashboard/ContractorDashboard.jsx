import React, { useState } from 'react';
import axios from 'axios';
import './ContractorDashboard.css';
import Header from '../../components/Header/Header'; // Import Header component
import Footer from '../../components/Footer/Footer'; // Import Footer component

const ContractorDashboard = () => {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    email: '',
    experience: '',
    skills: '',
    qualifications: '',
  });
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    try {
      const response = await axios.post('http://localhost:5000/api/contractor/save', formData, {
        headers: { 'Content-Type': 'application/json' },
      });
      setSuccessMessage(response.data.message);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Failed to update profile.');
      console.error('Error:', error.response?.data?.message || error.message);
    }
  };
  

  return (
    <div className="contractor-dashboard">
      <Header />
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Welcome, Contractor</h1>
          <p>Update your profile to showcase your professional experience and skills.</p>
        </div>
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
          <button type="submit" className="update-button">Update Profile</button>
        </form>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
      <Footer />
    </div>
  );
};

export default ContractorDashboard;
