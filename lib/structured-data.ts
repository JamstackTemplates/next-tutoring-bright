import { business } from '../content/business.ts';
import { pricing } from '../content/pricing.ts';
import { subjects } from '../content/subjects.ts';
import { yearBands } from '../content/year-bands.ts';
import { absoluteUrl } from './paths.ts';

/** EducationalOrganization derived from content: address, hours, contact and the subject catalogue. */
export function businessStructuredData() {
  const url = absoluteUrl('/');
  const subjectsUrl = absoluteUrl('/subjects/');
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: business.name,
    description: business.introduction,
    email: business.email,
    ...(business.phone ? { telephone: business.phone } : {}),
    ...(url ? { url, image: `${url}og.png` } : {}),
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.street,
      addressLocality: business.address.locality,
      addressRegion: business.address.region,
      postalCode: business.address.postcode,
      addressCountry: business.address.country,
    },
    openingHoursSpecification: business.hours.filter(entry => entry.opens && entry.closes).map(entry => ({
      '@type': 'OpeningHoursSpecification', dayOfWeek: `https://schema.org/${entry.day}`, opens: entry.opens, closes: entry.closes,
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Subjects',
      itemListElement: subjects.map(subject => ({
        '@type': 'Offer',
        price: subject.groupPrice,
        priceCurrency: pricing.currency,
        description: `Group session, ${subject.sessionMinutes} minutes`,
        ...(subjectsUrl ? { url: subjectsUrl } : {}),
        itemOffered: {
          '@type': 'Course',
          name: subject.name,
          description: subject.summary,
          educationalLevel: subject.bands.map(id => yearBands.find(band => band.id === id)?.years ?? id).join(', '),
          provider: { '@type': 'EducationalOrganization', name: business.name },
        },
      })),
    },
  };
}

/** Prevent content containing a closing script tag from escaping JSON-LD. */
export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
