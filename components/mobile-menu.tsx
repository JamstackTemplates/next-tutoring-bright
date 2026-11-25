'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { SiteLink } from './site-link';

/**
 * Small-screen menu styled as an index tab. Built on <details>, so it opens and closes without
 * JavaScript; with JavaScript, Escape closes it and returns focus, and it closes after navigation.
 */
export function MobileMenu({ items }: { items: readonly { href: string; label: string }[] }) {
  const menu = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();

  useEffect(() => { if (menu.current) menu.current.open = false; }, [pathname]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const element = menu.current;
      if (event.key !== 'Escape' || !element?.open) return;
      element.open = false;
      element.querySelector('summary')?.focus();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return <details ref={menu} className="group relative">
    <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-md border-2 border-on-case/50 px-3 font-bold text-on-case [&::-webkit-details-marker]:hidden">
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path d="M4 7h16M4 12h12M4 17h16" className="ln ln-case" />
      </svg>
      <span className="group-open:hidden">Menu</span><span className="hidden group-open:inline">Close</span>
    </summary>
    <nav aria-label="Main" className="sheet-ruled absolute right-0 z-30 mt-3 w-[min(19rem,calc(100vw-2.5rem))] rounded-[.4rem_.8rem_.6rem_.4rem] border-2 border-ink p-3 pt-4 text-ink">
      <ul className="grid">
        {items.map(item => <li key={item.href}>
          <SiteLink href={item.href} markCurrent="section" className="block rounded px-3 py-2.5 font-display text-xl font-extrabold no-underline hover:bg-bulb/40">{item.label}</SiteLink>
        </li>)}
        <li className="mt-2">
          <SiteLink href="/contact/" markCurrent="page" className="button w-full">Ask about a learning check</SiteLink>
        </li>
      </ul>
    </nav>
  </details>;
}
