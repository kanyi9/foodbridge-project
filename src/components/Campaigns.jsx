import React from 'react';
import campaignImage1 from '../images/campaign1.jpg';
import campaignImage2 from '../images/campaign2.webp';
import campaignImage3 from '../images/campaign3.jpg';

const Campaigns = () => {
  const campaigns = [
    {
      image: campaignImage1,
      title: 'Meal Donation Campaign',
      description: 'Provide meals to those in need by donating food or funds. Every meal counts in our fight against hunger.',
      raised: '',
      goal: '',
    },
    {
      image: campaignImage2,
      title: 'Volunteer Outreach Program',
      description: 'Join our volunteer team to help with meal prep, distribution, and community support. Your time makes a difference.',
      raised: '',
      goal: '',
    },
    {
      image: campaignImage3,
      title: 'Sustainable Food Initiative',
      description: 'Support sustainable farming and eco-friendly food practices to ensure long-term food security for future generations.',
      raised: '',
      goal: '',
    },
  ];

  return (
    <div id="campaigns" className="min-h-screen bg flex items-center justify-center">
      <div className="max-w-5xl mx-auto p-6 bg-white rounded-md">
        <h1 className="text-orange-600 text-lg font-semibold">Campaigns</h1>
        <h2 className="text-gray-800 text-3xl font-bold">
          You can help lots of people by donating just a little.
        </h2>
        <button className="bg-orange-400 text-white py-2 px-4 rounded-md mt-4">More Causes</button>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {campaigns.map((campaign, index) => (
            <div key={index} className="bg-white shadow-md rounded-md overflow-hidden">
              <img
                src={campaign.image}
                alt={campaign.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-gray-700 font-semibold">
                  {campaign.description}
                </h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-gray-500">Raised - {campaign.raised}</span>
                  <span className="text-orange-600">Goal - {campaign.goal}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <button className="p-2 rounded-full border bg-gray-200 mx-2">‹</button>
          <button className="p-2 rounded-full border bg-gray-200 mx-2">›</button>
        </div>
      </div>
    </div>
  );
};

export default Campaigns;
