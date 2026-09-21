/**
 * Scoring rules of the "Dorfromantik: Sakura" score pad.
 *
 * Mirrors the printed sheet:
 *  - Upper table: seven categories, each with a task row and a bonus row.
 *  - Lower block: 14 unlockable entries whose points are amount x factor
 *    (or entered directly where the sheet gives no factor).
 *
 * This module holds structure and factors only – every label lives in
 * `messages.ts`, keyed by the identifiers below.
 */

export type CategoryKey =
  | 'cherry'
  | 'rice'
  | 'village'
  | 'road'
  | 'river'
  | 'wraparound'
  | 'seven'

/** Task markers of one type: the values 4, 5 and 6, twice each. */
export const TASK_VALUES = [4, 4, 5, 5, 6, 6]

export interface Category {
  key: CategoryKey
  /**
   * Values of this category's task markers, ticked off one by one.
   * `null` = no fixed set of markers.
   */
  taskValues: number[] | null
  /**
   * Points per completed task when there is no fixed set of markers: the
   * amount is entered instead. Without it the points are entered directly.
   */
  taskFactor?: number
  /** Has a bonus row; without it the cell is hatched (only the "7" column) */
  hasBonus: boolean
}

export const CATEGORIES: Category[] = [
  { key: 'cherry', taskValues: TASK_VALUES, hasBonus: true },
  { key: 'rice', taskValues: TASK_VALUES, hasBonus: true },
  { key: 'village', taskValues: TASK_VALUES, hasBonus: true },
  { key: 'road', taskValues: TASK_VALUES, hasBonus: true },
  { key: 'river', taskValues: TASK_VALUES, hasBonus: true },
  { key: 'wraparound', taskValues: TASK_VALUES, hasBonus: true },
  { key: 'seven', taskValues: null, taskFactor: 7, hasBonus: false },
]

const byKey = (key: CategoryKey) => CATEGORIES.find((c) => c.key === key)

/** Categories that have a bonus cell (all but "7"). */
export const BONUS_CATEGORIES = CATEGORIES.filter((c) => c.hasBonus)

export interface UnlockField {
  /**
   * Points per entered unit. With `null` the entered value already is the
   * number of points (the sheet gives no factor).
   */
  factor: number | null
  /** Upper limit where the game material dictates one */
  max?: number
}

export interface Unlock {
  id: string
  fields: UnlockField[]
}

export const UNLOCKS: Unlock[] = [
  { id: 'cherryBlossoms', fields: [{ factor: null }] },
  { id: 'temples', fields: [{ factor: 6, max: 3 }] },
  { id: 'hotSprings', fields: [{ factor: 3 }, { factor: 3 }] },
  { id: 'bridges', fields: [{ factor: 5 }] },
  { id: 'gates', fields: [{ factor: 5 }] },
  { id: 'hermit', fields: [{ factor: 3 }] },
  { id: 'observatory', fields: [{ factor: 3 }] },
  { id: 'cartographer', fields: [{ factor: 2 }] },
  { id: 'sumoWrestler', fields: [{ factor: 1 }] },
  { id: 'mossCollector', fields: [{ factor: 1 }] },
  { id: 'riceFarmer', fields: [{ factor: 1 }] },
  { id: 'shipPier', fields: [{ factor: 1 }] },
  { id: 'oxCart', fields: [{ factor: 1 }] },
  { id: 'poet', fields: [{ factor: 3 }] },
]

export interface UnlockState {
  /** Entry is unlocked and counts towards the result */
  enabled: boolean
  /** Entered values, one per field */
  values: number[]
}

export interface Sheet {
  /** Ticked task markers – only for categories with a fixed set */
  taskCards: Record<CategoryKey, boolean[]>
  /** Task points entered directly – only for categories without a set */
  tasks: Record<CategoryKey, number>
  bonus: Record<CategoryKey, number>
  unlocks: Record<string, UnlockState>
}

export function createEmptySheet(): Sheet {
  const taskCards = {} as Record<CategoryKey, boolean[]>
  const tasks = {} as Record<CategoryKey, number>
  const bonus = {} as Record<CategoryKey, number>
  for (const category of CATEGORIES) {
    taskCards[category.key] = (category.taskValues ?? []).map(() => false)
    tasks[category.key] = 0
    bonus[category.key] = 0
  }
  const unlocks: Record<string, UnlockState> = {}
  for (const unlock of UNLOCKS) {
    unlocks[unlock.id] = { enabled: false, values: unlock.fields.map(() => 0) }
  }
  return { taskCards, tasks, bonus, unlocks }
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
export function taskPoints(sheet: Sheet, key: CategoryKey): number {
  const category = byKey(key)
  const values = category?.taskValues
  if (!values) return (sheet.tasks[key] ?? 0) * (category?.taskFactor ?? 1)
  const cards = sheet.taskCards[key] ?? []
  return values.reduce((sum, value, index) => sum + (cards[index] ? value : 0), 0)
}

/** Column total of a category: tasks + bonus. */
export function categoryTotal(sheet: Sheet, key: CategoryKey): number {
  const bonus = byKey(key)?.hasBonus ? (sheet.bonus[key] ?? 0) : 0
  return taskPoints(sheet, key) + bonus
}

export interface Totals {
  tasks: number
  bonus: number
  unlocked: number
  result: number
  perCategory: Record<CategoryKey, number>
  perCategoryTasks: Record<CategoryKey, number>
  perUnlock: Record<string, number>
}

export function computeTotals(sheet: Sheet): Totals {
  const perCategory = {} as Record<CategoryKey, number>
  const perCategoryTasks = {} as Record<CategoryKey, number>
  let tasks = 0
  let bonus = 0
  for (const category of CATEGORIES) {
    perCategoryTasks[category.key] = taskPoints(sheet, category.key)
    tasks += perCategoryTasks[category.key]
    if (category.hasBonus) bonus += sheet.bonus[category.key] ?? 0
    perCategory[category.key] = categoryTotal(sheet, category.key)
  }

  const perUnlock: Record<string, number> = {}
  let unlocked = 0
  for (const unlock of UNLOCKS) {
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
