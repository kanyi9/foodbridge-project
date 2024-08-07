import React from 'react';
import Header from './Header';
import Navigation from './Navigation';
import HeroSection from './HeroSection';
import InfoCards from './InfoCards';
import AboutUs from './AboutUs';
import TeamSection from './TeamSection'
import Footer from './Footer'; 

function Home() {
  return (
    <div className="flex flex-col pb-20 bg-white">
      <Header />
      <Navigation />
      <HeroSection />
      <InfoCards />
      <AboutUs />

      <TeamSection />
      <TeamSection />
      <Footer/>
      



      {/* Add more components as needed */}

    </div>
  );
}

export default Home;

