import React from 'react';
import DonationMonitoring from './DonationMonitoring';
import UserManagement from './UserManagement';
import CampaignManagement from './CampaignManagement';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <DonationMonitoring />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <UserManagement />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <CampaignManagement />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
