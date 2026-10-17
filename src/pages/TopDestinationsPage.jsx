import React from 'react';
import { useNavigate } from 'react-router-dom';
import { topDestinationsList } from '../data/destinations';
import DestinationsAndDeals from '../components/DestinationsAndDeals';
import TopPicks from '../components/TopPicks';

export default function TopDestinationsPage() {
  const navigate = useNavigate();

  const handleDestinationSearch = (dest) => {
    const params = new URLSearchParams({
      triptype: 'oneway',
      adults: '1',
      children: '0',
      infant: '0',
      cabin_class: 'Y',
      'slices[0][from_location]': 'Sydney (SYD)',
      'slices[0][from]': 'SYD',
      'slices[0][to_location]': dest.popularCities[0],
      'slices[0][to]': dest.popularCities[0].match(/\(([^)]+)\)/)?.[1] || 'DEL',
      'slices[0][travelling_date]': '2026-10-25'
    });
    navigate(`/search?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] pb-16">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 py-12 text-center shadow-xs">
        <div className="max-w-[1200px] mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl font-black text-[#00204C]">
            Top Destinations &amp; Cheap Airfare Deals
          </h1>
          <p className="text-sm text-gray-500 mt-2 max-w-xl mx-auto">
            Compare discounted airfares from Sydney, Melbourne, Perth, and Brisbane to top international destinations.
          </p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 my-10 space-y-12">
        {/* Destination Guide Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topDestinationsList.map((dest) => (
            <div
              key={dest.slug}
              id={dest.slug}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xl font-bold text-[#00204C]">{dest.title}</h2>
                  <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                    From {dest.startingPrice}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-gray-600 mb-4 leading-relaxed">
                  {dest.description}
                </p>

                <div className="mb-6">
                  <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider block mb-2">
                    Popular Arrival Airports:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {dest.popularCities.map((city, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-[11px] font-semibold px-2 py-0.5 rounded cursor-pointer transition-colors"
                      >
                        {city}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => handleDestinationSearch(dest)}
                  className="w-full py-2.5 bg-[#00204C] hover:bg-[#E8A500] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer text-center"
                >
                  Search Flights to {dest.country}
                </button>
                <a
                  href={`https://wa.me/61452571822?text=${encodeURIComponent(`Hello FlyNest Travel,\n\nI would like to make a travel booking enquiry for flights to ${dest.country}.\n\nEnquiry type: Destination Airfare Enquiry\nDestination: ${dest.country}\nStarting fare: ${dest.startingPrice}\n\nSource: FlyNest Travel website\n\nPlease contact me regarding available flight options and deals.\n\nThank you.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer text-center flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <i className="fab fa-whatsapp"></i>
                  <span>Enquire via WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Live Deals Section */}
        <DestinationsAndDeals />

        {/* Top Picks Section */}
        <TopPicks />
      </div>
    </div>
  );
}
