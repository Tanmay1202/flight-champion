import React from 'react';

export default function AboutSection() {
  return (
    <section className="py-14 px-4 sm:px-6 bg-white" id="about">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#00204C]">
            About Flights Champion
          </h2>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 sm:p-10 max-w-4xl mx-auto">
          <div className="space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed">
            <p>
              Flights Champion is an international travel agency and flight booking specialist,
              bringing together global reach, travel expertise and personalized service to create a
              more considered way to fly.
            </p>
            <p>
              Whether you're searching for international flights, competitive airfares, airline
              tickets, economy flights, business class flights or journeys to destinations around the
              world, our focus is on helping you find an option that suits the way you want to
              travel.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
