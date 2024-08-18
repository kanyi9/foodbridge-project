import React from 'react';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Route, Routes, Outlet } from 'react-router-dom';

import Home from './components/Home';
import LandingPage from './components/LandingPage';
import LoginPage from './components/Login';
import SignupPage from './components/SignUp';
import DonationPage from './components/DonationPage';
import ContactUs from './components/ContactUs';
import DiscoverPage from './components/DiscoverPage';
import AdminDashboard from './components/AdminDashboard';
import AdminUsers from './components/AdminUsers';
import AdminCampaigns from './components/AdminCampaigns';
import UpdateCampaign from './components/UpdateCampaign';
import AddCampaign from './components/AddCampaigns';
import AdminFeedback from './components/AdminFeedback';
import ManageMembers from './components/ManageMembers';
import AdminLayout from './components/AdminLayout';

const AdminRoutes = () => (
  <AdminLayout>
    <Outlet />
  </AdminLayout>
);

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/donation" element={<DonationPage />} />
        <Route path="/feedback" element={<ContactUs />} />
        <Route path="/discover" element={<DiscoverPage />} />
        <Route path="/admin" element={<AdminRoutes />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="campaigns" element={<AdminCampaigns />} />
          <Route path="campaigns/update/:id" element={<UpdateCampaign />} />
          <Route path="campaigns/add" element={<AddCampaign />} />
          <Route path="feedback" element={<AdminFeedback />} />
          <Route path="members" element={<ManageMembers />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
