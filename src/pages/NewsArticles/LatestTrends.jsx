import React from 'react';
import './NewsArticle.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import trendsImage1 from '../../assets/images/trend1.jpg';
import trendsImage2 from '../../assets/images/trend2.jpg';
import trendsImage3 from '../../assets/images/trend3.jpg';

const LatestTrends = () => {
  return (
    <>
      <Header />
      <div className="article-page">
        {/* Hero Section */}
        <div className="article-hero">
          <h1>Latest Trends in Real Estate</h1>
          <p>
            Discover cutting-edge solutions and sustainable designs reshaping modern real estate, making homes smarter, greener, and more efficient.
          </p>
        </div>

        {/* Section 1 */}
        <div className="article-section">
          <img src={trendsImage1} alt="Smart Home Technologies" />
          <div className="section-content">
            <h2>Smart Home Technologies</h2>
            <p>
              The advent of smart home technologies is reshaping the way we interact with our living spaces. Devices such as automated lighting systems adjust illumination based on occupancy or time of day, creating energy savings while enhancing ambiance.</p>

            <p> Smart thermostats intelligently regulate home temperatures, optimizing energy use and providing remote control via mobile apps. Additionally, AI-powered home security systems offer advanced features like facial recognition, motion detection, and instant alerts, improving safety for homeowners.
            </p>
          </div>
        </div>

        {/* Section 2 */}
        <div className="article-section reverse">
          <div className="section-content">
            <h2>Sustainable Construction Practices</h2>
            <p>
              The construction industry is witnessing a paradigm shift towards sustainable practices. Builders and developers are prioritizing eco-friendly materials like bamboo, recycled steel, and low-carbon concrete to reduce environmental impact. These materials are not only sustainable but also durable and cost-effective. Energy-efficient designs, such as high-performance insulation, solar panels, and green roofs, are becoming standard in modern construction projects.</p>
            <p>
              Renewable energy sources, such as wind and solar, are being integrated into residential and commercial properties to provide long-term energy solutions. Construction companies are also embracing modular building techniques, which minimize waste and optimize resource utilization.
            </p>
          </div>
          <img src={trendsImage2} alt="Sustainable Design" />
        </div>

        {/* Section 3 */}
        <div className="article-section">
          <img src={trendsImage3} alt="AI in Real Estate" />
          <div className="section-content">
            <h2>AI and Automation in Real Estate</h2>
            <p>
              The integration of AI and automation in construction is driving efficiency, precision, and innovation. Robotic systems handle repetitive tasks such as bricklaying, excavation, and material transportation, reducing labor costs and improving safety on-site. Drones equipped with AI are used for site inspections, providing high-resolution imagery and real-time data to monitor progress and identify risks.
            </p>
            <p>
              Artificial intelligence is driving smarter decision-making in real estate, from property valuation to personalized design suggestions.
              AI-driven construction solutions are streamlining project management, reducing costs, and improving precision.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LatestTrends;
