import React from 'react';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import LoginPage from './components/Login';
import SignupPage from './components/SignUp';
import DonationPage from './components/DonationPage'

function App() {
  return (
    <div>
    
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/donation" element={<DonationPage/>} />
      </Routes>
 </div>
  );
}

export default App;