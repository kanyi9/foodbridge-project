import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar'; 

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, donations: 0, campaigns: 0, members: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('adminToken');
      try {
        const response = await fetch('https://foodbridge-backend-bd8l.onrender.com/api/admin/stats', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setStats(data.stats);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex">
      <AdminNavbar />
      <main className="flex-1 p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-semibold text-gray-900 mb-6">Dashboard</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-8 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
            <h2 className="text-lg font-semibold text-center">Total Users</h2>
            <p className="text-5xl font-extrabold mt-4 text-center">{stats.users}</p>
          </div>
          <div className="p-8 bg-gradient-to-r from-green-400 to-teal-500 text-white rounded-xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
            <h2 className="text-lg font-semibold text-center">Total Donations</h2>
            <p className="text-5xl font-extrabold mt-4 text-center">${stats.donations}</p>
          </div>
          <div className="p-8 bg-gradient-to-r from-blue-400 to-indigo-500 text-white rounded-xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
            <h2 className="text-lg font-semibold text-center">Active Campaigns</h2>
            <p className="text-5xl font-extrabold mt-4 text-center">{stats.campaigns}</p>
          </div>
          <div className="p-8 bg-gradient-to-r from-purple-400 to-pink-500 text-white rounded-xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
            <h2 className="text-lg font-semibold text-center">Total Members</h2>
            <p className="text-5xl font-extrabold mt-4 text-center">{stats.members}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
