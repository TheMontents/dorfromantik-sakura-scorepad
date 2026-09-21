<script setup lang="ts">
import { computed, ref, watch, watchEffect } from 'vue'
import ConfirmDialog from './components/ConfirmDialog.vue'
import ScoreTable from './components/ScoreTable.vue'
import UnlockList from './components/UnlockList.vue'
import { LOCALES, LOCALE_NAMES, locale, t } from './lib/i18n'
import { GAMES, GAME_IDS, isGameId, type GameId } from './lib/games'
import { computeTotals, createEmptySheet } from './lib/scoring'
import { clearSheet, loadGameChoice, loadSheet, saveGameChoice, saveSheet } from './lib/storage'

const stored = loadGameChoice()
const gameId = ref<GameId>(stored && isGameId(stored) ? stored : 'sakura')
const game = computed(() => GAMES[gameId.value])

// Jedes Spiel hat seinen eigenen Bogen, damit ein Wechsel keine laufende
// Partie kostet – deshalb wird beim Umschalten geladen statt geleert.
const sheet = ref(loadSheet(game.value))
watch(gameId, (id) => {
  saveGameChoice(id)
  sheet.value = loadSheet(GAMES[id])
})

const totals = computed(() => computeTotals(game.value, sheet.value))
const text = computed(() => t.value.games[gameId.value])

watch(sheet, (value) => saveSheet(gameId.value, value), { deep: true })

// Der Tab-Titel folgt Spiel und Sprache.
watchEffect(() => {
  document.title = `Dorfromantik – ${text.value.title}`
})

const askReset = ref(false)

const resetSheet = () => {
  askReset.value = false
  const keepExpansions = sheet.value.expansions
  clearSheet(gameId.value)
  sheet.value = createEmptySheet(game.value)
  // Welches Material freigespielt ist, gehört zur Kampagne und nicht zur
  // einzelnen Partie – das überlebt einen neuen Bogen.
  sheet.value.expansions = keepExpansions
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const startNewGame = () => {
  if (totals.value.result === 0) resetSheet()
  else askReset.value = true
}
</script>

<template>
  <div class="app" :data-game="gameId">
    <header class="top">
      <div class="switchers">
        <div class="games" role="group" :aria-label="t.ui.game">
          <button
            v-for="id in GAME_IDS"
            :key="id"
            type="button"
            class="game"
            :class="{ on: id === gameId }"
            :aria-pressed="id === gameId"
            @click="gameId = id"
          >
            {{ t.games[id].name }}
          </button>
        </div>
        <label class="lang">
          <span class="sr-only">{{ t.ui.language }}</span>
          <select v-model="locale">
            <option v-for="code in LOCALES" :key="code" :value="code">
              {{ LOCALE_NAMES[code] }}
            </option>
          </select>
        </label>
      </div>
      <p class="eyebrow">Dorfromantik</p>
      <h1>{{ text.title }}</h1>
    </header>

    <main>
      <ScoreTable :game="game" :sheet="sheet" :totals="totals" />
      <UnlockList :game="game" :sheet="sheet" :totals="totals" />

      <label v-if="game.hasExpansions" class="expansions">
        <input v-model="sheet.expansions" type="checkbox" />
        <span>{{ t.ui.expansions }}</span>
      </label>

      <section class="panel summary">
        <h2 class="sr-only">{{ t.ui.subtotals }}</h2>
        <dl>
          <div><dt>{{ t.ui.tasks }}</dt><dd>{{ totals.tasks }}</dd></div>
          <div><dt>{{ t.ui.bonusRow }}</dt><dd>{{ totals.bonus }}</dd></div>
          <div><dt>{{ t.ui.unlocked }}</dt><dd>{{ totals.unlocked }}</dd></div>
        </dl>
      </section>

      <p class="disclaimer">{{ t.ui.disclaimer }}</p>
    </main>

    <footer class="result">
      <button type="button" class="reset" @click="startNewGame">{{ t.ui.newGame }}</button>
      <div class="result-score">
        <span class="result-label">{{ t.ui.result }}</span>
        <span class="result-value">{{ totals.result }}</span>
      </div>
    </footer>

    <ConfirmDialog
      :open="askReset"
      :title="t.ui.newGame"
      :message="t.ui.confirmReset"
      :confirm-label="t.ui.clear"
      :cancel-label="t.ui.cancel"
      @confirm="resetSheet"
      @cancel="askReset = false"
    />
  </div>
</template>

<style scoped>
.app {
  max-width: 34rem;
  margin: 0 auto;
  padding: 0 0.75rem calc(5.5rem + env(safe-area-inset-bottom));
}

.top {
  padding: 0.9rem 0.35rem 0.9rem;
}

.switchers {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.85rem;
}

.games {
  display: flex;
  gap: 0.25rem;
  padding: 0.2rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.2);
}

.game {
  appearance: none;
  border: 0;
  background: transparent;
  color: rgba(255, 255, 255, 0.85);
  font: inherit;
  font-size: 0.85rem;
  font-weight: 700;
  padding: 0.35rem 0.8rem;
  border-radius: 999px;
  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

.game.on {
  background: #fff;
  color: var(--accent-700);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.16);
}

.lang select {
  appearance: none;
  border: 1.5px solid rgba(255, 255, 255, 0.45);
  border-radius: 999px;
  background: transparent;
  color: #fff;
  font: inherit;
  font-size: 0.82rem;
  font-weight: 600;
  padding: 0.4rem 0.7rem;
  cursor: pointer;
}

.lang select option {
  color: var(--ink);
  background: #fff;
}

.eyebrow {
  margin: 0;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.8);
}

h1 {
  margin: 0.1rem 0 0;
  font-size: 1.4rem;
  line-height: 1.15;
  color: #fff;
  letter-spacing: -0.01em;
}

main {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.expansions {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0 0.35rem;
  color: #fff;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
}

.expansions input {
  width: 1.15rem;
  height: 1.15rem;
  accent-color: #fff;
  cursor: pointer;
}

.summary dl {
  margin: 0;
  padding: 0.75rem 0.85rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.summary dl > div {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  font-size: 0.9rem;
}

.summary dt {
  color: var(--ink-soft);
}

.summary dd {
  margin: 0;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: var(--ink);
}

.disclaimer {
  margin: 0.2rem 0.35rem 0;
  font-size: 0.72rem;
  line-height: 1.4;
  text-align: center;
  color: rgba(255, 255, 255, 0.78);
}

.result {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  max-width: 34rem;
  margin: 0 auto;
  padding: 0.7rem 1rem calc(0.7rem + env(safe-area-inset-bottom));
  background: var(--accent-800);
  color: #fff;
  border-radius: 1.1rem 1.1rem 0 0;
  box-shadow: 0 -8px 24px rgba(40, 30, 20, 0.28);
}

.reset {
  flex: none;
  border: 1.5px solid rgba(255, 255, 255, 0.45);
  background: transparent;
  color: rgba(255, 255, 255, 0.92);
  font-weight: 600;
  font-size: 0.85rem;
  padding: 0.5rem 0.85rem;
  border-radius: 999px;
  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

.reset:active {
  background: rgba(255, 255, 255, 0.22);
}

.result-score {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
}

.result-label {
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.result-value {
  font-size: 2rem;
  font-weight: 800;
  line-height: 1;
  font-variant-numeric: tabular-nums;
}
</style>
