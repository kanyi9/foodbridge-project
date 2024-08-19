import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar'; 

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, donations: 0, campaigns: 0, members: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('adminToken');
      try {
        const response = await fetch('http://127.0.0.1:5000/api/admin/stats', {
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
          {/* Card 1: Total Users */}
          <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
            <h2 className="text-lg font-semibold text-center mb-2">Total Users</h2>
            <p className="text-5xl font-extrabold">{stats.users}</p>
          </div>

          {/* Card 2: Total Donations */}
          <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-r from-green-400 to-teal-500 text-white rounded-xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
            <h2 className="text-lg font-semibold text-center mb-2">Total Donations</h2>
            <p className="text-5xl font-extrabold">${stats.donations}</p>
          </div>

          {/* Card 3: Active Campaigns */}
          <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-r from-blue-400 to-indigo-500 text-white rounded-xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
            <h2 className="text-lg font-semibold text-center mb-2">Active Campaigns</h2>
            <p className="text-5xl font-extrabold">{stats.campaigns}</p>
          </div>

          {/* Card 4: Total Members */}
          <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-r from-purple-400 to-pink-500 text-white rounded-xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
            <h2 className="text-lg font-semibold text-center mb-2">Total Members</h2>
            <p className="text-5xl font-extrabold">{stats.members}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
