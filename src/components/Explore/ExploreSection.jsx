import React from 'react';
import './ExploreSection.css';
//import CostCalculator from './pages/CostCalculator/CostCalculator';
import { Link } from 'react-router-dom';  // Make sure Link is imported from react-router-dom
import image1 from '../../assets/images/generate_front_elevation.jpg';
import image2 from '../../assets/images/cost calculation.jpg';
import image3 from '../../assets/images/find contractor.jpg'; 
import image4 from '../../assets/images/service provider.jpg';
import image5 from '../../assets/images/bidding.jpg';
import image6 from '../../assets/images/Community chat.jpg';

const ExploreSection = () => {
  return (
    <section className="explore-section">
      <h2>Explore Our Features</h2>
      <div className="explore-grid">
        <div className="explore-card">
          <img src={image1} alt="Generate Front Elevation" />
          <div className="card-content">
            <p>Generate Front Elevation</p>
          </div>
        </div>

        <div className="explore-card">
          <img src={image2} alt="Cost Calculation" />
          <div className="card-content">
            <p>
              <Link to="/cost-calculation">Cost Calculation</Link>
            </p>
          </div>
        </div>

        <div className="explore-card">
          <img src={image3} alt="Find Contractor" />
          <div className="card-content">
            <p>Find Contractor</p>
          </div>
        </div>
        
        <div className="explore-card">
          <img src={image4} alt="Find Service Provider" />
          <div className="card-content">
            <p>Find Service Provider</p>
          </div>
        </div>
        
        <div className="explore-card">
          <img src={image5} alt="Bidding" />
          <div className="card-content">
            <p>Bidding</p>
          </div>
        </div>

        <div className="explore-card">
          <img src={image6} alt="Community Chat" />
          <div className="card-content">
            <p>Community Chat</p>
          </div>
        </div>
      </div>
      <p className="explore-footer-text">
        Boost your real estate construction with Innovative AI solutions.
      </p>
    </section>
  );
};

export default ExploreSection;
