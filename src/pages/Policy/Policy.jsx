import React from 'react';
import './Policy.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const Policy = () => {
  return (
    <>
      <Header />
      <div className="policy">
        <h1>Privacy Policy & Terms of Service</h1>
        <p>
          Welcome to Smart Construction! We value your privacy and are committed to ensuring that your personal data is
          handled responsibly. Please read our privacy policy and terms of service to understand your rights and
          responsibilities while using our platform.
        </p>

        {/* Privacy Policy */}
        <h2>Privacy Policy</h2>
        <p>
          At Smart Construction, we prioritize your privacy and are dedicated to protecting the personal information
          you share with us. Below is an outline of how we manage and use your data.
        </p>
        <ul>
          <li>
            <strong>Information Collection:</strong> We collect personal information such as your name, email address,
            and phone number to improve our services and personalize your experience.
          </li>
          <li>
            <strong>How We Use Your Data:</strong> Your data is used for communication, service enhancements, and
            platform improvements.
          </li>
          <li>
            <strong>Data Sharing:</strong> We do not sell or share your data without your explicit consent, except as
            required by law.
          </li>
        </ul>

        {/* Terms of Service */}
        <h2>Terms of Service</h2>
        <p>
          By using Smart Construction, you agree to our terms and conditions. These rules ensure a safe and secure
          experience for all users.
        </p>
        <ul>
          <li>
            <strong>User Responsibilities:</strong> Users must provide accurate information and adhere to the rules
            while interacting on the platform.
          </li>
          <li>
            <strong>Service Usage:</strong> The platform is provided "as-is" without guarantees of uninterrupted
            service.
          </li>
          <li>
            <strong>Content Ownership:</strong> All content, including images and text, belongs to Smart Construction
            and cannot be used without permission.
          </li>
        </ul>

        {/* Cookies Policy */}
        <h2>Cookies Policy</h2>
        <p>
          Smart Construction uses cookies to improve your browsing experience. By continuing to use the site, you agree
          to the use of cookies as described below.
        </p>
        <ul>
          <li>
            <strong>Purpose of Cookies:</strong> Cookies help us understand user preferences, improve site performance,
            and offer personalized content.
          </li>
          <li>
            <strong>Managing Cookies:</strong> You can disable cookies in your browser settings, though this may affect
            the functionality of certain features.
          </li>
        </ul>

        {/* Contact Information */}
        <h2>Contact Us</h2>
        <p>
          Have questions or need assistance? Feel free to reach out to us. Our team is here to help you.
        </p>
        <p>
          <strong>Email:</strong> support@smartconstruction.com
        </p>
        <p>
          <strong>Phone:</strong> +1-234-567-890
        </p>
      </div>
      <Footer />
    </>
  );
};

export default Policy;
