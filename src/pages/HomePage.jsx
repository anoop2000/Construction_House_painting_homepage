import React, { useState } from 'react';
import { Suspense } from 'react';
import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
      
import WhyChooseUs from '../components/WhyChooseUs.jsx';
import Testimonials from '../components/Testimonials.jsx';
import Footer from '../components/Footer.jsx';
import ScrollToTop from '../components/ScrollToTop.jsx';
//import { sendContactForm } from '../api.js';
import Contacts from '../components/Contacts.jsx';


const Services = React.lazy(() => import('../components/Services.jsx'));
const Gallery = React.lazy(() => import('../components/Gallery.jsx'));
const BeforeAfter = React.lazy(() => import('../components/BeforeAfter.jsx'));



const HomePage = () => {
  

  return (
    <>
      <Navbar />
      <main className="page-content themed-page">
        <Hero />

        <Suspense fallback={<div className="py-5 text-center" style={{ color: "#4F46E5" }}>Loading Our Services...</div>}>
        <Services />
        </Suspense>


        <Suspense fallback={<div className="py-5 text-center" style={{ color: "#EA580C" }} >Loading Gallery...</div>}>
        <Gallery />
        </Suspense>

        {/* <WhyChooseUs /> */}

        {/* <Suspense fallback={<div className="py-5 text-center" style={{ color: "#1E3A8A" }} >Loading Before & After section...</div>}>
        <BeforeAfter />
        </Suspense> */}

        {/* <Testimonials /> */}
        
        <Contacts />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default HomePage;


