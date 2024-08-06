import React from 'react';
import './App.css';
import Header from './components/Header';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import InfoCards from './components/InfoCards';
import AboutUs from './components/AboutUs';
const App = () => {
  return (
    <div className="flex flex-col pb-20 bg-white">
      <Header />
      <Navigation />
      <HeroSection />
      <InfoCards />
      <AboutUs />



    </div>
    
  );
};

export default App;