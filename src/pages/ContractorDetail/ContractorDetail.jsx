import React from 'react';
import './ContractorDetail.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

// Replace this import with Haider Ali's actual image path if needed
import haiderAliImage from '../../assets/images/haider.jpg';

const ContractorDetail = () => {
  return (
    <>
      <Header />
      <div className="contractor-detail-page">
        
        {/* Hero Section */}
        <div className="contractor-hero">
          <img 
            src={haiderAliImage} 
            alt="Haider Ali" 
          />
          <div className="hero-text">
            <h1>Haider Ali</h1>
            <p className="specialization">Residential Construction</p>
            <p className="experience">
              <strong>Experience:</strong> 15+ years
            </p>
            <p className="location">
              <strong>Location:</strong> Islamabad, Pakistan
            </p>
          </div>
        </div>

        {/* About Section */}
        <div className="contractor-about">
          <h2>About the Contractor</h2>
          <p>
            Haider Ali is a verified contractor at <strong>Pak Builders</strong> 
            with over 15 years of experience in residential construction. His focus is on
            delivering high-quality homes that seamlessly blend durability and aesthetics.
          </p>
          <p>
            Whether you’re planning a new build or renovating an existing property,
            Haider’s comprehensive approach ensures top-notch workmanship and client satisfaction.
          </p>
        </div>

        {/* Skills / Specializations */}
        <div className="contractor-skills">
          <h3>Specializations</h3>
          <ul>
            <li>Residential Construction</li>
            <li>Eco-friendly & Sustainable Builds</li>
            <li>Project Management & Supervision</li>
            <li>Renovations & Add-ons</li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="contractor-contact">
          <h3>Contact & Availability</h3>
          <p>
            <strong>Email:</strong> haider.ali@example.com<br />
            <strong>Phone:</strong> +92-300-1234567
          </p>
          <p className="accent-note">
            For appointments, consultations, or project inquiries, 
            feel free to reach out via email or phone.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContractorDetail;
