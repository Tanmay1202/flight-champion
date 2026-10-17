import React from 'react';
import FlightSearchForm from '../components/FlightSearchForm';
import DestinationsAndDeals from '../components/DestinationsAndDeals';
import TopPicks from '../components/TopPicks';
import GoogleReviews from '../components/GoogleReviews';
import AirlinePartners from '../components/AirlinePartners';
import AboutSection from '../components/AboutSection';
import ExperienceSection from '../components/ExperienceSection';
import NewsletterSection from '../components/NewsletterSection';

export default function HomePage() {
  const scrollToDeals = (e) => {
    e.preventDefault();
    const element = document.getElementById('top-destinations');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9]">
      {/* Search Bar Section */}
      <div className="bg-white py-6 border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <FlightSearchForm />
        </div>
      </div>

      {/* Hero Banner Section */}
      <section
        className="relative h-[460px] bg-cover bg-center flex items-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=1600')`
        }}
      >
        {/* Navy overlay */}
        <div className="absolute inset-0 bg-[#00204C]/60" />

        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 w-full">
          <div className="max-w-lg text-white">
            <h1 className="text-4xl sm:text-5xl font-black mb-3 leading-tight tracking-tight">
              Book Your Next Trip
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mb-6 leading-relaxed">
              Explore our current flight deals and plan your next adventure.
            </p>
            <a
              href="#top-destinations"
              onClick={scrollToDeals}
              className="inline-block px-6 py-3 border-2 border-white text-white rounded font-bold hover:bg-white hover:text-[#00204C] transition-all cursor-pointer"
            >
              Explore Offers
            </a>
          </div>
        </div>
      </section>

      {/* Destinations and Deals */}
      <DestinationsAndDeals />

      {/* Top picks from Sydney */}
      <TopPicks />

      {/* Google Reviews */}
      <GoogleReviews />

      {/* Airline Partners */}
      <AirlinePartners />

      {/* About Section */}
      <AboutSection />

      {/* FlyNest Travel Experience */}
      <ExperienceSection />

      {/* Newsletter / Deals Subscription */}
      <NewsletterSection />
    </div>
  );
}
