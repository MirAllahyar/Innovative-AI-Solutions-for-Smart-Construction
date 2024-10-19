import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-column">
          <h3>Company</h3>
          <p>Contact us</p>
          <p>About us</p>
          <p>Policy</p>
          <p>Help and support</p>
        </div>
        <div className="footer-column">
          <h3>Location</h3>
          <p>Riphah International University</p>
        </div>
        <div className="footer-column">
          <h3>Stay connected</h3>
          <div className="social-icons">
            <i className="fa fa-facebook"></i>
            <i className="fa fa-twitter"></i>
            <i className="fa fa-instagram"></i>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
