import React from 'react';
import './SatisfiedUser.css';
import testimonialImage from '../../assets/images/testimonial-placeholder.jpg'; // Replace with your image path

const SatisfiedUser = () => {
  return (
    <section className="satisfied-users">
      <h2>From Our Satisfied Users</h2>
      <div className="testimonial-grid">
        <div className="testimonial-card">
          <img src={testimonialImage} alt="User testimonial" />
          <p>
            Boost your product and service's credibility by adding testimonials
            from your clients. People love recommendations so feedback from
            others who’ve tried it is invaluable.
          </p>
          <h4>- Bass Co.</h4>
        </div>
        <div className="testimonial-card">
          <img src={testimonialImage} alt="User testimonial" />
          <p>
            Boost your product and service's credibility by adding testimonials
            from your clients. People love recommendations so feedback from
            others who’ve tried it is invaluable.
          </p>
          <h4>- Milcheur Law</h4>
        </div>
        <div className="testimonial-card">
          <img src={testimonialImage} alt="User testimonial" />
          <p>
            Boost your product and service's credibility by adding testimonials
            from your clients. People love recommendations so feedback from
            others who’ve tried it is invaluable.
          </p>
          <h4>- Studio Rallia</h4>
        </div>
      </div>
    </section>
  );
};

export default SatisfiedUser;
