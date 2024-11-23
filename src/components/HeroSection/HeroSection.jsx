// HeroSection.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HeroSection.css';
import image1 from '../../assets/images/hero-image1.jpg';
import image2 from '../../assets/images/hero-image2.jpg';
import image3 from '../../assets/images/hero-image3.jpg';

const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [image1, image2, image3];
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const handleButtonClick = () => {
    navigate('/generate-front-elevation');
  };

  return (
    <section
      className="hero-section"
      style={{ backgroundImage: `url(${images[currentImage]})` }}
    >
      <div className="hero-content">
        <h1 className="flipping-text">
          Make life easy with Innovative AI solutions for smart Real estate construction
        </h1>
        <p>
          Easily connect with all stakeholders in the real estate construction industry using our platform, powered by AI to generate smart, efficient designs effortlessly.
        </p>
        <button className="hero-btn" onClick={handleButtonClick}>
          Generate Front Elevation
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
