import React from 'react';
import './HelpSupport.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const HelpSupport = () => {
  return (
    <>
      <Header />
      <div className="help-support">
        <h1>Help and Support</h1>
        <p>Welcome to our Help and Support page. Find answers to common questions or reach out for assistance.</p>

        {/* FAQ Section */}
        <div className="faq-section">
          <h2>Frequently Asked Questions</h2>

          <div className="faq-item">
            <h3>1. How do I create an account?</h3>
            <p>
              To create an account, click the <strong>"Sign Up"</strong> button on the homepage, provide your details, and verify your email address.
            </p>
          </div>

          <div className="faq-item">
            <h3>2. How can I reset my password?</h3>
            <p>
              If you've forgotten your password, click the <strong>"Forgot Password"</strong> link on the login page and follow the instructions to reset it.
            </p>
          </div>

          <div className="faq-item">
            <h3>3. How can I contact customer support?</h3>
            <p>
              You can reach our support team by emailing <strong>support@smartconstruction.com</strong> or calling us at <strong>+1-800-123-4567</strong>.
            </p>
          </div>

          <div className="faq-item">
            <h3>4. How do I update my account details?</h3>
            <p>
              Log in to your account, go to the <strong>"Profile"</strong> section, make the necessary updates, and save the changes.
            </p>
          </div>

          <div className="faq-item">
            <h3>5. Where can I find user guides or tutorials?</h3>
            <p>
              Visit our <strong>"Resources"</strong> page to access step-by-step guides and tutorials on how to use our platform effectively.
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="contact-section">
          <h2>Still Need Help?</h2>
          <p>
            If you couldn’t find the answer you were looking for, feel free to get in touch with us.
          </p>
          <p>
            <strong>Email:</strong> support@smartconstruction.com
          </p>
          <p>
            <strong>Phone:</strong> +1-800-123-4567
          </p>
          <p>
            <strong>Support Hours:</strong> Monday to Friday, 9:00 AM - 6:00 PM (EST)
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HelpSupport;
