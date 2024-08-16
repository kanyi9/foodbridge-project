import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Nancy from '../images/Nancy.jpeg';
import Brian from '../images/Brian.jpeg';
import Rufus from '../images/Rufus.jpeg';
import Kanyi from '../images/Kanyi.jpeg';
import Cyrus from '../images/Cyrus.jpeg';
import Jason from '../images/Jason.jpeg';

const TeamSection = () => {
  const volunteers = [
    { name: 'Nancy', image: Nancy },
    { name: 'Brian', image: Brian },
    { name: 'Rufus', image: Rufus },
    { name: 'Kanyi', image: Kanyi },
    { name: 'Cyrus', image: Cyrus },
    { name: 'Jason', image: Jason },
  ];

  return (
    <div className="bg-white py-12">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-orange-600">Team</h2>
        <h1 className="text-3xl font-bold text-gray-800 mt-2">Meet Our Volunteers</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-8 px-4">
        {volunteers.map((volunteer, index) => (
          <div key={index} className="text-center">
            <img 
              src={volunteer.image} 
              alt={`${volunteer.name}`} 
              className="w-48 h-64 object-cover mx-auto mb-4 rounded-lg"
            />
            <h3 className="font-medium">{volunteer.name}</h3>
            <div className="flex justify-center space-x-2 mt-2">
              <a href="#" aria-label={`${volunteer.name} Facebook`}>
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" aria-label={`${volunteer.name} Twitter`}>
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" aria-label={`${volunteer.name} Instagram`}>
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" aria-label={`${volunteer.name} Pinterest`}>
                <i className="fab fa-pinterest"></i>
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <div className="bg-orange-700 text-white p-8 text-center max-w-xs rounded-lg">
          <div className="w-20 h-20 mx-auto mb-4 bg-gray-800 rounded-full flex items-center justify-center">
            <i className="fas fa-hand-paper text-2xl"></i>
          </div>
          <h3 className="font-bold mb-2"></h3>
          <p className="mb-4">These are the helping hands that have contributed to our cause</p>
        </div>
      </div>
    </div>
  );
};


const App = () => {
  return (
    <div>
      <TeamSection />
    </div>
  );
};

export default App;
