import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const TeamSection = () => {
  return (
    <div className="bg-white py-12">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-orange-600">Team</h2>
        <h1 className="text-3xl font-bold text-gray-800 mt-2">Meet Our Volunteers</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-8 px-4">
        {['Nancy', 'Brian', 'Rufus', 'Kanyi', 'Cyrus', 'Jason'].map((name, index) => (
          <div key={index} className="text-center">
            <div className="w-48 h-64 bg-gray-300 mb-4 mx-auto"></div>
            <h3 className="font-medium">{name}</h3>
            <div className="flex justify-center space-x-2 mt-2">
              <a href="#" aria-label={`${name} Facebook`}>
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" aria-label={`${name} Twitter`}>
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" aria-label={`${name} Instagram`}>
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" aria-label={`${name} Pinterest`}>
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
          <h3 className="font-bold mb-2">Become a Volunteer</h3>
          <p className="mb-4">Centuries but also the leap electtypesetting, remaining</p>
          <button className="bg-white text-orange-700 font-bold py-2 px-4 rounded-full">JOIN US TODAY</button>
        </div>
      </div>
    </div>
  );
};


const NewsletterSection = () => {
  return (
    <div className="bg-orange-700 text-white text-center py-8">
      <h2 className="text-2xl font-bold mb-4">Subscribe To Our Newsletter</h2>
      <p className="mb-4">Sign up for our monthly newsletter to get the latest news, volunteer opportunities and more!</p>
      <button className="bg-white text-orange-700 font-bold py-2 px-4 rounded-full">SUBSCRIBE</button>
    </div>
  );
};

const BlogSection = () => {
  return (
    <div className="relative bg-cover bg-center py-8" style={{ backgroundImage: 'url(/path-to-your-image)' }}>
      <div className="absolute inset-0 bg-teal-700 opacity-50"></div>
      <div className="relative text-center py-8">
        <h2 className="text-2xl font-bold text-white mb-4">Blog</h2>
        <h3 className="text-3xl font-semibold text-white">Take a Look At Recent Blog Posts</h3>
        <button className="mt-4 bg-white text-teal-700 font-bold py-2 px-4 rounded-full">SEE OUR BLOGS</button>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <TeamSection />
      <NewsletterSection />
      <BlogSection />
    </div>
  );
};

export default App;
