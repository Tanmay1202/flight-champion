import React from 'react';
import { useNavigate } from 'react-router-dom';
import { topPicks } from '../data/destinations';

export default function TopPicks() {
  const navigate = useNavigate();

  const handleSearchClick = (pick) => {
    const params = new URLSearchParams({
      triptype: 'twoway',
      adults: '1',
      children: '0',
      infant: '0',
      cabin_class: 'Y',
      'slices[0][from_location]': 'Sydney (SYD)',
      'slices[0][from]': 'SYD',
      'slices[0][to_location]': `${pick.city} (${pick.code})`,
      'slices[0][to]': pick.code,
      'slices[0][travelling_date]': '2026-07-14',
      return_date: '2026-07-31'
    });
    navigate(`/search?${params.toString()}`);
  };

  return (
    <section className="max-w-[1200px] mx-auto px-4 sm:px-6 my-16" id="top-picks">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-6">
        Our top picks from Sydney (SYD)
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {topPicks.map((pick, index) => (
          <div
            key={index}
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-100 flex flex-col"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src={pick.image}
                alt={pick.city}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {pick.city} ({pick.code})
                </h3>
                <div className="text-xs text-gray-500 mb-3">{pick.cabinClass}</div>
                <div className="text-[#006c3b] text-2xl font-bold mb-3">
                  {pick.price}
                </div>
                <div className="text-xs text-gray-600 space-y-1 mb-5">
                  <div>{pick.tripType}</div>
                  <div>Travel: {pick.travelDates}</div>
                  <div className="text-amber-700 font-medium">{pick.expiry}</div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleSearchClick(pick)}
                className="w-full py-2.5 px-4 border border-gray-400 text-gray-800 rounded font-semibold text-sm hover:bg-[#00204C] hover:text-white hover:border-[#00204C] transition-colors cursor-pointer"
              >
                Search for flights
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
