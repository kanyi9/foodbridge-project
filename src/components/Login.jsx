import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import backgroundImage from '../images/login-background.png';

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

function AlertCard({ type, message }) {
  const bgColor = type === 'error' ? 'bg-red-100' : 'bg-yellow-100';
  const textColor = type === 'error' ? 'text-red-600' : 'text-yellow-600';
  return (
    <div className={`p-4 mb-4 rounded-lg ${bgColor} border border-gray-200`}>
      <p className={`text-center ${textColor} font-semibold`}>{message}</p>
    </div>
  );
}

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('donor');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const endpoint = role === 'admin'
        ? 'https://foodbridge-backend-bd8l.onrender.com/api/admin/login'
        : 'https://foodbridge-backend-bd8l.onrender.com/api/auth/login';

      const response = await axios.post(endpoint, { email, password });
      const token = role === 'admin' ? response.data.access_token : response.data.token;
      localStorage.setItem(`${role}Token`, token);

      navigate(role === 'admin' ? '/admin' : '/home'); 
    } catch (error) {
      if (error.response?.status === 403) {
        setError('Your account has been deactivated. Please contact support.');
      } else if (error.response?.status === 401) {
        setError('Invalid credentials. Please check your email and password.');
      } else {
        setError('Login failed. Please try again later.');
      }
      setSuccess('');
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

          <div className="flex flex-col mb-6">
            <h2 className="text-xl font-medium text-gray-800 mb-4 text-center">Select Your Role</h2>
            <div className="flex justify-around">
              <div 
                className={`flex-1 mx-2 p-4 rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-105 ${role === 'donor' ? 'bg-yellow-100 border-2 border-yellow-500' : 'bg-white border border-gray-300'}`} 
                onClick={() => setRole('donor')}
              >
                <h3 className="text-lg font-semibold text-gray-800">Donor</h3>
                <p className="text-gray-600 mt-2">Access donor features and manage donations.</p>
              </div>
              <div 
                className={`flex-1 mx-2 p-4 rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-105 ${role === 'admin' ? 'bg-yellow-100 border-2 border-yellow-500' : 'bg-white border border-gray-300'}`} 
                onClick={() => setRole('admin')}
              >
                <h3 className="text-lg font-semibold text-gray-800">Admin</h3>
                <p className="text-gray-600 mt-2">Access admin features and manage the platform.</p>
              </div>
            </div>
          </div>

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
            {error && <AlertCard type="error" message={error} />}
            {success && <AlertCard type="success" message={success} />}
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
