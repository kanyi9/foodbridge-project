import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaigns = async () => {
      const token = localStorage.getItem('adminToken');
      try {
        const response = await fetch('https://foodbridge-backend-bd8l.onrender.com/api/admin/campaigns', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setCampaigns(data);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };

    fetchCampaigns();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('adminToken');
    try {
      await fetch(`https://foodbridge-backend-bd8l.onrender.com/api/admin/campaigns/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setCampaigns(campaigns.filter(campaign => campaign.id !== id));
    } catch (error) {
      console.error('Error deleting campaign:', error);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/admin/campaigns/update/${id}`);
  };

  const handleAddCampaign = () => {
    navigate('/admin/campaigns/add');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">Manage Campaigns</h1>
      <button 
        className="mb-4 bg-green-500 text-white py-2 px-4 rounded"
        onClick={handleAddCampaign}
      >
        Add Campaign
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Location</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => (
              <tr key={campaign.id}>
                <td className="py-2 px-4 border-b">{campaign.id}</td>
                <td className="py-2 px-4 border-b">{campaign.name}</td>
                <td className="py-2 px-4 border-b">{campaign.date}</td>
                <td className="py-2 px-4 border-b">{campaign.location}</td>
                <td className="py-2 px-4 border-b">{campaign.description}</td>
                <td className="py-2 px-4 border-b">
                  <button 
                    className="bg-blue-500 text-white py-1 px-2 rounded mr-2"
                    onClick={() => handleUpdate(campaign.id)}
                  >
                    Update
                  </button>
                  <button 
                    className="bg-red-500 text-white py-1 px-2 rounded"
                    onClick={() => handleDelete(campaign.id)}
                  >
                    Delete
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

export default AdminCampaigns;
