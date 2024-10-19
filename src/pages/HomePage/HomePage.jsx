import React from 'react';
import Header from '../../components/Header/Header';
import HeroSection from '../../components/HeroSection/HeroSection';

import ExploreSection from '../../components/Explore/ExploreSection';

import TrendingDesigns from '../../components/TrendingDesigns/TrendingDesigns';
import Footer from '../../components/Footer/Footer';
import './HomePage.css';



const HomePage = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <ExploreSection />
      <TrendingDesigns />
      <Footer />
    </>
  );
};

export default HomePage;
