# Lightbulb Tutoring (`next-tutoring-bright`)

A bright, encouraging tutoring-centre website built with Next.js static export and Tailwind CSS v4.
It uses an "exercise book and lightbulb moments" visual system with light ("sunny desk") and dark
("desk lamp") palettes, inline SVG artwork, a filterable term timetable, centre hours in
`Australia/Melbourne` time, and the optional hosted Jamstacks support form on Contact.

All names, addresses, schedules and figures in the sample data are fictitious. Replace them with
your centre's real details before publishing. No application code depends on the starter or portal
repository at runtime.

## Local development

Local development requires Node 24 or later and npm.

```sh
npm ci
npm run dev
```

After reviewing the finished site, you can remove `plan/` and `.claude/skills/` (if present); they
are initial build instructions only and are not used by the website.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Home: hero scene, year-level ruler, how it starts, weekly planner preview, featured tutors, results summary, address/hours with open-now badge, and `EducationalOrganization` JSON-LD |
| `/subjects/` | Subjects by year band (Prep–VCE) with topics, session lengths and group prices, group vs one-to-one comparison, and what every session includes |
| `/timetable/` | Term dates strip (highlights current/next term in the browser), year-band and subject filters (`?band=` / `?subject=`), weekly planner with spot bulbs, and a plain print table |
| `/tutors/` | All six tutors as illustrated name badges with subjects, qualifications and fun facts, plus how tutors are chosen |
| `/results/` | Survey stats, before/after learner stories, family quotes, what is measured, and the results disclaimer |
| `/contact/` | Enquiry guidance checklist, hosted Jamstacks support form when configured (otherwise email fallback), always-visible email and phone, centre hours, illustrated map and Google Map embed |
| `/404.html` | Friendly static error page with paper-plane illustration and navigation links |

## Make it yours

Edit page-specific prose, headings, labels and calls to action directly in each route's
`app/**/page.tsx` file as JSX children of named components. Keep structured, reusable or
programmatically read values in `content/`.

| File | Owns |
| --- | --- |
| `app/page.tsx`, `app/subjects/page.tsx`, `app/timetable/page.tsx`, `app/tutors/page.tsx`, `app/results/page.tsx`, `app/contact/page.tsx`, `app/not-found.tsx` | Page composition and editable copy (headings, introductions, section labels, calls to action) |
| `content/business.ts` | Business name, tagline, email, phone, street address, directions, seven-day centre hours and enquiry checklist items |
| `content/year-bands.ts` | Five year-level bands (`id`, `label`, `years`, `ages`, `blurb`, `colour`) |
| `content/subjects.ts` | Ten subjects (`id`, `name`, `bands`, `summary`, `topics`, `formats`, `sessionMinutes`, `groupPrice`, `icon`) |
| `content/pricing.ts` | Shared one-to-one price, free learning check details, invoicing note and AUD formatter |
| `content/tutors.ts` | Tutor profiles (`id`, `name`, `role`, `subjects`, `qualifications`, `bio`, `funFact`, `featured`, `portrait`) |
| `content/timetable.ts` | `rooms`, `terms` (dates and enrolment notes), and `sessions` (`day`, `start`, `end`, `subject`, `band`, `tutor`, `room`, `capacity`, `enrolled`) |
| `content/results.ts` | Survey `stats`, before/after `stories`, family `quotes` and `resultsDisclaimer` |
| `lib/validate-content.ts` | Content validation rules (unique IDs, references, hours, room/tutor clashes, capacity/enrolled, prices, term dates and results wording) |
| `lib/timetable.ts` | Timetable filtering, query-string helpers, open-spot calculations and current/next term lookup |
| `site.config.json` | Public `name`, `description`, `domain`, `timeZone` (`Australia/Melbourne`) and Jamstacks integration |
| `app/tailwind.input.css` | Light and dark colour tokens, paper textures, typography mappings, motion and print rules |
| `components/site-header.tsx`, `components/site-footer.tsx`, `components/page-head.tsx` | Exercise-book header, footer and inner-page headings |
| `components/art/*` | Bespoke inline SVG artwork (hero desk, lightbulb, year ruler, subject icons, tutor portraits, star chart, street map, paper plane) |
| `lib/structured-data.ts` | `EducationalOrganization` JSON-LD with `OfferCatalog` derived from `content/subjects.ts` |
| `app/sitemap.ts` | Public routes (`/` through `/contact/`); update when adding or removing a page |

### Common owner edits

- **Update open spots in a class:** change `enrolled` on the matching session in
  `content/timetable.ts` (for example `wed-primary-writing-1600`). Open spots are computed as
  `capacity - enrolled`; setting `enrolled` equal to `capacity` automatically shows
  `Full · waitlist enquiries welcome` with all spot bulbs unlit on both `/timetable/` and Home.
- **Update term dates:** edit `terms` in `content/timetable.ts`. Weeks are computed automatically,
  and the browser highlights the current and next term in `Australia/Melbourne` time.
- **Add or edit a tutor:** update `content/tutors.ts` (keep exactly three tutors with
  `featured: true` for the Home preview, and make sure every tutor's `subjects` match IDs in
  `content/subjects.ts`).
- **Rename or update contact details:** change `business.name`, `business.email`, `business.phone`,
  `business.address` and `business.hours` in `content/business.ts`, and update `name`/`description`
  in `site.config.json`. Do not add business data to `site.config.json`: the Jamstacks provisioner
  replaces that file wholesale, possibly adding `provisioningId`.

