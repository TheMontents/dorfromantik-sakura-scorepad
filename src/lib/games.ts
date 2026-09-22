/**
 * The two score pads this app covers.
 *
 * Structure and factors only – every label lives in `messages.ts`, keyed by
 * game id plus the identifiers below.
 *
 * Sources: the rulebooks and score pads published by Pegasus Spiele for
 * "Dorfromantik: Das Brettspiel" and "Dorfromantik: Sakura".
 */

export type GameId = 'classic' | 'sakura'

export interface Category {
  key: string
  /** Glyph drawn by CatIcon */
  icon: string
  /** Tags an option can single this category out by */
  tags?: string[]
  /**
   * The building that takes completed task markers of this category: while it
   * is unlocked, a marker can be tapped once more to count a second time.
   */
  doublingUnlock?: string
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
  /** Has a bonus row; without it the cell is hatched */
  hasBonus: boolean
}

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
  /** Only on the score pad that includes the mini expansions */
  expansion?: boolean
  /**
   * Points come from the doubled task markers of this category instead of an
   * input field – the building scores what lies on it.
   */
  computedFrom?: string
}

/**
 * Material the campaign unlocks later. Each option is a switch of its own,
 * because between the boxes that hold them lie a good few games.
 */
export interface GameOption {
  id: string
  /** Where the switch belongs: next to the task table or the unlocked block */
  placement: 'tasks' | 'unlocks'
  /** Adds one task marker of this value to every affected column */
  addsTaskValue?: number
  /** Restricts the option to categories carrying this tag */
  onlyTagged?: string
  /** Shows the entries marked `expansion` */
  showsExpansions?: boolean
}

export interface Game {
  id: GameId
  categories: Category[]
  unlocks: Unlock[]
  options: GameOption[]
}

/** Classic: 25 task markers, per type the values 1x4, 2x5 and 2x6 (26 points). */
export const CLASSIC_TASK_VALUES = [4, 5, 5, 6, 6]

/** Sakura: 30 task markers, per type the values 4, 5 and 6 twice each (30 points). */
export const SAKURA_TASK_VALUES = [4, 4, 5, 5, 6, 6]

const classic: Game = {
  id: 'classic',
  // Box 1 adds a second 4 to every type (30 points per column), box 3 adds a
  // 7 to forest, grain and village along with the three tunnel achievements.
  options: [
    { id: 'secondFour', placement: 'tasks', addsTaskValue: 4 },
    { id: 'tunnels', placement: 'tasks', addsTaskValue: 7, onlyTagged: 'tunnel' },
    { id: 'miniExpansions', placement: 'unlocks', showsExpansions: true },
  ],
  categories: [
    { key: 'forest', icon: 'c-forest', taskValues: CLASSIC_TASK_VALUES, hasBonus: true, doublingUnlock: 'forestCabin', tags: ['tunnel'] },
    { key: 'grain', icon: 'c-grain', taskValues: CLASSIC_TASK_VALUES, hasBonus: true, doublingUnlock: 'harvestFestival', tags: ['tunnel'] },
    { key: 'village', icon: 'c-village', taskValues: CLASSIC_TASK_VALUES, hasBonus: true, doublingUnlock: 'watchtower', tags: ['tunnel'] },
    { key: 'rail', icon: 'c-rail', taskValues: CLASSIC_TASK_VALUES, hasBonus: true, doublingUnlock: 'locomotive' },
    { key: 'river', icon: 'c-river', taskValues: CLASSIC_TASK_VALUES, hasBonus: true, doublingUnlock: 'ship' },
  ],
  unlocks: [
    // The five buildings hold completed task markers and score them a second
    // time, so their points are not typed but read off the doubled markers.
    { id: 'forestCabin', fields: [], computedFrom: 'forest' },
    { id: 'harvestFestival', fields: [], computedFrom: 'grain' },
    { id: 'watchtower', fields: [], computedFrom: 'village' },
    { id: 'locomotive', fields: [], computedFrom: 'rail' },
    { id: 'ship', fields: [], computedFrom: 'river' },
    { id: 'trainStation', fields: [{ factor: 1 }] },
    { id: 'harbour', fields: [{ factor: 1 }] },
    { id: 'redHearts', fields: [{ factor: 1 }] },
    // Box 3 holds exactly one circus tile, so this is a yes or no, not a count
    { id: 'circus', fields: [{ factor: 10, max: 1 }] },
    { id: 'signalman', fields: [{ factor: 2 }] },
    { id: 'shepherdess', fields: [{ factor: 1 }] },
    { id: 'hill', fields: [{ factor: 2 }] },
    { id: 'constructionSite', fields: [{ factor: 7 }] },
    { id: 'balloonLaunchSite', fields: [{ factor: 2 }] },
    { id: 'goldenHeart', fields: [{ factor: 2 }] },
    // Mini expansions – hidden until the switch is on
    { id: 'adolfturm', fields: [{ factor: 1 }], expansion: true },
    { id: 'tvTower', fields: [{ factor: 1 }], expansion: true },
    { id: 'pegasus', fields: [{ factor: 1 }], expansion: true },
    { id: 'greatMill', fields: [{ factor: null }], expansion: true },
    { id: 'photographer', fields: [{ factor: 1 }], expansion: true },
    { id: 'oldOak', fields: [{ factor: 1 }], expansion: true },
    { id: 'granary', fields: [{ factor: 1 }], expansion: true },
    { id: 'school', fields: [{ factor: 1 }], expansion: true },
  ],
}

const sakura: Game = {
  id: 'sakura',
  options: [],
  categories: [
    { key: 'cherry', icon: 's-cherry', taskValues: SAKURA_TASK_VALUES, hasBonus: true },
    { key: 'rice', icon: 's-rice', taskValues: SAKURA_TASK_VALUES, hasBonus: true },
    { key: 'village', icon: 's-village', taskValues: SAKURA_TASK_VALUES, hasBonus: true },
    { key: 'road', icon: 's-road', taskValues: SAKURA_TASK_VALUES, hasBonus: true },
    { key: 'river', icon: 's-river', taskValues: SAKURA_TASK_VALUES, hasBonus: true },
    { key: 'wraparound', icon: 's-wraparound', taskValues: SAKURA_TASK_VALUES, hasBonus: true },
    { key: 'seven', icon: 's-seven', taskValues: null, taskFactor: 7, hasBonus: false },
  ],
  unlocks: [
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
  ],
}

export const GAMES: Record<GameId, Game> = { classic, sakura }

export const GAME_IDS = Object.keys(GAMES) as GameId[]

export const isGameId = (value: string): value is GameId => value in GAMES
