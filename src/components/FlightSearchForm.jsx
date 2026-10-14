import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { airports } from '../data/airports';

export default function FlightSearchForm({ initialValues, compact = false }) {
  const navigate = useNavigate();

  const [tripType, setTripType] = useState(initialValues?.tripType || 'twoway');
  const [fromLocation, setFromLocation] = useState(initialValues?.from || 'Sydney (SYD)');
  const [fromCode, setFromCode] = useState(initialValues?.fromCode || 'SYD');
  const [toLocation, setToLocation] = useState(initialValues?.to || '');
  const [toCode, setToCode] = useState(initialValues?.toCode || '');
  const [departDate, setDepartDate] = useState(initialValues?.departDate || '2026-10-24');
  const [returnDate, setReturnDate] = useState(initialValues?.returnDate || '2026-10-31');

  // Passenger state
  const [adults, setAdults] = useState(initialValues?.adults || 1);
  const [children, setChildren] = useState(initialValues?.children || 0);
  const [infants, setInfants] = useState(initialValues?.infant || 0);
  const [cabinClass, setCabinClass] = useState(initialValues?.cabinClass || 'Y');
  const [passengerDropdownOpen, setPassengerDropdownOpen] = useState(false);

  // Multi-city slices
  const [multiCitySlices, setMultiCitySlices] = useState([
    { from: 'Sydney (SYD)', fromCode: 'SYD', to: 'Melbourne (MEL)', toCode: 'MEL', date: '2026-10-24' },
    { from: 'Melbourne (MEL)', fromCode: 'MEL', to: 'Brisbane (BNE)', toCode: 'BNE', date: '2026-10-28' }
  ]);

  // Autocomplete state
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);

  const passengerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (passengerRef.current && !passengerRef.current.contains(event.target)) {
        setPassengerDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFromChange = (text) => {
    setFromLocation(text);
    if (text.length >= 1) {
      const filtered = airports.filter(
        (a) =>
          a.code.toLowerCase().includes(text.toLowerCase()) ||
          a.label.toLowerCase().includes(text.toLowerCase()) ||
          a.country.toLowerCase().includes(text.toLowerCase())
      );
      setFromSuggestions(filtered);
      setShowFromSuggestions(true);
    } else {
      setShowFromSuggestions(false);
    }
  };

  const handleToChange = (text) => {
    setToLocation(text);
    if (text.length >= 1) {
      const filtered = airports.filter(
        (a) =>
          a.code.toLowerCase().includes(text.toLowerCase()) ||
          a.label.toLowerCase().includes(text.toLowerCase()) ||
          a.country.toLowerCase().includes(text.toLowerCase())
      );
      setToSuggestions(filtered);
      setShowToSuggestions(true);
    } else {
      setShowToSuggestions(false);
    }
  };

  const selectFromAirport = (airport) => {
    setFromLocation(airport.label);
    setFromCode(airport.code);
    setShowFromSuggestions(false);
  };

  const selectToAirport = (airport) => {
    setToLocation(airport.label);
    setToCode(airport.code);
    setShowToSuggestions(false);
  };

  const swapLocations = () => {
    const tempLoc = fromLocation;
    const tempCode = fromCode;
    setFromLocation(toLocation);
    setFromCode(toCode);
    setToLocation(tempLoc);
    setToCode(tempCode);
  };

  const addMultiCityFlight = () => {
    if (multiCitySlices.length < 5) {
      setMultiCitySlices([
        ...multiCitySlices,
        { from: '', fromCode: '', to: '', toCode: '', date: '2026-10-29' }
      ]);
    }
  };

  const removeMultiCityFlight = (index) => {
    if (multiCitySlices.length > 2) {
      setMultiCitySlices(multiCitySlices.filter((_, i) => i !== index));
    }
  };

  const updateMultiCitySlice = (index, field, value) => {
    const updated = [...multiCitySlices];
    updated[index][field] = value;
    setMultiCitySlices(updated);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set('triptype', tripType);
    params.set('adults', adults.toString());
    params.set('children', children.toString());
    params.set('infant', infants.toString());
    params.set('cabin_class', cabinClass);

    if (tripType === 'Multicity') {
      multiCitySlices.forEach((slice, idx) => {
        params.set(`slices[${idx}][from_location]`, slice.from);
        params.set(`slices[${idx}][from]`, slice.fromCode || 'SYD');
        params.set(`slices[${idx}][to_location]`, slice.to);
        params.set(`slices[${idx}][to]`, slice.toCode || 'MEL');
        params.set(`slices[${idx}][travelling_date]`, slice.date);
      });
    } else {
      params.set('slices[0][from_location]', fromLocation || 'Perth (PER)');
      params.set('slices[0][from]', fromCode || 'PER');
      params.set('slices[0][to_location]', toLocation || 'Avalon (AVV)');
      params.set('slices[0][to]', toCode || 'AVV');
      params.set('slices[0][travelling_date]', departDate);
      if (tripType === 'twoway') {
        params.set('return_date', returnDate);
      }
    }

    navigate(`/search?${params.toString()}`);
  };

  const totalPax = adults + children;

  return (
    <div className={`w-full ${compact ? 'bg-white p-3 sm:p-4 rounded-xl shadow-md' : 'bg-white/95 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-xl'}`}>
      <form onSubmit={handleSearchSubmit}>
        {/* Trip Type Selector */}
        <div className="flex items-center gap-6 sm:gap-8 mb-4 text-xs font-bold text-gray-700 uppercase tracking-wide">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="triptype"
              value="twoway"
              checked={tripType === 'twoway'}
              onChange={() => setTripType('twoway')}
              className="accent-[#E8A500] w-4 h-4 cursor-pointer"
            />
            <span className={tripType === 'twoway' ? 'text-gray-900 font-extrabold' : 'text-gray-500'}>
              ROUND TRIP
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="triptype"
              value="oneway"
              checked={tripType === 'oneway'}
              onChange={() => setTripType('oneway')}
              className="accent-[#E8A500] w-4 h-4 cursor-pointer"
            />
            <span className={tripType === 'oneway' ? 'text-gray-900 font-extrabold' : 'text-gray-500'}>
              ONE WAY
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="triptype"
              value="Multicity"
              checked={tripType === 'Multicity'}
              onChange={() => setTripType('Multicity')}
              className="accent-[#E8A500] w-4 h-4 cursor-pointer"
            />
            <span className={tripType === 'Multicity' ? 'text-gray-900 font-extrabold' : 'text-gray-500'}>
              MULTI-CITY
            </span>
          </label>
        </div>

        {/* Standard Single City Inputs (Round Trip & One Way) */}
        {tripType !== 'Multicity' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
            {/* Origin Input */}
            <div className={`relative ${tripType === 'oneway' ? 'lg:col-span-3' : 'lg:col-span-2'}`}>
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10">
                <i className="fa fa-map-marker-alt"></i>
              </div>
              <input
                type="text"
                placeholder="FROM: ORIGIN"
                value={fromLocation}
                onChange={(e) => handleFromChange(e.target.value)}
                onFocus={() => fromLocation && setShowFromSuggestions(true)}
                required
                className="w-full pl-11 pr-8 py-3.5 bg-white border border-gray-200 rounded-lg shadow-sm text-sm font-bold uppercase text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00204C]/20 focus:border-[#00204C]"
              />
              <button
                type="button"
                onClick={swapLocations}
                title="Swap origin and destination"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#00204C] w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors z-10 cursor-pointer"
              >
                <i className="fa fa-exchange-alt text-xs"></i>
              </button>
              {/* Autocomplete Dropdown */}
              {showFromSuggestions && fromSuggestions.length > 0 && (
                <div className="absolute left-0 top-full mt-1 w-full bg-white border border-gray-100 rounded-xl shadow-2xl z-50 max-h-60 overflow-y-auto">
                  {fromSuggestions.map((item) => (
                    <div
                      key={item.code}
                      onClick={() => selectFromAirport(item)}
                      className="px-4 py-2.5 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-b-0 text-left"
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-gray-900">
                        <span>{item.label}</span>
                        <span className="text-gray-400">{item.country} {item.flag}</span>
                      </div>
                      <div className="text-[11px] text-gray-500 truncate">{item.value}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Destination Input */}
            <div className={`relative ${tripType === 'oneway' ? 'lg:col-span-3' : 'lg:col-span-2'}`}>
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10">
                <i className="fa fa-map-marker-alt"></i>
              </div>
              <input
                type="text"
                placeholder="TO: DESTINATION"
                value={toLocation}
                onChange={(e) => handleToChange(e.target.value)}
                onFocus={() => toLocation && setShowToSuggestions(true)}
                required
                className="w-full pl-11 pr-3 py-3.5 bg-white border border-gray-200 rounded-lg shadow-sm text-sm font-bold uppercase text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00204C]/20 focus:border-[#00204C]"
              />
              {/* Autocomplete Dropdown */}
              {showToSuggestions && toSuggestions.length > 0 && (
                <div className="absolute left-0 top-full mt-1 w-full bg-white border border-gray-100 rounded-xl shadow-2xl z-50 max-h-60 overflow-y-auto">
                  {toSuggestions.map((item) => (
                    <div
                      key={item.code}
                      onClick={() => selectToAirport(item)}
                      className="px-4 py-2.5 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-b-0 text-left"
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-gray-900">
                        <span>{item.label}</span>
                        <span className="text-gray-400">{item.country} {item.flag}</span>
                      </div>
                      <div className="text-[11px] text-gray-500 truncate">{item.value}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Departure Date */}
            <div className="relative lg:col-span-2">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10">
                <i className="fa fa-calendar-alt"></i>
              </div>
              <input
                type="date"
                value={departDate}
                onChange={(e) => setDepartDate(e.target.value)}
                required
                className="w-full pl-11 pr-3 py-3.5 bg-white border border-gray-200 rounded-lg shadow-sm text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#00204C]/20 focus:border-[#00204C]"
              />
            </div>

            {/* Return Date (Hidden in One Way) */}
            <div className={`relative ${tripType === 'oneway' ? 'hidden' : 'lg:col-span-2'}`}>
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10">
                <i className="fa fa-calendar-alt"></i>
              </div>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                required={tripType === 'twoway'}
                className="w-full pl-11 pr-3 py-3.5 bg-white border border-gray-200 rounded-lg shadow-sm text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#00204C]/20 focus:border-[#00204C]"
              />
            </div>

            {/* Passengers & Class Selector */}
            <div
              className={`relative ${tripType === 'oneway' ? 'lg:col-span-2' : 'lg:col-span-2'}`}
              ref={passengerRef}
            >
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10">
                <i className="fa fa-users"></i>
              </div>
              <button
                type="button"
                onClick={() => setPassengerDropdownOpen(!passengerDropdownOpen)}
                className="w-full pl-11 pr-3 py-3.5 bg-white border border-gray-200 rounded-lg shadow-sm text-xs font-black text-[#00204C] uppercase text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-[#00204C]/20"
              >
                <span>{totalPax} PAX, {cabinClass}</span>
                <i className="fa fa-chevron-down text-gray-400 text-xs"></i>
              </button>

              {/* Passenger Dropdown Popover */}
              {passengerDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-white shadow-2xl rounded-2xl p-5 z-50 border border-gray-100 space-y-4">
                  {/* Adults */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-[#00204C]">Adults</div>
                      <div className="text-xs text-gray-400">12+ years</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#E8A500] hover:text-[#E8A500] font-bold"
                      >
                        -
                      </button>
                      <span className="text-sm font-bold w-4 text-center">{adults}</span>
                      <button
                        type="button"
                        onClick={() => setAdults(Math.min(9, adults + 1))}
                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#E8A500] hover:text-[#E8A500] font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Children */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-[#00204C]">Children</div>
                      <div className="text-xs text-gray-400">2-12 years</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setChildren(Math.max(0, children - 1))}
                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#E8A500] hover:text-[#E8A500] font-bold"
                      >
                        -
                      </button>
                      <span className="text-sm font-bold w-4 text-center">{children}</span>
                      <button
                        type="button"
                        onClick={() => setChildren(Math.min(5, children + 1))}
                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#E8A500] hover:text-[#E8A500] font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Infants */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-[#00204C]">Infants</div>
                      <div className="text-xs text-gray-400">0-2 years</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setInfants(Math.max(0, infants - 1))}
                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#E8A500] hover:text-[#E8A500] font-bold"
                      >
                        -
                      </button>
                      <span className="text-sm font-bold w-4 text-center">{infants}</span>
                      <button
                        type="button"
                        onClick={() => setInfants(Math.min(2, infants + 1))}
                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#E8A500] hover:text-[#E8A500] font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Cabin Class */}
                  <div className="pt-3 border-t border-gray-100">
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1">
                      Cabin Class
                    </label>
                    <select
                      value={cabinClass}
                      onChange={(e) => setCabinClass(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-xs font-bold text-[#00204C] focus:outline-none"
                    >
                      <option value="Y">Economy</option>
                      <option value="S">Premium Economy</option>
                      <option value="P">Premium First</option>
                      <option value="C">Business</option>
                      <option value="F">First Class</option>
                      <option value="J">Premium Business</option>
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={() => setPassengerDropdownOpen(false)}
                    className="w-full bg-[#00204C] text-white py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#E8A500] transition-colors"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className={tripType === 'oneway' ? 'lg:col-span-2' : 'lg:col-span-2'}>
              <button
                type="submit"
                className="w-full py-3.5 bg-[#E8A500] hover:bg-[#d69600] text-white font-extrabold text-sm uppercase tracking-wider rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer text-center"
              >
                Search
              </button>
            </div>
          </div>
        ) : (
          /* Multi-City Form Mode */
          <div className="space-y-3">
            {multiCitySlices.map((slice, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-12 gap-2.5 items-center bg-gray-50/70 p-3 rounded-xl border border-gray-200"
              >
                <div className="md:col-span-4 relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <i className="fa fa-map-marker-alt"></i>
                  </div>
                  <input
                    type="text"
                    placeholder="FROM: ORIGIN"
                    value={slice.from}
                    onChange={(e) => updateMultiCitySlice(index, 'from', e.target.value)}
                    required
                    className="w-full pl-11 pr-3 py-3 bg-white border border-gray-200 rounded-lg text-sm font-bold uppercase text-gray-800 placeholder-gray-400 focus:outline-none"
                  />
                </div>

                <div className="md:col-span-4 relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <i className="fa fa-map-marker-alt"></i>
                  </div>
                  <input
                    type="text"
                    placeholder="TO: DESTINATION"
                    value={slice.to}
                    onChange={(e) => updateMultiCitySlice(index, 'to', e.target.value)}
                    required
                    className="w-full pl-11 pr-3 py-3 bg-white border border-gray-200 rounded-lg text-sm font-bold uppercase text-gray-800 placeholder-gray-400 focus:outline-none"
                  />
                </div>

                <div className="md:col-span-3 relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <i className="fa fa-calendar-alt"></i>
                  </div>
                  <input
                    type="date"
                    value={slice.date}
                    onChange={(e) => updateMultiCitySlice(index, 'date', e.target.value)}
                    required
                    className="w-full pl-11 pr-3 py-3 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-800 focus:outline-none"
                  />
                </div>

                <div className="md:col-span-1 flex justify-center">
                  {multiCitySlices.length > 2 && (
                    <button
                      type="button"
                      onClick={() => removeMultiCityFlight(index)}
                      className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-500 transition-colors"
                      title="Remove flight"
                    >
                      <i className="fa fa-times text-xs"></i>
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Add flight button */}
            <div className="flex justify-start">
              {multiCitySlices.length < 5 && (
                <button
                  type="button"
                  onClick={addMultiCityFlight}
                  className="px-4 py-2 bg-white border border-dashed border-gray-300 rounded-lg text-xs font-bold uppercase tracking-wider text-gray-600 hover:border-[#E8A500] hover:text-[#E8A500] transition-colors flex items-center gap-2"
                >
                  <span className="text-base leading-none">+</span> Add Flight
                </button>
              )}
            </div>

            {/* Multi-City Passengers & Class Dropdowns */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Adults</label>
                <select
                  value={adults}
                  onChange={(e) => setAdults(Number(e.target.value))}
                  className="w-full py-3 px-3 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-800 uppercase"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? 'Adult' : 'Adults'}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Children</label>
                <select
                  value={children}
                  onChange={(e) => setChildren(Number(e.target.value))}
                  className="w-full py-3 px-3 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-800 uppercase"
                >
                  {[0, 1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>{n} Children</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Infants</label>
                <select
                  value={infants}
                  onChange={(e) => setInfants(Number(e.target.value))}
                  className="w-full py-3 px-3 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-800 uppercase"
                >
                  {[0, 1, 2].map((n) => (
                    <option key={n} value={n}>{n} Infants</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Class</label>
                <select
                  value={cabinClass}
                  onChange={(e) => setCabinClass(e.target.value)}
                  className="w-full py-3 px-3 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-800 uppercase"
                >
                  <option value="Y">Economy</option>
                  <option value="S">Premium Economy</option>
                  <option value="P">Premium First</option>
                  <option value="C">Business</option>
                  <option value="F">First Class</option>
                  <option value="J">Premium Business</option>
                </select>
              </div>
            </div>

            {/* Submit Multi-City Search */}
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-10 py-3.5 bg-[#E8A500] hover:bg-[#d69600] text-white font-extrabold text-sm uppercase tracking-wider rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer"
              >
                Search
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