Run `npm run check` after any content edit; `lib/validate-content.ts` reports item-specific errors
if a session overlaps a room or tutor, falls outside centre hours, or references an unknown ID.

## Typography, fonts and appearance

Self-hosted fonts are installed via `@fontsource`:

| Font | Package | Role | Licence |
| --- | --- | --- | --- |
| **Grandstander** | `@fontsource-variable/grandstander` | Display headings, wordmark, numerals | SIL Open Font License 1.1 (`OFL-1.1`) |
| **Andika** | `@fontsource/andika` | Body text, UI labels, timetable | SIL Open Font License 1.1 (`OFL-1.1`) |
| **Schoolbell** | `@fontsource/schoolbell` | Margin notes, stickers and sticky notes only | Apache License 2.0 (`Apache-2.0`) |

Colours originate in CSS tokens in `app/tailwind.input.css` with light, automatic-dark and
explicit-dark values plus `@theme inline` mappings, wired to `jamstacks`'s `ThemeProvider`,
`ThemeScript` and `DarkModeToggle`. Keyboard focus, reduced motion and print styles (including a
plain-table print view of the timetable) are included.

`OpenBadge` accepts the seven `business.hours` records, computes open/closed status in the browser
using `Australia/Melbourne` (including April and October DST changeovers) and refreshes every
minute; static/no-JS output stays neutral. Same-day intervals only: overnight hours fail validation
and need a tested extension before use.

## Public configuration

```json
{
  "name": "Lightbulb Tutoring",
  "description": "Small-group and one-to-one tutoring from Prep to VCE in Melbourne's CBD, with term timetables, friendly tutors and a free learning check.",
  "domain": "next-tutoring-bright.jamstacks.net",
  "timeZone": "Australia/Melbourne",
  "jamstacks": { "siteId": "", "cdnUrl": "https://cdn.jamstacks.net" }
}
```

Replace the demo `domain` with your own when deploying. Do not invent canonical URLs when the
deployed address is unknown.

| Environment variable | Public build-time meaning |
| --- | --- |
| `JAMSTACKS_SITE` | Website ID; blank retains file default, absent ID gives email fallback |
| `NEXT_PUBLIC_JAMSTACKS_CDN_URL` | CDN asset base; default `https://cdn.jamstacks.net` |
| `NEXT_PUBLIC_SITE_DOMAIN` | Hostname overriding config domain |
| `SITE_TIME_ZONE` | IANA zone overriding config `timeZone` |
| `PAGES_BASE_PATH` | Project path such as `/preview`; blank for custom domain/root |
| `PAGES_BASE_URL` | Actual Pages origin and path; takes precedence for canonical URLs |
| `JAMSTACKS_ALLOW_LOCAL_CDN` | Explicit localhost-only testing opt-in; disallowed in Actions |

Copy `.env.example` to `.env.local` for Next.js local work. All listed values are public. Never add
tokens, SMTP credentials or publishing keys.

## Contact contract

The real `<jamstacks-support-form>` host and one `{cdn}/sites/{siteId}/embed.js` bootstrap appear
only on `/contact/` when configured. Without a site ID there is no embed host or script request.
Email remains visible in either case. The hosted runtime owns name, email and message fields,
validation, submission and results. Contact navigation uses full-document loads via `SiteLink`
because the runtime has no remount API. All learning checks, class places, waitlist requests and
one-to-one times are phrased as enquiries; places are confirmed only when the centre replies.

For local Jamstacks development, configure an explicit local CDN URL and
`JAMSTACKS_ALLOW_LOCAL_CDN=1`; remote builds reject localhost. A locally loaded component does not
prove real message delivery. Test delivery separately against a configured site/backend.

## Checks and preview

```sh
npm run check
PAGES_BASE_PATH=/preview PAGES_BASE_URL=https://owner.github.io/preview npm run build
npm start -- --base /preview --port 3000
```

Tests cover config/provisioner compatibility, embed state, content validation, timetable filters
and labels, Melbourne centre-hours boundaries and DST changeovers, the owner edit (marking a class
full), and structured-data escaping. Typecheck uses Next's generated route types. Return to a normal
`npm run build` before capturing final assets.

## GitHub Pages deployment

`.github/workflows/pages.yml` runs `npm ci`, tests, typecheck and static export. It preserves
Jamstacks' `provisioning_id` dispatch input and correlated run name, builds pull requests without
deploying, and publishes `main` or manual runs. Configure Pages to use GitHub Actions. Do not add
`public/CNAME`; the custom domain is a repository setting (set automatically when a
`PAGES_ADMIN_TOKEN` secret is available, otherwise configured in Settings → Pages).

## Content Security Policy

A host-level CSP must permit same-origin Next.js scripts/assets, the inline theme bootstrap (using
an appropriate hash/nonce policy), the configured Jamstacks CDN scripts/assets and the published
form's API connection origin. The Contact map embed requires `frame-src https://www.google.com`.
Apply CSP at the host; static export cannot set response headers.

## Publishing assets and structure

`app/`, `components/`, `content/`, `lib/` and `types/` are the website. `scripts/` includes static
preview and verification, `tests/` covers customer behavior, and `.github/` supplies deployment.
`jamstacks/` is removable gallery-only source metadata; ordinary builds, tests and Pages work after
it is deleted. To regenerate gallery captures after a fresh normal build:

```sh
node /home/mythz/src/mythz/jamstacks.net/tools/template-screenshots/capture.mjs \
  --template /path/to/next-tutoring-bright --modes light,dark --executable /usr/bin/chromium
node --test jamstacks/config.test.mjs
```
