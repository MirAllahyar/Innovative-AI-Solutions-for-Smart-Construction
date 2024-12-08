import React from 'react';
import './AboutUs.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import missionImage from '../../assets/images/mission2.jpg';
import teamImage from '../../assets/images/expert.jpg';
import valuesImage from '../../assets/images/value.jpg';

const AboutUs = () => {
  return (
    <>
      <Header />
      <div className="about-us">
        {/* Hero Section */}
        <div className="about-hero">
          <h1>About Us</h1>
          <p>
            Discover who we are, what drives us, and how we are committed to shaping the future of real estate construction with cutting-edge AI solutions.
          </p>
        </div>

        {/* Our Mission Section */}
        <div className="about-section about-mission">
          <div className="section-content">
            <h2>Our Mission</h2>
            <p>
              At Smart Construction, our mission is to revolutionize the real estate construction industry by providing
              innovative, AI-driven solutions. We aim to bridge the gap between stakeholders, making construction faster,
              smarter, and more efficient. By leveraging advanced technologies, we enable builders, architects, and clients to
              collaborate seamlessly, reducing inefficiencies and improving outcomes. Our mission is not only to transform how
              buildings are constructed but also to foster sustainable practices that contribute to a better tomorrow.
            </p>
            <p>
              We believe in empowering the construction ecosystem with tools that streamline operations, enhance decision-making,
              and promote creativity. Every solution we develop is rooted in our dedication to excellence and our commitment to
              advancing the future of construction through innovation.
            </p>
          </div>
          <img src={missionImage} alt="Our Mission" />
        </div>

        {/* Our Values Section */}
        <div className="about-section about-values">
          <img src={valuesImage} alt="Our Values" />
          <div className="section-content">
            <h2>Our Values</h2>
            <p>
              Integrity, innovation, and inclusivity are at the core of everything we do. At Smart Construction, we hold ourselves
              accountable to the highest ethical standards, ensuring that trust and transparency are integral to our partnerships.
            </p>
            <p>
              Our commitment to innovation drives us to explore new technologies and methodologies that redefine construction norms.
              We believe in fostering inclusivity by providing equal opportunities for all stakeholders and encouraging collaboration
              across the construction landscape.
            </p>
            <p>
              Sustainability is another pillar of our values. By adopting eco-friendly materials and practices, we strive to reduce
              our environmental impact while creating value for our clients. Together, these values shape our vision of a
              construction industry that is more resilient, adaptable, and forward-thinking.
            </p>
          </div>
        </div>

        {/* Our Team Section */}
        <div className="about-section about-team">
          <div className="section-content">
            <h2>Meet With Experts</h2>
            <p>
              Behind Smart Construction is a passionate team of engineers, architects, and visionaries who share a common goal: to
              redefine the construction industry through innovation and collaboration. Our team brings together a wealth of experience
              and expertise, ensuring that every solution we deliver is tailored to the unique needs of our clients.
            </p>
            <p>
              From concept to completion, our experts work tirelessly to ensure that each project exceeds expectations. By combining
              technical proficiency with creative problem-solving, we provide our clients with tools and strategies that simplify
              complex processes and drive meaningful results.
            </p>
            <p>
              Whether you're a builder, architect, or property owner, our team is here to guide you every step of the way. With a deep
              understanding of industry trends and challenges, we are uniquely positioned to help you navigate the ever-evolving
              construction landscape.
            </p>
          </div>
          <img src={teamImage} alt="Our Team" />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
