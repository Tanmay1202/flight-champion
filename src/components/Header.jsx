import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

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
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src="https://flightschampion.com.au/images/FC Logo Website white_1790147159.png"
              alt="Flights Champion"
              className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className="text-white hover:text-[#E8A500] font-bold text-base transition-colors"
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
            className="text-white hover:text-[#E8A500] font-bold text-base transition-colors cursor-pointer"
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
            className="text-white hover:text-[#E8A500] font-bold text-base transition-colors cursor-pointer"
          >
            About Us
          </a>
          <Link
            to="/faq"
            className="text-white hover:text-[#E8A500] font-bold text-base transition-colors"
          >
            Need Help?
          </Link>
        </nav>

        {/* Phone Contact */}
        <div className="hidden sm:flex items-center text-white font-bold text-base">
          <a
            href="tel:+61290372197"
            className="flex items-center gap-2 hover:text-[#E8A500] transition-colors"
          >
            <i className="fa fa-phone-alt text-sm"></i>
            <span>+61-290372197</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center gap-3">
          <a
            href="tel:+61290372197"
            className="text-white text-sm font-bold flex items-center gap-1.5"
            aria-label="Call Flights Champion"
          >
            <i className="fa fa-phone-alt text-xs text-[#E8A500]"></i>
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
          <div className="pt-3 border-t border-white/10">
            <a
              href="tel:+61290372197"
              className="text-[#E8A500] font-bold text-base flex items-center gap-2"
            >
              <i className="fa fa-phone-alt"></i>
              <span>+61-290372197</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
