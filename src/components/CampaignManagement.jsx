import React, { useState, useEffect } from 'react';

const CampaignManagement = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    // Fetch campaigns data from the backend
    fetch('/api/campaigns')
      .then(response => response.json())
      .then(data => setCampaigns(data))
      .catch(error => console.error('Error fetching campaigns:', error));
  }, []);

  const handleDelete = (id) => {
    // Delete campaign logic
    fetch(`/api/campaigns/${id}`, { method: 'DELETE' })
      .then(() => setCampaigns(campaigns.filter(campaign => campaign.id !== id)))
      .catch(error => console.error('Error deleting campaign:', error));
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-700">Campaign Management</h2>
      <button className="mt-4 bg-orange-400 text-white py-2 px-4 rounded-md">
        Create New Campaign
      </button>
      <ul className="mt-4">
        {campaigns.map(campaign => (
          <li key={campaign.id} className="mt-2">
            {campaign.title}
            <button onClick={() => handleDelete(campaign.id)} className="text-red-600 ml-4">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CampaignManagement;
