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
            <p><a href="/contact-us">Contact us</a></p>
            <p><a href="/about-us">About us</a></p>
            <p><a href="/policy">Policy</a></p>
            <p><a href="/help-support">Help and support</a></p>
          </div>
          <div className="footer-column">
  <h3>Location</h3>
  <p>
    <i className="fa fa-map-marker-alt" style={{ marginRight: '10px' }}></i>
    Riphah International University
  </p>
  <p>
    <a
      href="https://www.google.com/maps/place/Riphah+International+University/@33.6212189,72.9718519,14z/data=!4m6!3m5!1s0x38df968cf40a7279:0xc5f472b78a8bcfc4!8m2!3d33.6169484!4d72.9719674!16zL20vMDlsZ3J4?entry=ttu&g_ep=EgoyMDI0MTAxNi4wIKXMDSoASAFQAw%3D%3D"
      target="_blank"
      rel="noopener noreferrer"
    >
      Find us on Google Maps
    </a>
  </p>
</div>



          <div className="footer-column stay-connected">
            <h3>Stay connected</h3>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
            <p>Follow us for the latest updates</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
