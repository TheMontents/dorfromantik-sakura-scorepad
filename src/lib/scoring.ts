/**
 * Punktelogik des Wertungsblocks "Dorfromantik: Das Duell – Sakura".
 *
 * Aufbau analog zum Papierbogen:
 *  - Obere Tabelle: 7 Kategorien mit einer Auftrags-Zeile und einer Bonus-Zeile.
 *    Alle Felder werden frei eingetippt, hier wird ausschliesslich summiert.
 *  - Unterer Block: 14 freigespielte Positionen, deren Punkte sich aus
 *    Anzahl x Faktor ergeben (oder frei eingetragen werden, wo der Bogen
 *    keinen Faktor vorgibt).
 */

export type CategoryKey =
  | 'kirschbluete'
  | 'reisfeld'
  | 'dorf'
  | 'weg'
  | 'wasser'
  | 'rundum'
  | 'sieben'

/** Auftragskarten einer Gebietskategorie: je zweimal 4, 5 und 6 Punkte. */
export const AUFTRAGS_WERTE = [4, 4, 5, 5, 6, 6]

export interface Category {
  key: CategoryKey
  /** Name der Kategorie, z.B. fuer Screenreader */
  label: string
  /**
   * Werte der Auftragskarten dieser Kategorie, die einzeln abgehakt werden.
   * `null` = keine feste Kartenmenge, Punkte werden frei eingetippt.
   */
  auftragsWerte: number[] | null
  /** Beschriftung der zweiten Zeile; null = schraffiert, keine Eingabe */
  bonusLabel: string | null
  /** Langtext der zweiten Zeile (Tooltip / Hilfezeile) */
  bonusHint?: string
}

export const CATEGORIES: Category[] = [
  { key: 'kirschbluete', label: 'Kirschblüten', auftragsWerte: AUFTRAGS_WERTE, bonusLabel: 'Fahnen' },
  { key: 'reisfeld', label: 'Reisfelder', auftragsWerte: AUFTRAGS_WERTE, bonusLabel: 'Fahnen' },
  { key: 'dorf', label: 'Dorf', auftragsWerte: AUFTRAGS_WERTE, bonusLabel: 'Fahnen' },
  {
    key: 'weg',
    label: 'Wege',
    auftragsWerte: AUFTRAGS_WERTE,
    bonusLabel: 'längste',
    bonusHint: 'Punkte für die längste Straße',
  },
  {
    key: 'wasser',
    label: 'Wasser',
    auftragsWerte: AUFTRAGS_WERTE,
    bonusLabel: 'längste',
    bonusHint: 'Punkte für den längsten Fluss',
  },
  {
    key: 'rundum',
    label: 'Rundumaufträge',
    auftragsWerte: null,
    bonusLabel: 'längste = +2',
    bonusHint: '+2 je Rundumauftrag an der längsten Straße / am längsten Fluss',
  },
  { key: 'sieben', label: '7', auftragsWerte: null, bonusLabel: null },
]

const byKey = (key: CategoryKey) => CATEGORIES.find((c) => c.key === key)

/** Kategorien, die eine Bonus-Zelle besitzen (alle ausser "7"). */
export const BONUS_CATEGORIES = CATEGORIES.filter((c) => c.bonusLabel !== null)

export interface UnlockField {
  /** Beschriftung des Eingabefeldes */
  label: string
  /**
   * Punkte pro eingetippter Einheit. Bei `null` ist der eingetippte Wert
   * bereits die Punktzahl (Bogen gibt keinen Faktor vor).
   */
  factor: number | null
}

export interface Unlock {
  id: string
  label: string
  /** Regeltext wie auf dem Bogen */
  hint: string
  fields: UnlockField[]
}

export const UNLOCKS: Unlock[] = [
  {
    id: 'kirschbluetenGesammelt',
    label: 'Kirschblüten',
    hint: 'gesammelt',
    fields: [{ label: 'Punkte', factor: null }],
  },
  {
    id: 'tempel',
    label: 'Tempel',
    hint: 'passend umschlossen = 6',
    fields: [{ label: 'Umschlossene Tempel', factor: 6 }],
  },
  {
    id: 'heisseQuellen',
    label: 'Heiße Quellen',
    hint: 'abgeschlossen = 3 · 3/Rundumauftrag',
    fields: [
      { label: 'Abgeschlossene Quellen', factor: 3 },
      { label: 'Rundumaufträge', factor: 3 },
    ],
  },
  {
    id: 'bruecken',
    label: 'Brücken',
    hint: 'längster Fluss = 5/Brücke',
    fields: [{ label: 'Brücken', factor: 5 }],
  },
  {
    id: 'tore',
    label: 'Tore',
    hint: 'längste Straße = 5/Tor',
    fields: [{ label: 'Tore', factor: 5 }],
  },
  {
    id: 'einsiedler',
    label: 'Einsiedler',
    hint: '3/freier Kante',
    fields: [{ label: 'Freie Kanten', factor: 3 }],
  },
  {
    id: 'sternwarte',
    label: 'Sternwarte',
    hint: 'abgeschlossenes Fahnengebiet (FG) = 3/abgeschlossenes FG',
    fields: [{ label: 'Abgeschlossene FG', factor: 3 }],
  },
  {
    id: 'kartograph',
    label: 'Kartograph',
    hint: 'Blickrichtung = 2/Auftrag',
    fields: [{ label: 'Aufträge', factor: 2 }],
  },
  {
    id: 'sumoringer',
    label: 'Sumoringer',
    hint: '1/passender Kante',
    fields: [{ label: 'Passende Kanten', factor: 1 }],
  },
  {
    id: 'moossammlerin',
    label: 'Moossammlerin',
    hint: '1/passender Kante',
    fields: [{ label: 'Passende Kanten', factor: 1 }],
  },
  {
    id: 'reisbaeuerin',
    label: 'Reisbäuerin',
    hint: '1/passender Kante',
    fields: [{ label: 'Passende Kanten', factor: 1 }],
  },
  {
    id: 'schiffAnlegestelle',
    label: 'Schiff-Anlegestelle',
    hint: '1/Plättchen dazwischen',
    fields: [{ label: 'Plättchen dazwischen', factor: 1 }],
  },
  {
    id: 'ochsenkarren',
    label: 'Ochsenkarren-Handelsposten',
    hint: '1/Plättchen dazwischen',
    fields: [{ label: 'Plättchen dazwischen', factor: 1 }],
  },
  {
    id: 'poet',
    label: 'Poet',
    hint: '3/Wiesenkante',
    fields: [{ label: 'Wiesenkanten', factor: 3 }],
  },
]

