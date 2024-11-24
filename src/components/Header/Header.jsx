import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/images/logo1.png';
import userIcon from '../../assets/images/logo1.png'; // Use an appropriate user icon image

const Header = ({ hideAuthButtons = false }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // For mobile menu
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); // For user dropdown menu
  const navigate = useNavigate();

  // Check if the user is logged in
  const isLoggedIn = !!localStorage.getItem('token');

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token to log out
    navigate('/'); // Redirect to the homepage
  };

  // Function to toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prevState) => !prevState);
  };

  // Function to toggle user dropdown menu
  const toggleUserMenu = () => {
    setIsUserMenuOpen((prevState) => !prevState);
  };

  return (
    <header className="header">
      <nav className="nav">
        {/* Logo Section */}
        <div className="logo">
          <a href="/">
            <img src={logo} alt="Smart Construction Logo" className="logo-image" />
            <span className="logo-text">Smart Construction</span>
          </a>
        </div>

        {/* Hamburger Menu Icon */}
        <div className="menu-icon" onClick={toggleMobileMenu}>
          <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </div>

        {/* Navigation Links */}
        <ul className={`nav-links ${isMobileMenuOpen ? 'mobile-menu active' : ''}`}>
          <li><a href="/">Home</a></li>
          <li><a href="/blogs">Blogs</a></li>
          <li><a href="/news">News</a></li>
          <li><a href="/service-provider">Service Provider</a></li>
          <li><a href="/Contractor-login">Contractor</a></li>

          {/* Authentication Buttons or User Dropdown */}
          {!isLoggedIn && !hideAuthButtons ? (
            <>
              <li>
                <a href="/login">
                  <button className="btn">Login</button>
                </a>
              </li>
              <li>
                <a href="/signup">
                  <button className="btn">Signup</button>
                </a>
              </li>
            </>
          ) : (
            <li className="user-menu">
              <div className="user-icon-container" onClick={toggleUserMenu}>
                <img src={userIcon} alt="User" className="user-icon" />
              </div>
              {isUserMenuOpen && (
                <div className="dropdown-menu">
                  <button onClick={handleLogout} className="logout-btn">
                    Logout
                  </button>
                </div>
              )}
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
