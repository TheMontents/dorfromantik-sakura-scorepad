import { describe, expect, it } from 'vitest'
import {
  CLASSIC_TASK_VALUES,
  GAMES,
  GAME_IDS,
  SAKURA_TASK_VALUES,
  type Game,
  type Unlock,
} from './games'
import {
  activeUnlocks,
  doubledPoints,
  doublingAvailable,
  markers,
  visibleMarkers,
  categoryTotal,
  computeTotals,
  createEmptySheet,
  taskPoints,
  unlockPoints,
} from './scoring'

const classic = GAMES.classic
const sakura = GAMES.sakura

/** A sheet in which exactly this entry is unlocked and filled in. */
const stateOf = (game: Game, unlock: Unlock, enabled: boolean, values: number[]) => {
  const sheet = createEmptySheet(game)
  sheet.unlocks[unlock.id] = { enabled, values }
  return sheet
}

const unlockById = (game: Game, id: string): Unlock => {
  const unlock = game.unlocks.find((u) => u.id === id)
  if (!unlock) throw new Error(`Unknown entry: ${id}`)
  return unlock
}

describe('sheet structure', () => {
  it('knows both score pads', () => {
    expect(GAME_IDS).toEqual(['classic', 'sakura'])
  })

  it('gives the classic pad five task columns with the markers 4/5/5/6/6', () => {
    expect(classic.categories.map((c) => c.key)).toEqual([
      'forest',
      'grain',
      'village',
      'rail',
      'river',
    ])
    expect(CLASSIC_TASK_VALUES).toEqual([4, 5, 5, 6, 6])
    for (const category of classic.categories) {
      expect(category.taskValues).toEqual(CLASSIC_TASK_VALUES)
      expect(category.hasBonus).toBe(true)
    }
  })

  it('gives the Sakura pad seven columns, the last one without markers', () => {
    expect(sakura.categories.map((c) => c.key)).toEqual([
      'cherry',
      'rice',
      'village',
      'road',
      'river',
      'wraparound',
      'seven',
    ])
    expect(SAKURA_TASK_VALUES).toEqual([4, 4, 5, 5, 6, 6])
    const seven = sakura.categories.at(-1)!
    expect(seven.taskValues).toBeNull()
    expect(seven.taskFactor).toBe(7)
    expect(seven.hasBonus).toBe(false)
  })

  it('adds up to 26 points per classic column and 30 per Sakura column', () => {
    const sum = (values: number[]) => values.reduce((a, b) => a + b, 0)
    expect(sum(CLASSIC_TASK_VALUES)).toBe(26)
    expect(sum(SAKURA_TASK_VALUES)).toBe(30)
  })

  it('has 15 classic entries plus 8 from the mini expansions, and 14 for Sakura', () => {
    expect(classic.unlocks.filter((u) => !u.expansion)).toHaveLength(15)
    expect(classic.unlocks.filter((u) => u.expansion)).toHaveLength(8)
    expect(sakura.unlocks).toHaveLength(14)
    expect(sakura.unlocks.some((u) => u.expansion)).toBe(false)
  })

  it('gives every category a glyph of its own', () => {
    const icons = GAME_IDS.flatMap((id) => GAMES[id].categories.map((c) => c.icon))
    expect(new Set(icons).size).toBe(icons.length)
  })
})

describe('createEmptySheet', () => {
  it('starts at zero points for both games', () => {
    for (const id of GAME_IDS) {
      const game = GAMES[id]
      expect(computeTotals(game, createEmptySheet(game)).result).toBe(0)
    }
  })

  it('creates one unticked marker per task value', () => {
    const sheet = createEmptySheet(classic)
    // Wald kann spaeter 7 Marker haben: 4,4,5,5,6,6,7
    expect(sheet.taskCards.forest).toHaveLength(7)
    expect(sheet.taskCards.rail).toHaveLength(6)
    expect(createEmptySheet(sakura).taskCards.seven).toEqual([])
  })

  it('starts with every campaign option switched off', () => {
    const sheet = createEmptySheet(classic)
    expect(Object.values(sheet.options)).toEqual([false, false, false])
  })
})

describe('activeUnlocks', () => {
  it('hides the mini expansions until they are switched on', () => {
    const sheet = createEmptySheet(classic)
    expect(activeUnlocks(classic, sheet)).toHaveLength(15)
    sheet.options.miniExpansions = true
    expect(activeUnlocks(classic, sheet)).toHaveLength(23)
  })

  it('leaves a game without expansions untouched', () => {
    const sheet = createEmptySheet(sakura)
    sheet.options.miniExpansions = true
    expect(activeUnlocks(sakura, sheet)).toHaveLength(14)
  })
})

