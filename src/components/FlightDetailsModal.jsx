import React from 'react';

export default function FlightDetailsModal({ isOpen, onClose, flight, activeTab = 'itinerary' }) {
  const [tab, setTab] = React.useState(activeTab);
  const [prevActiveTab, setPrevActiveTab] = React.useState(activeTab);

  if (activeTab !== prevActiveTab) {
    setPrevActiveTab(activeTab);
    setTab(activeTab);
  }

  if (!isOpen || !flight) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50/50 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <img
              src={flight.airlineLogo}
              alt={flight.airline}
              className="w-10 h-10 object-contain rounded bg-white p-1 border border-gray-100"
            />
            <div>
              <h3 className="font-extrabold text-[#00204C] text-base leading-tight">
                {flight.airline}
              </h3>
              <p className="text-xs text-gray-500 font-medium">
                {flight.fromLocation} → {flight.toLocation} • {flight.duration}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 flex items-center justify-center transition-colors"
          >
            <i className="fa fa-times text-sm"></i>
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-gray-200 px-6 pt-3 bg-white">
          <button
            type="button"
            onClick={() => setTab('itinerary')}
            className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 cursor-pointer ${
              tab === 'itinerary'
                ? 'border-[#00204C] text-[#00204C]'
                : 'border-transparent text-gray-400 hover:text-gray-700'
            }`}
          >
            Flight Details
          </button>
          <button
            type="button"
            onClick={() => setTab('baggage')}
            className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 cursor-pointer ${
              tab === 'baggage'
                ? 'border-[#00204C] text-[#00204C]'
                : 'border-transparent text-gray-400 hover:text-gray-700'
            }`}
          >
            Baggage Details
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {tab === 'itinerary' ? (
            <div className="space-y-6">
              <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100 flex items-center justify-between text-xs text-[#00204C] font-semibold">
                <div>
                  <span className="text-gray-500 mr-2">Travel Date:</span>
                  <span className="font-bold">{flight.dateFormatted || flight.date}</span>
                </div>
                <div>
                  <span className="text-gray-500 mr-2">Stops:</span>
                  <span className="font-bold">{flight.stopsLabel}</span>
                </div>
              </div>

              {/* Step by step segments */}
              <div className="space-y-4">
                {flight.itinerary ? (
                  flight.itinerary.map((item, idx) =>
                    item.segment ? (
                      <div key={idx} className="relative pl-6 border-l-2 border-[#00204C] py-1">
                        <div className="absolute -left-1.5 top-2 w-3 h-3 rounded-full bg-[#00204C]"></div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-bold text-gray-900">{item.segment}</span>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-mono font-semibold">
                            {item.flight}
                          </span>
                        </div>
                        <div className="text-xs text-gray-600 flex items-center justify-between">
                          <span>Departs: <strong className="text-gray-900">{item.departs}</strong></span>
                          <span>Arrives: <strong className="text-gray-900">{item.arrives}</strong></span>
                          <span>({item.duration})</span>
                        </div>
                      </div>
                    ) : (
                      <div key={idx} className="my-2 py-2 px-4 bg-amber-50/70 border border-amber-200 rounded-lg text-xs text-amber-800 flex items-center gap-2">
                        <i className="fa fa-clock"></i>
                        <span>{item.layover} ({item.duration})</span>
                      </div>
                    )
                  )
                ) : (
                  <div className="text-sm text-gray-600">
                    Direct flight between {flight.fromLocation} and {flight.toLocation}.
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-[#00204C] flex items-center justify-center shrink-0">
                    <i className="fa fa-suitcase-rolling text-sm"></i>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Cabin / Carry-on Baggage</h4>
                    <p className="text-xs text-gray-600 mt-0.5">
                      {flight.baggage?.carryOn || '1 piece up to 7 kg included per passenger'}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-1">Must fit in overhead locker (56 x 36 x 23 cm)</p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-3 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-[#E8A500] flex items-center justify-center shrink-0">
                    <i className="fa fa-suitcase text-sm"></i>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Checked Baggage</h4>
                    <p className="text-xs text-gray-600 mt-0.5">
                      {flight.baggage?.checked || 'Standard checked allowance applies to this fare.'}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-1">
                      Max weight: {flight.baggage?.weight || '20 kg'}. Excess baggage fees apply at the airport.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-blue-50 rounded-lg text-xs text-blue-800">
                <i className="fa fa-info-circle mr-1.5"></i>
                Baggage policies are set by {flight.airline} and may be subject to fare rules and changes.
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-5 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between rounded-b-2xl">
          <div>
            <span className="text-xs text-gray-500">Total Price: </span>
            <span className="text-lg font-black text-[#00204C]">A$ {flight.price.toFixed(2)}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-[#00204C] text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#E8A500] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
