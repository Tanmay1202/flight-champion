import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#00204C] text-white mt-12">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company & Contact Column */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-bold mb-4 tracking-wide text-white">Flights Champion</h4>
            <div className="space-y-3 text-sm text-gray-200">
              <p className="flex items-center gap-3">
                <i className="fa fa-phone-alt text-[#E8A500] w-4"></i>
                <a href="tel:+61290372197" className="hover:text-[#E8A500] transition-colors">
                  +61-290372197
                </a>
              </p>
              <p className="flex items-center gap-3">
                <i className="fa fa-envelope text-[#E8A500] w-4"></i>
                <a href="mailto:info@flightschampion.com.au" className="hover:text-[#E8A500] transition-colors">
                  info@flightschampion.com.au
                </a>
              </p>
              <p className="flex items-start gap-3">
                <i className="fa fa-map-marker-alt text-[#E8A500] w-4 mt-0.5"></i>
                <span>7 SLATER PL EVATT, 2617 ACT, Australia</span>
              </p>
            </div>

            {/* Payment methods badges */}
            <div className="flex flex-wrap gap-2.5 mt-6">
              {['ANZ', 'NAB', 'ZIP', 'PayID', 'VISA'].map((method) => (
                <span
                  key={method}
                  className="bg-white text-[#00204C] font-bold text-xs px-3 py-1.5 rounded shadow-sm"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-bold mb-4 tracking-wide text-white">Quick Links</h4>
            <ul className="space-y-2.5 text-sm text-gray-200">
              <li>
                <Link to="/" className="hover:text-[#E8A500] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#E8A500] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-[#E8A500] transition-colors">
                  FAQ's
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-[#E8A500] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="hover:text-[#E8A500] transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Top Destination */}
          <div>
            <h4 className="text-base font-bold mb-4 tracking-wide text-white">Top Destination</h4>
            <ul className="space-y-2.5 text-sm text-gray-200">
              <li>
                <Link to="/top-destinations" className="hover:text-[#E8A500] transition-colors">
                  Flights to India
                </Link>
              </li>
              <li>
                <Link to="/top-destinations" className="hover:text-[#E8A500] transition-colors">
                  Flights to Nepal
                </Link>
              </li>
              <li>
                <Link to="/top-destinations" className="hover:text-[#E8A500] transition-colors">
                  Flights to Pakistan
                </Link>
              </li>
              <li>
                <Link to="/top-destinations" className="hover:text-[#E8A500] transition-colors">
                  Flights to Bangladesh
                </Link>
              </li>
              <li>
                <Link to="/top-destinations" className="hover:text-[#E8A500] transition-colors">
                  Flights to Sri Lanka
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Airlines */}
          <div>
            <h4 className="text-base font-bold mb-4 tracking-wide text-white">Popular Airlines</h4>
            <ul className="space-y-2.5 text-sm text-gray-200">
              {['United Airlines', 'Alaska Airlines', 'Frontier Airlines', 'Spirit Airlines', 'Southwest Airlines'].map(
                (airline) => (
                  <li key={airline}>
                    <span className="text-gray-200 hover:text-[#E8A500] transition-colors cursor-pointer">
                      {airline}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-white/15 py-4 text-center text-sm text-gray-300">
        © 2026 Flights Champion. All rights reserved.
      </div>
    </footer>
  );
}
