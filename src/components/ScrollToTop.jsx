import React, { useState, useEffect } from 'react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="fixed bottom-4 right-4 z-50 flex items-center justify-center w-11 h-11 bg-black/30 hover:bg-black/50 text-white rounded-md shadow-md transition-all duration-300 cursor-pointer"
    >
      <i className="fas fa-plane -rotate-90 text-sm"></i>
    </button>
  );
}
