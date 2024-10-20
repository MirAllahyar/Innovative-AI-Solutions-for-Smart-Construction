import React from 'react';
import './ExploreSection.css';

import { Link } from 'react-router-dom';  // Make sure Link is imported from react-router-dom
import image1 from '../../assets/images/IMG-20241014-WA0028.jpg';
import image2 from '../../assets/images/IMG-20241014-WA0035.jpg';
import image3 from '../../assets/images/IMG-20241014-WA0027.jpg'; 
import image4 from '../../assets/images/IMG-20241014-WA0022.jpg';
import image5 from '../../assets/images/IMG-20241014-WA0021.jpg';
import image6 from '../../assets/images/IMG-20241014-WA0038.jpg';

const ExploreSection = () => {
  return (
    <section className="explore-section">
      <h2>Explore Our Features</h2>
      <div className="explore-grid">
        <div className="explore-card">
          <img src={image1} alt="Generate Front Elevation" />
          <div className="overlay">
            <p>Generate Front Elevation</p>
          </div>
          <p className="button-label">Generate Front Elevation</p>
        </div>

        <div className="explore-card">
          <img src={image2} alt="Cost Calculation" />
          <div className="overlay">
            <p>Cost Calculation</p>
          </div>
          <p className="button-label">
            <Link to="/cost-calculation">Cost Calculation</Link>  {/* Make sure you are using Link */}
          </p>
        </div>

        <div className="explore-card">
          <img src={image3} alt="Find Contractor" />
          <div className="overlay">
            <p>Find Contractor</p>
          </div>
          <p className="button-label">Find Contractor</p>
        </div>
        
        <div className="explore-card">
          <img src={image4} alt="Find Service Provider" />
          <div className="overlay">
            <p>Find Service Provider</p>
          </div>
          <p className="button-label">Find Service Provider</p>
        </div>
        
        <div className="explore-card">
          <img src={image5} alt="Bidding" />
          <div className="overlay">
            <p>Bidding</p>
          </div>
          <p className="button-label">Bidding</p>
        </div>

        <div className="explore-card">
          <img src={image6} alt="Community Chat" />
          <div className="overlay">
            <p>Community Chat</p>
          </div>
          <p className="button-label">Community Chat</p>
        </div>
      </div>
      <p className="explore-footer-text">
        Boost your real estate construction with Innovative AI solutions.
      </p>
    </section>
  );
};

export default ExploreSection;
