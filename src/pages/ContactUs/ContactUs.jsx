import React, { useState } from 'react';
import './ContactUs.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [nameError, setNameError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validate name field to allow only alphabetic characters and spaces
    if (name === 'name') {
      const nameRegex = /^[a-zA-Z\s]*$/;
      if (!nameRegex.test(value)) {
        setNameError('Invalid name. Only letters and spaces are allowed.');
      } else {
        setNameError('');
      }
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for errors before submitting
    if (nameError) {
      alert('Please fix the errors before submitting.');
      return;
    }

    alert('Message sent successfully!');
    console.log(formData);
    // Submit the form data or handle further logic here
  };

  return (
    <div className="contact-page">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="contact-content">
        <h1>Contact Us</h1>
        <p>If you have any questions or need assistance, feel free to contact us.</p>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          {nameError && <span className="error">{nameError}</span>}

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleInputChange}
            required
          ></textarea>

          <button type="submit">Send Message</button>
        </form>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactUs;
