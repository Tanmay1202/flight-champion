import React from 'react';
import { Link } from 'react-router-dom';
import { businessInfo } from '../data/businessInfo';

export default function Footer() {
  return (
    <footer className="bg-[#00204C] text-white mt-12">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company & Contact Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white rounded-lg p-1.5 shadow-sm inline-flex shrink-0">
                <img
                  src={businessInfo.logo}
                  alt={businessInfo.brandName}
                  className="h-10 w-auto object-contain"
                />
              </div>
              <div>
                <h4 className="text-lg font-bold tracking-wide text-white leading-tight">
                  {businessInfo.brandName}
                </h4>
                <p className="text-[11px] text-gray-300 font-medium">
                  {businessInfo.legalName} • {businessInfo.abnFormatted}
                </p>
              </div>
            </div>

            <div className="space-y-3 text-sm text-gray-200 mt-4">
              <p className="flex items-center gap-3">
                <i className="fa fa-phone-alt text-[#E8A500] w-4"></i>
                <a
                  href={businessInfo.phone.telLink}
                  className="hover:text-[#E8A500] transition-colors"
                  title="Call FlyNest Travel"
                >
                  {businessInfo.phone.display}
                </a>
              </p>
              <p className="flex items-center gap-3">
                <i className="fab fa-whatsapp text-emerald-400 w-4"></i>
                <a
                  href={businessInfo.whatsapp.waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                  title="WhatsApp FlyNest Travel"
                >
                  {businessInfo.whatsapp.display} (WhatsApp)
                </a>
              </p>
              <p className="flex items-center gap-3">
                <i className="fa fa-envelope text-[#E8A500] w-4"></i>
                <a
                  href={businessInfo.email.mailLink}
                  className="hover:text-[#E8A500] transition-colors"
                  title="Email FlyNest Travel"
                >
                  {businessInfo.email.address}
                </a>
              </p>
              <p className="flex items-start gap-3">
                <i className="fa fa-map-marker-alt text-[#E8A500] w-4 mt-0.5"></i>
                <span>{businessInfo.address.full}</span>
              </p>
            </div>

            {/* Payment methods badges */}
            <div className="flex flex-wrap gap-2.5 mt-6">
              {['ANZ', 'NAB', 'ZIP', 'PayID', 'VISA', 'Mastercard'].map((method) => (
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
                  FAQ's &amp; Support
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-[#E8A500] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="hover:text-[#E8A500] transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Top Destination */}
          <div>
            <h4 className="text-base font-bold mb-4 tracking-wide text-white">Top Destinations</h4>
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
            <h4 className="text-base font-bold mb-4 tracking-wide text-white">Partner Airlines</h4>
            <ul className="space-y-2.5 text-sm text-gray-200">
              {['Air India', 'Singapore Airlines', 'Qantas', 'Emirates', 'Qatar Airways', 'Cathay Pacific', 'Malaysia Airlines'].map(
                (airline) => (
                  <li key={airline}>
                    <span className="text-gray-200 hover:text-[#E8A500] transition-colors">
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
        © 2026 {businessInfo.legalName} All rights reserved.
      </div>
    </footer>
  );
}
