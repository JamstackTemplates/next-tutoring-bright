import { DarkModeToggle } from 'jamstacks';
import { business } from '../content/business';
import { LightbulbMark } from './art/lightbulb';
import { MobileMenu } from './mobile-menu';
import { SiteLink } from './site-link';

/** Main navigation, in order. Contact is shown separately as the primary action. */
export const navigation = [
  { href: '/subjects/', label: 'Subjects' },
  { href: '/timetable/', label: 'Timetable' },
  { href: '/tutors/', label: 'Tutors' },
  { href: '/results/', label: 'Results' },
] as const;

/** The exercise-book cover: a blue band with the book's name label holding the wordmark. */
export function SiteHeader() {
  return <header className="band-case relative z-20 border-b-4 border-case-2">
    <div className="wrap flex min-h-[4.75rem] items-center justify-between gap-2 py-2.5 sm:gap-3">
      <SiteLink href="/" className="group flex min-w-0 items-center gap-1.5 rounded-[.55rem_.8rem_.5rem_.9rem] border-2 border-ink bg-sheet py-1 pr-2.5 pl-1.5 text-ink no-underline shadow-[3px_3px_0_var(--case-2)] -rotate-1 hover:no-underline sm:gap-2 sm:py-1.5 sm:pr-3.5 sm:pl-2">
        <LightbulbMark className="h-8 w-6 shrink-0 transition-transform group-hover:-rotate-6 sm:h-9 sm:w-7" />
        <span className="leading-none">
          <span className="block font-display text-[1rem] font-black tracking-tight whitespace-nowrap sm:text-[1.28rem]">{business.name}</span>
          <span className="font-hand mt-0.5 block text-[.8rem] whitespace-nowrap text-muted sm:text-[.9rem]">Prep to VCE, Melbourne CBD</span>
        </span>
      </SiteLink>
      <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
        {navigation.map(item => <SiteLink key={item.href} href={item.href} markCurrent="section"
          className="rounded-md px-3 py-2 font-bold text-on-case no-underline hover:bg-white/10 hover:no-underline">{item.label}</SiteLink>)}
        <SiteLink href="/contact/" markCurrent="page"
          className="ml-2 inline-flex min-h-11 items-center gap-1.5 rounded-[.55rem_.8rem_.5rem_.9rem] bg-bulb px-4 font-bold text-[var(--hl-text)] no-underline shadow-[0_3px_0_var(--case-2)] hover:no-underline hover:brightness-105">
          Ask about a learning check
        </SiteLink>
        <span className="ml-2"><DarkModeToggle /></span>
      </nav>
      <div className="flex items-center gap-2 lg:hidden">
        <DarkModeToggle />
        <MobileMenu items={navigation} />
      </div>
    </div>
  </header>;
}
