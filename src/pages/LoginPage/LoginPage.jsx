import React from 'react';
import './LoginPage.css';
import logo from '../../assets/images/IMG-20241014-WA0010.jpg';  // Replace with your logo image path

const LoginPage = () => {
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
            <div className="input-group">
              <label>Email</label>
              <input type="email" placeholder="Enter your email" />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input type="password" placeholder="Enter your password" />
            </div>
            <button className="btn-login">Sign In</button>
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
