import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // Import toast and ToastContainer from React Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles

const InputField = ({ label, placeholder, type = 'text', value, onChange }) => {
  return (
    <div className="flex flex-col w-full min-h-[59px] mb-4">
      <label className="gap-2.5 self-start text-sm text-black">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="p-2.5 text-xs rounded-xl border border-gray-300 focus:outline-none"
        aria-label={label}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

const Button = ({ text, className, onClick }) => {
  return (
    <button
      className={`flex overflow-hidden justify-center gap-2.5 items-center py-2.5 pl-2.5 w-full bg-yellow-800 rounded-xl max-w-[404px] min-h-[32px] ${className}`}
      onClick={onClick}
    >
      <span className="z-10 self-center text-sm font-bold text-white">
        {text}
      </span>
    </button>
  );
};

const DonationPage = () => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleDonate = async () => {
    try {
      const token = localStorage.getItem('token'); // Assuming JWT token is stored in local storage
      const response = await axios.post(
        'https://foodbridge-backend-bd8l.onrender.com/api/donate', // Replace with your backend URL
        { amount, message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success('Thank you for your donation!');
        setAmount('');
        setMessage('');
      } else {
        toast.info('Thank you for your donation.');
      }
    } catch (error) {
      console.error('Donation error:', error);
      toast.success('Thank You for your donation.');
    }
  };

  return (
    <main className="flex overflow-hidden flex-col justify-center items-center px-20 py-56 bg-white max-md:px-5 max-md:py-24">
      <ToastContainer /> {/* Toast container for React Toastify */}
      <div className="relative flex flex-col w-[404px] p-6 border border-orange-300 rounded-[45px]">
        <h1 className="text-3xl font-medium text-black mb-6">Make a Donation</h1>
        <form
          className="flex flex-col w-full"
          onSubmit={(e) => {
            e.preventDefault();
            handleDonate();
          }}
        >
          <InputField
            label="Amount"
            placeholder="Enter amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <InputField
            label="Message"
            placeholder="Leave a message"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button text="Donate Now" className="mt-6" />
        </form>
      </div>
    </main>
  );
};

export default DonationPage;
