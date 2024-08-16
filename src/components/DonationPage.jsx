import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import 'react-toastify/dist/ReactToastify.css';

const stripePromise = loadStripe('your-publishable-key-here'); // Replace with your Stripe publishable key

const InputField = ({ label, placeholder, type = 'text', value, onChange }) => {
  return (
    <div className="flex flex-col w-full mb-4">
      <label className="text-sm text-gray-700 mb-2">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="p-2 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

const Button = ({ text, className, onClick }) => {
  return (
    <button
      className={`w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

const DonationForm = () => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  const handleDonate = async () => {
    if (!stripe || !elements) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const { data: clientSecret } = await axios.post(
        'http://localhost:5000/api/create-payment-intent',
        { amount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const cardElement = elements.getElement(CardElement);
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            phone: phoneNumber,
          },
        },
      });

      if (paymentResult.error) {
        toast.error(paymentResult.error.message);
      } else if (paymentResult.paymentIntent.status === 'succeeded') {
        toast.success('Donation successful!');
      }
    } catch (error) {
      toast.error('An error occurred while processing your donation.');
    }
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
      <ToastContainer />
      <div className="mb-6 text-center">
        <img src="https://stripe.com/img/v3/home/twitter.png" alt="Stripe Logo" className="mx-auto w-24 h-auto" />
        <h2 className="text-2xl font-bold text-gray-800 mt-4">Donate with Stripe</h2>
      </div>
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
      <div className="flex flex-col mb-6">
        <label className="text-sm text-gray-700 mb-2">Card Details</label>
        <div className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent">
          <CardElement />
        </div>
      </div>
      <Button text="Donate" onClick={handleDonate} />
    </div>
  );
};

const DonationPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Elements stripe={stripePromise}>
        <DonationForm />
      </Elements>
    </div>
  );
};

export default DonationPage;