describe('unlockPoints', () => {
  it('does not count while the entry is locked', () => {
    expect(unlockPoints(sakura, stateOf(sakura, unlockById(sakura, 'bridges'), false, [3]), unlockById(sakura, 'bridges'))).toBe(0)
  })

  it('multiplies by the factor printed on the sheet', () => {
    expect(unlockPoints(sakura, stateOf(sakura, unlockById(sakura, 'bridges'), true, [3]), unlockById(sakura, 'bridges'))).toBe(15)
    expect(unlockPoints(classic, stateOf(classic, unlockById(classic, 'signalman'), true, [4]), unlockById(classic, 'signalman'))).toBe(8)
    expect(unlockPoints(classic, stateOf(classic, unlockById(classic, 'circus'), true, [1]), unlockById(classic, 'circus'))).toBe(10)
    expect(unlockPoints(classic, stateOf(classic, unlockById(classic, 'constructionSite'), true, [2]), unlockById(classic, 'constructionSite'))).toBe(14)
  })

  it('scores 6 points per enclosed temple, at most three temples', () => {
    const temples = unlockById(sakura, 'temples')
    expect(temples.fields[0].max).toBe(3)
    expect(unlockPoints(sakura, stateOf(sakura, temples, true, [3]), temples)).toBe(18)
  })

  it('adds both hot spring rules: 3 per spring and 3 per Wraparound Task', () => {
    expect(unlockPoints(sakura, stateOf(sakura, unlockById(sakura, 'hotSprings'), true, [2, 3]), unlockById(sakura, 'hotSprings'))).toBe(15)
  })

  it('reads the five classic buildings off the doubled markers, not a field', () => {
    for (const id of ['forestCabin', 'harvestFestival', 'watchtower', 'locomotive', 'ship']) {
      const unlock = unlockById(classic, id)
      expect(unlock.fields).toHaveLength(0)
      expect(unlock.computedFrom).toBeTruthy()
    }
  })

  it('copes with missing values', () => {
    expect(unlockPoints(sakura, stateOf(sakura, unlockById(sakura, 'hotSprings'), true, []), unlockById(sakura, 'hotSprings'))).toBe(0)
  })
})

describe('taskPoints', () => {
  it('sums the ticked markers only', () => {
    const sheet = createEmptySheet(classic)
    // Kanonisch 4,4,5,5,6,6,7 – ohne Option zaehlen nur 4,5,5,6,6
    sheet.taskCards.forest = [1, 0, 1, 0, 1, 0, 0]
    expect(taskPoints(classic, sheet, 'forest')).toBe(15)
  })

  it('yields the full column when every marker is ticked', () => {
    const sheet = createEmptySheet(classic)
    sheet.taskCards.rail = [1, 1, 1, 1, 1, 1]
    expect(taskPoints(classic, sheet, 'rail')).toBe(26)
    sheet.options.secondFour = true
    expect(taskPoints(classic, sheet, 'rail')).toBe(30)
  })

  it('multiplies the amount by 7 in the Sakura "7" column', () => {
    const sheet = createEmptySheet(sakura)
    sheet.tasks.seven = 2
    expect(taskPoints(sakura, sheet, 'seven')).toBe(14)
  })

  it('ignores a typed value in columns that use markers', () => {
    const sheet = createEmptySheet(classic)
    sheet.tasks.river = 99
    sheet.taskCards.river = [0, 0, 1, 0, 1, 0] // 5 + 6
    expect(taskPoints(classic, sheet, 'river')).toBe(11)
  })
})

describe('categoryTotal', () => {
  it('adds the task row and the bonus row', () => {
    const sheet = createEmptySheet(classic)
    sheet.taskCards.village = [1, 0, 0, 0, 1, 0, 0] // 4 + 6 = 10
    sheet.bonus.village = 5
    expect(categoryTotal(classic, sheet, 'village')).toBe(15)
  })

  it('ignores a bonus value in the hatched "7" column', () => {
    const sheet = createEmptySheet(sakura)
    sheet.tasks.seven = 1
    sheet.bonus.seven = 99
    expect(categoryTotal(sakura, sheet, 'seven')).toBe(7)
  })
})

describe('computeTotals', () => {
  it('sums the classic sheet row by row', () => {
    const sheet = createEmptySheet(classic)
    sheet.taskCards.forest = [1, 0, 1, 0, 1, 0, 0] // 4+5+6 = 15
    sheet.taskCards.grain = [0, 0, 1, 1, 0, 0, 0] // 5+5 = 10
    sheet.taskCards.village = [1, 0, 0, 0, 0, 0, 0] // 4
    sheet.taskCards.rail = [1, 1, 1, 1, 1, 1] // 26
    sheet.taskCards.river = [0, 0, 0, 0, 1, 1] // 12
    sheet.bonus.forest = 7
    sheet.bonus.grain = 3
    sheet.bonus.village = 4
    sheet.bonus.rail = 9
    sheet.bonus.river = 6
    sheet.unlocks.shepherdess = { enabled: true, values: [5] }

    const totals = computeTotals(classic, sheet)
    expect(totals.tasks).toBe(67)
    expect(totals.bonus).toBe(29)
    expect(totals.unlocked).toBe(5)
    expect(totals.result).toBe(101)
  })

  it('leaves the mini expansions out of the result while they are off', () => {
    const sheet = createEmptySheet(classic)
    sheet.unlocks.school = { enabled: true, values: [8] }
    expect(computeTotals(classic, sheet).result).toBe(0)
    sheet.options.miniExpansions = true
    expect(computeTotals(classic, sheet).result).toBe(8)
  })

  it('counts unlocked but empty entries as 0', () => {
    const sheet = createEmptySheet(sakura)
    sheet.unlocks.poet = { enabled: true, values: [0] }
    expect(computeTotals(sakura, sheet).result).toBe(0)
  })
})

