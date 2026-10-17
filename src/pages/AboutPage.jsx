import React from 'react';
import ExperienceSection from '../components/ExperienceSection';
import AirlinePartners from '../components/AirlinePartners';
import GoogleReviews from '../components/GoogleReviews';
import { businessInfo } from '../data/businessInfo';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F1F5F9] pb-16">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 py-12 text-center shadow-xs">
        <div className="max-w-[1200px] mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl font-black text-[#00204C]">
            About Us
          </h1>
          <p className="text-sm text-gray-500 mt-2 max-w-xl mx-auto">
            {businessInfo.brandName} is an Australian-based international travel agency and flight booking specialist.
          </p>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 my-10 space-y-12">
        {/* Main Introduction Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-12 shadow-sm border border-gray-200 space-y-5 text-gray-700 leading-relaxed">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white rounded-xl p-2 border border-gray-100 shadow-xs">
              <img
                src={businessInfo.logo}
                alt={businessInfo.brandName}
                className="h-16 w-auto object-contain"
              />
            </div>
            <div>
              <h2 className="text-2xl font-black text-[#00204C]">
                A More Considered Way to Fly
              </h2>
              <p className="text-xs text-[#E8A500] font-bold uppercase tracking-wider">
                {businessInfo.legalName} • {businessInfo.abnFormatted}
              </p>
            </div>
          </div>

          <p className="text-base sm:text-lg">
            {businessInfo.brandName} is an international travel agency and flight booking specialist, bringing together global reach, travel expertise and personalized service to create a more considered way to fly.
          </p>
          <p className="text-base sm:text-lg">
            Whether you're searching for international flights, competitive airfares, airline tickets, economy flights, business class flights or journeys to destinations around the world, our focus is on helping you find an option that suits the way you want to travel.
          </p>
          <p>
            We are an Australian-based company that understands travelling isn’t always simple and finding the right flight at an affordable price requires genuine care. Our knowledgeable professionals assist you in crafting itinerary connections with top airlines, ensuring you get maximum value, flexible terms, and dependable support from start to finish.
          </p>
        </div>

        {/* Key Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#00204C] flex items-center justify-center text-xl mb-4">
              <i className="fa fa-globe-asia"></i>
            </div>
            <h3 className="font-extrabold text-base text-[#00204C] mb-2">Global Connectivity</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Extensive route options connecting Australian capitals to premier global destinations across India, Asia, Europe, and the Americas.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#E8A500] flex items-center justify-center text-xl mb-4">
              <i className="fa fa-tags"></i>
            </div>
            <h3 className="font-extrabold text-base text-[#00204C] mb-2">Competitive Pricing</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Negotiated airline fares and exclusive wholesale promotional inventory with no hidden booking surcharges.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl mb-4">
              <i className="fa fa-headset"></i>
            </div>
            <h3 className="font-extrabold text-base text-[#00204C] mb-2">Dedicated Support</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Real Australian travel experts ready to assist with flight alterations, baggage additions, date changes, and passenger requirements.
            </p>
          </div>
        </div>

        {/* Business Credentials Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200">
          <h3 className="text-lg font-black text-[#00204C] mb-4">Company Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <span className="text-gray-400 block font-bold uppercase mb-1">Legal Business Name</span>
              <span className="font-bold text-gray-900 text-sm">{businessInfo.legalName}</span>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <span className="text-gray-400 block font-bold uppercase mb-1">Trading Name</span>
              <span className="font-bold text-gray-900 text-sm">{businessInfo.brandName}</span>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <span className="text-gray-400 block font-bold uppercase mb-1">Australian Business Number (ABN)</span>
              <span className="font-bold text-gray-900 text-sm">{businessInfo.abn}</span>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <span className="text-gray-400 block font-bold uppercase mb-1">Australian Address</span>
              <span className="font-bold text-gray-900 text-sm">{businessInfo.address.full}</span>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <span className="text-gray-400 block font-bold uppercase mb-1">Calling Number</span>
              <a
                href={businessInfo.phone.telLink}
                className="font-bold text-blue-600 hover:underline text-sm block"
              >
                {businessInfo.phone.display}
              </a>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <span className="text-gray-400 block font-bold uppercase mb-1">WhatsApp &amp; Enquiries</span>
              <a
                href={businessInfo.whatsapp.waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-emerald-600 hover:underline text-sm block"
              >
                {businessInfo.whatsapp.display}
              </a>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 sm:col-span-2 lg:col-span-3">
              <span className="text-gray-400 block font-bold uppercase mb-1">Email Address</span>
              <a
                href={businessInfo.email.mailLink}
                className="font-bold text-blue-600 hover:underline text-sm"
              >
                {businessInfo.email.address}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Experience Section */}
      <ExperienceSection />

      {/* Airline Partners */}
      <AirlinePartners />

      {/* Reviews */}
      <GoogleReviews />
    </div>
  );
}
