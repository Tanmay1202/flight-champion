import React from 'react';

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-[#F1F5F9] pb-16">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 py-12 text-center shadow-xs">
        <div className="max-w-[1200px] mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl font-black text-[#00204C]">
            Terms &amp; Conditions
          </h1>
          <p className="text-xs text-gray-500 uppercase tracking-widest mt-2">
            Last updated: October 2026
          </p>
        </div>
      </div>

      {/* Terms Body */}
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 my-10">
        <div className="bg-white rounded-2xl p-6 sm:p-12 shadow-sm border border-gray-200 text-gray-700 text-sm sm:text-base leading-relaxed space-y-6">
          <p>
            Welcome to <strong>flightschampion.com.au</strong> (the “Website”). This Website is owned and operated by{' '}
            <strong>FLIGHTS CHAMPION</strong> (ABN: <strong>86 638 581 558</strong>) (referred to as “Flights Champion”,
            “we”, “us”, or “our”).
          </p>

          <p>
            Please read these Terms and Conditions carefully before using our Website or making any flight bookings. By
            accessing our Website, using our services, or making a booking, you agree to be bound by these Terms and
            Conditions, our Privacy Policy, and the specific terms and conditions of the airlines and other third-party
            travel service providers involved in your booking.
          </p>

          <p>
            If you do not agree to these Terms and Conditions, you must not use this Website or our booking services.
          </p>

          {/* Section 1 */}
          <div className="border-l-4 border-blue-600 bg-blue-50/60 p-4 rounded-r-lg font-bold text-lg sm:text-xl text-[#00204C] my-6">
            1. Our Role as an Agent
          </div>

          <h3 className="text-base font-extrabold text-[#00204C]">1.1 Agency Only</h3>
          <p>
            Flights Champion acts as an independent travel agent. We arrange and facilitate flight bookings on behalf of third-party airlines and suppliers. We do not own, manage, or operate aircraft or flight services. When you make a booking through us, your contract for flight carriage is directly with the airline, subject to their terms and conditions of carriage.
          </p>

          <h3 className="text-base font-extrabold text-[#00204C]">1.2 Supplier Terms</h3>
          <p>
            Airlines operate according to their own conditions of carriage, fare rules, baggage policies, check-in requirements, and cancellation conditions. It is your responsibility to review and comply with all supplier terms applicable to your journey.
          </p>

          {/* Section 2 */}
          <div className="border-l-4 border-blue-600 bg-blue-50/60 p-4 rounded-r-lg font-bold text-lg sm:text-xl text-[#00204C] my-6">
            2. Bookings and Payments
          </div>

          <p>
            All bookings are subject to availability and airline confirmation. When you submit a booking request or enquiry through our Website, it represents an offer to purchase tickets. A binding contract is only formed when tickets have been confirmed and electronic ticket documents issued.
          </p>

          <p>
            Payment must be received in full before tickets can be issued. Prices quoted on the Website are in Australian Dollars (AUD) unless explicitly stated otherwise. We accept approved payment methods including electronic funds transfer, PayID, and authorized credit/debit cards.
          </p>

          {/* Section 3 */}
          <div className="border-l-4 border-blue-600 bg-blue-50/60 p-4 rounded-r-lg font-bold text-lg sm:text-xl text-[#00204C] my-6">
            3. Fares, Taxes and Currency
          </div>

          <p>
            Fares are subject to change without prior notice until payment is finalized and tickets are issued. Fares displayed include applicable mandatory Australian and foreign airport taxes, government charges, and airline fuel surcharges known at the time of quotation. Any optional ancillary services, such as excess baggage, seat selection, or inflight catering, may incur additional airline fees.
          </p>

          {/* Section 4 */}
          <div className="border-l-4 border-blue-600 bg-blue-50/60 p-4 rounded-r-lg font-bold text-lg sm:text-xl text-[#00204C] my-6">
            4. Changes and Cancellations
          </div>

          <p>
            Any request to alter or cancel an issued airline ticket is subject to the specific fare rules of the airline. Many promotional, discounted, or economy airfares are non-refundable or incur substantial cancellation and reissuing penalties imposed by the carrier.
          </p>

          <p>
            In addition to any airline fees, Flights Champion may charge a reasonable administrative processing fee to cover the costs associated with amending or cancelling travel arrangements on your behalf.
          </p>

          {/* Section 5 */}
          <div className="border-l-4 border-blue-600 bg-blue-50/60 p-4 rounded-r-lg font-bold text-lg sm:text-xl text-[#00204C] my-6">
            5. Passports, Visas and Health Requirements
          </div>

          <p>
            It is solely your responsibility to ensure that all passengers hold valid passports (typically with at least 6 months validity beyond intended return dates), valid entry or transit visas, re-entry permits, and comply with all applicable health and vaccination requirements for all destinations on your itinerary.
          </p>

          {/* Section 6 */}
          <div className="border-l-4 border-blue-600 bg-blue-50/60 p-4 rounded-r-lg font-bold text-lg sm:text-xl text-[#00204C] my-6">
            6. Limitation of Liability
          </div>

          <h3 className="text-base font-extrabold text-[#00204C]">6.1 Consumer Guarantees</h3>
          <p>
            Our services come with guarantees that cannot be excluded under the Australian Consumer Law. For major failures with our booking agency services, you are entitled to cancel your service contract with us and to a refund of unused agency fees.
          </p>

          <h3 className="text-base font-extrabold text-[#00204C]">6.2 Disclaimer</h3>
          <p>
            Flights Champion is not liable for airline schedule changes, cancellations, flight delays, mechanical issues, industrial action, bad weather, force majeure events, or baggage loss or damage caused by airlines or third parties.
          </p>

          <h3 className="text-base font-extrabold text-[#00204C]">6.3 Indirect and Consequential Loss</h3>
          <p>
            To the extent permitted by law, Flights Champion will not be liable for indirect, special, economic, or consequential loss or damage arising from your use of the Website or our services. Nothing in these Terms and Conditions limits liability where such limitation is prohibited by applicable law.
          </p>

          {/* Section 7 */}
          <div className="border-l-4 border-blue-600 bg-blue-50/60 p-4 rounded-r-lg font-bold text-lg sm:text-xl text-[#00204C] my-6">
            7. Intellectual Property
          </div>

          <h3 className="text-base font-extrabold text-[#00204C]">7.1 Ownership</h3>
          <p>
            All content on this Website, including text, graphics, logos, images, software, design, and other materials, is owned by Flights Champion or its licensors and is protected by applicable Australian and international intellectual property laws.
          </p>

          <h3 className="text-base font-extrabold text-[#00204C]">7.2 Limited Licence</h3>
          <p>
            You are granted a limited, revocable, non-transferable licence to access and view the Website and download or print content solely for personal, non-commercial purposes related to your use of our flight booking services.
          </p>

          {/* Section 8 */}
          <div className="border-l-4 border-blue-600 bg-blue-50/60 p-4 rounded-r-lg font-bold text-lg sm:text-xl text-[#00204C] my-6">
            8. Governing Law
          </div>

          <p>
            These Terms and Conditions are governed by and construed in accordance with the laws of the Australian Capital Territory (ACT), Australia. You agree to submit to the non-exclusive jurisdiction of the courts of the ACT.
          </p>

          {/* Section 9 */}
          <div className="border-l-4 border-blue-600 bg-blue-50/60 p-4 rounded-r-lg font-bold text-lg sm:text-xl text-[#00204C] my-6">
            9. Contact Us
          </div>

          <p>
            For any queries or assistance regarding these Terms and Conditions, please contact us at:
          </p>
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 space-y-1 text-sm font-semibold">
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
