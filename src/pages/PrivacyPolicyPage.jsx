import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#F1F5F9] pb-16">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 py-12 text-center shadow-xs">
        <div className="max-w-[1200px] mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl font-black text-[#00204C]">
            Privacy Policy
          </h1>
          <p className="text-xs text-gray-500 uppercase tracking-widest mt-2">
            Flights Champion • Australian Privacy Principles (APPs)
          </p>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 my-10">
        <div className="bg-white rounded-2xl p-6 sm:p-12 shadow-sm border border-gray-200 text-gray-700 text-sm sm:text-base leading-relaxed space-y-6">
          <p>
            At <strong>Flights Champion</strong> (ABN: <strong>86 638 581 558</strong>), we are committed to protecting the privacy and confidentiality of your personal information. This Privacy Policy sets out how we collect, use, disclose, manage, and protect your personal information in accordance with the <em>Privacy Act 1988</em> (Cth) and the Australian Privacy Principles (APPs).
          </p>

          <div className="border-l-4 border-blue-600 bg-blue-50/60 p-4 rounded-r-lg font-bold text-lg sm:text-xl text-[#00204C] my-6">
            1. What Personal Information We Collect
          </div>
          <p>
            To process flight enquiries, make airline reservations, and provide personalized travel services, we may collect:
          </p>
          <ul className="list-disc pl-6 space-y-1.5">
            <li>Name, title, gender, and date of birth</li>
            <li>Passport number, nationality, issue and expiry dates</li>
            <li>Contact details, including email address, telephone number, and residential address</li>
            <li>Frequent flyer program details and airline seating/meal preferences</li>
            <li>Payment details such as credit/debit card numbers or transaction reference codes</li>
            <li>Travel itinerary details, travel dates, origins, and destinations</li>
          </ul>

          <div className="border-l-4 border-blue-600 bg-blue-50/60 p-4 rounded-r-lg font-bold text-lg sm:text-xl text-[#00204C] my-6">
            2. How We Collect Personal Information
          </div>
          <p>
            We collect personal information directly from you when you submit a booking enquiry through our website, make a reservation via telephone, contact us via email, or subscribe to our newsletter and promotional travel updates.
          </p>

          <div className="border-l-4 border-blue-600 bg-blue-50/60 p-4 rounded-r-lg font-bold text-lg sm:text-xl text-[#00204C] my-6">
            3. Purpose of Collection and Use
          </div>
          <p>
            We collect and use your personal information primarily to:
          </p>
          <ul className="list-disc pl-6 space-y-1.5">
            <li>Facilitate flight searches, booking requests, and ticketing with international and domestic airlines</li>
            <li>Communicate with you regarding changes, flight delays, ticketing schedules, or itinerary updates</li>
            <li>Provide customer support, process refunds, or address booking enquiries</li>
            <li>Verify identity and ensure compliance with border security and civil aviation regulations</li>
            <li>Send newsletters and special airfare offers where you have consented to receive marketing</li>
          </ul>

          <div className="border-l-4 border-blue-600 bg-blue-50/60 p-4 rounded-r-lg font-bold text-lg sm:text-xl text-[#00204C] my-6">
            4. Disclosure to Third Parties and Overseas Recipients
          </div>
          <p>
            Because international travel inherently involves cross-border transportation, we necessarily disclose your passenger details to third parties, including:
          </p>
          <ul className="list-disc pl-6 space-y-1.5">
            <li>Airlines, consolidators, and Global Distribution Systems (GDS) such as Amadeus or Sabre</li>
            <li>Government departments, customs, immigration, and border protection agencies where mandated by international aviation law</li>
            <li>Payment processing providers and banking institutions for transaction authorization</li>
          </ul>

          <div className="border-l-4 border-blue-600 bg-blue-50/60 p-4 rounded-r-lg font-bold text-lg sm:text-xl text-[#00204C] my-6">
            5. Security of Your Information
          </div>
          <p>
            We take reasonable technical and organizational precautions to protect your personal information from misuse, loss, unauthorized access, modification, or disclosure. All data transmissions through our website are secured with Industry-Standard Transport Layer Security (TLS/SSL) encryption.
          </p>

          <div className="border-l-4 border-blue-600 bg-blue-50/60 p-4 rounded-r-lg font-bold text-lg sm:text-xl text-[#00204C] my-6">
            6. Access and Correction
          </div>
          <p>
            You have the right to request access to the personal information we hold about you and to request corrections if you believe the information is inaccurate, out of date, or incomplete.
          </p>

          <div className="border-l-4 border-blue-600 bg-blue-50/60 p-4 rounded-r-lg font-bold text-lg sm:text-xl text-[#00204C] my-6">
            7. Contact Us Regarding Privacy
          </div>
          <p>
            If you have questions, feedback, or complaints regarding our privacy practices, please contact our Privacy Officer at:
          </p>
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 text-sm font-semibold space-y-1">
            <p><strong>Flights Champion</strong> (ABN: 86 638 581 558)</p>
            <p>Address: 7 SLATER PL EVATT, 2617 ACT, Australia</p>
            <p>Phone: <a href="tel:+61290372197" className="text-blue-600 hover:underline">+61-290372197</a></p>
            <p>Email: <a href="mailto:info@flightschampion.com.au" className="text-blue-600 hover:underline">info@flightschampion.com.au</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}
