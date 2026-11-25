import type { Metadata } from 'next';
import { business } from '../content/business';
import { absoluteUrl } from './paths';
import { site } from './site';

/** Per-page title, description, canonical URL and social card. */
export function pageMetadata(path: string, title: string, description: string): Metadata {
  const url = absoluteUrl(path);
  const image = site.url ? `${site.url}/og.png` : '/og.png';
  return {
    title: path === '/' ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website', siteName: business.name, locale: 'en_AU', title, description, url,
      images: [{ url: image, width: 1200, height: 630, alt: 'Lightbulb Tutoring: a lit lightbulb on exercise-book paper' }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}
