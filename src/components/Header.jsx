import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { businessInfo } from '../data/businessInfo';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (hash) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/' + hash);
    } else {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#00204C] shadow-md">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex-shrink-0">
          <Link to="/" className="flex items-center gap-2 group" aria-label="FlyNest Travel Home">
            <div className="bg-white rounded-lg p-1 shadow-sm flex items-center justify-center">
              <img
                src={businessInfo.logo}
                alt={businessInfo.brandName}
                className="h-10 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </div>
            <div className="hidden min-[420px]:flex flex-col">
              <span className="text-white font-black text-base sm:text-lg tracking-tight leading-none group-hover:text-[#E8A500] transition-colors">
                FlyNest <span className="text-[#E8A500]">Travel</span>
              </span>
              <span className="text-[9px] text-gray-300 uppercase tracking-widest font-semibold mt-0.5">
                PTY LTD
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-7">
          <Link
            to="/"
            className="text-white hover:text-[#E8A500] font-bold text-sm lg:text-base transition-colors"
          >
            Home
          </Link>
          <a
            href="/top-destinations"
            onClick={(e) => {
              if (location.pathname === '/') {
                e.preventDefault();
                handleNavClick('#top-destinations');
              }
            }}
            className="text-white hover:text-[#E8A500] font-bold text-sm lg:text-base transition-colors cursor-pointer"
          >
            Top Destinations
          </a>
          <a
            href="/about"
            onClick={(e) => {
              if (location.pathname === '/') {
                e.preventDefault();
                handleNavClick('#about');
              }
            }}
            className="text-white hover:text-[#E8A500] font-bold text-sm lg:text-base transition-colors cursor-pointer"
          >
            About Us
          </a>
          <Link
            to="/faq"
            className="text-white hover:text-[#E8A500] font-bold text-sm lg:text-base transition-colors"
          >
            Need Help?
          </Link>
        </nav>

        {/* Contact Actions (Call & WhatsApp) */}
        <div className="hidden sm:flex items-center gap-4 text-white font-bold text-sm">
          {/* WhatsApp Link */}
          <a
            href={businessInfo.whatsapp.waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-emerald-600/90 hover:bg-emerald-600 px-3 py-1.5 rounded-lg text-white text-xs font-bold transition-all shadow-sm"
            title="Chat on WhatsApp"
          >
            <i className="fab fa-whatsapp text-sm"></i>
            <span>WhatsApp</span>
          </a>

          {/* Phone Link */}
          <a
            href={businessInfo.phone.telLink}
            className="flex items-center gap-2 hover:text-[#E8A500] transition-colors"
            title={`Call FlyNest Travel at ${businessInfo.phone.display}`}
          >
            <i className="fa fa-phone-alt text-xs text-[#E8A500]"></i>
            <span>{businessInfo.phone.display}</span>
          </a>
        </div>

        {/* Mobile Actions & Hamburger */}
        <div className="md:hidden flex items-center gap-2.5">
          <a
            href={businessInfo.whatsapp.waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-sm"
            aria-label="WhatsApp FlyNest Travel"
          >
            <i className="fab fa-whatsapp"></i>
          </a>
          <a
            href={businessInfo.phone.telLink}
            className="w-8 h-8 rounded-full bg-white/10 text-[#E8A500] flex items-center justify-center text-xs"
            aria-label="Call FlyNest Travel"
          >
            <i className="fa fa-phone-alt"></i>
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white p-2 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <i className={`fa ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#001738] border-t border-white/10 px-6 py-4 space-y-3">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-white hover:text-[#E8A500] font-bold text-base py-1.5"
          >
            Home
          </Link>
          <Link
            to="/top-destinations"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-white hover:text-[#E8A500] font-bold text-base py-1.5"
          >
            Top Destinations
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-white hover:text-[#E8A500] font-bold text-base py-1.5"
          >
            About Us
          </Link>
          <Link
            to="/faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-white hover:text-[#E8A500] font-bold text-base py-1.5"
          >
            Need Help?
          </Link>
          <div className="pt-3 border-t border-white/10 space-y-2">
            <a
              href={businessInfo.phone.telLink}
              className="text-[#E8A500] font-bold text-sm flex items-center gap-2"
            >
              <i className="fa fa-phone-alt"></i>
              <span>{businessInfo.phone.display}</span>
            </a>
            <a
              href={businessInfo.whatsapp.waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 font-bold text-sm flex items-center gap-2"
            >
              <i className="fab fa-whatsapp"></i>
              <span>WhatsApp: {businessInfo.whatsapp.display}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
