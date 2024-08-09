import React from 'react';

const DonationPage = () => {
  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <h1 className="text-3xl font-bold mb-4">Make a Donation</h1>
      <p className="text-lg mb-6">Your donation will help us make a difference in the lives of those in need.</p>
      <form>
        <div className="flex flex-wrap mb-4">
          <label className="block w-full md:w-1/2 mb-2 md:mb-0">
            <span className="text-lg">Amount:</span>
            <input
              type="number"
              className="w-full p-2 pl-10 text-lg"
              placeholder="Enter amount"
            />
          </label>
          <label className="block w-full md:w-1/2 mb-2 md:mb-0">
            <span className="text-lg">Frequency:</span>
            <select className="w-full p-2 pl-10 text-lg">
              <option value="one-time">One-time</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </label>
        </div>
        <div className="flex flex-wrap mb-4">
          <label className="block w-full mb-2">
            <span className="text-lg">Payment Method:</span>
            <input
              type="radio"
              name="payment-method"
              value="credit-card"
              className="mr-2"
            />
            <span>Credit Card</span>
            <input
              type="radio"
              name="payment-method"
              value="paypal"
              className="mr-2"
            />
            <span>PayPal</span>
          </label>
        </div>
        <div className="flex flex-wrap mb-4">
          <label className="block w-full mb-2">
            <span className="text-lg">Card Information:</span>
            <input
              type="text"
              className="w-full p-2 pl-10 text-lg"
              placeholder="Card number"
            />
          </label>
        </div>
        <div className="flex flex-wrap mb-4">
          <label className="block w-full mb-2">
            <span className="text-lg">Expiration Date:</span>
            <input
              type="text"
              className="w-full p-2 pl-10 text-lg"
              placeholder="MM/YY"
            />
          </label>
        </div>
        <div className="flex flex-wrap mb-4">
          <label className="block w-full mb-2">
            <span className="text-lg">Security Code:</span>
            <input
              type="text"
              className="w-full p-2 pl-10 text-lg"
              placeholder="CVV"
            />
          </label>
        </div>
        <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
          Donate Now
        </button>
      </form>
    </div>
  );
};

export default DonationPage;