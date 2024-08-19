import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const campaignsRef = useRef(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get('https://foodbridge-backend-bd8l.onrender.com/api/events/incomplete');
        console.log(response.data); 
        setCampaigns(response.data);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };
    
    fetchCampaigns();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, campaigns.length - 3));
  };

  return (
    <div id="campaigns" className="min-h-screen bg-gray-100 flex flex-col justify-center px-4 md:px-10">
      <h1 className="text-orange-700 text-4xl font-extrabold mb-2 mt-8 text-center uppercase tracking-wide">
        Our Campaigns
      </h1>
      <div className="relative overflow-hidden flex flex-col items-center">
        <div
          className="flex transition-transform duration-300 justify-start items-center w-full"
          style={{ transform: `translateX(-${currentIndex * 100 / 3}%)` }}
          ref={campaignsRef}
        >
          {campaigns.map((campaign, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 w-full md:w-1/3 p-4 md:p-6 transition-transform transform hover:scale-105"
            >
              <div className="bg-white shadow-lg rounded-md overflow-hidden text-center">
                <img
                  src={campaign.picture_url || 'https://via.placeholder.com/300'}
                  alt={campaign.name} // Update the alt text to use the correct name field
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-gray-700 font-semibold text-lg mb-2">
                    Name: {campaign.name}  {/* Use the name field */}
                  </h3>
                  <p className="text-gray-600 mb-1">Date: {new Date(campaign.date).toDateString()}</p>
                  <p className="text-gray-500 mb-4">Description: {campaign.description}</p>
                  <div className="flex justify-between">
                    <Link 
                      to="/donation" 
                      className="bg-orange-400 text-white py-2 px-4 rounded-md hover:bg-orange-500"
                    >
                      Donate
                    </Link>
                    <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400">
                      Volunteer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {campaigns.length > 3 && (
          <div className="flex justify-center mt-4">
            <button
              className="p-2 rounded-full border bg-gray-200 mx-2"
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              ‹
            </button>
            <button
              className="p-2 rounded-full border bg-gray-200 mx-2"
              onClick={handleNext}
              disabled={currentIndex >= campaigns.length - 3}
            >
              ›
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Campaigns;

