import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { domesticDeals, internationalDeals } from '../data/deals';

export default function DestinationsAndDeals() {
  const [activeTab, setActiveTab] = useState('international');
  const [showAllInternational, setShowAllInternational] = useState(false);
  const [showAllDomestic, setShowAllDomestic] = useState(false);
  const navigate = useNavigate();

  const currentDeals = activeTab === 'international' ? internationalDeals : domesticDeals;
  const isExpanded = activeTab === 'international' ? showAllInternational : showAllDomestic;
  const visibleDeals = isExpanded ? currentDeals : currentDeals.slice(0, 5);

  const handleDealClick = (deal) => {
    const params = new URLSearchParams({
      triptype: 'oneway',
      adults: '1',
      children: '0',
      infant: '0',
      cabin_class: 'Y',
      'slices[0][from_location]': `${deal.from} (${deal.fromCode})`,
      'slices[0][from]': deal.fromCode,
      'slices[0][to_location]': `${deal.to} (${deal.toCode})`,
      'slices[0][to]': deal.toCode,
      'slices[0][travelling_date]': deal.date
    });
    navigate(`/search?${params.toString()}`);
  };

  const toggleExploreMore = () => {
    if (activeTab === 'international') {
      setShowAllInternational(!showAllInternational);
    } else {
      setShowAllDomestic(!showAllDomestic);
    }
  };

  return (
    <section className="max-w-[1200px] mx-auto px-4 sm:px-6 my-16" id="top-destinations">
      {/* Section Head */}
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#00204C]">
          Destinations and Deals
        </h2>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-3 mb-8">
        <button
          type="button"
          onClick={() => setActiveTab('international')}
          className={`px-6 py-2.5 rounded text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'international'
              ? 'bg-[#00204C] text-white shadow-md'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          International
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('domestic')}
          className={`px-6 py-2.5 rounded text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'domestic'
              ? 'bg-[#00204C] text-white shadow-md'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          Domestic
        </button>
      </div>

      {/* Deals Table Card */}
      <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
        {visibleDeals.map((deal, idx) => (
          <div
            key={idx}
            onClick={() => handleDealClick(deal)}
            className="flex flex-col md:flex-row md:items-center justify-between p-4 sm:p-5 border-b border-gray-100 hover:bg-blue-50/40 transition-colors cursor-pointer gap-4 group"
          >
            {/* Origin -> Arrow -> Destination */}
            <div className="flex items-center gap-4 sm:gap-6 flex-1">
              {/* Origin */}
              <div className="flex items-center gap-3 min-w-[140px] sm:min-w-[180px]">
                <img
                  src={`https://images.kiwi.com/airlines/64/${deal.airline}.png`}
                  alt={deal.airlineName}
                  className="w-12 h-12 object-contain rounded bg-white shadow-xs p-1 border border-gray-100"
                />
                <div>
                  <h4 className="font-bold text-gray-900 text-base leading-tight group-hover:text-[#00204C]">
                    {deal.from}
                  </h4>
                  <small className="text-gray-400 text-xs">{deal.fromCountry}</small>
                </div>
              </div>

              {/* Arrow */}
              <div className="text-gray-400 group-hover:text-[#E8A500] transition-colors">
                <i className="fa fa-arrow-right text-sm"></i>
              </div>

              {/* Destination */}
              <div className="min-w-[120px]">
                <h4 className="font-bold text-gray-900 text-base leading-tight group-hover:text-[#00204C]">
                  {deal.to}
                </h4>
                <small className="text-gray-400 text-xs">{deal.toCity}</small>
              </div>
            </div>

            {/* Promo Badge */}
            <div className="flex items-center">
              <span className="bg-[#eef3ff] text-[#00204C] px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                {deal.badge}
              </span>
            </div>

            {/* Trip Type */}
            <div className="text-sm text-gray-500 font-medium md:w-24">
              {deal.type}
            </div>

            {/* Price */}
            <div className="text-right">
              <div className="text-[#00204C] font-extrabold text-lg sm:text-xl">
                <span className="text-sm font-semibold text-gray-500 mr-1.5">From</span>
                A$ {deal.price.toFixed(2)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Explore More Deals Button */}
      {currentDeals.length > 5 && (
        <div className="text-center mt-7">
          <button
            type="button"
            onClick={toggleExploreMore}
            className="inline-block bg-[#00204C] hover:bg-[#001738] text-white px-7 py-3 rounded font-bold text-sm tracking-wide transition-all shadow-md hover:shadow-lg cursor-pointer"
          >
            {isExpanded ? 'Show less deals' : 'Explore more deals'}
          </button>
        </div>
      )}
    </section>
  );
}
