import React from 'react';
import './TrendingDesigns.css';
import image10 from '../../assets/images/d1.jpg';
import image11 from '../../assets/images/d2.jpg';
import image12 from '../../assets/images/d3.jpeg';
import image13 from '../../assets/images/d4.jpg';
import image14 from '../../assets/images/d5.jpg';

const TrendingDesigns = () => {
  return (
    <section className="trending-designs">
      <h2>Trending Designs</h2>
      <div className="design-list">
        <div className="design-card">
          <a href={image10} target="_blank" rel="noopener noreferrer">
            <img src={image10} alt="OBSIDIAN BANK" />
            
          </a>
        </div>
        <div className="design-card">
          <a href={image11} target="_blank" rel="noopener noreferrer">
            <img src={image11} alt="EUREKA VISION THEATER" />
            
          </a>
        </div>
        <div className="design-card">
          <a href={image12} target="_blank" rel="noopener noreferrer">
            <img src={image12} alt="ROSETON BUILDING" />
            
          </a>
        </div>
        <div className="design-card">
          <a href={image13} target="_blank" rel="noopener noreferrer">
            <img src={image13} alt="TITAN PLAZA" />
            
          </a>
        </div>
        <div className="design-card">
          <a href={image14} target="_blank" rel="noopener noreferrer">
            <img src={image14} alt="NEXUS TOWER" />
            
          </a>
        </div>
      </div>
    </section>
  );
};

export default TrendingDesigns;
