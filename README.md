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
| Events (upcoming + past, sorted automatically by date) | `src/data/events.ts` |
| Language lesson timetable | `src/data/lessons.ts` |
| Committee list | `src/pages/About.tsx` (top of file) |
| Colours, fonts, spacing | `src/index.css` (`:root` block) |

Anything marked `TODO` is a placeholder that needs confirming:
mailing list link, lesson times/rooms, committee names.
The events currently listed are examples.

Events with a `date` on or after today show as upcoming; older ones drop
into the collapsed "Past events" list. Add a `link` to make a card clickable
(e.g. to an Instagram post or a ticket page).

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

## Adding "real" event management later

Options in rough order of effort. All of these keep the site static and free.

1. **Edit `events.ts` on GitHub** (now). Committee edits the file in the browser,
   the Action redeploys in ~1 minute. Zero infra. Fine for a handful of events a term.

2. **Google Sheet as the source.** Committee keeps events in a Sheet. Publish it
   as CSV (*File → Share → Publish to web*), and either:
   - fetch it at build time in a scheduled GitHub Action (nightly + on demand), or
   - fetch it client-side with a tiny CSV parse in `src/lib/`.
   No auth, no server, and the people adding events never touch code.

3. **Google Calendar.** Committee already maintains a calendar → publish the
   public ICS feed → parse at build time in the Action (client-side fetch is
   blocked by CORS). Nice if you also want an "add to calendar" button.

4. **Git-backed CMS** (Pages CMS, Decap, Sveltia). Gives a proper admin UI that
   commits to the repo via GitHub login. Still no server. Good once you also
   want non-devs editing copy and images.

5. **Real backend** only if you need sign-ups, RSVPs, or member-only content:
   Supabase (Postgres + auth, generous free tier) or Cloudflare Workers + D1.
   Swap `events` import for a fetch; the UI doesn't change.

Recommendation: start with 1, move to 2 when someone non-technical needs to
add events. The `SocietyEvent` type in `src/data/events.ts` is the contract;
every option above just needs to produce that shape.

## Logo

`public/logo.svg` is used in the header, hero and favicon. It was traced from
`design/logo-source.jpg` with potrace so it stays crisp at any size. To re-trace
from a new source image:

```bash
magick design/logo-source.jpg -resize 400% -channel RGB -separate -delete 0 -evaluate-sequence max -threshold 55% logo.pbm
potrace logo.pbm -s --flat -t 30 -o logo-traced.svg   # then set fill to #f1342e and copy to public/logo.svg
```
