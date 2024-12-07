import React from 'react';
import './NewsArticle.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import aiImage from '../../assets/images/ai.jpg'; 
import safetyImage from '../../assets/images/saftey.jpg'; 
import emergingImage from '../../assets/images/bim.jpg'; 



const AITransformingConstruction = () => {
  return (
    <>
      <Header />
      <div className="article-page">
        {/* Hero Section */}
        <div className="article-hero">
          <h1>The Role of AI in Revolutionizing Construction</h1>
          <p>
            Discover how artificial intelligence is transforming the construction industry, driving innovation, improving safety, and streamlining project workflows.
          </p>
        </div>

        {/* Introduction Section */}
        <div className="article-section">
          <div className="section-content">
            <h2>Introduction</h2>
            <p>
              The construction industry, historically reliant on manual labor and traditional processes, is undergoing a technological revolution. 
              Artificial Intelligence (AI) is now at the forefront, reshaping every aspect of construction—from planning and design to execution and maintenance. 
              By automating mundane tasks, enhancing safety measures, and providing predictive analytics, AI is setting new benchmarks in efficiency and innovation.
            </p>
          </div>
          <img src={aiImage} alt="AI in Construction" />
        </div>

       
        {/* Section 2: Safety and Risk Management */}
        <div className="article-section">
          <div className="section-content">
            <h2>Revolutionizing Safety Standards</h2>
            <p>
              AI is playing a crucial role in enhancing on-site safety by monitoring conditions in real-time and identifying potential risks. 
              These advancements lead to fewer accidents and a more secure environment for workers.
            </p>
            <ul>
              <li>Real-time monitoring of safety compliance with AI-driven cameras.</li>
              <li>Proactive maintenance alerts based on equipment data analysis.</li>
              <li>AI-powered training simulations for workers to reduce accidents.</li>
            </ul>
          </div>
          <img src={safetyImage} alt="Safety in Construction" />
        </div>

        {/* Section 3: AI-Driven Innovations */}
        <div className="article-section reverse">
          <img src={emergingImage} alt="AI Innovations in Construction" />
          <div className="section-content">
            <h2>Emerging AI Innovations</h2>
            <p>
              From drones mapping construction sites to AI assistants managing workflows, the technology is continuously evolving. 
              Innovations include:
            </p>
            <ul>
              <li>AI-powered drones for real-time site monitoring.</li>
              <li>Predictive models to foresee delays and risks.</li>
              <li>Custom AI algorithms tailored to unique project requirements.</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AITransformingConstruction;
