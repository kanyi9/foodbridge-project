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
    <div className="flex min-h-screen bg-gray-50 p-8">
      <div className="flex-1">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Manage Campaigns</h1>
        <button 
          className="mb-6 bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          onClick={handleAddCampaign}
        >
          Add Campaign
        </button>
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg p-6">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="py-4 px-6 border-b-2 text-left font-semibold text-gray-700">Photo</th>
                <th className="py-4 px-6 border-b-2 text-left font-semibold text-gray-700">Name</th>
                <th className="py-4 px-6 border-b-2 text-left font-semibold text-gray-700">Date</th>
                <th className="py-4 px-6 border-b-2 text-left font-semibold text-gray-700">Location</th>
                <th className="py-4 px-6 border-b-2 text-left font-semibold text-gray-700">Description</th>
                <th className="py-4 px-6 border-b-2 text-left font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-100 transition duration-300">
                  <td className="py-4 px-6 border-b">
                    <img 
                      src={campaign.photoUrl || '/default-campaign.jpg'} 
                      alt={campaign.name} 
                      className="w-20 h-20 object-cover rounded-lg shadow-md"
                    />
                  </td>
                  <td className="py-4 px-6 border-b text-gray-700">{campaign.name}</td>
                  <td className="py-4 px-6 border-b text-gray-700">{campaign.date}</td>
                  <td className="py-4 px-6 border-b text-gray-700">{campaign.location}</td>
                  <td className="py-4 px-6 border-b text-gray-700">{campaign.description}</td>
                  <td className="py-4 px-6 border-b flex">
                    <button 
                      className="bg-yellow-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-yellow-600 transition duration-300 mr-2"
                      onClick={() => handleUpdate(campaign.id)}
                    >
                      Update
                    </button>
                    <button 
                      className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
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
    </div>
  );
};

export default AdminCampaigns;
