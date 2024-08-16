import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleDonate = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/donate',
        { amount, message, phone_number: phoneNumber },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success('Donation initiated successfully!');
      } else {
        toast.error('Failed to initiate donation.');
      }
    } catch (error) {
      toast.error('An error occurred while processing your donation.');
    }
  };

  return (
    <div className="donation-page">
      <ToastContainer />
      <InputField
        label="Amount"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <InputField
        label="Message"
        placeholder="Enter a message (optional)"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <InputField
        label="Phone Number"
        placeholder="Enter your phone number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <Button text="Donate" onClick={handleDonate} />
    </div>
  );
};

export default DonationPage;
