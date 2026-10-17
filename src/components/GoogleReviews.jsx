import React, { useState } from 'react';
import { googleReviews } from '../data/reviews';

export default function GoogleReviews() {
  const [activeShareId, setActiveShareId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const toggleShare = (id) => {
    setActiveShareId(activeShareId === id ? null : id);
  };

  const getShareUrl = () => {
    if (typeof window !== 'undefined') {
      return window.location.origin;
    }
    return 'https://flynesttravels.com.au';
  };

  const handleCopyLink = (id) => {
    navigator.clipboard.writeText(getShareUrl());
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section className="bg-white py-16 px-4 sm:px-6" id="reviews">
      <div className="max-w-[1200px] mx-auto">
        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#00204C]">
            Google Reviews
          </h2>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {googleReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative"
            >
              <div>
                {/* Reviewer Header */}
                <div className="flex items-center gap-3.5 mb-4">
                  <div
                    className={`w-11 h-11 rounded-full ${review.initialBg} text-white flex items-center justify-center font-bold text-lg shadow-sm`}
                  >
                    {review.initial}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{review.name}</h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="flex text-amber-400 text-xs gap-0.5">
                        {[...Array(review.rating)].map((_, i) => (
                          <i key={i} className="fa fa-star"></i>
                        ))}
                      </div>
                      <span className="text-[11px] text-gray-400 font-medium">{review.time}</span>
                    </div>
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {review.text}
                </p>
              </div>

              {/* Review Card Footer */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600 relative">
                <a
                  href="https://www.google.com/search?q=flynest+travel+pty+ltd+australia+reviews"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 font-semibold hover:text-[#00204C] transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>View on Google</span>
                </a>

                {/* Share Icon */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => toggleShare(review.id)}
                    className="p-1.5 text-gray-500 hover:text-gray-800 transition-colors"
                    aria-label="Share review"
                  >
                    <i className="fa fa-share-alt"></i>
                  </button>

                  {/* Share Menu Popup */}
                  {activeShareId === review.id && (
                    <div className="absolute right-0 bottom-full mb-2 bg-white border border-gray-200 shadow-xl rounded-lg py-2 px-3 flex items-center gap-3 z-30">
                      <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getShareUrl())}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:opacity-80 text-sm"
                        title="Share on Facebook"
                      >
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getShareUrl())}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-700 hover:opacity-80 text-sm"
                        title="Share on LinkedIn"
                      >
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                      <a
                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(getShareUrl())}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-900 hover:opacity-80 text-sm"
                        title="Share on X"
                      >
                        <i className="fab fa-x-twitter"></i>
                      </a>
                      <button
                        type="button"
                        onClick={() => handleCopyLink(review.id)}
                        className="text-gray-600 hover:text-gray-900 text-sm"
                        title="Copy Link"
                      >
                        <i className={`fa ${copiedId === review.id ? 'fa-check text-green-600' : 'fa-link'}`}></i>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SociableKIT Attribution */}
        <div className="text-center mt-10">
          <a
            href="https://www.sociablekit.com"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-blue-600 hover:underline"
          >
            Google Reviews Widget by SociableKIT
          </a>
        </div>
      </div>
    </section>
  );
}
