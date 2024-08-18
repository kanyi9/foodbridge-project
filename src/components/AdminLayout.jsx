import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from './AdminNavbar'; 

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminNavbar />
      <div className="flex-1 ml-64 p-8"> 
        <Outlet /> 
      </div>
    </div>
  );
};

export default AdminLayout;
