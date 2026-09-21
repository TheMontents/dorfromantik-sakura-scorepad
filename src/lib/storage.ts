import { CATEGORIES, UNLOCKS, createEmptySheet, type Sheet } from './scoring'

const STORAGE_KEY = 'dorfromantik-sakura:current-game:v3'

const toNumber = (value: unknown): number => {
  const n = Number(value)
  return Number.isFinite(n) && n >= 0 ? Math.floor(n) : 0
}

/**
 * Loads the current game and fills in whatever is missing or broken, so a
 * stored sheet survives later changes to the score pad.
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
      const cards = stored.taskCards?.[category.key]
      sheet.taskCards[category.key] = (category.taskValues ?? []).map(
        (_, index) => cards?.[index] === true,
      )
      sheet.tasks[category.key] = toNumber(stored.tasks?.[category.key])
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
    /* private mode and friends – then we simply play on without autosave */
  }
}

export function clearSheet(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    /* see above */
  }
}
