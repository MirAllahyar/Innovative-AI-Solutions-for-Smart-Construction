import React from 'react';
import './SignupPage.css';
import logo from '../../assets/images/IMG-20241014-WA0010.jpg'; // Replace with your logo image path

const SignupPage = () => {  // Make sure this is exactly 'SignupPage'
  return (
    <div className="signup-page">
      <header className="signup-header">
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
      <div className="signup-container">
        <div className="signup-box">
          <div className="left-box">
            <h2>Sign Up</h2>
            <div className="input-group">
              <label>Username</label>
              <input type="text" placeholder="Enter your username" />
            </div>
            <div className="input-group">
              <label>Email</label>
              <input type="email" placeholder="Enter your email" />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input type="password" placeholder="Enter your password" />
            </div>
            <button className="btn-signup">Sign Up</button>
          </div>
          <div className="right-box">
            <h2>Welcome Back!</h2>
            <p>If you already have an account, sign in below</p>
            <a href="/login" className="btn-login">Login</a>
          </div>
        </div>
      </div>
    </div>
  );
};

// Make sure to export 'SignupPage'
export default SignupPage;
