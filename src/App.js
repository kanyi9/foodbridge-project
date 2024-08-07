import React from 'react';
import './App.css';
import Footer from './components/Footer';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import LoginPage from './components/Login';
import TeamSection from './components/TeamSection';
import Campaigns from './components/Campaigns';


function App() {
  return (
    
    <div>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/login" element={<LoginPage/>} />
      </Routes>
     <Campaigns />
      <TeamSection />
     <Footer />
    </div>
  
     
  );
}

export default App;