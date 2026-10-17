import { businessInfo } from '../data/businessInfo';

export const WHATSAPP_DESTINATION_NUMBER = businessInfo.whatsapp.number;

/**
 * Builds a structured, professional WhatsApp booking enquiry message.
 * Only includes fields that have valid, non-empty values.
 */
export function formatWhatsAppBookingMessage({
  enquiryType = 'Travel Booking Enquiry',
  reference = '',
  customerName = '',
  email = '',
  phone = '',
  departureCity = '',
  destination = '',
  departureDate = '',
  returnDate = '',
  passengers = '',
  serviceOrPackage = '',
  cabinClass = '',
  estimatedFare = '',
  additionalRequirements = '',
  sourcePage = 'FlyNest Travel website'
}) {
  const lines = [
    'Hello FlyNest Travel,',
    '',
    'I would like to make a travel booking enquiry.',
    '',
    `Enquiry type: ${enquiryType}`
  ];

  if (reference) {
    lines.push(`Booking reference: ${reference}`);
  }

  const customerDetails = [];
  if (customerName) customerDetails.push(`Customer name: ${customerName}`);
  if (email) customerDetails.push(`Email: ${email}`);
  if (phone) customerDetails.push(`Phone: ${phone}`);

  if (customerDetails.length > 0) {
    lines.push('');
    lines.push(...customerDetails);
  }

  const travelDetails = [];
  if (departureCity) travelDetails.push(`Departure city: ${departureCity}`);
  if (destination) travelDetails.push(`Destination: ${destination}`);
  if (departureDate) travelDetails.push(`Departure date: ${departureDate}`);
  if (returnDate) travelDetails.push(`Return date: ${returnDate}`);
  if (passengers) travelDetails.push(`Number of passengers: ${passengers}`);
  if (cabinClass) travelDetails.push(`Cabin class: ${cabinClass}`);
  if (serviceOrPackage) travelDetails.push(`Travel package or service: ${serviceOrPackage}`);
  if (estimatedFare) travelDetails.push(`Estimated fare: ${estimatedFare}`);

  if (travelDetails.length > 0) {
    lines.push('');
    lines.push(...travelDetails);
  }

  if (additionalRequirements && additionalRequirements.trim()) {
    lines.push('');
    lines.push('Additional requirements:');
    lines.push(additionalRequirements.trim());
  }

  lines.push('');
  lines.push(`Source: FlyNest Travel website (${sourcePage})`);
  lines.push('');
  lines.push('Please contact me regarding availability, pricing, and the next steps for this booking enquiry.');
  lines.push('');
  lines.push('Thank you.');

  return lines.join('\n');
}

/**
 * URL-encodes the message and returns the official WhatsApp URL for FlyNest Travel.
 */
export function createWhatsAppUrl(message) {
  return `https://wa.me/${WHATSAPP_DESTINATION_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Attempts to open the WhatsApp conversation directly.
 * Returns true if the window could be opened, false if blocked by a popup blocker.
 */
export function openWhatsAppConversation(url) {
  try {
    const win = window.open(url, '_blank', 'noopener,noreferrer');
    if (!win || win.closed || typeof win.closed === 'undefined') {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}
