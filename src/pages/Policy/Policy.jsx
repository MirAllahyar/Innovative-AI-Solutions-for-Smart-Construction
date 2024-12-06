import React from 'react';
import './Policy.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const Policy = () => {
  return (
    <>
      <Header />
      <div className="policy">
        <h1>Our Policy</h1>
        <p>Read our privacy and terms of service policy here.</p>
        {/* Add the policy content */}
      </div>
      <Footer />
    </>
  );
};

export default Policy;

