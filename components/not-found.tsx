import type { ReactNode } from 'react';
import { SiteLink } from './site-link';

type ContentProps = { children: ReactNode };

function NotFoundSection({ children, art }: ContentProps & { art: ReactNode }) {
  return <section className="ruled overflow-hidden pt-12 pb-20" aria-labelledby="not-found-heading">
    <div className="wrap margin-pad relative">
      <div aria-hidden="true" className="mb-4">{art}</div>
      <div className="relative">{children}</div>
    </div>
  </section>;
}
function Note({ children }: ContentProps) {
  return <p className="margin-note margin-note-abs mb-2 md:-left-[6.8rem] md:w-[4.8rem] md:text-[.95rem] xl:-left-[10.4rem] xl:w-[8.4rem] xl:text-[1.15rem] md:mt-2 md:mb-0">{children}</p>;
}
function Heading({ children }: ContentProps) {
  return <h1 id="not-found-heading" className="max-w-[14ch] text-[clamp(2.5rem,6vw,4.5rem)] font-black">{children}</h1>;
}
function Text({ children }: ContentProps) {
  return <p className="mt-5 max-w-xl text-lg">{children}</p>;
}
function Links({ children }: ContentProps) {
  return <ul className="mt-6 grid gap-3 text-xl">{children}</ul>;
}
function Link({ children, href }: ContentProps & { href: string }) {
  return <li><SiteLink href={href} className="pencil-link">{children}</SiteLink></li>;
}
export const NotFoundPage = Object.assign(NotFoundSection, { Note, Heading, Text, Links, Link });
