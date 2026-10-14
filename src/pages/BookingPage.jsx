import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { sampleFlights } from '../data/flights';

export default function BookingPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const flightId = searchParams.get('flightId') || 'fl-1';
  const selectedFlight = sampleFlights.find((f) => f.id === flightId) || sampleFlights[0];

  const adultsCount = parseInt(searchParams.get('adults') || '1', 10);
  const cabinClass = searchParams.get('class') || 'Y';

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    nationality: 'Australia',
    travelDocument: 'Passport',
    documentNumber: '',
    expiryDate: '',
    email: '',
    country: 'Australia',
    contactNumber: '',
    specialRequests: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.dob) newErrors.dob = 'Date of birth is required';
    if (!formData.documentNumber.trim()) newErrors.documentNumber = 'Document number is required';
    if (!formData.expiryDate) newErrors.expiryDate = 'Document expiry date is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.contactNumber.trim()) newErrors.contactNumber = 'Contact phone number is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 100, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const refNumber = 'FC-' + Math.floor(100000 + Math.random() * 900000);
      navigate('/booking-confirmation', {
        state: {
          reference: refNumber,
          passenger: formData,
          flight: selectedFlight,
          cabinClass: cabinClass,
          adultsCount: adultsCount
        }
      });
    }, 600);
  };

  const taxesAndFees = 68.50;
  const totalPrice = selectedFlight.price * adultsCount;

  return (
    <div className="min-h-screen bg-[#F1F5F9] py-10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-[#00204C]">Passenger Details</h1>
          <p className="text-sm text-gray-500 mt-1">
            Please enter passenger information exactly as shown on the travel passport or document.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Passenger Form */}
            <div className="lg:col-span-8 space-y-6">
              {/* Passenger Card */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200">
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
                  <i className="fa fa-user-circle text-xl text-[#00204C]"></i>
                  <h2 className="text-base font-extrabold uppercase tracking-wide text-[#00204C]">
                    Passenger 1 (Adult - Primary Contact)
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Title */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-2">
                      TITLE <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className={`w-full bg-gray-50/80 border ${errors.title ? 'border-red-400' : 'border-gray-200'} rounded-lg p-3.5 text-sm font-bold text-gray-800 focus:outline-none focus:bg-white`}
                    >
                      <option value="">Choose a title</option>
                      <option value="Mr">Mr</option>
                      <option value="Mrs">Mrs</option>
                      <option value="Ms">Ms</option>
                      <option value="Miss">Miss</option>
                      <option value="Dr">Dr</option>
                    </select>
                    {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-2">
                      GENDER <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className={`w-full bg-gray-50/80 border ${errors.gender ? 'border-red-400' : 'border-gray-200'} rounded-lg p-3.5 text-sm font-bold text-gray-800 focus:outline-none focus:bg-white`}
                    >
                      <option value="">Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
                  </div>

                  {/* First Name */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-2">
                      FIRST NAME <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full bg-gray-50/80 border ${errors.firstName ? 'border-red-400' : 'border-gray-200'} rounded-lg p-3.5 text-sm font-bold text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white`}
                    />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-2">
                      LAST NAME <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full bg-gray-50/80 border ${errors.lastName ? 'border-red-400' : 'border-gray-200'} rounded-lg p-3.5 text-sm font-bold text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white`}
                    />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-2">
                      DATE OF BIRTH <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className={`w-full bg-gray-50/80 border ${errors.dob ? 'border-red-400' : 'border-gray-200'} rounded-lg p-3.5 text-sm font-bold text-gray-800 focus:outline-none focus:bg-white`}
                    />
                    {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
                  </div>

                  {/* Nationality */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-2">
                      NATIONALITY <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleChange}
                      className="w-full bg-gray-50/80 border border-gray-200 rounded-lg p-3.5 text-sm font-bold text-gray-800 focus:outline-none focus:bg-white"
                    >
                      <option value="Australia">Australia</option>
                      <option value="India">India</option>
                      <option value="New Zealand">New Zealand</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United States">United States</option>
                      <option value="Singapore">Singapore</option>
                      <option value="Malaysia">Malaysia</option>
                      <option value="Sri Lanka">Sri Lanka</option>
                      <option value="Nepal">Nepal</option>
                      <option value="Pakistan">Pakistan</option>
                      <option value="Bangladesh">Bangladesh</option>
                    </select>
                  </div>

                  {/* Travel Document */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-2">
                      TRAVEL DOCUMENT <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="travelDocument"
                      value={formData.travelDocument}
                      onChange={handleChange}
                      className="w-full bg-gray-50/80 border border-gray-200 rounded-lg p-3.5 text-sm font-bold text-gray-800 focus:outline-none focus:bg-white"
                    >
                      <option value="Passport">Passport</option>
                      <option value="National ID">National ID</option>
                      <option value="Driver Licence">Driver Licence</option>
                    </select>
                  </div>

                  {/* Document Number */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-2">
                      DOCUMENT NUMBER <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="documentNumber"
                      placeholder="Document Number"
                      value={formData.documentNumber}
                      onChange={handleChange}
                      className={`w-full bg-gray-50/80 border ${errors.documentNumber ? 'border-red-400' : 'border-gray-200'} rounded-lg p-3.5 text-sm font-bold text-gray-800 placeholder-gray-400 uppercase focus:outline-none focus:bg-white`}
                    />
                    {errors.documentNumber && <p className="text-red-500 text-xs mt-1">{errors.documentNumber}</p>}
                  </div>

                  {/* Expiry Date */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-2">
                      EXPIRY DATE <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      className={`w-full sm:w-1/2 bg-gray-50/80 border ${errors.expiryDate ? 'border-red-400' : 'border-gray-200'} rounded-lg p-3.5 text-sm font-bold text-gray-800 focus:outline-none focus:bg-white`}
                    />
                    {errors.expiryDate && <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>}
                  </div>
                </div>
              </div>

              {/* Contact Info Card */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-[#E8A500] flex items-center justify-center">
                    <i className="fa fa-id-card text-sm"></i>
                  </div>
                  <div>
                    <h2 className="text-base font-extrabold uppercase tracking-wide text-[#00204C]">
                      CONTACT INFO
                    </h2>
                    <p className="text-xs text-gray-500">We require a valid email address.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-2">
                      EMAIL <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="e.g. name@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full bg-gray-50/80 border ${errors.email ? 'border-red-400' : 'border-gray-200'} rounded-lg p-3.5 text-sm font-bold text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-2">
                      COUNTRY <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full bg-gray-50/80 border border-gray-200 rounded-lg p-3.5 text-sm font-bold text-gray-800 focus:outline-none focus:bg-white"
                    >
                      <option value="Australia">Australia (+61)</option>
                      <option value="India">India (+91)</option>
                      <option value="New Zealand">New Zealand (+64)</option>
                      <option value="United Kingdom">United Kingdom (+44)</option>
                      <option value="United States">United States (+1)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-2">
                      CONTACT NUMBER <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="contactNumber"
                      placeholder="e.g. 0412 345 678"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      className={`w-full bg-gray-50/80 border ${errors.contactNumber ? 'border-red-400' : 'border-gray-200'} rounded-lg p-3.5 text-sm font-bold text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white`}
                    />
                    {errors.contactNumber && <p className="text-red-500 text-xs mt-1">{errors.contactNumber}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary Card */}
            <div className="lg:col-span-4 bg-white rounded-2xl p-6 shadow-sm border border-gray-200 sticky top-24">
              <h3 className="font-extrabold text-sm uppercase tracking-wider text-[#00204C] pb-3 border-b border-gray-100">
                Booking Summary
              </h3>

              {/* Selected Flight Summary */}
              <div className="py-4 border-b border-gray-100 space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedFlight.airlineLogo}
                    alt={selectedFlight.airline}
                    className="w-10 h-10 object-contain rounded p-1 border border-gray-100"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-[#00204C]">{selectedFlight.airline}</h4>
                    <p className="text-xs text-gray-500">{selectedFlight.flightNumber}</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-3 text-xs space-y-1.5 text-gray-700">
                  <div className="flex justify-between font-bold">
                    <span>{selectedFlight.fromLocation}</span>
                    <span>{selectedFlight.toLocation}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>{selectedFlight.depTime}</span>
                    <span>{selectedFlight.arrTime}</span>
                  </div>
                  <div className="text-[11px] text-gray-400 pt-1 border-t border-gray-200">
                    {selectedFlight.stopsLabel} • {selectedFlight.date}
                  </div>
                </div>
              </div>

              {/* Fare Breakdown */}
              <div className="py-4 border-b border-gray-100 space-y-2 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Base Fare ({adultsCount} Adult{adultsCount > 1 ? 's' : ''})</span>
                  <span className="font-bold text-gray-900">A$ {(selectedFlight.price - taxesAndFees).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Taxes &amp; Carrier Fees</span>
                  <span className="font-bold text-gray-900">A$ {taxesAndFees.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Cabin Class</span>
                  <span className="font-bold text-gray-900">{selectedFlight.cabinClass}</span>
                </div>
              </div>

              {/* Total Price */}
              <div className="pt-4 pb-6 flex items-center justify-between">
                <span className="text-sm font-black uppercase text-gray-500">Total Price</span>
                <span className="text-2xl font-black text-[#00204C]">
                  A$ {totalPrice.toFixed(2)}
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#E8A500] hover:bg-[#d69600] text-white font-extrabold text-xs uppercase tracking-[0.15em] rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer text-center"
              >
                {isSubmitting ? 'Processing...' : 'Complete Booking Enquiry'}
              </button>

              <div className="mt-4 text-center text-[11px] text-gray-400 flex items-center justify-center gap-1.5">
                <i className="fa fa-lock text-green-600"></i>
                <span>SSL Encrypted &amp; Secure Processing</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
