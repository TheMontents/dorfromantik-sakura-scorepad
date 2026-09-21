import { describe, expect, it } from 'vitest'
import {
  AUFTRAGS_WERTE,
  CATEGORIES,
  UNLOCKS,
  auftragPoints,
  categoryTotal,
  computeTotals,
  createEmptySheet,
  unlockPoints,
} from './scoring'

const unlockById = (id: string) => {
  const unlock = UNLOCKS.find((u) => u.id === id)
  if (!unlock) throw new Error(`Unbekannte Position: ${id}`)
  return unlock
}

describe('Bogen-Struktur', () => {
  it('hat die 7 Kategorien des Bogens', () => {
    expect(CATEGORIES.map((c) => c.key)).toEqual([
      'kirschbluete',
      'reisfeld',
      'dorf',
      'weg',
      'wasser',
      'rundum',
      'sieben',
    ])
  })

  it('sperrt die Bonus-Zelle nur bei der 7er-Spalte', () => {
    const ohneBonus = CATEGORIES.filter((c) => c.bonusLabel === null)
    expect(ohneBonus.map((c) => c.key)).toEqual(['sieben'])
  })

  it('hat die 14 freigespielten Positionen', () => {
    expect(UNLOCKS).toHaveLength(14)
  })

  it('gibt den 5 Gebietsspalten die Auftragskarten 4/4/5/5/6/6', () => {
    const mitKarten = CATEGORIES.filter((c) => c.auftragsWerte !== null)
    expect(mitKarten.map((c) => c.key)).toEqual([
      'kirschbluete',
      'reisfeld',
      'dorf',
      'weg',
      'wasser',
    ])
    for (const category of mitKarten) expect(category.auftragsWerte).toEqual([4, 4, 5, 5, 6, 6])
  })

  it('laesst Rundumauftraege und die 7er-Spalte frei eintippen', () => {
    const ohneKarten = CATEGORIES.filter((c) => c.auftragsWerte === null)
    expect(ohneKarten.map((c) => c.key)).toEqual(['rundum', 'sieben'])
  })

  it('kommt auf 30 Punkte, wenn alle Auftragskarten erfuellt sind', () => {
    expect(AUFTRAGS_WERTE.reduce((a, b) => a + b, 0)).toBe(30)
  })
})

describe('createEmptySheet', () => {
  it('startet bei null Punkten', () => {
    expect(computeTotals(createEmptySheet()).ergebnis).toBe(0)
  })

  it('legt je Gebietsspalte sechs nicht angehakte Auftragskarten an', () => {
    const sheet = createEmptySheet()
    expect(sheet.auftragsChips.dorf).toEqual([false, false, false, false, false, false])
    expect(sheet.auftragsChips.rundum).toEqual([])
  })

  it('legt je Feld einen Wert an und nichts ist freigespielt', () => {
    const sheet = createEmptySheet()
    for (const unlock of UNLOCKS) {
      expect(sheet.unlocks[unlock.id].enabled).toBe(false)
      expect(sheet.unlocks[unlock.id].values).toHaveLength(unlock.fields.length)
    }
  })
})

describe('unlockPoints', () => {
  it('zaehlt nicht, solange die Position nicht freigespielt ist', () => {
    const bruecken = unlockById('bruecken')
    expect(unlockPoints(bruecken, { enabled: false, values: [3] })).toBe(0)
  })

  it('multipliziert mit dem Faktor des Bogens', () => {
    expect(unlockPoints(unlockById('bruecken'), { enabled: true, values: [3] })).toBe(15)
    expect(unlockPoints(unlockById('tore'), { enabled: true, values: [2] })).toBe(10)
    expect(unlockPoints(unlockById('tempel'), { enabled: true, values: [2] })).toBe(12)
    expect(unlockPoints(unlockById('kartograph'), { enabled: true, values: [4] })).toBe(8)
    expect(unlockPoints(unlockById('poet'), { enabled: true, values: [5] })).toBe(15)
    expect(unlockPoints(unlockById('sumoringer'), { enabled: true, values: [7] })).toBe(7)
  })

  it('addiert bei Heissen Quellen beide Regeln: abgeschlossen x3 und 3 je Rundumauftrag', () => {
    expect(unlockPoints(unlockById('heisseQuellen'), { enabled: true, values: [2, 3] })).toBe(15)
  })

  it('nimmt bei Kirschblueten den Wert direkt als Punkte', () => {
    expect(unlockPoints(unlockById('kirschbluetenGesammelt'), { enabled: true, values: [9] })).toBe(9)
  })

  it('kommt mit fehlenden Werten klar', () => {
    expect(unlockPoints(unlockById('heisseQuellen'), { enabled: true, values: [] })).toBe(0)
  })
})

