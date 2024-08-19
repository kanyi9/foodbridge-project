import React, { useEffect, useState } from 'react';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('adminToken');
      try {
        const response = await fetch('https://foodbridge-backend-bd8l.onrender.com/api/admin/users', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleToggleStatus = async (userId, isActive) => {
    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch(`https://foodbridge-backend-bd8l.onrender.com/api/admin/users/${userId}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: !isActive }),
      });

      if (response.ok) {
        setUsers(users.map(user => 
          user.id === userId ? { ...user, isActive: !isActive } : user
        ));
      } else {
        console.error('Error updating user status:', await response.json());
      }
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-semibold text-gray-900 mb-8">Manage Users</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
              <th className="py-3 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Username</th>
              <th className="py-3 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
              <th className="py-3 px-6 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-100 transition duration-150 ease-in-out">
                <td className="py-4 px-6 border-b border-gray-200">{user.id}</td>
                <td className="py-4 px-6 border-b border-gray-200">{user.username}</td>
                <td className="py-4 px-6 border-b border-gray-200">{user.email}</td>
                <td className="py-4 px-6 border-b border-gray-200 text-center">
                  <button 
                    onClick={() => handleToggleStatus(user.id, user.isActive)}
                    className={`py-2 px-4 rounded-full text-white font-semibold transition duration-300 ${
                      user.isActive 
                      ? 'bg-red-500 hover:bg-red-700' 
                      : 'bg-green-500 hover:bg-green-700'
                    }`}
                  >
                    {user.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
