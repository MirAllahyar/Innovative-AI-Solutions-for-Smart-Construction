import React from 'react';
import './NewsArticle.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const LatestTrends = () => {
  return (
    <>
      <Header />
      <div className="article-page">
        <h1>Latest Trends in Real Estate</h1>
        <p>Explore the smart solutions and sustainable designs that are driving innovation in modern real estate, making homes smarter and greener.</p>
        {/* Add more detailed content here */}
      </div>
      <Footer />
    </>
  );
};

export default LatestTrends;
