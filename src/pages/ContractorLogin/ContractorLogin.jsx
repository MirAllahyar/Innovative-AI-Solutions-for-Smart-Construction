import React, { useState } from 'react';
import './ContractorLogin.css';
import logo from '../../assets/images/IMG-20241014-WA0010.jpg';

const ContractorLogin = () => {
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [email, setEmail] = useState('');

  const handleForgotPassword = (e) => {
    e.preventDefault();
    // Here you would typically send the email to your backend for a password reset link
    alert(`Password reset link has been sent to ${email}`);
    setIsForgotPasswordOpen(false); // Close modal after submission
  };

  return (
    <div className="contractor-login-page">
      <header className="contractor-header">
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
            <button className="btn-login">Login</button>
            <p
              className="forgot-password-btn"
              onClick={() => setIsForgotPasswordOpen(true)}
            >
              Forgot Password?
            </p>
          </div>
          <div className="right-box">
            <h2>New Contractor?</h2>
            <p>If you don't have an account, sign up below</p>
            <a href="/contractor-signup" className="btn-signup">
              Sign Up
            </a>
          </div>
        </div>
      </div>

      {isForgotPasswordOpen && (
        <div className="forgot-password-modal">
          <div className="modal-content">
            <h2>Forgot Password</h2>
            <p>Please enter your email address to receive a password reset link:</p>
            <form onSubmit={handleForgotPassword}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn-submit">
                Send Reset Link
              </button>
              <button
                type="button"
                className="btn-cancel"
                onClick={() => setIsForgotPasswordOpen(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContractorLogin;
