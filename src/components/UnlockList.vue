<script setup lang="ts">
import NumberField from './NumberField.vue'
import { UNLOCKS, type Sheet, type Totals } from '../lib/scoring'

defineProps<{ sheet: Sheet; totals: Totals }>()

const factorText = (factor: number | null) => (factor === null ? '' : `× ${factor}`)
</script>

<template>
  <section class="panel">
    <header class="panel-head">
      <h2>Freigespielt</h2>
      <div class="head-sums">
        <span>{{ totals.freigespielt }} Punkte</span>
      </div>
    </header>

    <ul class="unlocks">
      <li
        v-for="unlock in UNLOCKS"
        :key="unlock.id"
        class="unlock"
        :class="{ active: sheet.unlocks[unlock.id].enabled }"
      >
        <label class="unlock-head">
          <input v-model="sheet.unlocks[unlock.id].enabled" type="checkbox" class="dot" />
          <span class="unlock-text">
            <span class="unlock-name">{{ unlock.label }}</span>
            <span class="unlock-hint">{{ unlock.hint }}</span>
          </span>
          <span v-if="sheet.unlocks[unlock.id].enabled" class="unlock-sum">
            {{ totals.proUnlock[unlock.id] }}
          </span>
        </label>

        <div v-if="sheet.unlocks[unlock.id].enabled" class="unlock-fields">
          <div v-for="(field, index) in unlock.fields" :key="index" class="unlock-field">
            <NumberField
              v-model="sheet.unlocks[unlock.id].values[index]"
              :label="field.label"
              :max="field.max ?? 999"
            />
            <p v-if="field.factor !== null" class="calc">
              {{ factorText(field.factor) }} =
              <strong>{{ (sheet.unlocks[unlock.id].values[index] ?? 0) * field.factor }}</strong>
              Pkt
            </p>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.unlocks {
  list-style: none;
  margin: 0;
  padding: 0;
}

.unlock {
  border-top: 1px solid var(--line-soft);
}

.unlock:first-child {
  border-top: 0;
}

.unlock.active {
  background: var(--sakura-25);
}

.unlock-head {
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  padding: 0.6rem 0.85rem;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.dot {
  appearance: none;
  margin: 0.1rem 0 0;
  width: 1.3rem;
  height: 1.3rem;
  flex: none;
  border: 2px solid var(--sakura-300);
  border-radius: 999px;
  background: #fff;
  cursor: pointer;
  position: relative;
}

.dot:checked {
  background: var(--sakura-600);
  border-color: var(--sakura-600);
}

.dot:checked::after {
  content: '';
  position: absolute;
  inset: 0;
  background: no-repeat center/0.75rem
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Cpath d='M1.8 6.3l2.6 2.6L10.2 3' fill='none' stroke='%23fff' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
}

.unlock-text {
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.05rem;
}

.unlock-name {
  font-weight: 600;
  color: var(--ink);
  line-height: 1.25;
}

.unlock-hint {
  font-size: 0.75rem;
  color: var(--ink-soft);
  line-height: 1.3;
}

.unlock-sum {
  font-variant-numeric: tabular-nums;
  font-weight: 700;
  color: var(--sakura-700);
  padding-top: 0.05rem;
}

.unlock-fields {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  padding: 0 0.85rem 0.8rem 2.8rem;
}

.unlock-field {
  flex: 1 1 9rem;
  min-width: 0;
}

.calc {
  margin: 0.25rem 0 0;
  font-size: 0.75rem;
  color: var(--ink-soft);
  text-align: center;
}

.calc strong {
  color: var(--sakura-700);
}
</style>
