import React from 'react';
import './ExploreSection.css';
// Import the image from the assets folder
import image1 from '../../assets/images/IMG-20241014-WA0028.jpg';
import image2 from '../../assets/images/IMG-20241014-WA0035.jpg';
import image3 from '../../assets/images/IMG-20241014-WA0027.jpg'; 
import image4 from '../../assets/images/IMG-20241014-WA0022.jpg';
import image5 from '../../assets/images/IMG-20241014-WA0021.jpg';
import image6 from '../../assets/images/IMG-20241014-WA0038.jpg';

const ExploreSection = () => {
  return (
    <section className="explore-section">
      <h2>Explore</h2>
      <div className="explore-grid">
        <div className="explore-card">
          {/* Use the imported image */}
          <img src={image1} alt="Generate Front Elevation" />
          <p>Generate front elevation</p>
        </div>
        <div className="explore-card">
          <img src={image2} alt="Cost Calculation" />
          <p>Cost Calculation</p>
        </div>
        <div className="explore-card">
          <img src={image3} alt="Find Contractor" />
          <p>Find Contractor</p>
        </div>
        <div className="explore-card">
          <img src={image4} alt="Find Service Provider" />
          <p>Find Service Provider</p>
        </div>
        <div className="explore-card">
          <img src={image5} alt="Bidding" />
          <p>Bidding</p>
        </div>
        <div className="explore-card">
          <img src={image6} alt="Community Chat" />
          <p>Community Chat</p>
        </div>
      </div>
      <p className="explore-footer-text">
        Boost your real estate construction with Innovative AI solution for smart construction
      </p>
    </section>
  );
};

export default ExploreSection;
