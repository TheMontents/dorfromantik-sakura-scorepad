/**
 * Scoring logic, shared by both score pads.
 *
 * The structure of a pad comes from `games.ts`, the labels from `messages.ts`.
 * Every function here takes the game it should score, so nothing in this file
 * knows about cherry blossoms or railways.
 */
import type { Game, Unlock } from './games'

export interface UnlockState {
  /** Entry is unlocked and counts towards the result */
  enabled: boolean
  /** Entered values, one per field */
  values: number[]
}

export interface Sheet {
  /** Ticked task markers per category – only where a fixed set exists */
  taskCards: Record<string, boolean[]>
  /** Task points entered directly – only for categories without a set */
  tasks: Record<string, number>
  bonus: Record<string, number>
  unlocks: Record<string, UnlockState>
  /** Classic only: the mini expansion entries are in play */
  expansions: boolean
}

export function createEmptySheet(game: Game): Sheet {
  const taskCards: Record<string, boolean[]> = {}
  const tasks: Record<string, number> = {}
  const bonus: Record<string, number> = {}
  for (const category of game.categories) {
    taskCards[category.key] = (category.taskValues ?? []).map(() => false)
    tasks[category.key] = 0
    bonus[category.key] = 0
  }
  const unlocks: Record<string, UnlockState> = {}
  for (const unlock of game.unlocks) {
    unlocks[unlock.id] = { enabled: false, values: unlock.fields.map(() => 0) }
  }
  return { taskCards, tasks, bonus, unlocks, expansions: false }
}

/** The entries in play: the mini expansions only once they are switched on. */
export function activeUnlocks(game: Game, sheet: Sheet): Unlock[] {
  return game.unlocks.filter((unlock) => !unlock.expansion || sheet.expansions)
}

/** Points of a single unlocked entry (0 while it is not unlocked). */
export function unlockPoints(unlock: Unlock, state: UnlockState | undefined): number {
  if (!state?.enabled) return 0
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
  const values = category?.taskValues
  if (!values) return (sheet.tasks[key] ?? 0) * (category?.taskFactor ?? 1)
  const cards = sheet.taskCards[key] ?? []
  return values.reduce((sum, value, index) => sum + (cards[index] ? value : 0), 0)
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
    const points = unlockPoints(unlock, sheet.unlocks[unlock.id])
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
