# HMAP Manchester

A free, login-free website that helps people in a mental health crisis in Manchester find help fast:
helplines, a two-question "where should I go?" check, nearby A&E and crisis cafés on a live map, and
trusted resources. Reached by QR code.

- **Built with:** Next.js 16 (React 19, TypeScript), Leaflet + OpenStreetMap.
- **Output:** a plain static website (`out/` folder). No server, no database, no cookies, no tracking.
- **All content lives in one file:** `src/data/hmap-data.ts`. See `UPDATING-DATA.md`.

## Run it on your computer

Install Node.js 20 or newer from https://nodejs.org, then in this folder:

```bash
npm install        # once
npm run dev        # open http://localhost:3000
```

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Live preview while editing |
| `npm run check-data` | Checks the data file for typing mistakes |
| `npm test` | Runs all checks (data + opening-hours logic) |
| `npm run build` | Builds the finished website into `out/` |
| `npm start` | Serves the built `out/` folder locally |
| `npm run qr -- https://your-domain` | Makes print-ready QR codes in `qr/` |

## Hosting

Any static host works. Vercel is set up out of the box (`vercel.json` holds the security headers).
Netlify and Cloudflare Pages read `public/_headers`. Build command `npm run build`, output folder `out`.

Set the environment variable `NEXT_PUBLIC_SITE_URL` to the real address (e.g. `https://hmap.org.uk`)
so links shared on social media and the sitemap point to the right place.

## Where things are

```
src/data/hmap-data.ts      all helplines, places, hours, check wording, resources
src/lib/places.ts          distance, "open now" (UK time), directions links
src/components/            Helplines, SeverityCheck, NearbyPlaces, PlacesMap, Resources
src/app/page.tsx           the main page layout
src/app/privacy/page.tsx   privacy and about page
public/sw.js               offline support (page still opens with weak signal)
tests/                     automatic checks
```

## Privacy and safety by design

- Location is only requested when the person taps "Use my location", and never leaves the phone.
- Fonts are bundled with the site, so no calls to Google.
- The only third parties are OpenStreetMap map images, and Google/Apple Maps if the person taps Directions.
- The 999 banner is on every page. "Not sure" in the check always routes to the more urgent option.
- "Open now" uses UK time even if the visitor's phone is set to another time zone.
