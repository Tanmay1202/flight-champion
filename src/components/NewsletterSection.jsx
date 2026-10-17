import React, { useState } from 'react';
import { formatWhatsAppBookingMessage, createWhatsAppUrl, openWhatsAppConversation } from '../utils/whatsapp';
import WhatsAppLeadModal from './WhatsAppLeadModal';
import { businessInfo } from '../data/businessInfo';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const [preparedMessage, setPreparedMessage] = useState('');

  const validateEmail = (val) => {
    return /\S+@\S+\.\S+/.test(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (!validateEmail(email.trim())) {
      setError('Please enter a valid email address (e.g., name@example.com).');
      return;
    }

    setError('');

    const message = formatWhatsAppBookingMessage({
      enquiryType: 'Deals & Newsletter Subscription',
      email: email.trim(),
      additionalRequirements:
        'Please add me to the FlyNest Travel subscriber list for exclusive international airfares, special travel deals, and destination updates.',
      sourcePage: 'Homepage (Newsletter Section)'
    });

    const url = createWhatsAppUrl(message);
    setPreparedMessage(message);
    setWhatsappUrl(url);

    // Open WhatsApp conversation directly from user event
    openWhatsAppConversation(url);

    setIsSubmitted(true);
    setModalOpen(true);
  };

  return (
    <section className="max-w-[1200px] mx-auto px-4 sm:px-6 my-16">
      <WhatsAppLeadModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        whatsappUrl={whatsappUrl}
        enquiryType="Newsletter Subscription"
        previewMessage={preparedMessage}
      />

      <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* Left Content Area */}
        <div className="lg:col-span-7 p-8 sm:p-14 flex flex-col justify-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E8A500] mb-2">
            EXCLUSIVE TRAVEL DEALS
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00204C] leading-snug mb-4">
            Discover Amazing Deals &amp; Find Your Next Travel Inspiration
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
            Be the first to discover special flight offers, holiday inspiration, and discounted fares
            from {businessInfo.brandName} across Asia, India, Europe, and beyond.
          </p>

          {isSubmitted ? (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl p-5 text-sm space-y-3">
              <div className="flex items-center gap-2 font-bold text-emerald-800">
                <i className="fab fa-whatsapp text-lg text-emerald-600"></i>
                <span>Subscription Enquiry Prepared in WhatsApp!</span>
              </div>
              <p className="text-xs leading-relaxed text-emerald-800">
                We've prepared your newsletter subscription enquiry for <strong>{email}</strong> in WhatsApp
                to <strong>{businessInfo.whatsapp.display}</strong>. Please ensure you tap <strong>Send</strong> in
                WhatsApp so our team receives your request.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition-colors shadow-xs"
                >
                  <i className="fab fa-whatsapp"></i>
                  <span>Open WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="px-4 py-2 bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 font-bold text-xs rounded-lg transition-colors"
                >
                  Enter another email
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                    required
                    aria-label="Email address for travel deals"
                    className={`w-full px-4 py-3 border ${
                      error ? 'border-red-400 focus:ring-red-300' : 'border-gray-200 focus:ring-[#00204C]/20'
                    } rounded-md text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-[#00204C]`}
                  />
                  {error && <p className="text-red-500 text-xs mt-1 font-semibold">{error}</p>}
                </div>
                <button
                  type="submit"
                  className="bg-[#E8A500] hover:bg-[#d69600] text-white px-7 py-3 rounded-md font-bold text-sm tracking-wide transition-colors cursor-pointer shadow-sm shrink-0 flex items-center justify-center gap-2"
                >
                  <i className="fab fa-whatsapp"></i>
                  <span>Subscribe via WhatsApp</span>
                </button>
              </div>
              <p className="text-[11px] text-gray-400 mt-2">
                Subscribing initiates a direct WhatsApp enquiry to {businessInfo.whatsapp.display}.
              </p>
            </form>
          )}
        </div>

        {/* Right Image Area */}
        <div className="lg:col-span-5 bg-[#00204C] flex items-center justify-center p-6 sm:p-10">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=700"
            alt="Travel inspiration beach destination"
            className="w-full h-48 sm:h-64 object-cover rounded-xl shadow-lg border-2 border-white/10"
          />
        </div>
      </div>
    </section>
  );
}
