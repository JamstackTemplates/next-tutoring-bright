// Contact page sections. Copy lives in app/contact/page.tsx.
import type { ReactNode } from 'react';
import { addressLine, business, phoneHref } from '../content/business';
import { mapDirectionsUrl } from '../lib/maps';
import { site } from '../lib/site';
import { CentreMap } from './art/centre-map';
import { PaperClip, Tick } from './art/decor';
import { CopyEmail } from './copy-email';
import { GoogleMap } from './google-map';
import { HoursCard } from './home';
import { JamstacksSupportForm } from './jamstacks-support-form';

type ContentProps = { children: ReactNode };

function ContactLayout({ children }: ContentProps) {
  return <div className="ruled pb-16">
    <div className="wrap margin-pad grid gap-12 lg:grid-cols-[.85fr_1.15fr]">{children}</div>
  </div>;
}

/** Left column: what to write about, the message checklist and the always-visible email. */
function Guidance({ children }: ContentProps) {
  return <section aria-labelledby="include-heading" className="grid content-start gap-5">{children}</section>;
}
function GuidanceHeading({ children }: ContentProps) {
  return <h2 id="include-heading" className="text-[1.9rem]">{children}</h2>;
}
function GuidanceText({ children }: ContentProps) {
  return <p className="text-lg leading-[2rem]">{children}</p>;
}
function Checklist() {
  return <ul className="grid gap-1 text-lg leading-[2rem]">
    {business.enquiries.usefulToInclude.map(tip => <li key={tip} className="flex gap-3"><Tick className="mt-1.5 h-5 w-5 shrink-0" />{tip}</li>)}
  </ul>;
}
function EmailCard({ title, children }: ContentProps & { title: ReactNode }) {
  return <div className="note mt-2 max-w-md -rotate-1 p-6 pr-10">
    <h3 className="font-hand text-[1.45rem] font-normal">{title}</h3>
    <p className="mt-1"><a className="text-link text-lg font-bold wrap-anywhere" href={`mailto:${business.email}`}>{business.email}</a></p>
    <div className="mt-2 flex flex-wrap items-center gap-3"><CopyEmail email={business.email} /></div>
    <p className="mt-3">{children} <a className="text-link font-bold" href={phoneHref()}>{business.phone}</a></p>
  </div>;
}
export const ContactGuidance = Object.assign(Guidance, { Layout: ContactLayout, Heading: GuidanceHeading, Text: GuidanceText, Checklist, EmailCard });

/** Right column: the hosted form when configured, otherwise a visible email fallback. */
export function EnquirySheet({ heading, fallback }: { heading: ReactNode; fallback: ReactNode }) {
  const hosted = Boolean(site.jamstacksSite && site.jamstacksEmbedUrl);
  return <section aria-labelledby="form-heading" className="sheet-ruled relative self-start rounded-[.3rem_.6rem_.4rem_.5rem] p-6 pt-9 sm:p-9">
    <div className="absolute -top-6 right-8"><PaperClip /></div>
    <h2 id="form-heading" className="mb-5 text-[1.75rem]">{heading}</h2>
    {hosted
      ? <JamstacksSupportForm siteId={site.jamstacksSite} embedUrl={site.jamstacksEmbedUrl} email={business.email} />
      : <div className="grid gap-3 text-lg">
        {fallback}
        <p><a className="button" href={`mailto:${business.email}`}>Email {business.email}</a></p>
      </div>}
  </section>;
}

export function VisitUs({ heading, directionsLabel, hoursTitle }: { heading: ReactNode; directionsLabel: ReactNode; hoursTitle: ReactNode }) {
  return <section aria-labelledby="visit-heading" className="graph border-t-2 border-rule/60 py-16">
    <div className="wrap grid gap-10 lg:grid-cols-[1fr_1fr]">
      <div>
        <h2 id="visit-heading" className="text-[clamp(1.9rem,4vw,2.75rem)]">{heading}</h2>
        <address className="mt-4 text-lg not-italic">
          <span className="font-bold">{business.address.street}</span><br />
          {business.address.locality} {business.address.region} {business.address.postcode}, {business.landmark}
        </address>
        <p className="mt-3 max-w-xl text-muted">{business.directions}</p>
        <p className="mt-3"><a className="pencil-link" href={mapDirectionsUrl(addressLine())}>{directionsLabel}</a></p>
        <div className="sheet mt-8 rotate-1 rounded-md p-3"><CentreMap className="h-auto w-full" /></div>
      </div>
      <div className="grid content-start gap-8">
        <HoursCard title={hoursTitle} />
        <GoogleMap address={`${addressLine()}, Australia`} title={`Map showing ${business.name}, ${addressLine()}`} className="sheet overflow-hidden rounded-md p-2" />
      </div>
    </div>
  </section>;
}
