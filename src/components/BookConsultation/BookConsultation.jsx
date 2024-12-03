import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import './BookConsultation.css';
import consultationImage from '../../assets/images/consultation-image.jpg'; // Update this path if needed

const BookConsultation = () => {
  return (
    <section className="book-consultation">
      <div className="consultation-content">
        <div className="consultation-text">
          <h2>Book a consultation</h2>
          <p>
            Easily connect with trusted, verified contractors for your construction needs. Our platform ensures you work with experienced professionals who deliver top-notch services. Schedule a consultation to get expert advice and tailored solutions for your project. Simplify your construction journey with hassle-free collaboration!
          </p>
          <Link to="/contact" className="consultation-link">Contact Us</Link> {/* Use Link here */}
        </div>
        <div className="consultation-image">
          <img src={consultationImage} alt="Consultation Room" />
        </div>
      </div>
    </section>
  );
};

export default BookConsultation;
