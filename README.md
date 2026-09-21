# Dorfromantik Sakura – Wertungsblock

Digitaler Wertungsblock für **Dorfromantik: Das Duell – Sakura**. Kleine
Vue-3-Webapp, handy-optimiert, ohne Backend.

## Was die App macht

**Obere Tabelle** – die sieben Kategorien des Bogens (Kirschblüten, Reisfelder,
Dorf, Wege, Wasser, Rundumaufträge, 7) mit je einer Auftrags-Zeile und einer
zweiten Zeile:

| Kategorie | Zweite Zeile |
| --- | --- |
| Kirschblüten / Reisfelder / Dorf | Fahnen |
| Wege | längste Straße |
| Wasser | längster Fluss |
| Rundumaufträge | +2 je Rundumauftrag an längster Straße / längstem Fluss |
| 7 | schraffiert, keine Eingabe |

Alle Felder werden frei eingetippt, die App summiert nur – Zeilensummen,
Spaltensummen und Gesamtergebnis.

**Freigespielt** – die 14 Positionen des unteren Blocks. Eine Position zählt
erst, wenn sie abgehakt ist; dann erscheinen ihre Eingabefelder. Wo der Bogen
einen Faktor vorgibt, wird gerechnet (z.B. 3 Brücken × 5 = 15 Punkte). Heiße
Quellen hat zwei Felder: abgeschlossene Quellen × 3 und Rundumaufträge × 3.
Gesammelte Kirschblüten haben keinen Faktor und werden als Punktzahl eingetippt.

**Ergebnis** klebt sichtbar am unteren Rand. Die laufende Partie wird im
`localStorage` gesichert und überlebt Reload und Tab-Wechsel; „Neue Partie"
leert den Bogen. Eine Historie alter Partien gibt es bewusst nicht.

Die App ist eine PWA: auf dem Handy zum Homescreen hinzufügen, danach läuft sie
auch ohne Netz.

## Entwicklung

```bash
npm install
npm run dev       # Dev-Server auf http://localhost:5173
npm test          # Unit-Tests der Punktelogik
npm run build     # Produktionsbuild nach dist/
npm run preview   # Build lokal ausliefern
npm run icons     # PWA-Icons neu generieren (public/icon-*.png)
```

Die gesamte Punktelogik steckt in `src/lib/scoring.ts` und ist über
`src/lib/scoring.test.ts` abgedeckt. Kategorien, freigespielte Positionen und
ihre Faktoren sind dort als Daten hinterlegt – ändert sich eine Regel, reicht
eine Anpassung an genau einer Stelle.

## Deployment im Homelab

```bash
docker compose up -d --build
```

Danach erreichbar unter `http://192.168.178.55:30028`.

Für den externen Zugriff im Cloudflare-Tunnel `marzl-home` eine Public-Hostname-
Route ergänzen:

| Feld | Wert |
| --- | --- |
| Subdomain | `dorfromantik` |
| Domain | `marzl.uk` |
| Service | `http://192.168.178.55:30028` |

Der Service Worker wird per `registerType: 'autoUpdate'` erneuert; `sw.js` und
`manifest.webmanifest` liefert nginx bewusst ohne Cache aus, damit ein neuer
Build auf bereits installierten Geräten ankommt.
