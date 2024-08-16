import React from 'react';
import Navigation from './Navigation';
import HeroSection from './HeroSection';
import InfoCards from './InfoCards';
import AboutUs from './AboutUs';
import TeamSection from './TeamSection';

import Campaigns from './Campaigns';

function Home() {
  return (
    <div className="flex flex-col  bg-white">

      <Navigation />
      <HeroSection />
      <InfoCards />
      <AboutUs />
      <Campaigns />
      <TeamSection />

    </div>
  );
}

export default Home;

