import { business, phoneHref } from '../content/business';
import { terms } from '../content/timetable';
import { yearBands } from '../content/year-bands';
import { displayDateRange } from '../lib/timetable';
import { PencilDivider } from './art/decor';
import { LightbulbMark } from './art/lightbulb';
import { navigation } from './site-header';
import { SiteLink } from './site-link';

const shortDay: Record<string, string> = { Monday: 'Mon', Tuesday: 'Tue', Wednesday: 'Wed', Thursday: 'Thu', Friday: 'Fri', Saturday: 'Sat', Sunday: 'Sun' };

/** Graph-paper footer: the centre's details written up like a timetable block. */
export function SiteFooter() {
  const upcoming = terms.slice(0, 3);
  return <footer className="mt-0">
    <div className="graph pt-10 pb-8">
      <PencilDivider className="mb-10" />
      <div className="wrap grid gap-10 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <p className="flex items-center gap-2 font-display text-2xl font-black"><LightbulbMark className="h-10 w-8" />{business.name}</p>
          <p className="mt-3 max-w-xs text-muted">{business.address.street}, {business.address.locality} {business.address.region} {business.address.postcode}, {business.landmark}.</p>
          <p className="mt-3"><a className="text-link wrap-anywhere" href={`mailto:${business.email}`}>{business.email}</a></p>
          <p className="mt-1"><a className="text-link" href={phoneHref()}>{business.phone}</a></p>
        </div>
        <div>
          <h2 className="font-hand text-xl font-normal text-margin">Centre hours</h2>
          <table className="mt-2 w-full max-w-56 text-[.95rem]">
            <caption className="sr-only">Centre hours, Melbourne time</caption>
            <tbody>
              {business.hours.map(entry => <tr key={entry.day} className="border-b border-rule/70">
                <th scope="row" className="py-1 pr-3 text-left font-bold"><abbr title={entry.day} className="no-underline">{shortDay[entry.day]}</abbr></th>
                <td className="py-1 tabular-nums">{entry.opens ? `${entry.opens}–${entry.closes}` : 'Closed'}</td>
              </tr>)}
            </tbody>
          </table>
        </div>
        <div>
          <h2 className="font-hand text-xl font-normal text-margin">Term dates</h2>
          <ul className="mt-2 space-y-1.5 text-[.95rem]">
            {upcoming.map(term => <li key={term.id}><span className="font-bold">{term.label}</span><br /><span className="text-muted">{displayDateRange(term.start, term.end)}</span></li>)}
          </ul>
        </div>
        <nav aria-label="Footer">
          <h2 className="font-hand text-xl font-normal text-margin">Pages</h2>
          <ul className="mt-2 space-y-1.5">
            {navigation.map(item => <li key={item.href}><SiteLink href={item.href} className="pencil-link">{item.label}</SiteLink></li>)}
            <li><SiteLink href="/contact/" className="pencil-link">Contact</SiteLink></li>
          </ul>
        </nav>
      </div>
      <div className="wrap mt-10 flex flex-wrap items-center justify-between gap-4 border-t-2 border-dashed border-rule pt-5 text-sm text-muted">
        <p className="flex items-center gap-3">
          <span className="flex gap-1" aria-hidden="true">{yearBands.map(band => <span key={band.id} className="h-2.5 w-7 rounded-l-sm" style={{ background: `var(--pencil-${band.colour})`, clipPath: 'polygon(0 0,75% 0,100% 50%,75% 100%,0 100%)' }} />)}</span>
          <span>© {business.name}</span>
        </p>
        <span title="Made with love by jamstacks.net">with <span role="img" aria-label="love">❤️</span> <a className="hover:text-primary-ink hover:underline" href="https://jamstacks.net">jamstacks.net</a></span>
      </div>
    </div>
  </footer>;
}
