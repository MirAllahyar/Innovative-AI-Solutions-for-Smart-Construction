import React from 'react';
import './ContractorDetail.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const ContractorDetail = () => {
  return (
    <>
      <Header />
      <div className="contractor-detail-page">
        <div className="contractor-header">
          <img src="/path/to/profile-image.jpg" alt="Contractor" />
          <div>
            <h1>Contractor 1</h1>
            <p><strong>Company:</strong> ABC</p>
            <p><strong>Location:</strong> XYZ</p>
            <p><strong>Description:</strong> Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
        <div className="contractor-info">
          <h2>About</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec.
          </p>
          <h3>Specializations</h3>
          <ul>
            <li>Residential Projects</li>
            <li>Commercial Projects</li>
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContractorDetail;
