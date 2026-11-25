import type { ReactNode } from 'react';
import { BulbShape } from './art/lightbulb';
import { SiteLink } from './site-link';

/** The primary action: a blue button whose little bulb lights on hover and focus. Always links to Contact. */
export function ContactButton({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <SiteLink href="/contact/" className={`button ${className}`}>
    <svg viewBox="-9 -12 66 78" className="button-bulb h-7 w-6 shrink-0" aria-hidden="true" focusable="false"><BulbShape lit={false} /></svg>
    <span>{children}</span>
  </SiteLink>;
}
