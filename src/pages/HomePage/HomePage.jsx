import React from 'react';
import Header from '../../components/Header/Header';
import HeroSection from '../../components/HeroSection/HeroSection';
import ExploreSection from '../../components/Explore/ExploreSection';
import TrendingDesigns from '../../components/TrendingDesigns/TrendingDesigns';
import BookConsultation from '../../components/BookConsultation/BookConsultation';
import SatisfiedUser from '../../components/SatisfiedUser/SatisfiedUser';
import MeetOurTeam from '../../components/MeetOurTeam/MeetOurTeam';  // Import the MeetOurTeam component
import Footer from '../../components/Footer/Footer';
import './HomePage.css';

const HomePage = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <ExploreSection />
      <TrendingDesigns />
      <BookConsultation />
      <SatisfiedUser />
      <MeetOurTeam /> {/* Add the MeetOurTeam section here */}
      <Footer />
    </>
  );
};

export default HomePage;
