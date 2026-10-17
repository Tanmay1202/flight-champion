import React, { useState } from 'react';
import { businessInfo } from '../data/businessInfo';
import { formatWhatsAppBookingMessage, createWhatsAppUrl, openWhatsAppConversation } from '../utils/whatsapp';
import WhatsAppLeadModal from '../components/WhatsAppLeadModal';

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState(0);

  // Quick Enquiry Form State
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Flight Enquiry',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [leadModalUrl, setLeadModalUrl] = useState('');
  const [leadModalMessage, setLeadModalMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const faqs = [
    {
      q: 'How do I change or cancel my flight?',
      a: `To request a date change or flight cancellation, please contact our support team immediately at ${businessInfo.phone.display}, via WhatsApp at ${businessInfo.whatsapp.display}, or email ${businessInfo.email.address} with your booking reference number. Because airfares are governed by individual airline fare rules, change fees or cancellation penalties set by the carrier will apply in addition to our agency processing fee.`
    },
    {
      q: 'When will I receive my e-ticket after booking?',
      a: 'Once your flight reservation is processed and payment is verified, your electronic ticket (e-ticket) containing your airline confirmation code (PNR) and ticket number will be emailed to your registered email address typically within 2 to 24 hours.'
    },
    {
      q: 'What is the standard baggage allowance for international flights?',
      a: 'Baggage allowances differ across airlines and travel classes. For most international flights between Australia and Asia/India, economy fares generally include 20kg to 30kg of checked baggage and 7kg of carry-on baggage. Full baggage details are itemized on each flight card and on your official e-ticket.'
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept Australian banking payment options including direct bank transfers (ANZ, NAB), PayID, Visa, Mastercard, and Zip Pay. All transactions are securely processed in Australian Dollars (AUD).'
    },
    {
      q: 'What passport validity is required for international travel?',
      a: 'Most countries require that your passport be valid for at least 6 months beyond your scheduled date of return to Australia. You must also hold valid visas for your destination and any transit hubs where visa-free transit is not permitted.'
    },
    {
      q: 'Can I request special meals, wheelchair assistance, or bassinet seats?',
      a: 'Yes! When placing your booking enquiry or speaking with our consultants, please inform us of any dietary requirements (vegetarian, Asian vegetarian, Halal, Jain, infant meals) or special mobility assistance. We submit these requests directly to the airline on your behalf.'
    },
    {
      q: `How does ${businessInfo.brandName} find cheap airfares to India and Asia?`,
      a: `${businessInfo.brandName} works directly with leading international airline partners and consolidators. Our travel specialists monitor fare availability across multiple airlines, layover routes, and promotional specials to offer you the most competitive fares without hidden surcharges.`
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEnquiryForm((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const errs = {};
    if (!enquiryForm.name.trim()) errs.name = 'Please enter your name';
    if (!enquiryForm.phone.trim()) errs.phone = 'Please enter your phone number';
    if (!enquiryForm.email.trim()) {
      errs.email = 'Please enter your email';
    } else if (!/\S+@\S+\.\S+/.test(enquiryForm.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const message = formatWhatsAppBookingMessage({
      enquiryType: `Help & Support Request: ${enquiryForm.subject}`,
      customerName: enquiryForm.name.trim(),
      email: enquiryForm.email.trim(),
      phone: enquiryForm.phone.trim(),
      additionalRequirements: enquiryForm.message.trim() || 'Requesting travel advice or quotation.',
      sourcePage: 'FAQ & Support Page'
    });

    const url = createWhatsAppUrl(message);
    setLeadModalMessage(message);
    setLeadModalUrl(url);

    openWhatsAppConversation(url);
    setLeadModalOpen(true);
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] pb-16">
      <WhatsAppLeadModal
        isOpen={leadModalOpen}
        onClose={() => setLeadModalOpen(false)}
        whatsappUrl={leadModalUrl}
        enquiryType="Support Enquiry"
        previewMessage={leadModalMessage}
      />

      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 py-12 text-center shadow-xs">
        <div className="max-w-[1200px] mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl font-black text-[#00204C]">
            Need Help &amp; FAQs
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Find answers to frequently asked questions or speak directly with our travel consultants.
          </p>
        </div>
      </div>

      <div className="max-w-[960px] mx-auto px-4 sm:px-6 my-10 space-y-8">
        {/* Contact Banner */}
        <div className="bg-[#00204C] text-white rounded-2xl p-6 sm:p-8 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#E8A500]">
              CUSTOMER ASSISTANCE • AUSTRALIA
            </span>
            <h2 className="text-xl sm:text-2xl font-black mt-1">
              Speak With a Travel Specialist
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 mt-1">
              Need urgent ticket changes, group booking quotes, or flight queries? We are here to help.
            </p>
          </div>
          <div className="shrink-0 flex flex-wrap gap-3">
            <a
              href={businessInfo.whatsapp.waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-xl font-bold text-xs tracking-wide transition-all shadow-md"
            >
              <i className="fab fa-whatsapp text-base"></i>
              <span>WhatsApp Us</span>
            </a>
            <a
              href={businessInfo.phone.telLink}
              className="inline-flex items-center gap-2 bg-[#E8A500] hover:bg-[#d69600] text-white px-5 py-3 rounded-xl font-black text-xs tracking-wide transition-all shadow-md"
            >
              <i className="fa fa-phone-alt"></i>
              <span>{businessInfo.phone.display}</span>
            </a>
          </div>
        </div>

        {/* Quick Contact Form */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200">
          <div className="border-b border-gray-100 pb-4 mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              FAST WHATSAPP RESPONSE
            </span>
            <h2 className="text-xl font-black text-[#00204C] mt-1">
              Request a Callback or Travel Quote
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Submit this quick form to generate a priority WhatsApp enquiry directly to our ticketing desk.
            </p>
          </div>

          {formSubmitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto text-xl shadow-xs">
                <i className="fab fa-whatsapp"></i>
              </div>
              <h3 className="font-bold text-emerald-950 text-base">Enquiry Created in WhatsApp!</h3>
              <p className="text-xs text-emerald-800 max-w-md mx-auto">
                We've prefilled your travel request for <strong>{businessInfo.whatsapp.display}</strong>. Remember to press <strong>Send</strong> in WhatsApp.
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <a
                  href={leadModalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition-colors"
                >
                  Open WhatsApp
                </a>
                <button
                  type="button"
                  onClick={() => setFormSubmitted(false)}
                  className="px-5 py-2.5 bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 font-bold text-xs rounded-lg transition-colors"
                >
                  Send another request
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleEnquirySubmit} noValidate className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={enquiryForm.name}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    className={`w-full px-3.5 py-2.5 bg-gray-50 border ${formErrors.name ? 'border-red-400' : 'border-gray-200'} rounded-lg text-sm font-semibold text-gray-800 focus:outline-none focus:bg-white focus:border-[#00204C]`}
                  />
                  {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={enquiryForm.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. 0412 345 678"
                    className={`w-full px-3.5 py-2.5 bg-gray-50 border ${formErrors.phone ? 'border-red-400' : 'border-gray-200'} rounded-lg text-sm font-semibold text-gray-800 focus:outline-none focus:bg-white focus:border-[#00204C]`}
                  />
                  {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={enquiryForm.email}
                    onChange={handleInputChange}
                    placeholder="name@example.com"
                    className={`w-full px-3.5 py-2.5 bg-gray-50 border ${formErrors.email ? 'border-red-400' : 'border-gray-200'} rounded-lg text-sm font-semibold text-gray-800 focus:outline-none focus:bg-white focus:border-[#00204C]`}
                  />
                  {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">
                  Enquiry Subject
                </label>
                <select
                  name="subject"
                  value={enquiryForm.subject}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold text-gray-800 focus:outline-none focus:bg-white"
                >
                  <option value="General Flight Enquiry">General Flight Enquiry</option>
                  <option value="India Airfare Quote">India Airfare Quote</option>
                  <option value="Group Booking Request">Group Booking Request (5+ Passengers)</option>
                  <option value="Urgent Date Change / Cancellation">Urgent Date Change / Cancellation</option>
                  <option value="Baggage / Special Meal Assistance">Baggage / Special Meal Assistance</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">
                  Message or Travel Details
                </label>
                <textarea
                  name="message"
                  rows="3"
                  value={enquiryForm.message}
                  onChange={handleInputChange}
                  placeholder="Tell us your travel dates, preferred destination, airline preferences, or question..."
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:bg-white focus:border-[#00204C]"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-2"
                >
                  <i className="fab fa-whatsapp text-base"></i>
                  <span>Send Enquiry via WhatsApp</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* FAQs Accordion */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200 space-y-4">
          <h2 className="text-xl font-black text-[#00204C] mb-4 pb-2 border-b border-gray-100">
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="border border-gray-200 rounded-xl overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                    className="w-full text-left p-4 sm:p-5 bg-white hover:bg-gray-50 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-gray-900 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <i
                      className={`fa fa-chevron-down text-xs text-gray-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#00204C]' : ''
                      }`}
                    ></i>
                  </button>

                  {isOpen && (
                    <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-gray-600 leading-relaxed bg-white border-t border-gray-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
