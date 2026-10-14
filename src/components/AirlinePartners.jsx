import React from 'react';
import { airlinePartners } from '../data/airlines';

export default function AirlinePartners() {
  return (
    <section className="py-14 px-4 sm:px-6 bg-[#F1F5F9]" id="airline-partners">
      <div className="max-w-[1200px] mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#00204C]">
            Airline Partners
          </h2>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4 items-center">
          {airlinePartners.map((airline, idx) => (
            <div
              key={idx}
              className="p-3 flex h-20 items-center justify-center rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow group"
              title={airline.name}
            >
              <img
                src={airline.logo}
                alt={airline.name}
                className="max-h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  // Fallback to text label if logo cannot load
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = `<span class="font-bold text-xs text-gray-700 text-center">${airline.name}</span>`;
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