export interface UnlockState {
  /** Position ist freigespielt und zaehlt mit */
  enabled: boolean
  /** Eingetippte Werte, ein Eintrag je Feld */
  values: number[]
}

export interface Sheet {
  /** Abgehakte Auftragskarten – nur bei Kategorien mit fester Kartenmenge */
  auftragsChips: Record<CategoryKey, boolean[]>
  /** Frei eingetippte Auftragspunkte – nur bei Kategorien ohne Kartenmenge */
  auftraege: Record<CategoryKey, number>
  bonus: Record<CategoryKey, number>
  unlocks: Record<string, UnlockState>
}

export function createEmptySheet(): Sheet {
  const auftragsChips = {} as Record<CategoryKey, boolean[]>
  const auftraege = {} as Record<CategoryKey, number>
  const bonus = {} as Record<CategoryKey, number>
  for (const category of CATEGORIES) {
    auftragsChips[category.key] = (category.auftragsWerte ?? []).map(() => false)
    auftraege[category.key] = 0
    bonus[category.key] = 0
  }
  const unlocks: Record<string, UnlockState> = {}
  for (const unlock of UNLOCKS) {
    unlocks[unlock.id] = { enabled: false, values: unlock.fields.map(() => 0) }
  }
  return { auftragsChips, auftraege, bonus, unlocks }
}

/** Punkte einer einzelnen freigespielten Position (0, solange nicht freigespielt). */
export function unlockPoints(unlock: Unlock, state: UnlockState | undefined): number {
  if (!state?.enabled) return 0
  return unlock.fields.reduce(
    (sum, field, index) => sum + (state.values[index] ?? 0) * (field.factor ?? 1),
    0,
  )
}

/**
 * Auftragspunkte einer Kategorie: Summe der abgehakten Karten bzw. der
 * frei eingetippte Wert.
 */
export function auftragPoints(sheet: Sheet, key: CategoryKey): number {
  const werte = byKey(key)?.auftragsWerte
  if (!werte) return sheet.auftraege[key] ?? 0
  const chips = sheet.auftragsChips[key] ?? []
  return werte.reduce((sum, wert, index) => sum + (chips[index] ? wert : 0), 0)
}

/** Spaltensumme einer Kategorie: Auftrag + Bonus. */
export function categoryTotal(sheet: Sheet, key: CategoryKey): number {
  const bonus = byKey(key)?.bonusLabel === null ? 0 : (sheet.bonus[key] ?? 0)
  return auftragPoints(sheet, key) + bonus
}

export interface Totals {
  auftraege: number
  bonus: number
  freigespielt: number
  ergebnis: number
  proKategorie: Record<CategoryKey, number>
  proAuftrag: Record<CategoryKey, number>
  proUnlock: Record<string, number>
}

export function computeTotals(sheet: Sheet): Totals {
  const proKategorie = {} as Record<CategoryKey, number>
  const proAuftrag = {} as Record<CategoryKey, number>
  let auftraege = 0
  let bonus = 0
  for (const category of CATEGORIES) {
    proAuftrag[category.key] = auftragPoints(sheet, category.key)
    auftraege += proAuftrag[category.key]
    if (category.bonusLabel !== null) bonus += sheet.bonus[category.key] ?? 0
    proKategorie[category.key] = categoryTotal(sheet, category.key)
  }

  const proUnlock: Record<string, number> = {}
  let freigespielt = 0
  for (const unlock of UNLOCKS) {
    const points = unlockPoints(unlock, sheet.unlocks[unlock.id])
    proUnlock[unlock.id] = points
    freigespielt += points
  }

  return {
    auftraege,
    bonus,
    freigespielt,
    ergebnis: auftraege + bonus + freigespielt,
    proKategorie,
    proAuftrag,
    proUnlock,
  }
}
