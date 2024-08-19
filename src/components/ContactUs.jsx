import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Modal from './Modal'; 
import contactImage from '../images/campaign3.jpg'; 

function InputField({ label, placeholder, type = 'text', rows, value, onChange, name }) {
  return (
    <div className="flex flex-col mt-5 w-full font-medium">
      <label className="text-sm text-gray-700 mb-2">
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none"
          aria-label={label}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          aria-label={label}
        />
      )}
    </div>
  );
}

// Button Component
function Button({ text, onClick }) {
  return (
    <div className="flex flex-col mt-8">
      <button
        onClick={onClick}
        className="w-full bg-yellow-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-yellow-700 transition duration-300"
      >
        {text}
      </button>
    </div>
  );
}

// ContactUs Component
function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [modal, setModal] = useState({ isOpen: false, message: '', type: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://foodbridge-backend-bd8l.onrender.com/api/feedback', formData);
      setModal({
        isOpen: true,
        message: response.data.message || 'Feedback submitted successfully!',
        type: 'success',
      });
    } catch (error) {
      setModal({
        isOpen: true,
        message: 'Error submitting feedback. Please try again later.',
        type: 'error',
      });
    }
  };

  const closeModal = () => setModal({ ...modal, isOpen: false });

  return (
    <main className="flex flex-col md:flex-row h-screen overflow-hidden">
      <section className="flex-1 bg-cover bg-center" style={{ backgroundImage: `url(${contactImage})` }}></section>
      <section className="flex-1 flex items-center justify-center p-10 bg-gray-100 relative">
        <div className="absolute top-6 right-6">
          <Link
            to="/"
            className="bg-yellow-600 text-white px-4 py-2 rounded-full text-lg font-medium shadow-md hover:bg-yellow-700 transition duration-300"
          >
            Home
          </Link>
        </div>
        <div className="flex flex-col max-w-md w-full bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h1>
          <form onSubmit={handleSubmit}>
            <InputField
              label="Name"
              placeholder="Enter your name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <InputField
              label="Email address"
              placeholder="Enter your email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <InputField
              label="Message"
              placeholder="Enter your message"
              type="textarea"
              rows={4}
              name="message"
              value={formData.message}
              onChange={handleChange}
            />
            <Button text="Submit" />
          </form>
        </div>
      </section>
      <Modal
        isOpen={modal.isOpen}
        onClose={closeModal}
        message={modal.message}
        type={modal.type}
      />
    </main>
  );
}

export default ContactUs;
