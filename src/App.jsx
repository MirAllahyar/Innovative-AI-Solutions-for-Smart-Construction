import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import Pages
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import ContractorLogin from './pages/ContractorLogin/ContractorLogin';
import ContractorSignup from './pages/ContractorSignup/ContractorSignup';
import BlogPage from './pages/BlogPage/BlogPage';
import UserDashboard from './pages/UserDashboard/UserDashboard';
import ContractorDashboard from './pages/ContractorDashboard/ContractorDashboard';
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
import GenerateFrontElevation from './pages/GenerateFrontElevation/GenerateFrontElevation';
import CostCalculator from './pages/CostCalculator/CostCalculator';

// Import FindContractor and ContractorDetail
import FindContractor from './pages/FindContractor/findContractor';
import ContractorDetail from './pages/ContractorDetail/ContractorDetail';

// Import ServiceProvider
import ServiceProvider from './pages/ServiceProvider/ServiceProvider';

// ** Import Bidding System Components **
import JobPostForm from './pages/Bidding/JobPostForm/JobPostForm';
import JobList from './pages/Bidding/JobList/JobList';
import BidList from './pages/Bidding/BidList/BidList';


import SimpleBiddingPage from './pages/SimpleBiddingPage/SimpleBiddingPage';


// ** Import CommunityChat **
import CommunityChat from './pages/CommunityChat/CommunityChat';

import BookConsultation1 from './pages/BookConsultation1/BookConsultation1';


// FontAwesome CSS
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/contractor-login" element={<ContractorLogin />} />
        <Route path="/contractor-signup" element={<ContractorSignup />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/help-support" element={<HelpSupport />} />
        <Route path="/contact" element={<Contact />} />

        {/* Features */}
        <Route path="/generate-front-elevation" element={<GenerateFrontElevation />} />
        <Route path="/cost-calculation" element={<CostCalculator />} />
        <Route path="/book-consultation" element={<BookConsultation />} />

        {/* Contractor Pages */}
        <Route path="/contractors" element={<FindContractor />} />
        <Route path="/contractor/:id" element={<ContractorDetail />} />

        {/* Service Provider Pages */}
        <Route path="/service-providers" element={<ServiceProvider />} />

        {/* Bidding System Routes */}
        <Route path="/bidding/post-job" element={<JobPostForm />} />
        <Route path="/bidding/job-list" element={<JobList />} />
        <Route path="/bidding/bids/:jobId" element={<BidList />} />

        <Route path="/biddings" element={<SimpleBiddingPage />} />

         {/* Community Chat */}
         <Route path="/community-chat" element={<CommunityChat />} />

        {/* Blogs and News */}
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/ai-transforming-construction" element={<AITransformingConstruction />} />
        <Route path="/news/latest-trends" element={<LatestTrends />} />
        <Route path="/news/future-construction-tech" element={<FutureConstructionTech />} />

        {/* Dashboards */}
        <Route path="/userdashboard" element={<UserDashboard />} />
        <Route path="/contractordashboard" element={<ContractorDashboard />} />

        <Route path="/book-consultation1" element={<BookConsultation1 />} />

      </Routes>
    </Router>
  );
}

export default App;
