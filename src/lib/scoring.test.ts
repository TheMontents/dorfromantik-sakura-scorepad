import { describe, expect, it } from 'vitest'
import {
  TASK_VALUES,
  CATEGORIES,
  UNLOCKS,
  taskPoints,
  categoryTotal,
  computeTotals,
  createEmptySheet,
  unlockPoints,
} from './scoring'

const unlockById = (id: string) => {
  const unlock = UNLOCKS.find((u) => u.id === id)
  if (!unlock) throw new Error(`Unknown entry: ${id}`)
  return unlock
}

describe('sheet structure', () => {
  it('has the seven categories of the sheet', () => {
    expect(CATEGORIES.map((c) => c.key)).toEqual([
      'cherry',
      'rice',
      'village',
      'road',
      'river',
      'wraparound',
      'seven',
    ])
  })

  it('hatches the bonus cell for the "7" column only', () => {
    const ohneBonus = CATEGORIES.filter((c) => !c.hasBonus)
    expect(ohneBonus.map((c) => c.key)).toEqual(['seven'])
  })

  it('has the 14 unlockable entries', () => {
    expect(UNLOCKS).toHaveLength(14)
  })

  it('gives every task type the markers 4/4/5/5/6/6', () => {
    const mitKarten = CATEGORIES.filter((c) => c.taskValues !== null)
    expect(mitKarten.map((c) => c.key)).toEqual([
      'cherry',
      'rice',
      'village',
      'road',
      'river',
      'wraparound',
    ])
    for (const category of mitKarten) expect(category.taskValues).toEqual([4, 4, 5, 5, 6, 6])
  })

  it('counts tasks in the "7" column instead of ticking markers', () => {
    const ohneKarten = CATEGORIES.filter((c) => c.taskValues === null)
    expect(ohneKarten.map((c) => c.key)).toEqual(['seven'])
    expect(ohneKarten[0].taskFactor).toBe(7)
  })

  it('adds up to 30 points when every marker is completed', () => {
    expect(TASK_VALUES.reduce((a, b) => a + b, 0)).toBe(30)
  })
})

describe('createEmptySheet', () => {
  it('starts at zero points', () => {
    expect(computeTotals(createEmptySheet()).result).toBe(0)
  })

  it('creates six unticked markers per task column', () => {
    const sheet = createEmptySheet()
    expect(sheet.taskCards.village).toEqual([false, false, false, false, false, false])
    expect(sheet.taskCards.wraparound).toEqual([false, false, false, false, false, false])
    expect(sheet.taskCards.seven).toEqual([])
  })

  it('creates one value per field and unlocks nothing', () => {
    const sheet = createEmptySheet()
    for (const unlock of UNLOCKS) {
      expect(sheet.unlocks[unlock.id].enabled).toBe(false)
      expect(sheet.unlocks[unlock.id].values).toHaveLength(unlock.fields.length)
    }
  })
})

describe('unlockPoints', () => {
  it('does not count while the entry is locked', () => {
    const bridges = unlockById('bridges')
    expect(unlockPoints(bridges, { enabled: false, values: [3] })).toBe(0)
  })

  it('multiplies by the factor printed on the sheet', () => {
    expect(unlockPoints(unlockById('bridges'), { enabled: true, values: [3] })).toBe(15)
    expect(unlockPoints(unlockById('gates'), { enabled: true, values: [2] })).toBe(10)
    expect(unlockPoints(unlockById('cartographer'), { enabled: true, values: [4] })).toBe(8)
    expect(unlockPoints(unlockById('poet'), { enabled: true, values: [5] })).toBe(15)
    expect(unlockPoints(unlockById('sumoWrestler'), { enabled: true, values: [7] })).toBe(7)
  })

  it('scores 6 points per enclosed temple, at most three temples', () => {
    const temples = unlockById('temples')
    expect(temples.fields[0].max).toBe(3)
    expect(unlockPoints(temples, { enabled: true, values: [0] })).toBe(0)
    expect(unlockPoints(temples, { enabled: true, values: [3] })).toBe(18)
  })

  it('adds both hot spring rules: 3 per spring and 3 per Wraparound Task', () => {
    const quellen = unlockById('hotSprings')
    expect(unlockPoints(quellen, { enabled: true, values: [2, 3] })).toBe(15)
    expect(unlockPoints(quellen, { enabled: true, values: [0, 3] })).toBe(9)
  })

  it('takes the cherry blossom value as points directly', () => {
    expect(unlockPoints(unlockById('cherryBlossoms'), { enabled: true, values: [9] })).toBe(9)
  })

  it('copes with missing values', () => {
    expect(unlockPoints(unlockById('hotSprings'), { enabled: true, values: [] })).toBe(0)
  })
})

