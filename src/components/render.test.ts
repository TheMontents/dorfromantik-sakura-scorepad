import { describe, expect, it } from 'vitest'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import ScoreTable from './ScoreTable.vue'
import UnlockList from './UnlockList.vue'
import { GAMES, GAME_IDS } from '../lib/games'
import { computeTotals, createEmptySheet } from '../lib/scoring'
import { MESSAGES } from '../lib/messages'

/**
 * Renders the two panels for every game. Template lookups such as
 * `text.categories[category.key]` are invisible to the type checker, so this
 * is the net that catches a key that exists in the game but not in the texts.
 */
const render = (component: unknown, gameId: (typeof GAME_IDS)[number], expansions = false) => {
  const game = GAMES[gameId]
  const sheet = createEmptySheet(game)
  sheet.options.miniExpansions = expansions
  const app = createSSRApp(component as never, {
    game,
    sheet,
    totals: computeTotals(game, sheet),
  })
  return renderToString(app)
}

describe('rendering', () => {
  for (const id of GAME_IDS) {
    it(`draws the task table of the ${id} pad`, async () => {
      const html = await render(ScoreTable, id)
      for (const category of GAMES[id].categories) {
        expect(html).toContain(MESSAGES.de.games[id].categories[category.key].label)
      }
      expect(html).not.toContain('undefined')
    })

    it(`draws the unlock list of the ${id} pad`, async () => {
      const html = await render(UnlockList, id)
      for (const unlock of GAMES[id].unlocks.filter((u) => !u.expansion)) {
        expect(html).toContain(MESSAGES.de.games[id].unlocks[unlock.id].label)
      }
      expect(html).not.toContain('undefined')
    })
  }

  it('shows the mini expansions only once they are switched on', async () => {
    const school = MESSAGES.de.games.classic.unlocks.school.label
    expect(await render(UnlockList, 'classic')).not.toContain(school)
    expect(await render(UnlockList, 'classic', true)).toContain(school)
  })
})
