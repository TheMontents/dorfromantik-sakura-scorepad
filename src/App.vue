<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import ScoreTable from './components/ScoreTable.vue'
import UnlockList from './components/UnlockList.vue'
import { LOCALES, LOCALE_NAMES, locale, t } from './lib/i18n'
import { computeTotals, createEmptySheet } from './lib/scoring'
import { clearSheet, loadSheet, saveSheet } from './lib/storage'

const sheet = ref(loadSheet())
const totals = computed(() => computeTotals(sheet.value))

watch(sheet, (value) => saveSheet(value), { deep: true })

const startNewGame = () => {
  if (totals.value.result > 0 && !confirm(t.value.ui.confirmReset)) return
  clearSheet()
  sheet.value = createEmptySheet()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <div class="app">
    <header class="top">
      <div class="top-text">
        <p class="eyebrow">Dorfromantik</p>
        <h1>{{ t.ui.title }}</h1>
      </div>
      <label class="lang">
        <span class="sr-only">{{ t.ui.language }}</span>
        <select v-model="locale">
          <option v-for="code in LOCALES" :key="code" :value="code">{{ LOCALE_NAMES[code] }}</option>
        </select>
      </label>
    </header>

    <main>
      <ScoreTable :sheet="sheet" :totals="totals" />
      <UnlockList :sheet="sheet" :totals="totals" />

      <section class="panel summary">
        <h2 class="sr-only">{{ t.ui.subtotals }}</h2>
        <dl>
          <div><dt>{{ t.ui.tasks }}</dt><dd>{{ totals.tasks }}</dd></div>
          <div><dt>{{ t.ui.bonusRow }}</dt><dd>{{ totals.bonus }}</dd></div>
          <div><dt>{{ t.ui.unlocked }}</dt><dd>{{ totals.unlocked }}</dd></div>
        </dl>
      </section>
    </main>

    <footer class="result">
      <button type="button" class="reset" @click="startNewGame">{{ t.ui.newGame }}</button>
      <div class="result-score">
        <span class="result-label">{{ t.ui.result }}</span>
        <span class="result-value">{{ totals.result }}</span>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.app {
  max-width: 34rem;
  margin: 0 auto;
  padding: 0 0.75rem calc(5.5rem + env(safe-area-inset-bottom));
}

.top {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.1rem 0.35rem 0.9rem;
}

.top-text {
  flex: 1 1 auto;
  min-width: 0;
}

.lang {
  flex: none;
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

main {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
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
  background: var(--sakura-800);
  color: #fff;
  border-radius: 1.1rem 1.1rem 0 0;
  box-shadow: 0 -8px 24px rgba(90, 30, 45, 0.25);
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
