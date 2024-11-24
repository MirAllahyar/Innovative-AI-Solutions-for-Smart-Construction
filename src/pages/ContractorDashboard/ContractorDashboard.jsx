import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ContractorDashboard.css';

const ContractorDashboard = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    experience: '',
    skills: '',
    qualifications: '',
  });
  const [isEditing, setIsEditing] = useState(true); // Initial state is editing if the profile doesn't exist
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const contractorEmail = localStorage.getItem('email'); // Assuming email is stored in localStorage after login

  // Fetch contractor profile data when the component loads
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/contractor/profile?email=${contractorEmail}`
        );
        if (response.data.profile) {
          setFormData(response.data.profile);
          setIsEditing(false); // If profile exists, switch to view mode
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        setErrorMessage('Failed to fetch profile.');
      }
    };

    if (contractorEmail) {
      fetchProfile();
    }
  }, [contractorEmail]);

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission to create or update profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const endpoint = isEditing
        ? 'http://localhost:5000/api/contractor/update'
        : 'http://localhost:5000/api/contractor/create';

      await axios.post(endpoint, formData, {
        headers: { 'Content-Type': 'application/json' },
      });

      setSuccessMessage('Profile saved successfully!');
      setIsEditing(false); // Switch to view mode after saving
    } catch (error) {
      console.error('Error saving profile:', error);
      setErrorMessage('Failed to save profile.');
    }
  };

  return (
    <div className="contractor-dashboard">
      <h1>Contractor Profile</h1>
      {isEditing ? (
        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              readOnly
            />
          </div>
          <div className="form-group">
            <label>Contact Number:</label>
            <input
              type="text"
              name="number"
              value={formData.number}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Experience:</label>
            <textarea
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label>Skills:</label>
            <textarea
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label>Qualifications:</label>
            <textarea
              name="qualifications"
              value={formData.qualifications}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit">Save Profile</button>
        </form>
      ) : (
        <div className="profile-view">
          <h2>Your Profile</h2>
          <p>
            <strong>Name:</strong> {formData.name}
          </p>
          <p>
            <strong>Email:</strong> {formData.email}
          </p>
          <p>
            <strong>Contact Number:</strong> {formData.number}
          </p>
          <p>
            <strong>Experience:</strong> {formData.experience}
          </p>
          <p>
            <strong>Skills:</strong> {formData.skills}
          </p>
          <p>
            <strong>Qualifications:</strong> {formData.qualifications}
          </p>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      )}
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default ContractorDashboard;
