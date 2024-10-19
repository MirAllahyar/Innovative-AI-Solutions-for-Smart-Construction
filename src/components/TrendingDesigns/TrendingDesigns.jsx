import React from 'react';
import './TrendingDesigns.css';
import image10 from '../../assets/images/trending1.jpg';

const TrendingDesigns = () => {
  return (
    <section className="trending-designs">
      <h2>Trending Designs</h2>
      <div className="design-list">
        <div className="design-card">
          <img src={image10} alt="OBSIDIAN BANK" />
          <p>OBSIDIAN BANK</p>
        </div>
        <div className="design-card">
          <img src={image10} alt="EUREKA VISION THEATER" />
          <p>EUREKA VISION THEATER</p>
        </div>
        <div className="design-card">
          <img src={image10} alt="ROSETON BUILDING" />
          <p>ROSETON BUILDING</p>
        </div>
      </div>
    </section>
  );
};

export default TrendingDesigns;
