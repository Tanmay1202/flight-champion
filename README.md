# Flights Champion — Australia Flight Booking Platform

A modern, responsive, high-fidelity rebuild of the [Flights Champion](https://flightschampion.com.au/) website. Built using **React 19**, **Tailwind CSS v4**, **React Router v7**, and **Vite**.

## Features

- **Interactive Flight Search Form**: Supports Round Trip, One Way, and Multi-City routes with origin/destination airport autocomplete, swap control, and passenger counter popup (Adults, Children, Infants, Cabin Class).
- **Search Results & Filters**: Multi-criteria filtering by stops (Non-stop, 1 Stop, 2+ Stops), dynamic budget sliders, time-of-day slots, along with itinerary details, baggage allowance modals, and instant sharing (WhatsApp, Email, Clipboard).
- **Enquiry & Passenger Checkout Flow**: Passenger details form (Title, Name, Gender, DOB, Nationality, Travel Document, Expiry, Contact Info) with required validation and booking confirmation summary.
- **Content & Guides**: Domestic & International deals tables, Top Picks from Sydney, verified Google reviews, Airline partners showcase, and Top Destinations guides for India, Nepal, Pakistan, Bangladesh, and Sri Lanka.
- **Informational & Legal Pages**: About Us, FAQ & Help Center with 24/7 hotline callouts, Australian Privacy Principles compliant Privacy Policy, and Terms & Conditions.

---

## Deployment to Vercel

This repository is pre-configured for zero-config deployment on [Vercel](https://vercel.com):

1. Import this repository (`https://github.com/Tanmay1202/flight-champion.git`) into your Vercel Dashboard.
2. Vercel automatically detects the **Vite** framework preset:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
3. Click **Deploy**.

The included [`vercel.json`](./vercel.json) configures SPA route rewrites to ensure direct URL navigation and page refreshes work across all client-side routes (`/search`, `/booking`, `/about`, `/faq`, etc.).

---

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run linter
npm run lint

# Build for production
npm run build

# Preview production build locally
npm run preview
```
