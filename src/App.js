import React from 'react';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import LoginPage from './components/Login';
import SignupPage from './components/SignUp';



import Footer from './components/Footer';
import TeamSection from './components/TeamSection';
import Campaigns from './components/Campaigns';


function App() {
  return (
    <div>
    <div>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignupPage/>} />
      </Routes>
</div>
<div>
  <Campaigns />
  <TeamSection />
  <Footer />

 </div>
 </div>
  );
}

export default App;