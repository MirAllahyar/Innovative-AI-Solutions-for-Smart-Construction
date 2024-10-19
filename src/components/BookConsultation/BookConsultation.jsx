


import React from 'react';
import './BookConsultation.css';
import consultationImage from '../../assets/images/consultation-image.jpg'; // Update this path to your image

const BookConsultation = () => {
  return (
    <section className="book-consultation">
      <div className="consultation-content">
        <div className="consultation-text">
          <h2>Book a consultation</h2>
          <p>
            Highlight specific services or products here. It can be a property
            appraisal service, a consultation, or something uniquely yours. Give
            it room to shine here.
          </p>
          <a href="/contact" className="consultation-link">Contact Us</a>
        </div>
        <div className="consultation-image">
          <img src={consultationImage} alt="Consultation Room" />
        </div>
      </div>
    </section>
  );
};

export default BookConsultation;
