import React, { useState, useEffect } from 'react';

const ManageMembers = () => {
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState({ name: '', position: '', image_url: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMembers = async () => {
      const token = localStorage.getItem('adminToken');
      try {
        const response = await fetch('http://127.0.0.1:5000/api/members', {  // Updated URL
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        // Check if the response is OK and JSON
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setMembers(data);  // Updated to match the shape of the response
      } catch (error) {
        console.error('Error fetching members:', error);
        setError('An error occurred while fetching members.');
      }
    };

    fetchMembers();
  }, []);

  const handleAddMember = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
  
    const memberData = {
      name: newMember.name,
      position: newMember.position,
      image_url: newMember.image_url  // Ensure this matches what the backend expects
    };
  
    console.log('Sending member data:', memberData);  // Debugging line
    
    try {
      const response = await fetch('http://127.0.0.1:5000/api/admin/members', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(memberData)
      });
  
      if (response.ok) {
        const data = await response.json();
        setNewMember({ name: '', position: '', image_url: '' });
        setError('');
        setMembers([...members, data.member]);
      } else {
        const errorData = await response.json();
        setError(`Failed to add member: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error adding member:', error);
      setError('An error occurred.');
    }
  };
  
  const handleDeleteMember = async (id) => {
    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/admin/members/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        setMembers(members.filter(member => member.id !== id));
      } else {
        setError('Failed to delete member.');
      }
    } catch (error) {
      console.error('Error deleting member:', error);
      setError('An error occurred.');
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-center">Manage Members</h1>

      <form onSubmit={handleAddMember} className="bg-white p-8 rounded-lg shadow-xl max-w-lg mx-auto mb-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Add New Member</h2>
        <div className="space-y-6">
          <input
            type="text"
            value={newMember.name}
            onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
            placeholder="Member Name"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300"
            required
          />
          <input
            type="text"
            value={newMember.position}
            onChange={(e) => setNewMember({ ...newMember, position: e.target.value })}
            placeholder="Position"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300"
            required
          />
          <input
            type="url"
            value={newMember.image_url}
            onChange={(e) => setNewMember({ ...newMember, image_url: e.target.value })}
            placeholder="Image URL"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300"
            required
          />
          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-3 px-6 rounded-lg hover:bg-orange-700 transition duration-300"
          >
            Add Member
          </button>
        </div>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </form>

      <div>
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Members List</h2>
        <div className="overflow-x-auto">
          <div className="flex space-x-8 py-4">
            {members.map(member => (
              <div key={member.id} className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center min-w-[200px]">
                 <img src={member.image_url} alt={member.name} className="w-24 h-24 rounded-full object-cover mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{member.name}</h3>
                <p className="text-gray-600 mb-4">{member.position}</p>
                <button
                  onClick={() => handleDeleteMember(member.id)}
                  className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageMembers;