describe('taskPoints', () => {
  it('sums the ticked markers only', () => {
    const sheet = createEmptySheet()
    // 4 + 4 + 5 + 5 + 6 = 24
    sheet.taskCards.cherry = [true, true, true, true, true, false]
    expect(taskPoints(sheet, 'cherry')).toBe(24)
  })

  it('yields 30 when all six markers are ticked', () => {
    const sheet = createEmptySheet()
    sheet.taskCards.village = [true, true, true, true, true, true]
    expect(taskPoints(sheet, 'village')).toBe(30)
  })

  it('ignores a typed value in columns that use markers', () => {
    const sheet = createEmptySheet()
    sheet.tasks.river = 99
    sheet.taskCards.river = [false, false, true, false, true, false]
    expect(taskPoints(sheet, 'river')).toBe(11)
  })

  it('uses the same markers for Wraparound Tasks as for the terrains', () => {
    const sheet = createEmptySheet()
    sheet.taskCards.wraparound = [false, false, false, false, true, false] // 6
    expect(taskPoints(sheet, 'wraparound')).toBe(6)
  })

  it('multiplies the amount by 7 in the "7" column', () => {
    const sheet = createEmptySheet()
    sheet.tasks.seven = 2
    expect(taskPoints(sheet, 'seven')).toBe(14)
  })
})

describe('categoryTotal', () => {
  it('adds the task row and the bonus row', () => {
    const sheet = createEmptySheet()
    // 4 + 4 + 5 + 6 = 19
    sheet.taskCards.road = [true, true, true, false, true, false]
    sheet.bonus.road = 9
    expect(categoryTotal(sheet, 'road')).toBe(28)
  })

  it('ignores a bonus value in the hatched "7" column', () => {
    const sheet = createEmptySheet()
    sheet.tasks.seven = 1
    sheet.bonus.seven = 99
    expect(categoryTotal(sheet, 'seven')).toBe(7)
  })
})

describe('computeTotals', () => {
  it('sums the upper table row by row', () => {
    const sheet = createEmptySheet()
    sheet.taskCards.cherry = [true, true, true, true, true, false] // 24
    sheet.taskCards.rice = [true, true, false, true, false, true] // 4+4+5+6 = 19
    sheet.taskCards.village = [true, true, false, true, true, true] // 4+4+5+6+6 = 25
    sheet.taskCards.road = [true, true, true, false, true, false] // 19
    sheet.taskCards.river = [false, false, true, false, true, false] // 11
    sheet.taskCards.wraparound = [false, false, false, false, true, false] // 6
    sheet.tasks.seven = 1 // double task = 7 points
    sheet.bonus.cherry = 3
    sheet.bonus.rice = 2
    sheet.bonus.village = 4
    sheet.bonus.road = 9
    sheet.bonus.river = 6
    sheet.bonus.wraparound = 4

    const totals = computeTotals(sheet)
    expect(totals.perCategoryTasks.village).toBe(25)
    expect(totals.tasks).toBe(24 + 19 + 25 + 19 + 11 + 6 + 7)
    expect(totals.bonus).toBe(28)
    expect(totals.unlocked).toBe(0)
    expect(totals.result).toBe(111 + 28)
  })

  it('adds the upper table and the unlocked block into the result', () => {
    const sheet = createEmptySheet()
    sheet.taskCards.village = [true, false, true, false, false, false] // 9
    sheet.bonus.village = 5
    sheet.unlocks.bridges = { enabled: true, values: [2] }
    sheet.unlocks.hotSprings = { enabled: true, values: [1, 2] }

    const totals = computeTotals(sheet)
    expect(totals.perUnlock.bridges).toBe(10)
    expect(totals.perUnlock.hotSprings).toBe(9)
    expect(totals.unlocked).toBe(19)
    expect(totals.result).toBe(33)
  })

  it('counts unlocked but empty entries as 0', () => {
    const sheet = createEmptySheet()
    sheet.unlocks.poet = { enabled: true, values: [0] }
    expect(computeTotals(sheet).result).toBe(0)
  })
})
