import React, { useState } from 'react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <section className="max-w-[1200px] mx-auto px-4 sm:px-6 my-16">
      <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* Left Content Area */}
        <div className="lg:col-span-7 p-8 sm:p-14 flex flex-col justify-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00204C] leading-snug mb-4">
            Discover Amazing Deals &amp; Find Your Next Travel Inspiration
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
            Be the first to discover special offers, travel inspiration, and exciting updates on our
            newest products and services.
          </p>

          {subscribed ? (
            <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 text-sm font-semibold flex items-center gap-2">
              <i className="fa fa-check-circle text-green-600 text-base"></i>
              <span>Thank you for subscribing! We'll keep you updated with the latest flight deals.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3 border border-gray-200 rounded-md text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00204C]/20 focus:border-[#00204C]"
              />
              <button
                type="submit"
                className="bg-[#E8A500] hover:bg-[#d69600] text-white px-7 py-3 rounded-md font-bold text-sm tracking-wide transition-colors cursor-pointer shadow-sm"
              >
                Subscribe now
              </button>
            </form>
          )}
        </div>

        {/* Right Image Area */}
        <div className="lg:col-span-5 bg-[#00204C] flex items-center justify-center p-6 sm:p-10">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=700"
            alt="Travel inspiration beach"
            className="w-full h-48 sm:h-64 object-cover rounded-xl shadow-lg border-2 border-white/10"
          />
        </div>
      </div>
    </section>
  );
}
