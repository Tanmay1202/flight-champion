import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { businessInfo } from '../data/businessInfo';
import { createWhatsAppUrl } from '../utils/whatsapp';

export default function BookingConfirmationPage() {
  const location = useLocation();
  const state = location.state || {};
  const {
    reference = 'FN-839201',
    passenger,
    flight,
    cabinClass = 'Economy',
    whatsappUrl: passedWhatsAppUrl
  } = state;

  const defaultWaUrl = createWhatsAppUrl(
    `Hello FlyNest Travel,\n\nI am inquiring about booking reference ${reference}.\n\nSource: FlyNest Travel website\n\nThank you.`
  );

  const activeWhatsAppUrl = passedWhatsAppUrl || defaultWaUrl;

  return (
    <div className="min-h-screen bg-[#F1F5F9] py-14 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 sm:p-12 text-center mb-8">
          {/* Logo */}
          <div className="mb-6 flex justify-center">
            <div className="bg-white rounded-xl p-2 border border-gray-100 shadow-xs inline-flex">
              <img
                src={businessInfo.logo}
                alt={businessInfo.brandName}
                className="h-14 w-auto object-contain"
              />
            </div>
          </div>

          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5 text-2xl shadow-inner">
            <i className="fa fa-check"></i>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-[#00204C] mb-2">
            Booking Enquiry Received!
          </h1>
          <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
            Thank you for choosing {businessInfo.brandName}. Your booking enquiry has been registered
            and prepared for our ticketing team.
          </p>

          <div className="inline-block bg-blue-50/80 border border-blue-200 rounded-xl px-6 py-3.5 mb-6">
            <span className="text-xs uppercase font-extrabold tracking-widest text-gray-500 mr-2">
              Booking Reference:
            </span>
            <span className="text-lg font-black text-[#00204C] tracking-wider font-mono">
              {reference}
            </span>
          </div>

          {/* WhatsApp Direct Action Box */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 mb-8 text-left space-y-3">
            <div className="flex items-center gap-2.5 text-emerald-900 font-bold text-sm">
              <i className="fab fa-whatsapp text-2xl text-emerald-600"></i>
              <span>Complete Your Enquiry on WhatsApp</span>
            </div>
            <p className="text-xs text-emerald-800 leading-relaxed">
              We opened a WhatsApp chat with <strong>{businessInfo.brandName} ({businessInfo.whatsapp.display})</strong> containing your travel itinerary and passenger details.
              <strong className="block mt-1">Please confirm you pressed "Send" in WhatsApp so our team receives your request.</strong>
            </p>
            <div className="pt-1">
              <a
                href={activeWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider px-5 py-2.5 rounded-lg transition-colors shadow-xs"
              >
                <i className="fab fa-whatsapp text-sm"></i>
                <span>Open / Re-send in WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6 text-left space-y-6">
            {/* Flight Summary */}
            {flight && (
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-3">
                  Flight Details
                </h3>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={flight.airlineLogo}
                      alt={flight.airline}
                      className="w-10 h-10 object-contain rounded bg-white p-1 border border-gray-100"
                    />
                    <div>
                      <h4 className="font-bold text-sm text-[#00204C]">{flight.airline}</h4>
                      <p className="text-xs text-gray-500">{flight.fromLocation} → {flight.toLocation}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-gray-600 block">{flight.date}</span>
                    <span className="text-sm font-extrabold text-[#00204C]">
                      {flight.depTime} - {flight.arrTime}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Passenger Info */}
            {passenger && (
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-3">
                  Lead Traveller
                </h3>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-gray-400 block">Name:</span>
                    <span className="font-bold text-gray-800">
                      {passenger.title} {passenger.firstName} {passenger.lastName}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Email:</span>
                    <span className="font-bold text-gray-800">{passenger.email}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Contact:</span>
                    <span className="font-bold text-gray-800">{passenger.contactNumber}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Document:</span>
                    <span className="font-bold text-gray-800">
                      {passenger.travelDocument} ({passenger.documentNumber})
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Nationality:</span>
                    <span className="font-bold text-gray-800">{passenger.nationality}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Cabin Class:</span>
                    <span className="font-bold text-gray-800">{cabinClass}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Next Steps Info */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 space-y-1.5">
              <div className="font-bold flex items-center gap-1.5">
                <i className="fa fa-info-circle text-amber-600"></i>
                <span>What happens next?</span>
              </div>
              <p>
                Our travel consultants will review your fare rules and contact you via WhatsApp at{' '}
                <strong>{businessInfo.whatsapp.display}</strong>, phone at{' '}
                <a href={businessInfo.phone.telLink} className="underline font-bold">
                  {businessInfo.phone.display}
                </a>
                , or email at{' '}
                <a href={businessInfo.email.mailLink} className="underline font-bold">
                  {businessInfo.email.address}
                </a>{' '}
                with confirmed itinerary details and payment instructions.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => window.print()}
              className="w-full sm:w-auto px-6 py-3 border border-gray-300 rounded-lg text-xs font-bold uppercase tracking-wider text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2"
            >
              <i className="fa fa-print"></i>
              <span>Print Itinerary</span>
            </button>
            <Link
              to="/"
              className="w-full sm:w-auto px-8 py-3 bg-[#00204C] hover:bg-[#001738] text-white rounded-lg text-xs font-extrabold uppercase tracking-wider transition-colors shadow-sm"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
