import React, { useState, useEffect } from 'react';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users data from the backend
    fetch('/api/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-700">User Management</h2>
      <p>Total Users: {users.length}</p>
      <button className="mt-4 bg-orange-400 text-white py-2 px-4 rounded-md">
        View Users
      </button>
    </div>
  );
};

export default UserManagement;
