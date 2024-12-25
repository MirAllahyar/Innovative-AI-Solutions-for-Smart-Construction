import React, { useState } from 'react';
import './BookConsultation1.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

// Replace these with your actual images
import contractorImg1 from '../../assets/images/mir.jpg';
import contractorImg2 from '../../assets/images/touqeer1.jpg';
import usman from '../../assets/images/find contractor.jpg'; 

const BookConsultation1 = () => {
  const [selectedContractor, setSelectedContractor] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  // Hardcoded list of verified contractors
  const verifiedContractors = [
    {
      id: 1,
      name: 'Touqeer shah',
      specialization: 'Residential Construction',
      experience: '10+ years',
      location: 'Islamabad',
      rating: 5,
      image: contractorImg2,
    },
    {
      id: 2,
      name: 'Mir Allahyar ',
      specialization: 'Commercial Projects',
      experience: '8+ years',
      location: 'Lahore',
      rating: 4,
      image: contractorImg1,
    },
    {
      id: 3,
      name: 'Bilal Ahmed',
      specialization: 'Luxury Homes',
      experience: '15+ years',
      location: 'Karachi',
      rating: 5,
      image: usman, 
    },
  ];

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedContractor) {
      alert('Please select a contractor.');
      return;
    }

    // Simulate submission and reset the form
    setSuccessMessage(
      `Your consultation request with ${selectedContractor} has been submitted. We'll contact you soon!`
    );
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
    setSelectedContractor('');
  };

  return (
    <>
      <Header />
      <div className="book-consultation-container">
        <h1>Book a Consultation</h1>
        <p>
          Easily connect with <strong>trusted, verified contractors</strong> for your construction needs. 
          Our platform ensures you work with experienced professionals who deliver top-notch services. 
          Select a contractor below and fill out the form to schedule a consultation.
        </p>

        {/* Contractor List */}
        <div className="contractor-list">
          <h2>Verified Contractors</h2>
          <div className="contractors-grid">
            {verifiedContractors.map((contractor) => (
              <div
                key={contractor.id}
                className={`contractor-card ${selectedContractor === contractor.name ? 'selected' : ''}`}
                onClick={() => setSelectedContractor(contractor.name)}
              >
                <img
                  src={contractor.image}
                  alt={contractor.name}
                  className="contractor-img"
                />
                <div className="contractor-info">
                  <h3>{contractor.name}</h3>
                  <p>
                    <strong>Specialization:</strong> {contractor.specialization}
                  </p>
                  <p>
                    <strong>Experience:</strong> {contractor.experience}
                  </p>
                  <p>
                    <strong>Location:</strong> {contractor.location}
                  </p>
                  <p className="rating">
                    <strong>Rating: </strong>
                    {'★'.repeat(contractor.rating)}
                    {'☆'.repeat(5 - contractor.rating)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Consultation Form */}
        <div className="consultation-form">
          <h2>Book Your Consultation</h2>
          {selectedContractor ? (
            <p className="selected-contractor">
              You have selected <strong>{selectedContractor}</strong>.
            </p>
          ) : (
            <p className="selected-contractor">Please select a contractor first.</p>
          )}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Your Phone Number"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="message"
              rows="4"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleInputChange}
            ></textarea>
            <button type="submit" disabled={!selectedContractor}>
              Submit
            </button>
          </form>
          {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookConsultation1;
