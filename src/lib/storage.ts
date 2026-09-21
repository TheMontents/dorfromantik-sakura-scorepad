import { CATEGORIES, UNLOCKS, createEmptySheet, type Sheet } from './scoring'

const STORAGE_KEY = 'dorfromantik-sakura:aktuelle-partie:v2'

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
      const chips = stored.auftragsChips?.[category.key]
      sheet.auftragsChips[category.key] = (category.auftragsWerte ?? []).map(
        (_, index) => chips?.[index] === true,
      )
      sheet.auftraege[category.key] = toNumber(stored.auftraege?.[category.key])
      sheet.bonus[category.key] = toNumber(stored.bonus?.[category.key])
    }
    for (const unlock of UNLOCKS) {
      const storedUnlock = stored.unlocks?.[unlock.id]
      sheet.unlocks[unlock.id] = {
        enabled: storedUnlock?.enabled === true,
        values: unlock.fields.map((field, index) => {
          const value = toNumber(storedUnlock?.values?.[index])
          return field.max === undefined ? value : Math.min(field.max, value)
        }),
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