describe('campaign markers', () => {
  it('keeps the canonical order stable so ticks do not move', () => {
    const forest = classic.categories[0]
    expect(markers(classic, forest).map((m) => m.value)).toEqual([4, 4, 5, 5, 6, 6, 7])
    expect(markers(classic, classic.categories[3]).map((m) => m.value)).toEqual([4, 4, 5, 5, 6, 6])
  })

  it('shows the extra markers only once their box is unlocked', () => {
    const sheet = createEmptySheet(classic)
    const forest = classic.categories[0]
    expect(visibleMarkers(classic, sheet, forest).map((v) => v.marker.value)).toEqual([4, 5, 5, 6, 6])
    sheet.options.secondFour = true
    expect(visibleMarkers(classic, sheet, forest).map((v) => v.marker.value)).toEqual([4, 4, 5, 5, 6, 6])
    sheet.options.tunnels = true
    expect(visibleMarkers(classic, sheet, forest).map((v) => v.marker.value)).toEqual([4, 4, 5, 5, 6, 6, 7])
  })

  it('gives the 7 to forest, grain and village only', () => {
    const withSeven = classic.categories.filter((c) =>
      markers(classic, c).some((m) => m.value === 7),
    )
    expect(withSeven.map((c) => c.key)).toEqual(['forest', 'grain', 'village'])
  })

  it('leaves a tick in place when an option is switched on', () => {
    const sheet = createEmptySheet(classic)
    sheet.taskCards.forest[6] = 1 // der 7er
    expect(taskPoints(classic, sheet, 'forest')).toBe(0)
    sheet.options.tunnels = true
    expect(taskPoints(classic, sheet, 'forest')).toBe(7)
  })

  it('adds up to 37 points for a fully unlocked tunnel column', () => {
    const sheet = createEmptySheet(classic)
    sheet.options.secondFour = true
    sheet.options.tunnels = true
    sheet.taskCards.grain = sheet.taskCards.grain.map(() => 1 as const)
    expect(taskPoints(classic, sheet, 'grain')).toBe(37)
  })
})

describe('markers on a building', () => {
  const forest = classic.categories[0]

  it('offers the third state only while the building is unlocked', () => {
    const sheet = createEmptySheet(classic)
    expect(doublingAvailable(sheet, forest)).toBe(false)
    sheet.unlocks.forestCabin.enabled = true
    expect(doublingAvailable(sheet, forest)).toBe(true)
  })

  it('never offers it in Sakura, which has no such buildings', () => {
    const sheet = createEmptySheet(sakura)
    for (const category of sakura.categories) {
      expect(doublingAvailable(sheet, category)).toBe(false)
    }
  })

  it('counts a doubled marker once in the column and once in the building', () => {
    const sheet = createEmptySheet(classic)
    sheet.unlocks.forestCabin.enabled = true
    sheet.taskCards.forest = [0, 0, 1, 0, 2, 0, 0] // one 5 completed, one 6 on the cabin

    expect(taskPoints(classic, sheet, 'forest')).toBe(11)
    expect(doubledPoints(classic, sheet, 'forest')).toBe(6)

    const totals = computeTotals(classic, sheet)
    expect(totals.tasks).toBe(11)
    expect(totals.perUnlock.forestCabin).toBe(6)
    expect(totals.result).toBe(17)
  })

  it('keeps the task points when the building is locked again', () => {
    const sheet = createEmptySheet(classic)
    sheet.unlocks.forestCabin.enabled = true
    sheet.taskCards.forest = [0, 0, 0, 0, 2, 0, 0]
    expect(computeTotals(classic, sheet).result).toBe(12)

    sheet.unlocks.forestCabin.enabled = false
    // The marker stays completed, only the second scoring falls away
    expect(computeTotals(classic, sheet).result).toBe(6)
  })

  it('ignores a marker on a building that is not on the table yet', () => {
    const sheet = createEmptySheet(classic)
    sheet.unlocks.forestCabin.enabled = true
    sheet.taskCards.forest[6] = 2 // the 7 from box 3
    expect(doubledPoints(classic, sheet, 'forest')).toBe(0)
    sheet.options.tunnels = true
    expect(doubledPoints(classic, sheet, 'forest')).toBe(7)
  })
})

describe('entries that exist only once', () => {
  it('caps the circus at one, because box 3 holds a single tile', () => {
    const circus = unlockById(classic, 'circus')
    expect(circus.fields[0].max).toBe(1)
    expect(unlockPoints(classic, stateOf(classic, circus, true, [1]), circus)).toBe(10)
  })

  it('caps the temples at three, the number of temple tiles in Sakura', () => {
    expect(unlockById(sakura, 'temples').fields[0].max).toBe(3)
  })
})
