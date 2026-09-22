<script setup lang="ts">
import { fill, t } from '../lib/i18n'

import type { MarkerState } from '../lib/scoring'

const props = defineProps<{
  /** Markers on the table, with their index in the canonical list */
  markers: { marker: { value: number }; index: number }[]
  /** Category name – for screen readers only */
  category: string
  /** The building of this category is unlocked, so markers can lie on it */
  doubling: boolean
}>()

const model = defineModel<MarkerState[]>({ required: true })

/**
 * Without a building a marker is simply done or not. With one it can go one
 * step further: it lies on the building and scores a second time.
 */
const toggle = (index: number) => {
  const next = [...model.value]
  const top: MarkerState = props.doubling ? 2 : 1
  next[index] = (next[index] ?? 0) >= top ? 0 : (((next[index] ?? 0) + 1) as MarkerState)
  model.value = next
}
</script>

<template>
  <div class="chips" role="group" :aria-label="fill(t.ui.taskGroup, { category: category })">
    <button
      v-for="{ marker, index } in markers"
      :key="index"
      type="button"
      class="chip"
      :class="{ on: model[index], doubled: model[index] === 2 }"
      :aria-pressed="(model[index] ?? 0) > 0"
      :aria-label="
        fill(t.ui.taskCard, { points: marker.value }) +
        (model[index] === 2 ? `, ${t.ui.onBuilding}` : '')
      "
      @click="toggle(index)"
    >
      {{ marker.value }}<sup v-if="model[index] === 2" aria-hidden="true">×2</sup>
    </button>
  </div>
</template>

<style scoped>
.chips {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
  gap: 0.35rem;
}

.chip {
  appearance: none;
  border: 1.5px solid var(--line);
  background: #fff;
  color: var(--ink-soft);
  border-radius: 0.65rem;
  padding: 0.55rem 0;
  font-size: 1.05rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition:
    background-color 0.12s ease,
    color 0.12s ease,
    border-color 0.12s ease;
}

.chip.on {
  background: var(--accent-600);
  border-color: var(--accent-600);
  color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.18);
}

/* A marker on its building keeps the accent fill but gets a darker ground and
   a small ×2, so the two states stay apart at a glance. */
.chip.doubled {
  background: var(--accent-800);
  border-color: var(--accent-800);
}

.chip sup {
  font-size: 0.62em;
  font-weight: 700;
  margin-left: 0.1em;
  vertical-align: super;
}

.chip:active {
  transform: translateY(1px);
}
</style>
