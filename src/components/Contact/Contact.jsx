import React from 'react';
import Header from '../Header/Header'; // Adjust the path based on your folder structure
import Footer from '../Footer/Footer'; // Adjust the path based on your folder structure
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-page">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="contact-content">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you! Please reach out with any questions or feedback.</p>
        <form className="contact-form">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />

          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" rows="4" required></textarea>

          <button type="submit">Send Message</button>
        </form>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Contact;
