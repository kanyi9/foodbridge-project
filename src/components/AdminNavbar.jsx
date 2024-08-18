import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  return (
    <aside className="w-64 bg-orange-700 text-white flex flex-col h-screen fixed left-0 top-0">
      <div className="p-4 text-xl font-bold text-center border-b border-orange-500">
        Admin Panel
      </div>
      <nav className="flex-grow px-2 pt-4"> 
        <ul>
          <li className="mb-2">
            <Link
              to="/admin"
              className="block py-3 px-4 rounded-lg hover:bg-orange-600 transition duration-300"
            >
              Dashboard
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/admin/users"
              className="block py-3 px-4 rounded-lg hover:bg-orange-600 transition duration-300"
            >
              Manage Users
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/admin/campaigns"
              className="block py-3 px-4 rounded-lg hover:bg-orange-600 transition duration-300"
            >
              Campaigns
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/admin/feedback"
              className="block py-3 px-4 rounded-lg hover:bg-orange-600 transition duration-300"
            >
              View Feedback
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/admin/members"
              className="block py-3 px-4 rounded-lg hover:bg-orange-600 transition duration-300"
            >
              Manage Members
            </Link>
          </li>
        </ul>
      </nav>
      <div className="p-4 border-t border-orange-500 flex flex-col items-center">
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300 text-sm"
        >
          Logout
        </button>
        <p className="text-center text-xs mt-2">© 2024 Footbridge</p>
      </div>
    </aside>
  );
};

export default AdminNavbar;
