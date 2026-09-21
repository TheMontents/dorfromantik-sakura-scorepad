<script setup lang="ts">
defineProps<{ label: string }>()

/** 0 = Nein, 1 = Ja – bleibt im selben Zahlenmodell wie die Anzahl-Felder. */
const model = defineModel<number>({ required: true })
</script>

<template>
  <div class="field">
    <span class="field-label">{{ label }}</span>
    <div class="switch" role="group" :aria-label="label">
      <button
        type="button"
        :class="{ on: model !== 1 }"
        :aria-pressed="model !== 1"
        @click="model = 0"
      >
        Nein
      </button>
      <button
        type="button"
        :class="{ on: model === 1 }"
        :aria-pressed="model === 1"
        @click="model = 1"
      >
        Ja
      </button>
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
}

.switch {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.35rem;
}

.switch button {
  appearance: none;
  border: 1.5px solid var(--line);
  background: #fff;
  color: var(--ink-soft);
  border-radius: 0.65rem;
  padding: 0.62rem 0;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

.switch button.on {
  background: var(--sakura-600);
  border-color: var(--sakura-600);
  color: #fff;
  box-shadow: 0 2px 6px rgba(174, 67, 89, 0.3);
}
</style>
