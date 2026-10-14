import React, { useState } from 'react';

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'How do I change or cancel my flight?',
      a: 'To request a date change or flight cancellation, please contact our support team immediately at +61-290372197 or email info@flightschampion.com.au with your booking reference number. Because airfares are governed by individual airline fare rules, change fees or cancellation penalties set by the carrier will apply in addition to our agency processing fee.'
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
      q: 'How does Flights Champion find cheap airfares to India and Asia?',
      a: 'Flights Champion works directly with leading international airline partners and consolidators. Our travel specialists monitor fare availability across multiple airlines, layover routes, and promotional specials to offer you the most competitive fares without hidden surcharges.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F1F5F9] pb-16">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 py-12 text-center shadow-xs">
        <div className="max-w-[1200px] mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl font-black text-[#00204C]">
            Need Help &amp; FAQs
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Find answers to frequently asked questions about flight bookings, baggage, and changes.
          </p>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-4 sm:px-6 my-10 space-y-8">
        {/* Contact Banner */}
        <div className="bg-[#00204C] text-white rounded-2xl p-6 sm:p-8 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#E8A500]">
              24/7 CUSTOMER ASSISTANCE
            </span>
            <h2 className="text-xl sm:text-2xl font-black mt-1">
              Speak With a Travel Consultant
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 mt-1">
              Need urgent ticket changes, group booking quotes, or flight enquiries?
            </p>
          </div>
          <div className="shrink-0 text-center sm:text-right">
            <a
              href="tel:+61290372197"
              className="inline-flex items-center gap-2 bg-[#E8A500] hover:bg-[#d69600] text-white px-6 py-3 rounded-xl font-black text-sm tracking-wide transition-all shadow-md"
            >
              <i className="fa fa-phone-alt"></i>
              <span>+61-290372197</span>
            </a>
          </div>
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
