// AdminDashboard.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, donations: 0, campaigns: 0 });
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('adminToken');
      try {
        const response = await fetch('http://localhost:5000/api/admin/stats', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setStats(data.stats);
        setFeedback(data.feedback);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white">
        <div className="p-4 text-2xl font-bold">Admin Panel</div>
        <nav className="mt-4">
          <ul>
            <li>
              <Link to="/admin/users" className="block py-2.5 px-4 hover:bg-gray-700">Manage Users</Link>
            </li>
            <li>
              <Link to="/admin/donations" className="block py-2.5 px-4 hover:bg-gray-700">Manage Donations</Link>
            </li>
            <li>
              <Link to="/admin/campaigns" className="block py-2.5 px-4 hover:bg-gray-700">Campaigns</Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-semibold text-gray-900">Dashboard</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-700">Total Users</h2>
            <p className="text-2xl font-bold text-gray-900">{stats.users}</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-700">Total Donations</h2>
            <p className="text-2xl font-bold text-gray-900">${stats.donations}</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-700">Active Campaigns</h2>
            <p className="text-2xl font-bold text-gray-900">{stats.campaigns}</p>
          </div>
        </div>

        {/* Recent Feedback */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-900">Recent Feedback</h2>
          <div className="mt-4 p-4 bg-white rounded-lg shadow">
            {/* Feedback List */}
            <ul>
              {feedback.map((item, index) => (
                <li key={index} className="py-2 border-b border-gray-200">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
