import React, { useState, useEffect } from 'react';
import './HeroSection.css';
import image1 from '../../assets/images/hero-image1.jpg'; // Import your first image
import image2 from '../../assets/images/hero-image2.jpg'; // Import your second image
import image3 from '../../assets/images/hero-image3.jpg'; // Import your third image

const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [image1, image2, image3]; // List of images

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length); // Loop through images
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [images.length]);

  return (
    <section
      className="hero-section"
      style={{ backgroundImage: `url(${images[currentImage]})` }} // Dynamically set background image
    >
      <div className="hero-content">
        <h1 className="flipping-text">
          Make life easy with Innovative AI solutions for smart Real estate construction
        </h1>
        <p>
        Easily connect with all stakeholders in the real estate construction industry using our platform, powered by AI generate smart, efficient designs effortlessly.
        </p>
        <button className="hero-btn">Generate Front Elevation</button>
      </div>
    </section>
  );
};

export default HeroSection;
