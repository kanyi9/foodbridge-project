import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import 'react-toastify/dist/ReactToastify.css';

const InputField = ({ label, placeholder, type = 'text', value, onChange }) => (
  <div className="flex flex-col w-full mb-4">
    <label className="text-sm text-gray-700 mb-2">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      className="p-2 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
      value={value}
      onChange={onChange}
    />
  </div>
);

const Button = ({ text, className, onClick }) => (
  <button
    className={`w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out ${className}`}
    onClick={onClick}
  >
    {text}
  </button>
);

const DonationForm = () => {
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  const handleDonate = async () => {
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const token = localStorage.getItem('token');

      // Check if the email exists in the database
      const emailCheckResponse = await axios.post(
        'https://foodbridge-backend-bd8l.onrender.com/api/check-email',  
        { email }
      );

      if (emailCheckResponse.data.exists) {
        // If email exists, proceed with payment and donation
        const paymentIntentResponse = await axios.post(
          'https://foodbridge-backend-bd8l.onrender.com/api/create-payment-intent',
          { amount },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const clientSecret = paymentIntentResponse.data.clientSecret;

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: 'Donor Name',
            },
          },
        });

        if (error) {
          toast.error('Payment failed: ' + error.message);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
          toast.success('Donation successful! Thank you for your contribution.');

          await axios.post(
            'https://foodbridge-backend-bd8l.onrender.com/api/save-donation',
            {
              email,
              amount: parseFloat(amount),
              message: message || '',
              paymentIntentId: paymentIntent.id
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }
      } else {
        // If email does not exist, notify the user to sign up
        toast.info('Email not found. Please sign up before making a donation.');
      }
    } catch (error) {
      toast.error('An error occurred while processing your donation.');
    }
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
      <ToastContainer />
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mt-4">Donate via Stripe</h2>
      </div>
      <InputField
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
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
      <div className="mb-4">
        <CardElement
          className="p-2 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        />
      </div>
      <Button text="Donate" onClick={handleDonate} />
    </div>
  );
};

export default DonationForm;