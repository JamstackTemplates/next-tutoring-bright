import type { Metadata } from 'next';
import { Doodle } from '../../components/art/decor';
import { ContactGuidance, EnquirySheet, VisitUs } from '../../components/contact';
import { PageHead } from '../../components/page-head';
import { business } from '../../content/business';
import { pageMetadata } from '../../lib/page-metadata';

export const metadata: Metadata = pageMetadata('/contact/', 'Contact', business.enquiries.introduction);

export default function ContactPage() {
  return <>
    <PageHead art={<Doodle kind="arrow" className="h-28 w-28 -rotate-12" tone="[stroke:var(--margin)]" />}>
      <PageHead.Note>p. 6, contact</PageHead.Note>
      <PageHead.Title>Ask us <PageHead.Highlight>anything</PageHead.Highlight></PageHead.Title>
      <PageHead.Lede><p>{business.enquiries.introduction}</p></PageHead.Lede>
    </PageHead>

    <ContactGuidance.Layout>
      <ContactGuidance>
        <ContactGuidance.Heading>What to put in your message</ContactGuidance.Heading>
        <ContactGuidance.Text>
          The form has room for your name, email and a message. These details help us reply with a useful suggestion the first time:
        </ContactGuidance.Text>
        <ContactGuidance.Checklist />
        <ContactGuidance.EmailCard title="Rather email?">Or call during centre hours:</ContactGuidance.EmailCard>
      </ContactGuidance>
      <EnquirySheet
        heading="Send an enquiry"
        fallback={<p>Our enquiry form isn’t switched on yet. Please email us instead; we read every message and reply within one school day.</p>}
      />
    </ContactGuidance.Layout>

    <VisitUs heading="Visiting the centre" directionsLabel="Get directions" hoursTitle="Centre hours" />
  </>;
}
