import React from 'react';
import { businessInfo } from '../data/businessInfo';
import { createWhatsAppUrl } from '../utils/whatsapp';

export default function FloatingWhatsApp() {
  const defaultMessage = `Hello ${businessInfo.brandName},\n\nI would like to enquire about flight bookings and airfare deals.\n\nSource: ${businessInfo.brandName} website\n\nThank you.`;
  const whatsappUrl = createWhatsAppUrl(defaultMessage);

  return (
    <aside aria-label="WhatsApp quick contact">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with FlyNest Travel on WhatsApp"
        className="fixed bottom-20 right-4 sm:right-6 z-40 flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-3.5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 group focus:outline-none focus:ring-2 focus:ring-[#25D366]/50"
      >
        <i className="fab fa-whatsapp text-2xl"></i>
        <span className="hidden sm:inline-block text-xs font-bold tracking-wide pr-1">
          Chat on WhatsApp
        </span>
      </a>
    </aside>
  );
}
