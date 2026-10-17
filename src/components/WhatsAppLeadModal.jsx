import React from 'react';
import { businessInfo } from '../data/businessInfo';

export default function WhatsAppLeadModal({
  isOpen,
  onClose,
  whatsappUrl,
  enquiryType = 'Booking Enquiry',
  previewMessage = ''
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-[#00204C] text-white p-6 text-center relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
            aria-label="Close"
          >
            <i className="fa fa-times text-lg"></i>
          </button>
          <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3 text-white text-2xl shadow-lg">
            <i className="fab fa-whatsapp"></i>
          </div>
          <h3 className="text-xl font-black">Enquiry Ready in WhatsApp!</h3>
          <p className="text-xs text-white/80 mt-1">
            Destination: {businessInfo.whatsapp.display} (FlyNest Travel)
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-800">
              <i className="fa fa-info-circle text-base"></i>
              <span>Important Action Required</span>
            </div>
            <p>
              Your {enquiryType.toLowerCase()} has been prepared. When WhatsApp opens, please remember to click the <strong>Send</strong> button (arrow icon) to transmit your enquiry to our travel specialists.
            </p>
          </div>

          {previewMessage && (
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                Prepared Message Preview:
              </label>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-3.5 max-h-40 overflow-y-auto font-mono text-xs text-gray-700 whitespace-pre-wrap">
                {previewMessage}
              </div>
            </div>
          )}

          <div className="space-y-2 pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <i className="fab fa-whatsapp text-lg"></i>
              <span>Open in WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 text-xs font-bold text-gray-500 hover:text-gray-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
