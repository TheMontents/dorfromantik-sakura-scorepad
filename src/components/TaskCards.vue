<script setup lang="ts">
import { fill, t } from '../lib/i18n'

const props = defineProps<{
  /** Values of the task markers, e.g. [4, 4, 5, 5, 6, 6] */
  values: number[]
  /** Category name – for screen readers only */
  category: string
}>()

const model = defineModel<boolean[]>({ required: true })

const toggle = (index: number) => {
  const next = props.values.map((_, i) => model.value[i] === true)
  next[index] = !next[index]
  model.value = next
}
</script>

<template>
  <div class="chips" role="group" :aria-label="fill(t.ui.taskGroup, { category: category })">
    <button
      v-for="(value, index) in values"
      :key="index"
      type="button"
      class="chip"
      :class="{ on: model[index] }"
      :aria-pressed="model[index] === true"
      :aria-label="fill(t.ui.taskCard, { points: value })"
      @click="toggle(index)"
    >
      {{ value }}
    </button>
  </div>
</template>

<style scoped>
.chips {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
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
  background: var(--sakura-600);
  border-color: var(--sakura-600);
  color: #fff;
  box-shadow: 0 2px 6px rgba(174, 67, 89, 0.3);
}

.chip:active {
  transform: translateY(1px);
}
</style>
