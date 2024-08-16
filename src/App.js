import React from 'react';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {Route, Routes } from 'react-router-dom';

import Home from './components/Home';
import LandingPage from './components/LandingPage';

import LoginPage from './components/Login';
import SignupPage from './components/SignUp';
import DonationPage from './components/DonationPage'
import ContactUs from './components/ContactUs';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import AdminUsers from './components/AdminUsers';
import AdminCampaigns from './components/AdminCampaigns';
import UpdateCampaign from './components/UpdateCampaign';
import DiscoverPage from './components/DiscoverPage';
import FeedbackPage from './components/FeedbackPage';
function App() {
  return (
    <div>
    
      <Routes>
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/" element={<LandingPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/donation" element={<DonationPage/>} />
        <Route path='feedback' element={<FeedbackPage/>} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path='/admin' element={<AdminDashboard />} />
        <Route path='/admin/users' element={<AdminUsers />} />
        <Route path='/admin/campaigns' element={<AdminCampaigns />} />
        <Route path='admin/campaigns/update/:id' element={<UpdateCampaign/>} />
        <Route path='/discover' element={<DiscoverPage />} />

      </Routes>
 </div>
  );
}

export default App;