// Lightbulb Tutoring: shared business details. Fictitious sample for the Jamstacks gallery.
// Page-specific copy lives in each route's app/**/page.tsx; this file holds values reused across
// pages, metadata and structured data.
import type { OpeningHours } from '../lib/hours.ts';

export interface Address {
  /** Unit or level plus street, e.g. "Level 1, 311 Swanston Street". */
  street: string;
  locality: string;
  /** State abbreviation, e.g. VIC. */
  region: string;
  postcode: string;
  /** ISO 3166 country code. */
  country: string;
}

export interface Business {
  /** Public display name; also update site.config.json's name when renaming. */
  name: string;
  /** Short line used beside the wordmark and in metadata. */
  tagline: string;
  /** Plain-text introduction used for fallback metadata and structured data. */
  introduction: string;
  /** Public contact address, never a private notification destination. */
  email: string;
  /** Public number as displayed; blank hides it. */
  phone: string;
  address: Address;
  /** A nearby public landmark that helps visitors find the door. */
  landmark: string;
  /** How to get here, shown on Home and Contact. */
  directions: string;
  /** Centre hours, Monday to Sunday. Same-day intervals only (opens before closes). */
  hours: OpeningHours[];
  /** Contact copy; the hosted form supports name, email and message only. */
  enquiries: {
    /** Contact page heading. */
    title: string;
    /** No booking, payment or confirmed-place promises: everything is an enquiry. */
    introduction: string;
    /** Suggestions for the message text, not additional form inputs. */
    usefulToInclude: string[];
  };
}

export const business: Business = {
  name: 'Lightbulb Tutoring',
  tagline: 'Small-group and one-to-one tutoring from Prep to VCE in Melbourne’s CBD.',
  introduction:
    'Small-group and one-to-one tutoring from Prep to VCE in Melbourne’s CBD, with term timetables, friendly tutors and a free learning check.',
  email: 'hello@next-tutoring-bright.jamstacks.net',
  phone: '(03) 5550 1287',
  address: {
    street: 'Level 1, 311 Swanston Street',
    locality: 'Melbourne',
    region: 'VIC',
    postcode: '3000',
    country: 'AU',
  },
  landmark: 'opposite the State Library Victoria',
  directions:
    'Melbourne Central station is a two-minute walk; trams along Swanston Street stop at the State Library. Come up the stairs or the lift beside the bookshop.',
  hours: [
    { day: 'Monday', opens: '15:30', closes: '20:30' },
    { day: 'Tuesday', opens: '15:30', closes: '20:30' },
    { day: 'Wednesday', opens: '15:30', closes: '20:30' },
    { day: 'Thursday', opens: '15:30', closes: '20:30' },
    { day: 'Friday', opens: '15:30', closes: '18:30' },
    { day: 'Saturday', opens: '08:30', closes: '15:00' },
    { day: 'Sunday' },
  ],
  enquiries: {
    title: 'Ask us anything',
    introduction:
      'Ask about a free learning check, a place in a class, the waitlist or one-to-one times. We reply within one school day to arrange a time; nothing is booked until we do.',
    usefulToInclude: [
      'Your learner’s first name and year level',
      'The subject or subjects',
      'What’s going well, and what’s tricky',
      'Preferred days and times',
      'Whether you’re asking about a group class, one-to-one or the learning check',
    ],
  },
};

/** One-line postal address for maps and display. */
export function addressLine(address: Address = business.address): string {
  return `${address.street}, ${address.locality} ${address.region} ${address.postcode}`;
}

/** Digits-only phone for tel: links. */
export function phoneHref(phone: string = business.phone): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}
