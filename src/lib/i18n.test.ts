import { describe, expect, it } from 'vitest'
import { GAMES, GAME_IDS } from './games'
import { LOCALES, LOCALE_NAMES, MESSAGES, type Locale } from './messages'

const UI_KEYS = Object.keys(MESSAGES.de.ui) as (keyof (typeof MESSAGES)['de']['ui'])[]

describe('languages', () => {
  it('covers the editions the games were published in', () => {
    expect(LOCALES).toEqual(['de', 'en', 'fr', 'it', 'es', 'pl'])
    for (const code of LOCALES) expect(LOCALE_NAMES[code]).toBeTruthy()
  })

  for (const code of LOCALES as readonly Locale[]) {
    describe(code, () => {
      const messages = MESSAGES[code]

      it('has every interface string', () => {
        for (const key of UI_KEYS) expect(messages.ui[key], `${code}.ui.${key}`).toBeTruthy()
      })

      it('keeps the placeholders of the templates', () => {
        expect(messages.ui.taskCard).toContain('{points}')
        expect(messages.ui.taskGroup).toContain('{category}')
      })

      for (const id of GAME_IDS) {
        describe(id, () => {
          const game = GAMES[id]
          const text = messages.games[id]

          it('names the game and its sheet', () => {
            expect(text?.name, `${code}.${id}.name`).toBeTruthy()
            expect(text?.title, `${code}.${id}.title`).toBeTruthy()
          })

          it('names every category and its bonus row', () => {
            for (const category of game.categories) {
              const entry = text.categories[category.key]
              expect(entry?.label, `${code}.${id}.${category.key}`).toBeTruthy()
              if (category.hasBonus) {
                expect(entry.bonus, `${code}.${id}.${category.key}.bonus`).toBeTruthy()
                expect(entry.bonusHint, `${code}.${id}.${category.key}.bonusHint`).toBeTruthy()
              } else {
                expect(entry.bonus).toBeUndefined()
              }
            }
          })

          it('names every unlockable entry and each of its fields', () => {
            for (const unlock of game.unlocks) {
              const entry = text.unlocks[unlock.id]
              expect(entry?.label, `${code}.${id}.${unlock.id}`).toBeTruthy()
              expect(entry.hint, `${code}.${id}.${unlock.id}.hint`).toBeTruthy()
              expect(entry.fields, `${code}.${id}.${unlock.id}.fields`).toHaveLength(
                unlock.fields.length,
              )
              for (const field of entry.fields) expect(field).toBeTruthy()
            }
          })

          it('has no surplus entries', () => {
            expect(Object.keys(text.unlocks).sort()).toEqual(game.unlocks.map((u) => u.id).sort())
            expect(Object.keys(text.categories).sort()).toEqual(
              game.categories.map((c) => c.key).sort(),
            )
          })
        })
      }
    })
  }
})
