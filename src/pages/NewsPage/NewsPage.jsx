import React from 'react';
import './NewsPage.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

// Import the updated images
import heroImage from '../../assets/images/hero-news.png';
import newsImage1 from '../../assets/images/news1.jpg';
import newsImage2 from '../../assets/images/news2.jpeg';
import newsImage3 from '../../assets/images/news3.jpg';

const NewsPage = () => {
  return (
    <>
      <Header />
      <div className="news-page">
        <div className="news-hero-section" style={{ backgroundImage: `url(${heroImage})` }}>
          <h1 className="news-title">Stay Updated with the Latest Construction News</h1>
        </div>

        <div className="news-content">
          <div className="news-item">
            <img src={newsImage1} alt="AI Transforming Construction" />
            <div className="news-details">
              <h2>AI Transforming Construction</h2>
              <p>Discover how AI is reshaping the construction industry with advanced solutions for safety, cost reduction, and project management efficiency.</p>
              <a href="/news/ai-transforming-construction" className="read-more-btn">Read More</a>
            </div>
          </div>

          <div className="news-item">
            <img src={newsImage2} alt="Latest Trends in Real Estate" />
            <div className="news-details">
              <h2>Latest Trends in Real Estate</h2>
              <p>Explore the smart solutions and sustainable designs that are driving innovation in modern real estate, making homes smarter and greener.</p>
              <a href="/news/latest-trends" className="read-more-btn">Read More</a>
            </div>
          </div>

          <div className="news-item">
            <img src={newsImage3} alt="Future of Construction Technology" />
            <div className="news-details">
              <h2>Future of Construction Technology</h2>
              <p>Learn how new technologies such as drones and 3D printing are paving the way for a faster, more efficient future in construction.</p>
              <a href="/news/future-construction-tech" className="read-more-btn">Read More</a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NewsPage;
