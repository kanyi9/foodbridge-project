import React from 'react';
import Button from './Button';
import heroBackground from '../images/hero-background.jpg';

function HeroSection() {
  return (
    <section className="flex relative flex-col justify-center items-start px-20 py-80 mt-6 w-full min-h-[920px] max-md:px-5 max-md:py-24 max-md:max-w-full">
      <img loading="lazy" src={heroBackground} alt="" className="object-cover absolute inset-0 size-full" />
      <div className="flex relative flex-col mb-0 max-w-full w-[754px] max-md:mb-2.5">
        <h1 className="flex flex-col w-full text-8xl font-extrabold text-gray-700 leading-[97px] max-md:text-4xl max-md:leading-10">
          Become a Life Saver <br /> For Someone
        </h1>
        <div className="flex gap-4 items-start mt-8 max-w-full text-lg font-medium uppercase whitespace-nowrap w-[305px]">
          <Button variant="primary">Donate</Button>
          <Button variant="secondary">Discover</Button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
