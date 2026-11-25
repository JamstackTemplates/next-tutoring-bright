import type { ReactNode } from 'react';

type ContentProps = { children: ReactNode };

/**
 * Inner-page heading on ruled paper: a pencil note in the red margin, a big Grandstander title
 * (wrap one word in <PageHead.Highlight>), a lede and a small motif on the right.
 */
function PageHeadSection({ children, art }: ContentProps & { art?: ReactNode }) {
  return <header className="ruled relative overflow-hidden pt-[clamp(2.5rem,6vw,4.5rem)] pb-[clamp(2rem,4vw,3.25rem)]">
    <div className="wrap margin-pad relative grid items-center gap-6 md:grid-cols-[1fr_auto]">
      <div className="relative">{children}</div>
      {art ? <div className="hidden justify-self-end md:block" aria-hidden="true">{art}</div> : null}
    </div>
  </header>;
}

/** Handwritten note in the margin, e.g. "p. 2: subjects". */
function Note({ children }: ContentProps) {
  return <p className="margin-note margin-note-abs mb-2 md:-left-[6.8rem] md:w-[4.8rem] md:text-[.95rem] xl:-left-[10.4rem] xl:w-[8.4rem] xl:text-[1.15rem] md:top-3 md:mb-0">{children}</p>;
}

function Title({ children, id }: ContentProps & { id?: string }) {
  return <h1 id={id} className="max-w-[16ch] text-[clamp(2.6rem,6.5vw,4.75rem)] font-black">{children}</h1>;
}

function Highlight({ children }: ContentProps) {
  return <span className="hl">{children}</span>;
}

function Lede({ children }: ContentProps) {
  return <div className="mt-5 max-w-(--measure) text-[clamp(1.1rem,1.6vw,1.25rem)] text-muted">{children}</div>;
}

export const PageHead = Object.assign(PageHeadSection, { Note, Title, Highlight, Lede });
