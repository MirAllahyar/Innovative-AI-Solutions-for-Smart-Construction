import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header'; // Import Header component
import Footer from '../../components/Footer/Footer'; // Import Footer component
import './LoginPage.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);

      if (res.data.role === 'User') {
        navigate('/UserDashboard');
      } else if (res.data.role === 'Contractor') {
        navigate('/ContractorDashboard');
      } else if (res.data.role === 'Service Provider') {
        navigate('/ServiceProviderDashboard');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <Header hideAuthButtons /> {/* Full-width header */}
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <h2>Welcome Back</h2>
          {error && <p className="error">{error}</p>}
          <input
            type="email"
            name="email"
            placeholder="Email"
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
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
      <Footer /> {/* Full-width footer */}
    </div>
  );
};

export default LoginPage;
