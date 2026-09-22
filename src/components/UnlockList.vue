<script setup lang="ts">
import { computed } from 'vue'
import NumberField from './NumberField.vue'
import { t } from '../lib/i18n'
import type { Game } from '../lib/games'
import { activeUnlocks, type Sheet, type Totals } from '../lib/scoring'

const props = defineProps<{ game: Game; sheet: Sheet; totals: Totals }>()

const text = computed(() => t.value.games[props.game.id])
const unlocks = computed(() => activeUnlocks(props.game, props.sheet))
const options = computed(() => props.game.options.filter((o) => o.placement === 'unlocks'))
</script>

<template>
  <section class="panel">
    <header class="panel-head">
      <h2>{{ t.ui.unlocked }}</h2>
      <div class="head-sums">
        <span>{{ totals.unlocked }} {{ t.ui.points }}</span>
      </div>
    </header>

    <ul class="unlocks">
      <li
        v-for="unlock in unlocks"
        :key="unlock.id"
        class="unlock"
        :class="{ active: sheet.unlocks[unlock.id].enabled }"
      >
        <label class="unlock-head">
          <input v-model="sheet.unlocks[unlock.id].enabled" type="checkbox" class="dot" />
          <span class="unlock-text">
            <span class="unlock-name">{{ text.unlocks[unlock.id].label }}</span>
            <span class="unlock-hint">{{ text.unlocks[unlock.id].hint }}</span>
          </span>
          <span v-if="sheet.unlocks[unlock.id].enabled" class="unlock-sum">
            {{ totals.perUnlock[unlock.id] }}
          </span>
        </label>

        <p v-if="unlock.computedFrom && sheet.unlocks[unlock.id].enabled" class="computed">
          {{ t.ui.computedFromTasks }}
        </p>

        <div v-if="sheet.unlocks[unlock.id].enabled" class="unlock-fields">
          <div v-for="(field, index) in unlock.fields" :key="index" class="unlock-field">
            <NumberField
              v-model="sheet.unlocks[unlock.id].values[index]"
              :label="text.unlocks[unlock.id].fields[index]"
              :max="field.max ?? 999"
            />
            <p v-if="field.factor !== null" class="calc">
              × {{ field.factor }} =
              <strong>{{ (sheet.unlocks[unlock.id].values[index] ?? 0) * field.factor }}</strong>
              {{ t.ui.pointsShort }}
            </p>
          </div>
        </div>
      </li>
    </ul>

    <div v-if="options.length" class="options">
      <label v-for="option in options" :key="option.id">
        <input v-model="sheet.options[option.id]" type="checkbox" />
        <span>{{ text.options[option.id] }}</span>
      </label>
    </div>
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
  background: var(--accent-25);
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
  border: 2px solid var(--accent-300);
  border-radius: 999px;
  background: #fff;
  cursor: pointer;
  position: relative;
}

.dot:checked {
  background: var(--accent-600);
  border-color: var(--accent-600);
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
  color: var(--accent-700);
  padding-top: 0.05rem;
}

.unlock-fields {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  padding: 0 0.85rem 0.8rem 2.8rem;
}

/* The buildings have no input of their own – they score what lies on them. */
.computed {
  margin: 0;
  padding: 0 0.85rem 0.7rem 2.8rem;
  font-size: 0.75rem;
  line-height: 1.35;
  color: var(--accent-700);
}

.options {
  border-top: 1px solid var(--line-soft);
  background: var(--accent-25);
  padding: 0.6rem 0.85rem;
}

.options label {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.18rem 0;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--ink-soft);
  cursor: pointer;
}

.options input {
  width: 1.1rem;
  height: 1.1rem;
  flex: none;
  accent-color: var(--accent-600);
  cursor: pointer;
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
  color: var(--accent-700);
}
</style>
