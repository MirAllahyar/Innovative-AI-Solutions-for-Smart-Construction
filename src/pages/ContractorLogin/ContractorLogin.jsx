import React from 'react';
import './ContractorLogin.css'; // Add this CSS file in the same folder
import logo from '../../assets/images/IMG-20241014-WA0010.jpg';  // Update the path to your logo image

const ContractorLogin = () => {
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

      <div className="contractor-login-container">
        <div className="login-box">
          <div className="left-box">
            <h2>Contractor Login</h2>
            <div className="input-group">
              <label>Email</label>
              <input type="email" placeholder="Enter your email" />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input type="password" placeholder="Enter your password" />
            </div>
            <button className="btn-login">Login as Contractor</button>
            <p className="forgot-password">Forgot password? <a href="#">Click here</a></p>
          </div>
          <div className="right-box">
            <h2>New Contractor?</h2>
            <p>Sign up to manage projects and more.</p>
            <a href="/contractor-signup" className="btn-signup">Sign Up</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContractorLogin;
