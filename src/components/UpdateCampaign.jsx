import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateCampaign = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState({
    name: '',
    date: '',
    location: '',
    description: '',
  });

  useEffect(() => {
    const fetchCampaign = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        console.error('No admin token found');
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/admin/campaigns/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        
        if (response.status === 401) {
          console.error('Unauthorized access - invalid or expired token');
          navigate('/admin/login'); // Redirect to login page if unauthorized
          return;
        }

        const data = await response.json();
        if (response.ok) {
          setCampaign({
            name: data.name || '',
            date: data.date ? new Date(data.date).toISOString().slice(0, 16) : '', // Format date for input[type="datetime-local"]
            location: data.location || '',
            description: data.description || '',
          });
        } else {
          console.error('Failed to fetch campaign data');
        }
      } catch (error) {
        console.error('Error fetching campaign:', error);
      }
    };

    fetchCampaign();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCampaign((prevCampaign) => ({
      ...prevCampaign,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    if (!token) {
      console.error('No admin token found');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/admin/campaigns/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(campaign),
      });

      if (response.ok) {
        navigate('/admin/campaigns');
      } else {
        console.error('Failed to update campaign');
      }
    } catch (error) {
      console.error('Error updating campaign:', error);
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      console.error('No admin token found');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/admin/campaigns/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        navigate('/admin/campaigns');
      } else {
        console.error('Failed to delete campaign');
      }
    } catch (error) {
      console.error('Error deleting campaign:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">Update Campaign</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={campaign.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Date</label>
          <input
            type="datetime-local"
            name="date"
            value={campaign.date}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={campaign.location}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <textarea
            name="description"
            value={campaign.description}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Update Campaign</button>
        <button type="button" onClick={handleDelete} className="bg-red-500 text-white py-2 px-4 rounded ml-4">Delete Campaign</button>
      </form>
    </div>
  );
};

export default UpdateCampaign;
