import type { Game, GameId } from './games'
import { createEmptySheet, markers, type Sheet } from './scoring'

/** One stored sheet per game, so both can be in progress at the same time. */
const sheetKey = (game: GameId) => `dorfromantik:sheet:${game}:v4`
const GAME_KEY = 'dorfromantik:game'

const toNumber = (value: unknown): number => {
  const n = Number(value)
  return Number.isFinite(n) && n >= 0 ? Math.floor(n) : 0
}

const read = (key: string): string | null => {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

const write = (key: string, value: string): void => {
  try {
    localStorage.setItem(key, value)
  } catch {
    /* private mode and friends – then we simply play on without autosave */
  }
}

/**
 * Loads the current sheet of one game and fills in whatever is missing or
 * broken, so a stored sheet survives later changes to the score pad.
 */
export function loadSheet(game: Game): Sheet {
  const sheet = createEmptySheet(game)
  const raw = read(sheetKey(game.id))
  if (!raw) return sheet

  try {
    const stored = JSON.parse(raw) as Partial<Sheet>
    for (const option of game.options) {
      sheet.options[option.id] = stored.options?.[option.id] === true
    }
    for (const category of game.categories) {
      const cards = stored.taskCards?.[category.key]
      sheet.taskCards[category.key] = markers(game, category).map(
        (_, index) => cards?.[index] === true,
      )
      sheet.tasks[category.key] = toNumber(stored.tasks?.[category.key])
      sheet.bonus[category.key] = toNumber(stored.bonus?.[category.key])
    }
    for (const unlock of game.unlocks) {
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
    return createEmptySheet(game)
  }
  return sheet
}

export function saveSheet(game: GameId, sheet: Sheet): void {
  write(sheetKey(game), JSON.stringify(sheet))
}

export function clearSheet(game: GameId): void {
  try {
    localStorage.removeItem(sheetKey(game))
  } catch {
    /* see above */
  }
}

export const loadGameChoice = (): string | null => read(GAME_KEY)

export const saveGameChoice = (game: GameId): void => write(GAME_KEY, game)
