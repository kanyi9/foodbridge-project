import React from 'react';
import Navigation from './Navigation';
import HeroSection from './HeroSection';
import InfoCards from './InfoCards';
import AboutUs from './AboutUs';
import TeamSection from './TeamSection';
import Footer from './Footer';
import Campaigns from './Campaigns';
import Header from './Header';

function Home() {
  return (
    <div className="flex flex-col  bg-white">
      <Header/>
      <Navigation />
      <HeroSection />
      <InfoCards />
      <AboutUs />
      <Campaigns />
      <TeamSection />
      <Footer/>

    </div>
  );
}

export default Home;

