import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import backgroundImage from '../images/login-background.png';
import axios from 'axios';

function InputField({ label, placeholder, type = 'text', value, onChange }) {
  return (
    <div className="flex flex-col mt-4 w-full">
      <label className="text-sm font-medium text-gray-800 mb-1">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="py-3 px-4 w-full text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        aria-label={label}
      />
    </div>
  );
}

function Button({ text, className }) {
  return (
    <button className={`w-full py-3 bg-yellow-600 text-white font-bold rounded-lg hover:bg-yellow-700 transition-colors ${className}`}>
      {text}
    </button>
  );
}



function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:5000/login', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/Home'); 
    } catch (error) {
      console.error('Login failed:', error.response?.data?.error || error.message);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div
        className="flex-1 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>

      <div className="flex-1 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-lg">
          <h1 className="text-3xl font-semibold text-gray-800 mb-4 text-center">Welcome Back!</h1>
          <p className="text-base text-gray-600 mb-6 text-center">Enter your credentials to access your account.</p>
          <form className="flex flex-col w-full" onSubmit={handleSubmit}>
            <InputField
              label="Email address"
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
              label="Password"
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <a href="/reset-password" className="text-sm text-blue-600 mt-2 self-end hover:underline">
              Forgot Password
            </a>
            <label className="flex items-center mt-4 text-sm text-gray-700">
              <input type="checkbox" className="h-4 w-4 text-yellow-600 rounded border-gray-300 focus:ring-yellow-500" />
              <span className="ml-2">Remember Me</span>
            </label>
            <Button text="Login" className="mt-6" />
          </form>
          <p className="text-center text-gray-700 mt-6 text-sm">
            Don't have an account? <Link to="/signup" className="text-yellow-600 font-semibold hover:underline">Create One</Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default LoginPage;
