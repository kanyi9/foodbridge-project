import React from 'react';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';
import LoginPage from './components/Login';
import SignupPage from './components/SignUp';
import DonationPage from './components/DonationPage'
import ContactUs from './components/ContactUs';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import AdminUsers from './components/AdminUsers';
import AdminCampaigns from './components/AdminCampaigns';
import UpdateCampaign from './components/UpdateCampaign';
function App() {
  return (
    <div>
      <Header />
    
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/donation" element={<DonationPage/>} />
        <Route path="/contact-us" element={<ContactUs/>} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path='/admin' element={<AdminDashboard />} />
        <Route path='/admin/users' element={<AdminUsers />} />
        <Route path='/admin/campaigns' element={<AdminCampaigns />} />
        <Route path='admin/campaigns/update/:id' element={<UpdateCampaign/>} />

      </Routes>
      <Footer />
 </div>
  );
}

export default App;