import { describe, expect, it } from 'vitest'
import { CATEGORIES, UNLOCKS } from './scoring'
import { LOCALES, LOCALE_NAMES, MESSAGES, type Locale } from './messages'

const UI_KEYS = Object.keys(MESSAGES.de.ui) as (keyof (typeof MESSAGES)['de']['ui'])[]

describe('languages', () => {
  it('covers the editions the game was published in', () => {
    expect(LOCALES).toEqual(['de', 'en', 'fr', 'it', 'es', 'pl'])
    for (const code of LOCALES) expect(LOCALE_NAMES[code]).toBeTruthy()
  })

  for (const code of LOCALES as readonly Locale[]) {
    describe(code, () => {
      const messages = MESSAGES[code]

      it('has every interface string', () => {
        for (const key of UI_KEYS) expect(messages.ui[key], `${code}.ui.${key}`).toBeTruthy()
      })

      it('names every category and its bonus row', () => {
        for (const category of CATEGORIES) {
          const text = messages.categories[category.key]
          expect(text?.label, `${code}.categories.${category.key}`).toBeTruthy()
          if (category.hasBonus) {
            expect(text.bonus, `${code}.${category.key}.bonus`).toBeTruthy()
            expect(text.bonusHint, `${code}.${category.key}.bonusHint`).toBeTruthy()
          } else {
            expect(text.bonus).toBeUndefined()
          }
        }
      })

      it('names every unlockable entry and each of its fields', () => {
        for (const unlock of UNLOCKS) {
          const text = messages.unlocks[unlock.id]
          expect(text?.label, `${code}.unlocks.${unlock.id}`).toBeTruthy()
          expect(text.hint, `${code}.unlocks.${unlock.id}.hint`).toBeTruthy()
          expect(text.fields, `${code}.unlocks.${unlock.id}.fields`).toHaveLength(
            unlock.fields.length,
          )
          for (const field of text.fields) expect(field).toBeTruthy()
        }
      })

      it('has no surplus entries', () => {
        expect(Object.keys(messages.unlocks).sort()).toEqual(UNLOCKS.map((u) => u.id).sort())
        expect(Object.keys(messages.categories).sort()).toEqual(
          CATEGORIES.map((c) => c.key).sort(),
        )
      })

      it('keeps the placeholders of the templates', () => {
        expect(messages.ui.taskCard).toContain('{points}')
        expect(messages.ui.taskGroup).toContain('{category}')
      })
    })
  }
})
