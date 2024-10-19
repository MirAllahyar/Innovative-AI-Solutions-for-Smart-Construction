import React from 'react';
import { Link } from 'react-router-dom'; // Make sure to use Link for routing
import './Header.css';
import logo from '../../assets/images/IMG-20241014-WA0010.jpg';

const Header = () => {
  return (
    <header className="header">
      <nav className="nav">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Smart Construction Logo" className="logo-image" />
            Smart Construction
          </Link>
        </div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/blogs">Blogs</Link></li>
          <li><Link to="/news">News</Link></li>
          <li><Link to="/service-provider">Service Provider</Link></li>
          <li><Link to="/contractor-login">Contractor</Link></li> {/* Contractor Login Link */}
        </ul>
        <div className="auth-buttons">
          <Link to="/login" className="login-btn">Login</Link>
          <Link to="/signup" className="signup-btn">Signup</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
