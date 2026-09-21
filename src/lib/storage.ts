import { CATEGORIES, UNLOCKS, createEmptySheet, type Sheet } from './scoring'

const STORAGE_KEY = 'dorfromantik-sakura:aktuelle-partie'

const toNumber = (value: unknown): number => {
  const n = Number(value)
  return Number.isFinite(n) && n >= 0 ? Math.floor(n) : 0
}

/**
 * Laedt die laufende Partie und fuellt alles auf, was fehlt oder kaputt ist.
 * Damit ueberlebt ein gespeicherter Bogen auch spaetere Aenderungen am Block.
 */
export function loadSheet(): Sheet {
  const sheet = createEmptySheet()
  let raw: string | null = null
  try {
    raw = localStorage.getItem(STORAGE_KEY)
  } catch {
    return sheet
  }
  if (!raw) return sheet

  try {
    const stored = JSON.parse(raw) as Partial<Sheet>
    for (const category of CATEGORIES) {
      sheet.auftraege[category.key] = toNumber(stored.auftraege?.[category.key])
      sheet.bonus[category.key] = toNumber(stored.bonus?.[category.key])
    }
    for (const unlock of UNLOCKS) {
      const storedUnlock = stored.unlocks?.[unlock.id]
      sheet.unlocks[unlock.id] = {
        enabled: storedUnlock?.enabled === true,
        values: unlock.fields.map((_, index) => toNumber(storedUnlock?.values?.[index])),
      }
    }
  } catch {
    return createEmptySheet()
  }
  return sheet
}

export function saveSheet(sheet: Sheet): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sheet))
  } catch {
    /* Privatmodus o.ae. – dann eben ohne Autosave weiterspielen */
  }
}

export function clearSheet(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    /* siehe oben */
  }
}
