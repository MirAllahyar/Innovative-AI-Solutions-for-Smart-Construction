import React from 'react';
import './Header.css';
import logo from '../../assets/images/IMG-20241014-WA0010.jpg';

const Header = () => {
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
          <li><a href="/news">News</a></li> {/* News path */}
          <li><a href="/service-provider">Service Provider</a></li>
          <li><a href="/contractor-login">Contractor</a></li>
        </ul>
        {/* Authentication Buttons */}
        <div className="auth-buttons">
          <a href="/login" className="login-btn">Login</a>
          <a href="/signup" className="signup-btn">Signup</a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
