import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { sampleFlights } from '../data/flights';
import FlightDetailsModal from '../components/FlightDetailsModal';
import Toast from '../components/Toast';

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Read params
  const tripType = searchParams.get('triptype') || 'oneway';
  const fromParam = searchParams.get('slices[0][from_location]') || 'Perth (PER)';
  const toParam = searchParams.get('slices[0][to_location]') || 'Melbourne (MEL)';
  const departDateParam = searchParams.get('slices[0][travelling_date]') || '2026-10-24';
  const returnDateParam = searchParams.get('return_date') || '2026-10-17';
  const adultsParam = searchParams.get('adults') || '1';
  const cabinClassParam = searchParams.get('cabin_class') || 'Y';

  // Filters state
  const [stopFilter, setStopFilter] = useState('any'); // 'direct', '1stop', 'any'
  const [maxBudget, setMaxBudget] = useState(1500);
  const [minBudget, setMinBudget] = useState(0);
  const [timeOfDay, setTimeOfDay] = useState('all'); // 'morning', 'afternoon', 'evening', 'night', 'all'

  // Modal & Toast states
  const [selectedFlightForModal, setSelectedFlightForModal] = useState(null);
  const [modalTab, setModalTab] = useState('itinerary');
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Top edit bar state
  const [editFrom, setEditFrom] = useState(fromParam);
  const [editTo, setEditTo] = useState(toParam);
  const [editDepart, setEditDepart] = useState(departDateParam);
  const [editReturn, setEditReturn] = useState(returnDateParam);

  const resetFilters = () => {
    setStopFilter('any');
    setMinBudget(0);
    setMaxBudget(1500);
    setTimeOfDay('all');
  };

  const handleUpdateSearch = (e) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    newParams.set('slices[0][from_location]', editFrom);
    newParams.set('slices[0][to_location]', editTo);
    newParams.set('slices[0][travelling_date]', editDepart);
    if (tripType === 'twoway') {
      newParams.set('return_date', editReturn);
    }
    navigate(`/search?${newParams.toString()}`);
  };

  const swapLocations = () => {
    const temp = editFrom;
    setEditFrom(editTo);
    setEditTo(temp);
  };

  // Filter flights
  const filteredFlights = useMemo(() => {
    return sampleFlights.filter((flight) => {
      // Stops filter
      if (stopFilter === 'direct' && flight.stops !== 0) return false;
      if (stopFilter === '1stop' && flight.stops > 1) return false;

      // Budget filter
      if (flight.price < minBudget || flight.price > maxBudget) return false;

      // Time of day filter
      if (timeOfDay !== 'all' && flight.timeOfDay !== timeOfDay) return false;

      return true;
    });
  }, [stopFilter, minBudget, maxBudget, timeOfDay]);

  const handleSelectFlight = (flight) => {
    navigate(`/booking?flightId=${flight.id}&date=${departDateParam}&adults=${adultsParam}&class=${cabinClassParam}`);
  };

  const handleWhatsApp = (flight) => {
    const message = `Hi Flights Champion! I am interested in flight: ${flight.airline} (${flight.flightNumber}) from ${flight.fromLocation} to ${flight.toLocation} on ${flight.date} for A$ ${flight.price.toFixed(2)}`;
    window.open(`https://api.whatsapp.com/send?phone=61290372197&text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleEmail = (flight) => {
    const subject = `Flight Enquiry: ${flight.fromLocation} to ${flight.toLocation} (${flight.airline})`;
    const body = `Hello Flights Champion,\n\nI would like to enquire about the following flight:\nAirline: ${flight.airline}\nFlight: ${flight.flightNumber}\nRoute: ${flight.fromLocation} to ${flight.toLocation}\nDeparture: ${flight.depTime} (${flight.date})\nArrival: ${flight.arrTime}\nPrice: A$ ${flight.price.toFixed(2)}\n\nPlease contact me regarding booking this flight.\n\nThank you!`;
    window.location.href = `mailto:info@flightschampion.com.au?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleCopyClipboard = (flight) => {
    const text = `${flight.airline} | ${flight.fromLocation} → ${flight.toLocation} | Dep: ${flight.depTime} | Arr: ${flight.arrTime} | Price: A$ ${flight.price.toFixed(2)}`;
    navigator.clipboard.writeText(text);
    setToastMessage('Flight details copied to clipboard!');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] pb-16">
      {/* Toast Notification */}
      <Toast
        show={showToast}
        message={toastMessage}
        type="success"
        onClose={() => setShowToast(false)}
      />

      {/* Flight Details Modal */}
      <FlightDetailsModal
        isOpen={!!selectedFlightForModal}
        flight={selectedFlightForModal}
        activeTab={modalTab}
        onClose={() => setSelectedFlightForModal(null)}
      />

      {/* Top Search Modification Bar matching reference recording */}
      <div className="bg-white border-b border-gray-200 py-3 shadow-xs">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <form onSubmit={handleUpdateSearch} className="flex flex-wrap items-center gap-2.5">
            {/* Trip Type badge */}
            <div className="text-xs font-black uppercase text-[#00204C] px-3 py-2 bg-gray-100 rounded-md">
              {tripType === 'twoway' ? 'Round Trip' : tripType === 'oneway' ? 'One Way' : 'Multi-City'}
            </div>

            {/* Flying From */}
            <div className="flex-1 min-w-[150px] relative">
              <input
                type="text"
                value={editFrom}
                onChange={(e) => setEditFrom(e.target.value)}
                placeholder="Flying From"
                className="w-full pl-8 pr-2 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold uppercase text-gray-800 focus:bg-white focus:outline-none"
              />
              <i className="fa fa-plane-departure absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
            </div>

            {/* Swap Button */}
            <button
              type="button"
              onClick={swapLocations}
              className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-[#00204C] transition-colors"
              title="Swap origins and destinations"
            >
              <i className="fa fa-exchange-alt text-xs"></i>
            </button>

            {/* Flying To */}
            <div className="flex-1 min-w-[150px] relative">
              <input
                type="text"
                value={editTo}
                onChange={(e) => setEditTo(e.target.value)}
                placeholder="Flying To"
                className="w-full pl-8 pr-2 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold uppercase text-gray-800 focus:bg-white focus:outline-none"
              />
              <i className="fa fa-map-marker-alt absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
            </div>

            {/* Depart Date */}
            <div className="w-32 relative">
              <input
                type="date"
                value={editDepart}
                onChange={(e) => setEditDepart(e.target.value)}
                className="w-full pl-7 pr-2 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-gray-800 focus:bg-white focus:outline-none"
              />
              <i className="fa fa-calendar-alt absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
            </div>

            {/* Return Date (if round trip) */}
            {tripType === 'twoway' && (
              <div className="w-32 relative">
                <input
                  type="date"
                  value={editReturn}
                  onChange={(e) => setEditReturn(e.target.value)}
                  className="w-full pl-7 pr-2 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-gray-800 focus:bg-white focus:outline-none"
                />
                <i className="fa fa-calendar-alt absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
              </div>
            )}

            {/* Travellers */}
            <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-gray-800 flex items-center gap-1.5">
              <i className="fa fa-users text-gray-400"></i>
              <span>{adultsParam} Pax, {cabinClassParam}</span>
            </div>

            {/* Update Button */}
            <button
              type="submit"
              className="px-5 py-2 bg-[#00204C] hover:bg-[#001738] text-white rounded-lg text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <i className="fa fa-search text-xs"></i>
              <span>UPDATE</span>
            </button>
          </form>
        </div>
      </div>

      {/* Main Search Results Area */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Sidebar Filters */}
          <div className="lg:col-span-3 bg-white rounded-2xl p-5 shadow-sm border border-gray-200 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-extrabold text-xs uppercase tracking-widest text-[#00204C]">
                REFINE SEARCH
              </h3>
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs font-bold text-[#E8A500] hover:underline uppercase tracking-wide cursor-pointer"
              >
                RESET
              </button>
            </div>

            {/* Total Stops */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-3">
                TOTAL STOPS
              </h4>
              <div className="space-y-2 text-xs font-bold text-gray-700">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="stops"
                    checked={stopFilter === 'direct'}
                    onChange={() => setStopFilter('direct')}
                    className="accent-[#00204C] w-4 h-4 cursor-pointer"
                  />
                  <span>Direct Only</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="stops"
                    checked={stopFilter === '1stop'}
                    onChange={() => setStopFilter('1stop')}
                    className="accent-[#00204C] w-4 h-4 cursor-pointer"
                  />
                  <span>1 Stop or less</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="stops"
                    checked={stopFilter === 'any'}
                    onChange={() => setStopFilter('any')}
                    className="accent-[#00204C] w-4 h-4 cursor-pointer"
                  />
                  <span>Any Stops</span>
                </label>
              </div>
            </div>

            {/* Min Budget */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-gray-400">
                  MIN BUDGET
                </h4>
                <span className="text-xs font-extrabold text-[#00204C] bg-blue-50 px-2 py-0.5 rounded">
                  A$ {minBudget}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1000"
                step="50"
                value={minBudget}
                onChange={(e) => setMinBudget(Number(e.target.value))}
                className="w-full accent-[#00204C] cursor-pointer"
              />
            </div>

            {/* Max Budget */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-gray-400">
                  MAX BUDGET
                </h4>
                <span className="text-xs font-extrabold text-[#00204C] bg-blue-50 px-2 py-0.5 rounded">
                  A$ {maxBudget}
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="2000"
                step="50"
                value={maxBudget}
                onChange={(e) => setMaxBudget(Number(e.target.value))}
                className="w-full accent-[#00204C] cursor-pointer"
              />
            </div>

            {/* Departure Time Tiles */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-3">
                DEPARTURE TIME
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'morning', label: 'MORNING', icon: '🌅' },
                  { id: 'afternoon', label: 'AFTERNOON', icon: '☀️' },
                  { id: 'evening', label: 'EVENING', icon: '🌆' },
                  { id: 'night', label: 'NIGHT', icon: '🌙' }
                ].map((slot) => (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => setTimeOfDay(timeOfDay === slot.id ? 'all' : slot.id)}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                      timeOfDay === slot.id
                        ? 'border-[#00204C] bg-blue-50/50 shadow-xs'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <span className="text-xl">{slot.icon}</span>
                    <span className="text-[10px] font-black uppercase tracking-wider text-gray-700">
                      {slot.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Main Content: Flights List */}
          <div className="lg:col-span-9 space-y-4">
            {/* List Heading */}
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-black text-[#00204C]">Departure flights</h2>
              <span className="bg-gray-200 text-gray-700 text-xs font-bold px-3 py-1 rounded-full">
                {filteredFlights.length} found
              </span>
            </div>

            {/* Flights Cards */}
            {filteredFlights.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 text-center border border-gray-200 shadow-sm">
                <i className="fa fa-plane-slash text-4xl text-gray-300 mb-3"></i>
                <h3 className="text-base font-bold text-gray-800">No flights found matching your filters</h3>
                <p className="text-xs text-gray-500 mt-1 mb-4">Try clearing some filters or searching a different date.</p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="px-5 py-2 bg-[#00204C] text-white text-xs font-bold rounded-lg uppercase tracking-wide"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              filteredFlights.map((flight) => (
                <div
                  key={flight.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      {/* Left: Airline + Stops */}
                      <div className="md:col-span-4 flex items-center gap-3.5">
                        <img
                          src={flight.airlineLogo}
                          alt={flight.airline}
                          className="w-12 h-12 object-contain rounded-md bg-white p-1 border border-gray-100 shrink-0"
                        />
                        <div>
                          <h4 className="font-extrabold text-[#00204C] text-sm leading-tight">
                            {flight.airline}
                          </h4>
                          <span className="text-xs font-medium text-gray-500">
                            {flight.stopsLabel}
                          </span>
                        </div>
                      </div>

                      {/* Center: Times & Flight Path */}
                      <div className="md:col-span-5 flex items-center justify-between gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-black text-gray-900">{flight.depTime}</div>
                          <div className="text-[11px] font-bold text-gray-500 uppercase">
                            {flight.depAirport} {flight.depTerminal && `(${flight.depTerminal})`}
                          </div>
                        </div>

                        {/* Airplane Path Visual */}
                        <div className="flex-1 flex flex-col items-center">
                          <div className="w-full flex items-center gap-1">
                            <div className="h-[1px] bg-gray-300 flex-1"></div>
                            <i className="fa fa-plane text-gray-400 text-xs"></i>
                            <div className="h-[1px] bg-gray-300 flex-1"></div>
                          </div>
                        </div>

                        <div className="text-center">
                          <div className="text-2xl font-black text-gray-900">{flight.arrTime}</div>
                          <div className="text-[11px] font-bold text-gray-500 uppercase">
                            {flight.arrAirport}
                          </div>
                        </div>
                      </div>

                      {/* Right: Total Price & Select Button */}
                      <div className="md:col-span-3 text-right flex flex-col items-end">
                        <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider">
                          TOTAL PRICE
                        </span>
                        <div className="text-2xl font-black text-[#00204C] my-1">
                          A$ {flight.price.toFixed(2)}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleSelectFlight(flight)}
                          className="w-full py-2.5 px-6 bg-[#00204C] hover:bg-[#001738] text-white font-black text-xs uppercase tracking-widest rounded-lg transition-colors cursor-pointer text-center"
                        >
                          SELECT
                        </button>
                      </div>
                    </div>

                    {/* Route Details & Action Links */}
                    <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between text-xs text-gray-500 gap-2">
                      <div className="space-x-2">
                        <strong className="text-gray-800">{flight.fromLocation} → {flight.toLocation}</strong>
                        <span>•</span>
                        <span>{flight.date}</span>
                        <span>•</span>
                        <span className="text-gray-400">{flight.viaText}</span>
                      </div>

                      <div className="flex items-center gap-4 font-bold">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedFlightForModal(flight);
                            setModalTab('itinerary');
                          }}
                          className="text-[#00204C] hover:text-[#E8A500] flex items-center gap-1 cursor-pointer"
                        >
                          FLIGHT DETAILS <i className="fa fa-arrow-right text-[10px]"></i>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setSelectedFlightForModal(flight);
                            setModalTab('baggage');
                          }}
                          className="text-[#00204C] hover:text-[#E8A500] flex items-center gap-1 cursor-pointer"
                        >
                          BAGGAGE DETAILS <i className="fa fa-arrow-right text-[10px]"></i>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: WhatsApp, Email, Copy to Clipboard */}
                  <div className="bg-gray-50/70 px-6 py-2.5 border-t border-gray-100 flex flex-wrap items-center justify-end gap-5 text-xs font-semibold text-gray-600">
                    <button
                      type="button"
                      onClick={() => handleWhatsApp(flight)}
                      className="hover:text-emerald-600 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <i className="fab fa-whatsapp text-emerald-600 text-sm"></i>
                      <span>Send to WhatsApp</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleEmail(flight)}
                      className="hover:text-blue-600 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <i className="fa fa-envelope text-blue-600 text-sm"></i>
                      <span>Send to Email</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCopyClipboard(flight)}
                      className="hover:text-gray-900 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <i className="fa fa-clipboard text-gray-700 text-sm"></i>
                      <span>Copy to Clipboard</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
