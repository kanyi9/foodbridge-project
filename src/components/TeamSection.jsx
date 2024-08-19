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
        const response = await axios.get('http://127.0.0.1:5000/api/members');
        setMembers(response.data);
      } catch (err) {
        setError('Failed to fetch team members.');
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white py-12">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-orange-600">Team</h2>
        <h1 className="text-3xl font-bold text-gray-800 mt-2">Meet Our Volunteers</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-8 px-4">
        {members.map((member) => (
          <div key={member.id} className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <img 
              src={member.image_url} 
              alt={member.name} 
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
            <p className="text-gray-600 mb-4">{member.position}</p>
            <div className="flex justify-center space-x-4">
              <a href="#" aria-label={`${member.name} Facebook`}>
                <i className="fab fa-facebook-f text-blue-600 text-lg"></i>
              </a>
              <a href="#" aria-label={`${member.name} Twitter`}>
                <i className="fab fa-twitter text-blue-400 text-lg"></i>
              </a>
              <a href="#" aria-label={`${member.name} Instagram`}>
                <i className="fab fa-instagram text-pink-500 text-lg"></i>
              </a>
              <a href="#" aria-label={`${member.name} Pinterest`}>
                <i className="fab fa-pinterest text-red-600 text-lg"></i>
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-12">
        <div className="bg-orange-700 text-white p-8 text-center max-w-xs rounded-lg">
          <div className="w-20 h-20 mx-auto mb-4 bg-gray-800 rounded-full flex items-center justify-center">
            <i className="fas fa-hand-paper text-2xl"></i>
          </div>
          <h3 className="font-bold mb-2">Join Us</h3>
          <p className="mb-4">These are the helping hands that have contributed to our cause</p>
        </div>
      </div>
    </div>
  );
};

export default TeamSection;
