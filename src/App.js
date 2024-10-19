import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import ContractorLogin from './pages/ContractorLogin/ContractorLogin';
import ContractorSignup from './pages/ContractorSignup/ContractorSignup';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} /> {/* Updated with correct case */}
        <Route path="/contractor-login" element={<ContractorLogin />} />
        <Route path="/contractor-signup" element={<ContractorSignup />} />
      </Routes>
    </Router>
  );
}

export default App;
