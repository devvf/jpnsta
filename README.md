# St Andrews Japan Society — website

Mobile-first single-page site for the University of St Andrews Japan Society.
Vite + React + TypeScript, no backend. Content lives in plain data files so
anyone on the committee can edit it from GitHub.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Where the content is

| What | File |
|---|---|
| Society name, blurb, email, all external links | `src/data/site.ts` |
| Events (upcoming + past, sorted automatically by date) | `src/data/events.json` (edit via Pages CMS, below) |
| Language lesson timetable | `src/data/lessons.ts` |
| Committee list | `src/pages/About.tsx` (top of file) |
| Colours, fonts, spacing | `src/index.css` (`:root` block) |

Still placeholder: committee names on the About page. Events and lesson times
come from the society's emails as of late September 2026. Photos are stock
images for now; sources are in `design/PHOTO-CREDITS.md`. Replace a photo by
saving your own over the same filename in `public/photos/` or `public/events/`.

Events with a `date` on or after today show as upcoming; older ones drop
into the collapsed "Past events" list. Events without an image get a styled
placeholder. Half-filled events (no title or date) are skipped, not shown broken.

## Adding events (for the committee)

Events are edited through **[Pages CMS](https://app.pagescms.org)**, a free form-based
editor. No code needed.

1. Go to app.pagescms.org and sign in with GitHub.
2. Open this repo, then **Events**.
3. Add an event (or edit one), fill in the form, upload a photo, **Save**.
4. The site updates by itself in about a minute.

Photos: landscape, ideally 4:3 and about 1200px wide. Instagram posters work but
get cropped, so a photo usually looks better. "Label on image" is the short tag
over the photo ("Free with membership", "Book now", "Sold out").

Form fields are defined in `.pages.yml`. Uploaded images land in `public/events/`.

### Handover each year

- The repo lives in the society's GitHub organisation. The **society GitHub
  account** (registered with the society email) is an owner. Its login,
  two-factor secret and recovery codes are kept with the other society logins.
  Don't let these live on one person's phone.
- New committee: make free GitHub accounts, and an owner invites them to the
  org (*Org → People → Invite member*). Remove last year's committee.
- That's it. Nothing needs installing.

## Pages

- `/` — hero with Union join CTA + Instagram, next 3 events, lesson timetable, socials, join banner
- `/events` — all upcoming, past collapsed
- `/language` — timetable and how lessons work
- `/about` — what we do, committee, constitution, contact

## Deploying (free)

**GitHub Pages** — `.github/workflows/deploy.yml` builds and publishes on every
push to `main`. Turn it on under *Settings → Pages → Source: GitHub Actions*.
If the site is served from `username.github.io/<repo>/` set `VITE_BASE` in the
workflow to `/<repo>/`; with a custom domain leave it as `/`.

**Cloudflare Pages / Netlify** — connect the repo, build command `npm run build`,
output `dist`. `public/_redirects` already handles SPA deep links.

## Logo

`public/logo.svg` is used in the header, hero and favicon. It was traced from
`design/logo-source.jpg` with potrace so it stays crisp at any size. To re-trace
from a new source image:

```bash
magick design/logo-source.jpg -resize 400% -channel RGB -separate -delete 0 -evaluate-sequence max -threshold 55% logo.pbm
potrace logo.pbm -s --flat -t 30 -o logo-traced.svg   # then set fill to #f1342e and copy to public/logo.svg
```

## Add to calendar

Every upcoming event card has an "Add to calendar" button (`src/lib/calendar.ts`).
Apple devices get a real `/cal/<event>.ics` file, generated at build time by the
plugin in `vite.config.ts`, which opens the iPhone add-event sheet. Everything
else gets a Google Calendar link. The other option is always offered as a small link
beside it. Event times in the data are treated as St Andrews local time and
converted to UTC, so GMT/BST is handled. Events with no `end` default to 2 hours;
events with no `start` become all-day.
