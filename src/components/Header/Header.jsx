import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/images/logo1.png';
import userIcon from '../../assets/images/logo1.png';

const Header = ({ hideAuthButtons = false }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // For mobile menu
  const navigate = useNavigate();

  // Check if the user is logged in
  const isLoggedIn = !!localStorage.getItem('token');

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token to log out
    setIsMobileMenuOpen(false); // Close mobile menu
    navigate('/'); // Redirect to the homepage
  };

  // Function to toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prevState) => !prevState);
  };

  // Function to close mobile menu when a link is clicked
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
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
          <li><a href="/" onClick={closeMobileMenu}>Home</a></li>
          <li><a href="/blogs" onClick={closeMobileMenu}>Blogs</a></li>
          <li><a href="/news" onClick={closeMobileMenu}>News</a></li>
          <li><a href="/service-provider" onClick={closeMobileMenu}>Service Provider</a></li>
          <li><a href="/contractor-login" onClick={closeMobileMenu}>Contractor</a></li>

          {/* Authentication Buttons for Mobile */}
          {!isLoggedIn && !hideAuthButtons ? (
            <>
              <li className="mobile-auth-btn">
                <a href="/login" onClick={closeMobileMenu}>
                  <button className="btn mobile-btn">Login</button>
                </a>
              </li>
              <li className="mobile-auth-btn">
                <a href="/signup" onClick={closeMobileMenu}>
                  <button className="btn mobile-btn">Signup</button>
                </a>
              </li>
            </>
          ) : isLoggedIn && (
            <li>
              <div className="user-menu">
                <img
                  src={userIcon}
                  alt="User"
                  className="user-icon"
                  onClick={closeMobileMenu}
                />
                <button onClick={handleLogout}>Logout</button>
              </div>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
