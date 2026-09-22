/**
 * Scoring logic, shared by both score pads.
 *
 * The structure of a pad comes from `games.ts`, the labels from `messages.ts`.
 * Every function here takes the game it should score, so nothing in this file
 * knows about cherry blossoms or railways.
 */
import type { Category, Game, Unlock } from './games'

export interface UnlockState {
  /** Entry is unlocked and counts towards the result */
  enabled: boolean
  /** Entered values, one per field */
  values: number[]
}

/**
 * State of one task marker: 0 = not completed, 1 = completed, 2 = completed and
 * lying on its building, which scores the marker a second time.
 */
export type MarkerState = 0 | 1 | 2

export interface Sheet {
  /** State per task marker, indexed by the canonical marker list */
  taskCards: Record<string, MarkerState[]>
  /** Task points entered directly – only for categories without a set */
  tasks: Record<string, number>
  bonus: Record<string, number>
  unlocks: Record<string, UnlockState>
  /** Campaign material that is in play, by option id */
  options: Record<string, boolean>
}

export interface Marker {
  value: number
  /** Present while the marker still has to be unlocked */
  option?: string
}

/**
 * All markers a column can ever hold, in a stable order: the ones from the
 * base box first, then what the campaign adds, sorted by value.
 *
 * The order has to stay stable regardless of which options are on, because
 * `taskCards` indexes into it – otherwise switching an option mid-game would
 * move the ticks to other markers.
 */
export function markers(game: Game, category: Category): Marker[] {
  if (!category.taskValues) return []
  const list: Marker[] = category.taskValues.map((value) => ({ value }))
  for (const option of game.options) {
    if (option.addsTaskValue === undefined) continue
    if (option.onlyTagged && !category.tags?.includes(option.onlyTagged)) continue
    list.push({ value: option.addsTaskValue, option: option.id })
  }
  return list.sort((a, b) => a.value - b.value)
}

/** Markers currently on the table, with their index in the canonical list. */
export function visibleMarkers(
  game: Game,
  sheet: Sheet,
  category: Category,
): { marker: Marker; index: number }[] {
  return markers(game, category)
    .map((marker, index) => ({ marker, index }))
    .filter(({ marker }) => !marker.option || sheet.options[marker.option] === true)
}

export function createEmptySheet(game: Game): Sheet {
  const taskCards: Record<string, MarkerState[]> = {}
  const tasks: Record<string, number> = {}
  const bonus: Record<string, number> = {}
  for (const category of game.categories) {
    taskCards[category.key] = markers(game, category).map<MarkerState>(() => 0)
    tasks[category.key] = 0
    bonus[category.key] = 0
  }
  const unlocks: Record<string, UnlockState> = {}
  for (const unlock of game.unlocks) {
    unlocks[unlock.id] = { enabled: false, values: unlock.fields.map(() => 0) }
  }
  const options: Record<string, boolean> = {}
  for (const option of game.options) options[option.id] = false
  return { taskCards, tasks, bonus, unlocks, options }
}

/** The entries in play: those behind an option only once it is switched on. */
export function activeUnlocks(game: Game, sheet: Sheet): Unlock[] {
  const showsExpansions = game.options.some(
    (option) => option.showsExpansions && sheet.options[option.id] === true,
  )
  return game.unlocks.filter((unlock) => !unlock.expansion || showsExpansions)
}

/** Whether this category's markers can be put on their building right now. */
export function doublingAvailable(sheet: Sheet, category: Category): boolean {
  const id = category.doublingUnlock
  return id !== undefined && sheet.unlocks[id]?.enabled === true
}

/** What a building earns: the values of the markers lying on it. */
export function doubledPoints(game: Game, sheet: Sheet, key: string): number {
  const category = game.categories.find((c) => c.key === key)
  if (!category || !doublingAvailable(sheet, category)) return 0
  const cards = sheet.taskCards[key] ?? []
  return visibleMarkers(game, sheet, category).reduce(
    (sum, { marker, index }) => sum + (cards[index] === 2 ? marker.value : 0),
    0,
  )
}

/** Points of a single unlocked entry (0 while it is not unlocked). */
export function unlockPoints(game: Game, sheet: Sheet, unlock: Unlock): number {
  const state = sheet.unlocks[unlock.id]
  if (!state?.enabled) return 0
  if (unlock.computedFrom) return doubledPoints(game, sheet, unlock.computedFrom)
  return unlock.fields.reduce(
    (sum, field, index) => sum + (state.values[index] ?? 0) * (field.factor ?? 1),
    0,
  )
}

/**
 * Task points of a category: the sum of its ticked markers, or the entered
 * amount multiplied by the category's factor.
 */
export function taskPoints(game: Game, sheet: Sheet, key: string): number {
  const category = game.categories.find((c) => c.key === key)
  if (!category) return 0
  if (!category.taskValues) return (sheet.tasks[key] ?? 0) * (category.taskFactor ?? 1)
  const cards = sheet.taskCards[key] ?? []
  return visibleMarkers(game, sheet, category).reduce(
    (sum, { marker, index }) => sum + (cards[index] ? marker.value : 0),
    0,
  )
}

/** Column total of a category: tasks + bonus. */
export function categoryTotal(game: Game, sheet: Sheet, key: string): number {
  const category = game.categories.find((c) => c.key === key)
  const bonus = category?.hasBonus ? (sheet.bonus[key] ?? 0) : 0
  return taskPoints(game, sheet, key) + bonus
}

export interface Totals {
  tasks: number
  bonus: number
  unlocked: number
  result: number
  perCategory: Record<string, number>
  perCategoryTasks: Record<string, number>
  perUnlock: Record<string, number>
}

export function computeTotals(game: Game, sheet: Sheet): Totals {
  const perCategory: Record<string, number> = {}
  const perCategoryTasks: Record<string, number> = {}
  let tasks = 0
  let bonus = 0
  for (const category of game.categories) {
    perCategoryTasks[category.key] = taskPoints(game, sheet, category.key)
    tasks += perCategoryTasks[category.key]
    if (category.hasBonus) bonus += sheet.bonus[category.key] ?? 0
    perCategory[category.key] = categoryTotal(game, sheet, category.key)
  }

  const perUnlock: Record<string, number> = {}
  let unlocked = 0
  for (const unlock of activeUnlocks(game, sheet)) {
    const points = unlockPoints(game, sheet, unlock)
    perUnlock[unlock.id] = points
    unlocked += points
  }

  return {
    tasks,
    bonus,
    unlocked,
    result: tasks + bonus + unlocked,
    perCategory,
    perCategoryTasks,
    perUnlock,
  }
}
