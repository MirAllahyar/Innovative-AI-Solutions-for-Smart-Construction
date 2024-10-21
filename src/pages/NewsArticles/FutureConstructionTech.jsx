import React from 'react';
import './NewsArticle.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const FutureConstructionTech = () => {
  return (
    <>
      <Header />
      <div className="article-page">
        <h1>Future of Construction Technology</h1>
        <p>The future of construction is being shaped by new technologies, from drones to 3D printing, which are making the building process faster and more accurate.</p>
        {/* Add more detailed content here */}
      </div>
      <Footer />
    </>
  );
};

export default FutureConstructionTech;
