import React, { useState, useEffect } from 'react';

const DonationMonitoring = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    // Fetch donations data from the backend
    fetch('/api/donations')
      .then(response => response.json())
      .then(data => setDonations(data))
      .catch(error => console.error('Error fetching donations:', error));
  }, []);

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-700">Monitor Donations</h2>
      <p>Total Donations: ${donations.reduce((total, donation) => total + donation.amount, 0)}</p>
      <button className="mt-4 bg-orange-400 text-white py-2 px-4 rounded-md">
        View Details
      </button>
    </div>
  );
};

export default DonationMonitoring;
