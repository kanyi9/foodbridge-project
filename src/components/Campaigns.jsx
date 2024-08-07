import React from 'react';
import campaignImage1 from '../images/campaign1.jpg';
import campaignImage2 from '../images/campaign2.webp';
import campaignImage3 from '../images/campaign3.jpg';

const Campaigns = () => {
  const campaignImages = [campaignImage1, campaignImage2, campaignImage3];

  return (
    <div className="min-h-screen bg flex items-center justify-center">
      <div className="max-w-5xl mx-auto p-6 bg-white rounded-md">
        <h1 className="text-orange-600 text-lg font-semibold">Campaigns</h1>
        <h2 className="text-gray-800 text-3xl font-bold">
          You can help lots of people by donating just a little.
        </h2>
        <button className="bg-orange-400 text-white py-2 px-4 rounded-md mt-4">More Causes</button>
        <div className="flex mt-8 space-x-4">
          {campaignImages.map((image, index) => (
            <div key={index} className="bg-white shadow-md rounded-md overflow-hidden">
              <img
                src={image}
                alt={`Campaign ${index + 1}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-gray-700 font-semibold">
                  Lorem ipsum dolor sit amet consectetur adipiscing
                </h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-gray-500">Raised - $5M</span>
                  <span className="text-orange-600">Goal - $10M</span>
                </div>
                <button className="bg-orange-400 text-white py-2 px-4 rounded-md mt-4">Donate</button>
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
