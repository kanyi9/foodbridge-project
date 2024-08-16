import React from 'react';
import aboutUsImage from '../images/campaign2.webp'; // Replace with your image path
const AboutUs = () => {
  return (
    <section id="about-us" className="flex flex-wrap items-center justify-between mt-24 md:mt-36 px-6 md:px-12">
      <div className="flex flex-col md:w-1/2 mb-10 md:mb-0">
        <h2 className="text-3xl md:text-4xl font-semibold text-orange-600 mb-4">
          About Us
        </h2>
        <p className="text-lg md:text-xl leading-7 text-gray-800">
          At FootBridge, we believe that no one should go hungry. Our mission is to create a community-driven platform where volunteers can contribute their time, resources, and skills to help those in need. Whether it's through food donations, financial contributions, or volunteering, we provide an opportunity for everyone to make a meaningful impact.
          <br /><br />
          FootBridge was born out of the desire to bring people together to combat hunger and food insecurity. We work closely with local communities, food banks, and shelters to ensure that donations reach those who need them most. Every contribution, big or small, helps us move closer to a world where everyone has access to nutritious meals.
        </p>
      </div>
      <div className="flex justify-center md:w-1/2">
        <img
          src={aboutUsImage}
          alt="About Us"
          className="rounded-lg shadow-lg w-full h-full object-cover max-h-80 md:max-h-[500px]"
        />
      </div>
    </section>
  );
};

export default AboutUs;
