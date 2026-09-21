# Dorfromantik Score Pad

A digital score pad for **Dorfromantik: The Board Game** and its standalone
successor **Dorfromantik: Sakura**. Small Vue 3 web app, built for phones, no
backend.

> Unofficial fan project. Not affiliated with, endorsed by, or sponsored by
> Pegasus Spiele. "Dorfromantik" is a trademark of Pegasus Spiele GmbH.

## The two pads

A switch in the top left picks the game; each one keeps its own sheet, so a
game in progress survives a look at the other pad.

| | Classic | Sakura |
| --- | --- | --- |
| Task columns | Forest, Grain, Village, Track, Stream | Cherry trees, Rice fields, Villages, Roads, Rivers, Wraparound Tasks, "7" |
| Task markers per type | 1×4, 2×5, 2×6 = 26 points | 2×4, 2×5, 2×6 = 30 points |
| Flags | green, yellow, red | pink, green, red |
| Longest | Track and Stream | Road and River |
| Unlocked entries | 15, plus 8 from the mini expansions behind a switch | 14 |
| Colours | meadow green | cherry blossom pink |

**Task row** – the markers of a column are tapped rather than typed, so only
reachable sums are possible and a full column takes five or six taps. The one
exception is the Sakura "7" column, which takes the number of completed double
tasks (× 7 points).

**Bonus row** – typed in. Flags count the tiles of the flag territory, but only
if it is complete; longest Track/Road and longest Stream/River count the tiles
of the respective connection. In Sakura the Wraparound column adds +2 per
Wraparound Task along the longest connection.

**Unlocked** – an entry only counts once it is ticked; its input fields appear
then. Where the sheet gives a factor, the app does the maths (e.g. 3 bridges ×
5 = 15 points). Where it gives none – the classic buildings that hold task
markers, collected cherry blossoms – the points are entered directly. Temples
are capped at 3, because there are only three temple tiles.

The structures and factors come from the rulebooks and score pads published by
Pegasus Spiele: 07/2025 for Sakura, the 2024 edition for the classic pad.

**Result** sticks to the bottom of the screen. The current sheet of each game is
stored in `localStorage` and survives a reload, a tab switch or a look at the
other game; "New game" clears the sheet of the game on screen. There is
deliberately no history of past games.

The app is a PWA: add it to the home screen on a phone and it also runs offline.

## Languages

The app speaks the six languages the games were published in: German, English,
French, Italian, Spanish and Polish. On first visit it follows the device
language (falling back to English), the switcher sits in the top right, and the
choice is remembered.

**German and English** use the official terminology of the Pegasus score pads
(`Aufträge`/`Tasks`, `Fahnen`/`Flags`, `Freigespielt`/`Unlocked`,
`Rundumaufträge`/`Wraparound Tasks`). **French, Italian, Spanish and Polish** are
our own translations – correct in substance, but possibly not word for word
identical to the pad printed by the local publisher (Gigamic, Red Glove, IUVI
Games). Corrections are a one-line change in `src/lib/messages.ts`.

All strings live in `src/lib/messages.ts`, keyed by game; `src/lib/games.ts`
carries structure and factors, `src/lib/scoring.ts` the maths – neither knows
about cherry blossoms or railways. `src/lib/i18n.test.ts` checks every language
and both games for missing and surplus strings, and `src/components/render.test.ts`
renders both pads, which is what catches a key that exists in a game but not in
its texts.

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

Pushing a version tag builds the image and pushes it to GHCR:

```bash
npm version patch          # or minor / major – updates package.json
git push --follow-tags
```

`.github/workflows/publish.yml` then publishes
`ghcr.io/themontents/dorfromantik-sakura-scorepad` with the exact version, the
`major.minor` tag and `latest`. Deployments pin the exact version rather than
`latest`, so that the running version is readable from the compose file and
Dependabot can bump it; `latest` is there for a quick `docker run` only.

The server side lives in the [homelab](https://github.com/TheMontents/homelab)
repository as the `dorfromantik` stack: bump the image tag there, commit, and
deploy on the NAS with

```bash
sudo /mnt/ssd/apps/stacks-repo/stacks/_bin/deploy.sh dorfromantik
```

`compose.yaml` in this repository builds the image locally and is meant for
testing the container before publishing, not for the deployment.

The service worker refreshes itself via `registerType: 'autoUpdate'`; nginx
deliberately serves `sw.js` and `manifest.webmanifest` without caching so a new
build reaches devices that already installed the app.

Because this is a fan tool, the deployment asks search engines to stay away: a
`noindex` meta tag, a `robots.txt` that disallows everything, and an
`X-Robots-Tag` header from nginx. Anyone with the link can still use it.

Once the app has been added to a phone's home screen it works offline, so the
server only needs to be reachable for the first load and for updates – which
makes hosting it at home perfectly practical.

## Licence and attribution

The source code is MIT licensed, see [LICENSE](LICENSE).

The game itself is not. "Dorfromantik" and "Dorfromantik: Sakura" are trademarks
of Pegasus Spiele GmbH; the rule wording reproduced in `src/lib/messages.ts`
comes from the publisher's own score pad and rulebook (the German and English
PDFs published at [pegasus.de](https://pegasus.de/Dorfromantik-Sakura/51243G))
and remains their intellectual property. This project is a free, unofficial fan
tool with no claim to being official.
