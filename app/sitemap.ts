import type { MetadataRoute } from 'next';
import { absoluteUrl } from '../lib/paths';
export const dynamic = 'force-static';

/** Public routes. Add new pages here. */
export const routes = ['/', '/subjects/', '/timetable/', '/tutors/', '/results/', '/contact/'];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap(path => {
    const url = absoluteUrl(path);
    return url ? [{ url }] : [];
  });
}
