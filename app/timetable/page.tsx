import type { Metadata } from 'next';
import { ContactButton } from '../../components/contact-button';
import { PageHead } from '../../components/page-head';
import { SiteLink } from '../../components/site-link';
import { SpotsKey, TermDates, WeekPlanner } from '../../components/timetable';
import { TimetableBoard } from '../../components/timetable-board';
import { formatPrice, pricing } from '../../content/pricing';
import { sessions } from '../../content/timetable';
import { pageMetadata } from '../../lib/page-metadata';
import { SpotBulbs } from '../../components/art/lightbulb';

export const metadata: Metadata = pageMetadata('/timetable/', 'Term timetable',
  'Weekly small-group classes from Prep to VCE, Monday to Saturday, with term dates and open places at the time of publishing.');

export default function TimetablePage() {
  return <>
    <PageHead art={<SpotBulbs capacity={6} open={4} className="scale-[2.6] origin-right" />}>
      <PageHead.Note>p. 3, timetable</PageHead.Note>
      <PageHead.Title>The <PageHead.Highlight>term timetable</PageHead.Highlight></PageHead.Title>
      <PageHead.Lede>
        <p>Term 1, 2027 enrolment enquiries are open. Classes run Monday to Saturday, the same time each week, for the whole term.</p>
      </PageHead.Lede>
    </PageHead>

    <TermDates currentLabel="This term" nextLabel="Next term">
      <TermDates.Heading>Term dates</TermDates.Heading>
      <TermDates.Introduction>Our terms run alongside the Victorian school year. Classes don’t run in the school holidays or on public holidays.</TermDates.Introduction>
    </TermDates>

    <WeekPlanner heading="Weekly classes">
      <TimetableBoard
        sessions={sessions}
        emptyMessage="No classes match that combination yet. One-to-one times can be arranged for any subject."
        emptyAction={<SiteLink href="/contact/" className="pencil-link">Ask about one-to-one times</SiteLink>}
      />
    </WeekPlanner>

    <SpotsKey>
      <SpotsKey.Explainer heading="How places work">
        <SpotsKey.Item open={3} capacity={5}>Each bulb is a place in the class. A lit bulb is an open place.</SpotsKey.Item>
        <SpotsKey.Item open={0} capacity={4}>All bulbs dark: the class is full, and waitlist enquiries are welcome.</SpotsKey.Item>
        <p className="text-[.95rem] text-muted">Open places are shown as at the time of publishing. A place is confirmed only when we reply to your enquiry.</p>
      </SpotsKey.Explainer>
      <SpotsKey.Note heading="Need a different time?">
        <p>One-to-one sessions can be arranged for any subject during centre hours, at {formatPrice(pricing.oneToOne.price)} for {pricing.oneToOne.minutes} minutes.</p>
        <p><ContactButton>Ask about a class or one-to-one time</ContactButton></p>
      </SpotsKey.Note>
    </SpotsKey>
  </>;
}
