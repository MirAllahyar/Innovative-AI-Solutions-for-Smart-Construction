import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './SignupPage.css';

const SignupPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'User' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit the signup form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Make the API call to the backend to create a new user
      const response = await axios.post('http://localhost:5000/api/auth/signup', formData);
      alert(response.data.message); // Show success message
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error('Signup failed:', error.response || error);
      setError(error.response?.data?.error || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-header">
        <Header hideAuthButtons />
      </div>
      <div className="signup-container">
        <form onSubmit={handleSubmit}>
          <h2>Create Your Account</h2>
          {error && <p className="error">{error}</p>}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <select name="role" value={formData.role} onChange={handleChange} className="role-select">
            <option value="User">User</option>
            <option value="Contractor">Contractor</option>
            <option value="Service Provider">Service Provider</option>
          </select>
          <button type="submit" disabled={loading}>
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
      </div>
      <div className="signup-footer">
        <Footer />
      </div>
    </div>
  );
};

export default SignupPage;
