import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';

const TeamSection = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get('https://foodbridge-backend-bd8l.onrender.com/api/members'); // Correct URL

        // Check if response.data is an array
        if (Array.isArray(response.data)) {
          setMembers(response.data);
        } else {
          setError('Unexpected response format.');
        }
      } catch (err) {
        setError('Failed to fetch team members.');
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  if (loading) {
    return <div className="text-center py-12 text-gray-700">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold text-orange-600">Our Team</h2>
        <h1 className="text-4xl font-extrabold text-gray-800 mt-2">Meet Our Amazing Volunteers</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {members.map((member) => (
          <div key={member.id} className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 transition-transform transform hover:scale-105 hover:shadow-xl flex flex-col items-center">
            <img 
              src={member.image_url} 
              alt={member.name} 
              className="w-40 h-40 object-cover rounded-full mb-4 border-4 border-gray-200"
            />
            <h3 className="text-2xl font-semibold text-gray-900 mb-2 text-center">{member.name}</h3>
            <p className="text-gray-700 mb-4 text-center">{member.position}</p>
            <div className="flex justify-center space-x-4">
              <a href="#" aria-label={`${member.name} Facebook`} className="text-blue-600 hover:text-blue-800">
                <i className="fab fa-facebook-f text-xl"></i>
              </a>
              <a href="#" aria-label={`${member.name} Twitter`} className="text-blue-400 hover:text-blue-600">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" aria-label={`${member.name} Instagram`} className="text-pink-500 hover:text-pink-700">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="#" aria-label={`${member.name} Pinterest`} className="text-red-600 hover:text-red-800">
                <i className="fab fa-pinterest text-xl"></i>
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-12">
        <div className="bg-orange-700 text-white p-8 text-center max-w-xs rounded-lg shadow-lg">
          <div className="w-20 h-20 mx-auto mb-4 bg-gray-800 rounded-full flex items-center justify-center">
            <i className="fas fa-hand-paper text-3xl"></i>
          </div>
          <h3 className="text-2xl font-bold mb-2">Join Us</h3>
          <p className="mb-4 text-lg">These are the helping hands that have contributed to our cause. Be part of our mission!</p>
        </div>
      </div>
    </div>
  );
};

export default TeamSection;

