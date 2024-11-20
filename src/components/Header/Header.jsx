import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/images/logo1.png';
import userIcon from '../../assets/images/logo1.png';

const Header = ({ hideAuthButtons = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Check if the user is logged in
  const isLoggedIn = !!localStorage.getItem('token');

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token to log out
    setIsMenuOpen(false); // Close the dropdown menu
    navigate('/'); // Redirect to the homepage
  };

  return (
    <header className="header">
      <nav className="nav">
        <div className="logo">
          <a href="/">
            <img src={logo} alt="Smart Construction Logo" className="logo-image" />
            Smart Construction
          </a>
        </div>

        {/* Navigation Links */}
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/blogs">Blogs</a></li>
          <li><a href="/news">News</a></li>
          <li><a href="/service-provider">Service Provider</a></li>
          <li><a href="/contractor-login">Contractor</a></li>
        </ul>

        {/* Authentication Section */}
        <div className="auth-buttons">
          {!isLoggedIn && !hideAuthButtons ? (
            <>
              <a href="/login">
                <button className='btn'>Login</button>
              </a>
              <a href="/signup">
                <button className='btn'>Signup</button>
              </a>
            </>
          ) : isLoggedIn && (
            <div className="user-menu">
              <img
                src={userIcon}
                alt="User"
                className="user-icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
              {isMenuOpen && (
                <div className="dropdown-menu">
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
