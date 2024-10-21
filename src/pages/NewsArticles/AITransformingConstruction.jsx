import React from 'react';
import './NewsArticle.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const AITransformingConstruction = () => {
  return (
    <>
      <Header />
      <div className="article-page">
        <h1>AI Transforming Construction</h1>
        <p>Artificial Intelligence is set to revolutionize the construction industry by making project management more efficient, reducing costs, and enhancing safety.</p>
        {/* Add more detailed content here */}
      </div>
      <Footer />
    </>
  );
};

export default AITransformingConstruction;
