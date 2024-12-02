
import React from 'react';
import './ContractorSignup.css'; // Add this CSS file in the same folder
import logo from '../../assets/images/IMG-20241014-WA0010.jpg';  // Update the path to your logo image

const ContractorSignup = () => {
  return (
    <>
      <header className="contractor-header">
        <div className="logo">
          <img src={logo} alt="Smart Construction Logo" />
          <h1>Smart Construction</h1>
        </div>
        <nav className="nav-links">
          <a href="/">Home</a>
          <a href="/news">News</a>
          <a href="/blogs">Blogs</a>
        </nav>
      </header>

      <div className="contractor-signup-container">
        <div className="signup-box">
          <div className="left-box">
            <h2>Contractor Signup</h2>
            <div className="input-group">
              <label>Full Name</label>
              <input type="text" placeholder="Enter your full name" />
            </div>
            <div className="input-group">
              <label>Email</label>
              <input type="email" placeholder="Enter your email" />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input type="password" placeholder="Create a password" />
            </div>
            <button className="btn-signup">Sign Up as Contractor</button>
          </div>
          <div className="right-box">
            <h2>Already Registered?</h2>
            <p>Login to manage your projects and more.</p>
            <a href="/contractor-login" className="btn-login">Login</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContractorSignup;
