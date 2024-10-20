import React, { useEffect } from 'react';
import Header from '../../components/Header/Header';
import HeroSection from '../../components/HeroSection/HeroSection';
import ExploreSection from '../../components/Explore/ExploreSection';
import TrendingDesigns from '../../components/TrendingDesigns/TrendingDesigns';
import BookConsultation from '../../components/BookConsultation/BookConsultation';
import SatisfiedUser from '../../components/SatisfiedUser/SatisfiedUser';
import MeetOurTeam from '../../components/MeetOurTeam/MeetOurTeam';
import Footer from '../../components/Footer/Footer';
import './HomePage.css';

const HomePage = () => {

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Unobserve after animating to avoid delays
          }
        });
      },
      {
        threshold: 0.05, // Adjust the threshold to trigger animations earlier
      }
    );

    const sections = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    sections.forEach(section => observer.observe(section));

    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  return (
    <>
      <Header />

      <section className="fade-in">
        <HeroSection />
      </section>

      <section className="slide-in-left">
        <ExploreSection />
      </section>

      <section className="slide-in-right">
        <TrendingDesigns />
      </section>

      <section className="fade-in">
        <BookConsultation />
      </section>

      <section className="slide-in-left">
        <SatisfiedUser />
      </section>

      <section className="slide-in-right">
        <MeetOurTeam />
      </section>

      <Footer />
    </>
  );
};

export default HomePage;
