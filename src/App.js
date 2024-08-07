import React from 'react';
import './App.css';
import Footer from './components/Footer';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import LoginPage from './components/Login';
import TeamSection from './components/TeamSection';

function App() {
  return (
    
    <div>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/login" element={<LoginPage/>} />
      </Routes>
     
      <TeamSection />
     <Footer />
    </div>
  
     
  );
}

export default App;