import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-12">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-8 md:mb-0">
          <h2 className="text-2xl font-bold text-white">FoodBridge</h2>
          <p className="mt-2">
            Join us in our mission to fight hunger and build a stronger, more compassionate community.
            <br /><br/>
            Together, we can make a difference, one meal at a time.
          </p>
          <div className="flex mt-4 space-x-4">
            <a href="/" className="text-gray-300 hover:text-white">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="/" className="text-gray-300 hover:text-white">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="/" className="text-gray-300 hover:text-white">
              <i className="fab fa-x-twitter"></i>
            </a>
            <a href="/" className="text-gray-300 hover:text-white">
              <i className="fab fa-pinterest"></i>
            </a>
          </div>
        </div>
        <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-16">
          
          <div>
            <h3 className="text-lg font-bold text-white">Contact</h3>
            <address className="mt-2 not-italic">
              <p>Address</p>
              <p>Address</p>
              <p><a href="mailto:help@foodbridge.com" className="hover:text-white">help@foodbridge.com</a></p>
              <p>+254 714748299</p>
            </address>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500">
        <p>Copyright © FoodBridge 2024</p>
      </div>
    </footer>
  );
};

export default Footer;
