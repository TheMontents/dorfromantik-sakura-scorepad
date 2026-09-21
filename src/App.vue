<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import ScoreTable from './components/ScoreTable.vue'
import UnlockList from './components/UnlockList.vue'
import { computeTotals, createEmptySheet } from './lib/scoring'
import { clearSheet, loadSheet, saveSheet } from './lib/storage'

const sheet = ref(loadSheet())
const totals = computed(() => computeTotals(sheet.value))

watch(sheet, (value) => saveSheet(value), { deep: true })

const neuePartie = () => {
  if (totals.value.ergebnis > 0 && !confirm('Bogen wirklich leeren und neue Partie starten?')) return
  clearSheet()
  sheet.value = createEmptySheet()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <div class="app">
    <header class="top">
      <div class="top-text">
        <p class="eyebrow">Dorfromantik · Das Duell</p>
        <h1>Sakura Wertungsblock</h1>
      </div>
      <button type="button" class="reset" @click="neuePartie">Neue Partie</button>
    </header>

    <main>
      <ScoreTable :sheet="sheet" :totals="totals" />
      <UnlockList :sheet="sheet" :totals="totals" />

      <section class="panel summary">
        <h2 class="sr-only">Zwischensummen</h2>
        <dl>
          <div><dt>Aufträge</dt><dd>{{ totals.auftraege }}</dd></div>
          <div><dt>Fahnen / längste / +2</dt><dd>{{ totals.bonus }}</dd></div>
          <div><dt>Freigespielt</dt><dd>{{ totals.freigespielt }}</dd></div>
        </dl>
      </section>
    </main>

    <footer class="result">
      <span class="result-label">Ergebnis</span>
      <span class="result-value">{{ totals.ergebnis }}</span>
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
  border: 1.5px solid rgba(255, 255, 255, 0.6);
  background: rgba(255, 255, 255, 0.16);
  color: #fff;
  font-weight: 600;
  font-size: 0.82rem;
  padding: 0.45rem 0.7rem;
  border-radius: 999px;
  cursor: pointer;
}

.reset:active {
  background: rgba(255, 255, 255, 0.3);
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
  padding: 0.7rem 1.1rem calc(0.7rem + env(safe-area-inset-bottom));
  background: var(--sakura-800);
  color: #fff;
  border-radius: 1.1rem 1.1rem 0 0;
  box-shadow: 0 -8px 24px rgba(90, 30, 45, 0.25);
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
