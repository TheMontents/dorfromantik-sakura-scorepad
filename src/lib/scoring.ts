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

/** Auftragskarten eines Auftragstyps: je zweimal 4, 5 und 6 Punkte. */
export const AUFTRAGS_WERTE = [4, 4, 5, 5, 6, 6]

export interface Category {
  key: CategoryKey
  /**
   * Werte der Auftragskarten dieser Kategorie, die einzeln abgehakt werden.
   * `null` = keine feste Kartenmenge.
   */
  auftragsWerte: number[] | null
  /**
   * Punkte je erfülltem Auftrag, wenn es keine feste Kartenmenge gibt:
   * eingetippt wird dann die Anzahl. Ohne Angabe wird die Punktzahl direkt
   * eingetippt.
   */
  auftragsFaktor?: number
  /** Hat eine zweite Zeile; ohne sie ist die Zelle schraffiert (nur die 7) */
  hasBonus: boolean
}

export const CATEGORIES: Category[] = [
  { key: 'kirschbluete', auftragsWerte: AUFTRAGS_WERTE, hasBonus: true },
  { key: 'reisfeld', auftragsWerte: AUFTRAGS_WERTE, hasBonus: true },
  { key: 'dorf', auftragsWerte: AUFTRAGS_WERTE, hasBonus: true },
  { key: 'weg', auftragsWerte: AUFTRAGS_WERTE, hasBonus: true },
  { key: 'wasser', auftragsWerte: AUFTRAGS_WERTE, hasBonus: true },
  { key: 'rundum', auftragsWerte: AUFTRAGS_WERTE, hasBonus: true },
  { key: 'sieben', auftragsWerte: null, auftragsFaktor: 7, hasBonus: false },
]

const byKey = (key: CategoryKey) => CATEGORIES.find((c) => c.key === key)

/** Kategorien, die eine Bonus-Zelle besitzen (alle ausser "7"). */
export const BONUS_CATEGORIES = CATEGORIES.filter((c) => c.hasBonus)

export interface UnlockField {
  /**
   * Punkte pro eingetippter Einheit. Bei `null` ist der eingetippte Wert
   * bereits die Punktzahl (Bogen gibt keinen Faktor vor).
   */
  factor: number | null
  /** Obergrenze der Eingabe, wo das Material sie vorgibt */
  max?: number
}

export interface Unlock {
  id: string
  fields: UnlockField[]
}

export const UNLOCKS: Unlock[] = [
  { id: 'kirschbluetenGesammelt', fields: [{ factor: null }] },
  { id: 'tempel', fields: [{ factor: 6, max: 3 }] },
  { id: 'heisseQuellen', fields: [{ factor: 3 }, { factor: 3 }] },
  { id: 'bruecken', fields: [{ factor: 5 }] },
  { id: 'tore', fields: [{ factor: 5 }] },
  { id: 'einsiedler', fields: [{ factor: 3 }] },
  { id: 'sternwarte', fields: [{ factor: 3 }] },
  { id: 'kartograph', fields: [{ factor: 2 }] },
  { id: 'sumoringer', fields: [{ factor: 1 }] },
  { id: 'moossammlerin', fields: [{ factor: 1 }] },
  { id: 'reisbaeuerin', fields: [{ factor: 1 }] },
  { id: 'schiffAnlegestelle', fields: [{ factor: 1 }] },
  { id: 'ochsenkarren', fields: [{ factor: 1 }] },
  { id: 'poet', fields: [{ factor: 3 }] },
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
  const category = byKey(key)
  const werte = category?.auftragsWerte
  if (!werte) return (sheet.auftraege[key] ?? 0) * (category?.auftragsFaktor ?? 1)
  const chips = sheet.auftragsChips[key] ?? []
  return werte.reduce((sum, wert, index) => sum + (chips[index] ? wert : 0), 0)
}

/** Spaltensumme einer Kategorie: Auftrag + Bonus. */
export function categoryTotal(sheet: Sheet, key: CategoryKey): number {
  const bonus = byKey(key)?.hasBonus ? (sheet.bonus[key] ?? 0) : 0
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
    if (category.hasBonus) bonus += sheet.bonus[category.key] ?? 0
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
