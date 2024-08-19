import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CampaignImage from '../images/hero-background.jpg'; 

const AddCampaign = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [pictureUrl, setPictureUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
  
    try {
      const response = await fetch('http://127.0.0.1:5000/api/admin/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name, date, location, description, pictureUrl }),
      });
  
      if (response.ok) {
        navigate('/admin/campaigns');
      } else {
        const errorData = await response.json();
        console.error('Error adding campaign:', errorData.error);
      }
    } catch (error) {
      console.error('Error adding campaign:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-stretch">
      <div className="w-1/2">
        <img
          src={CampaignImage}
          alt="Campaign"
          className="object-cover h-full w-full"
        />
      </div>

      <div className="w-1/2 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Add New Campaign</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter campaign name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter campaign location"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter campaign description"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Picture URL</label>
              <input
                type="url"
                value={pictureUrl}
                onChange={(e) => setPictureUrl(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter picture URL"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-orange-700 text-white font-semibold rounded-lg hover:bg-orange-800 transition duration-300"
            >
              Add Campaign
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCampaign;
