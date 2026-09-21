# Dorfromantik Sakura Score Pad

A digital score pad for **Dorfromantik: Sakura**. Small Vue 3 web app, built for
phones, no backend.

## What it does

**Upper table** – the seven categories of the printed sheet (cherry trees, rice
fields, villages, roads, rivers, Wraparound Tasks, "7"), each with a task row
and a bonus row:

| Category | Bonus row |
| --- | --- |
| Cherry trees / Rice fields / Villages | Flags |
| Roads | longest Road |
| Rivers | longest River |
| Wraparound Tasks | +2 per Wraparound Task on the longest Road / River |
| 7 | hatched, no input |

Six of the seven columns have a fixed set of task markers: the rules state that
they show "the values 4, 5 and 6, twice each" per type, 30 points in total –
that covers cherry trees, rice fields, villages, roads, rivers and Wraparound
Tasks alike. They are tapped as six markers rather than typed, so only reachable
sums are possible and a full column takes six taps. Only the "7" column takes
the number of completed double tasks (× 7 points). The bonus row is typed in:
Flags count the tiles of the flag territory, but only if it is complete; longest
Road and longest River count the tiles of the respective connection.

**Unlocked** – the 14 entries of the lower block. An entry only counts once it is
ticked; its input fields appear then. Where the sheet gives a factor, the app
does the maths (e.g. 3 bridges × 5 = 15 points). Temples are capped at 3 because
there are only three temple tiles; hot springs have two fields (completed
springs × 3 and Wraparound Tasks × 3). Collected cherry blossoms have no factor
and are entered as points.

The factors come from the official score pad and rules published by Pegasus
Spiele (as of 07/2025).

**Result** sticks to the bottom of the screen. The current game is stored in
`localStorage` and survives a reload or a tab switch; "New game" clears the
sheet. There is deliberately no history of past games.

The app is a PWA: add it to the home screen on a phone and it also runs offline.

## Languages

The app speaks the six languages the game was published in: German, English,
French, Italian, Spanish and Polish. On first visit it follows the device
language (falling back to English), the switcher sits in the top right, and the
choice is remembered.

**German and English** use the official terminology of the Pegasus score pads
(`Aufträge`/`Tasks`, `Fahnen`/`Flags`, `Freigespielt`/`Unlocked`,
`Rundumaufträge`/`Wraparound Tasks`). **French, Italian, Spanish and Polish** are
our own translations – correct in substance, but possibly not word for word
identical to the pad printed by the local publisher (Gigamic, Red Glove, IUVI
Games). Corrections are a one-line change in `src/lib/messages.ts`.

All strings live in `src/lib/messages.ts`; `src/lib/scoring.ts` carries structure
and factors only. `src/lib/i18n.test.ts` checks every language for missing and
surplus strings – adding a language means an entry in `LOCALES`, a block in
`MESSAGES`, and running the tests.

## Development

```bash
npm install
npm run dev       # dev server on http://localhost:5173
npm test          # unit tests of the scoring logic
npm run build     # production build into dist/
npm run preview   # serve the build locally
npm run icons     # regenerate the PWA icons (public/icon-*.png)
```

The entire scoring logic lives in `src/lib/scoring.ts` and is covered by
`src/lib/scoring.test.ts`. Categories, unlockable entries and their factors are
plain data there – when a rule changes, one place needs an edit.

## Deployment

```bash
docker compose up -d --build
```

Reachable at `http://192.168.178.55:30028` afterwards.

For external access through the `marzl-home` Cloudflare tunnel, add a public
hostname route:

| Field | Value |
| --- | --- |
| Subdomain | `dorfromantik` |
| Domain | `marzl.uk` |
| Service | `http://192.168.178.55:30028` |

The service worker refreshes itself via `registerType: 'autoUpdate'`; nginx
deliberately serves `sw.js` and `manifest.webmanifest` without caching so a new
build reaches devices that already installed the app.
