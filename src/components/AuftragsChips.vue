<script setup lang="ts">
const props = defineProps<{
  /** Werte der Auftragskarten, z.B. [4, 4, 5, 5, 6, 6] */
  werte: number[]
  /** Name der Kategorie – nur fuer Screenreader */
  kategorie: string
}>()

const model = defineModel<boolean[]>({ required: true })

const toggle = (index: number) => {
  const next = props.werte.map((_, i) => model.value[i] === true)
  next[index] = !next[index]
  model.value = next
}
</script>

<template>
  <div class="chips" role="group" :aria-label="`Aufträge ${kategorie}`">
    <button
      v-for="(wert, index) in werte"
      :key="index"
      type="button"
      class="chip"
      :class="{ on: model[index] }"
      :aria-pressed="model[index] === true"
      :aria-label="`Auftrag ${wert} Punkte`"
      @click="toggle(index)"
    >
      {{ wert }}
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
