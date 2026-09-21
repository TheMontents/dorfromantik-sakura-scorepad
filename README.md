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

Sechs der sieben Spalten haben eine feste Auftragsmenge: die Auftragsmarker
zeigen „je Typ je 2× die Werte 4, 5 und 6", zusammen 30 – das gilt für
Kirschblüten, Reisfelder, Dorf, Wege, Wasser und ebenso für die Rundumaufträge.
Sie werden als sechs Chips angetippt statt eingetippt, damit sind genau die
erreichbaren Summen möglich und eine volle Spalte kostet sechs Taps. Nur in der
7er-Spalte wird die Anzahl erfüllter Doppelaufträge eingetippt (× 7 Punkte). Die
zweite Zeile
(Fahnen / längste / +2) wird frei eingetippt: Fahnen zählen die Plättchen des
Fahnengebiets, aber nur wenn es abgeschlossen ist, längste Straße und längster
Fluss die Plättchen der jeweils längsten Verbindung.

**Freigespielt** – die 14 Positionen des unteren Blocks. Eine Position zählt
erst, wenn sie abgehakt ist; dann erscheinen ihre Eingabefelder. Wo der Bogen
einen Faktor vorgibt, wird gerechnet (z.B. 3 Brücken × 5 = 15 Punkte). Tempel
sind auf 3 begrenzt, weil es nur 3 Tempelplättchen gibt; Heiße Quellen haben
zwei Felder (abgeschlossene Quellen × 3 und Rundumaufträge × 3).
Gesammelte Kirschblüten haben keinen Faktor und werden als Punktzahl eingetippt.

**Ergebnis** klebt sichtbar am unteren Rand. Die laufende Partie wird im
`localStorage` gesichert und überlebt Reload und Tab-Wechsel; „Neue Partie"
leert den Bogen. Eine Historie alter Partien gibt es bewusst nicht.

Die App ist eine PWA: auf dem Handy zum Homescreen hinzufügen, danach läuft sie
auch ohne Netz.

## Sprachen

Die App spricht die sechs Sprachen, in denen das Spiel erschienen ist: Deutsch,
Englisch, Französisch, Italienisch, Spanisch und Polnisch. Beim ersten Aufruf
wird die Sprache des Geräts übernommen (Fallback Englisch), oben rechts lässt
sie sich umstellen, die Wahl wird gemerkt.

**Deutsch und Englisch** verwenden die offizielle Terminologie der Pegasus-
Wertungsblätter (`Aufträge`/`Tasks`, `Fahnen`/`Flags`, `Freigespielt`/`Unlocked`,
`Rundumaufträge`/`Wraparound Tasks`). **Französisch, Italienisch, Spanisch und
Polnisch** sind eigene Übersetzungen – inhaltlich korrekt, aber möglicherweise
nicht wortgleich mit dem gedruckten Block des jeweiligen Verlags (Gigamic, Red
Glove, IUVI Games). Korrekturen sind einzeilig in `src/lib/messages.ts`.

Die Texte liegen vollständig in `src/lib/messages.ts`; `src/lib/scoring.ts`
enthält nur noch Struktur und Faktoren. `src/lib/i18n.test.ts` prüft für jede
Sprache, dass kein Text fehlt und keiner zu viel ist – eine neue Sprache
hinzufügen heißt: Eintrag in `LOCALES`, Block in `MESSAGES`, Tests laufen lassen.

## Entwicklung

```bash
npm install
npm run dev       # Dev-Server auf http://localhost:5173
npm test          # Unit-Tests der Punktelogik
npm run build     # Produktionsbuild nach dist/
npm run preview   # Build lokal ausliefern
npm run icons     # PWA-Icons neu generieren (public/icon-*.png)
```

Die Faktoren stammen aus dem offiziellen Wertungsblatt und der Anleitung von
Pegasus Spiele (Stand 07/2025).

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
