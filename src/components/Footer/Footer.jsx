import React from 'react';
import './Footer.css';
import footerBackground from '../../assets/images/footer-bg.jpg'; // Adjust to match your actual image path

const Footer = () => {
  return (
    <footer className="footer" style={{ backgroundImage: `url(${footerBackground})` }}>
      <div className="footer-overlay">
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
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="fa fa-facebook"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <i className="fa fa-twitter"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="fa fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
