<script setup lang="ts">
import { computed } from 'vue'
import { t } from '../lib/i18n'

const props = withDefaults(
  defineProps<{
    label: string
    /** Render the label for screen readers only */
    hideLabel?: boolean
    step?: number
    min?: number
    max?: number
  }>(),
  { hideLabel: false, step: 1, min: 0, max: 999 },
)

const model = defineModel<number>({ required: true })

const clamp = (value: number) => Math.min(props.max, Math.max(props.min, value))

const display = computed({
  get: () => (model.value === 0 ? '' : String(model.value)),
  set: (raw: string) => {
    const digits = raw.replace(/[^0-9]/g, '')
    model.value = digits === '' ? 0 : clamp(Number(digits))
  },
})

const bump = (delta: number) => {
  model.value = clamp(model.value + delta * props.step)
}
</script>

<template>
  <div class="field">
    <span class="field-label" :class="{ 'sr-only': hideLabel }">{{ label }}</span>
    <div class="field-control">
      <button
        type="button"
        class="step"
        :disabled="model <= min"
        :aria-label="`${label} ${t.ui.decrease}`"
        @click="bump(-1)"
      >
        −
      </button>
      <input
        v-model="display"
        type="text"
        inputmode="numeric"
        pattern="[0-9]*"
        autocomplete="off"
        placeholder="0"
        :aria-label="label"
        @focus="($event.target as HTMLInputElement).select()"
      />
      <button type="button" class="step" :aria-label="`${label} ${t.ui.increase}`" @click="bump(1)">+</button>
    </div>
  </div>
</template>

<style scoped>
.field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
}

.field-label {
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--ink-soft);
  letter-spacing: 0.01em;
}

.field-control {
  display: grid;
  grid-template-columns: 2.25rem minmax(0, 1fr) 2.25rem;
  align-items: stretch;
  background: #fff;
  border: 1.5px solid var(--line);
  border-radius: 0.7rem;
  overflow: hidden;
}

.field-control:focus-within {
  border-color: var(--accent-600);
  box-shadow: 0 0 0 3px var(--accent-100);
}

.step {
  border: 0;
  background: var(--accent-50);
  color: var(--accent-700);
  font-size: 1.25rem;
  line-height: 1;
  font-weight: 600;
  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

.step:active {
  background: var(--accent-100);
}

.step:disabled {
  opacity: 0.35;
  cursor: default;
}

input {
  border: 0;
  outline: none;
  min-width: 0;
  width: 100%;
  text-align: center;
  font-size: 1.15rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: var(--ink);
  background: transparent;
  padding: 0.5rem 0.1rem;
}

input::placeholder {
  color: var(--placeholder);
  font-weight: 500;
}
</style>