describe('auftragPoints', () => {
  it('summiert nur die angehakten Auftragskarten', () => {
    const sheet = createEmptySheet()
    // 4 + 4 + 5 + 5 + 6 = 24
    sheet.auftragsChips.kirschbluete = [true, true, true, true, true, false]
    expect(auftragPoints(sheet, 'kirschbluete')).toBe(24)
  })

  it('ergibt 30, wenn alle sechs Karten angehakt sind', () => {
    const sheet = createEmptySheet()
    sheet.auftragsChips.dorf = [true, true, true, true, true, true]
    expect(auftragPoints(sheet, 'dorf')).toBe(30)
  })

  it('ignoriert bei Kartenspalten einen frei eingetippten Wert', () => {
    const sheet = createEmptySheet()
    sheet.auftraege.wasser = 99
    sheet.auftragsChips.wasser = [false, false, true, false, true, false]
    expect(auftragPoints(sheet, 'wasser')).toBe(11)
  })

  it('nimmt bei Rundumauftraegen und der 7 den eingetippten Wert', () => {
    const sheet = createEmptySheet()
    sheet.auftraege.rundum = 6
    sheet.auftraege.sieben = 7
    expect(auftragPoints(sheet, 'rundum')).toBe(6)
    expect(auftragPoints(sheet, 'sieben')).toBe(7)
  })
})

describe('categoryTotal', () => {
  it('addiert Auftrags- und Bonuszeile', () => {
    const sheet = createEmptySheet()
    // 4 + 4 + 5 + 6 = 19
    sheet.auftragsChips.weg = [true, true, true, false, true, false]
    sheet.bonus.weg = 9
    expect(categoryTotal(sheet, 'weg')).toBe(28)
  })

  it('ignoriert einen Bonuswert in der schraffierten 7er-Spalte', () => {
    const sheet = createEmptySheet()
    sheet.auftraege.sieben = 7
    sheet.bonus.sieben = 99
    expect(categoryTotal(sheet, 'sieben')).toBe(7)
  })
})

describe('computeTotals', () => {
  it('summiert die obere Tabelle zeilenweise', () => {
    const sheet = createEmptySheet()
    sheet.auftragsChips.kirschbluete = [true, true, true, true, true, false] // 24
    sheet.auftragsChips.reisfeld = [true, true, false, true, false, true] // 4+4+5+6 = 19
    sheet.auftragsChips.dorf = [true, true, false, true, true, true] // 4+4+5+6+6 = 25
    sheet.auftragsChips.weg = [true, true, true, false, true, false] // 19
    sheet.auftragsChips.wasser = [false, false, true, false, true, false] // 11
    sheet.auftraege.rundum = 6
    sheet.auftraege.sieben = 7
    sheet.bonus.kirschbluete = 3
    sheet.bonus.reisfeld = 2
    sheet.bonus.dorf = 4
    sheet.bonus.weg = 9
    sheet.bonus.wasser = 6
    sheet.bonus.rundum = 4

    const totals = computeTotals(sheet)
    expect(totals.proAuftrag.dorf).toBe(25)
    expect(totals.auftraege).toBe(24 + 19 + 25 + 19 + 11 + 6 + 7)
    expect(totals.bonus).toBe(28)
    expect(totals.freigespielt).toBe(0)
    expect(totals.ergebnis).toBe(111 + 28)
  })

  it('rechnet obere Tabelle und Freigespieltes zum Ergebnis zusammen', () => {
    const sheet = createEmptySheet()
    sheet.auftragsChips.dorf = [true, false, true, false, false, false] // 9
    sheet.bonus.dorf = 5
    sheet.unlocks.bruecken = { enabled: true, values: [2] }
    sheet.unlocks.heisseQuellen = { enabled: true, values: [1, 2] }

    const totals = computeTotals(sheet)
    expect(totals.proUnlock.bruecken).toBe(10)
    expect(totals.proUnlock.heisseQuellen).toBe(9)
    expect(totals.freigespielt).toBe(19)
    expect(totals.ergebnis).toBe(33)
  })

  it('zaehlt abgehakte, aber leere Positionen mit 0', () => {
    const sheet = createEmptySheet()
    sheet.unlocks.poet = { enabled: true, values: [0] }
    expect(computeTotals(sheet).ergebnis).toBe(0)
  })
})
