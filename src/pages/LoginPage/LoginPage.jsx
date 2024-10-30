import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Change this import
import './LoginPage.css';
import logo from '../../assets/images/IMG-20241014-WA0010.jpg'; // Replace with your logo image path
import axios from 'axios'; // Import axios for API requests

const LoginPage = () => {
  const [email, setEmail] = useState(''); // State for email
  const [password, setPassword] = useState(''); // State for password
  const navigate = useNavigate(); // Use useNavigate for navigation

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post('http://localhost:5000/api/auth/login', {
            email, // Ensure this matches the backend field
            password,
        });

        localStorage.setItem('token', response.data.token); // Store the token
        navigate('/userdashboard'); // Navigate to user dashboard
    } catch (error) {
        console.error('Login failed:', error);
        alert('Login failed: ' + (error.response ? error.response.data.message : 'An unexpected error occurred.'));
    }
};


  return (
    <div className="login-page">
      <header className="login-header">
        <div className="logo">
          <img src={logo} alt="Smart Construction Logo" />
          <h1>Smart Construction</h1>
        </div>
        <nav className="nav-links">
          <a href="/">Home</a>
          <a href="/blogs">Blogs</a>
          <a href="/news">News</a>
        </nav>
      </header>
      <div className="login-container">
        <div className="login-box">
          <div className="left-box">
            <h2>Sign In</h2>
            <form onSubmit={handleLogin}>
              <div className="input-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Update email state
                  required
                />
              </div>
              <div className="input-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Update password state
                  required
                />
              </div>
              <button className="btn-login" type="submit">Sign In</button> {/* Submit button */}
            </form>
          </div>
          <div className="right-box">
            <h2>Welcome Back!</h2>
            <p>If you don’t have an account, sign up below</p>
            <a href="/signup" className="btn-signup">Sign Up</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
