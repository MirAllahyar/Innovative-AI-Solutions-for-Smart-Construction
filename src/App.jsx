import React from 'react';


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import ContractorLogin from './pages/ContractorLogin/ContractorLogin';
import ContractorSignup from './pages/ContractorSignup/ContractorSignup';

import BlogPage from './pages/BlogPage/BlogPage'; // Import the BlogPage
import UserDashboard from './pages/UserDashboard/UserDashboard';
import NewsPage from './pages/NewsPage/NewsPage';
import AITransformingConstruction from './pages/NewsArticles/AITransformingConstruction';
import LatestTrends from './pages/NewsArticles/LatestTrends';
import FutureConstructionTech from './pages/NewsArticles/FutureConstructionTech';
import ContactUs from './pages/ContactUs/ContactUs';
import AboutUs from './pages/AboutUs/AboutUs';
import Policy from './pages/Policy/Policy';
import HelpSupport from './pages/HelpSupport/HelpSupport';
import BookConsultation from './components/BookConsultation/BookConsultation';
import Contact from './components/Contact/Contact';

import '@fortawesome/fontawesome-free/css/all.min.css';






function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/contractor-login" element={<ContractorLogin />} />
        <Route path="/contractor-signup" element={<ContractorSignup />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
        
        {/* Add the Blogs route */}
        <Route path="/news" element={<NewsPage />} /> {/* Route for NewsPage */}
        <Route path="/news/ai-transforming-construction" element={<AITransformingConstruction />} />
        <Route path="/news/latest-trends" element={<LatestTrends />} />
        <Route path="/news/future-construction-tech" element={<FutureConstructionTech />} />
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/help-support" element={<HelpSupport />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/" element={<BookConsultation />} />
        
      

      </Routes>
    </Router>
  );
}

export default App;
