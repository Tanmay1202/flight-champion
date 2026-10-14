import React from 'react';

export default function ExperienceSection() {
  const cards = [
    {
      number: '01',
      title: 'Worldwide Flight Options.',
      description:
        'Explore international and domestic flights across an extensive network of airlines, routes and destinations.'
    },
    {
      number: '02',
      title: 'Competitive Airfares.',
      description:
        'We help travellers explore flight deals and affordable airfares while considering the schedule, route, baggage and flexibility that matter to their journey.'
    },
    {
      number: '03',
      title: 'Economy & Business Class Travel.',
      description:
        'From value-focused economy fares to premium business class flights, we help you explore options suited to your travel preferences.'
    },
    {
      number: '04',
      title: 'Personal Travel Expertise.',
      description:
        'Real assistance from travel professionals who understand that every itinerary has different priorities.'
    },
    {
      number: '05',
      title: 'Confidence Beyond Booking.',
      description:
        "Our service doesn't simply end when your airline ticket is issued. We're here to support the journey that follows."
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 bg-white overflow-hidden" id="experience">
      <div className="max-w-[1180px] mx-auto">
        {/* Section Header */}
        <div className="max-w-[780px] mx-auto mb-14 text-center">
          <span className="inline-block mb-4 text-[#b08a3e] text-xs font-bold tracking-[2.5px] uppercase">
            THE FLIGHTS CHAMPION EXPERIENCE
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#172b4d] tracking-tight mb-4">
            Travel With <span className="text-[#b08a3e]">Confidence</span>
          </h2>
          <p className="text-gray-500 text-base sm:text-lg leading-relaxed max-w-[650px] mx-auto">
            A more personal approach to flight booking, built around choice, expertise and service.
          </p>
        </div>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#e6eaf0] rounded-lg p-8 shadow-[0_8px_30px_rgba(23,43,77,0.06)] hover:shadow-[0_15px_40px_rgba(23,43,77,0.10)] hover:border-[#d7c08b] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="text-[#b08a3e] text-xs font-extrabold tracking-widest mb-6">
                  {card.number}
                </div>
                <h3 className="text-xl font-bold text-[#172b4d] mb-3">
                  {card.title}
                </h3>
                <p className="text-[#667085] text-sm sm:text-base leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Premium Section Card */}
        <div className="relative mt-20 p-8 sm:p-16 bg-[#172b4d] rounded-xl overflow-hidden shadow-xl">
          {/* Decorative gold line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-[#b08a3e]" />
          {/* Subtle circular background highlight */}
          <div className="absolute -right-32 -bottom-36 w-80 h-80 rounded-full border border-white/10 pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <span className="inline-block text-[#b08a3e] text-xs font-bold tracking-[2px] uppercase mb-4">
              A HIGHER STANDARD OF TRAVEL
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 leading-tight">
              More Than a Booking.<br />
              <span className="text-[#d6b66a]">A Better Travel Experience.</span>
            </h2>
            <div className="space-y-4 text-white/80 text-sm sm:text-base leading-relaxed">
              <p>
                For us, premium service isn't about adding complexity. It's about removing it.
              </p>
              <p>
                It's about thoughtful recommendations, attention to detail and knowing that when you
                choose Flights Champion, there are real people behind your journey.
              </p>
              <p>
                Wherever you're flying, whether across the country or across the world, discover a
                more personal approach to flight booking and international travel.
              </p>
            </div>
          </div>
        </div>

        {/* Closing Tagline */}
        <div className="pt-16 text-center">
          <div className="w-14 h-0.5 bg-[#b08a3e] mx-auto mb-6" />
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#172b4d] mb-2">
            Flights Champion
          </h3>
          <p className="text-[#b08a3e] text-sm font-bold tracking-[2px] uppercase">
            The World Within Reach.
          </p>
        </div>
      </div>
    </section>
  );
}
