<script setup lang="ts">
import AuftragsChips from './AuftragsChips.vue'
import CatIcon from './CatIcon.vue'
import NumberField from './NumberField.vue'
import { CATEGORIES, type Sheet, type Totals } from '../lib/scoring'

defineProps<{ sheet: Sheet; totals: Totals }>()
</script>

<template>
  <section class="panel">
    <header class="panel-head">
      <h2>Aufträge</h2>
      <div class="head-sums">
        <span>Aufträge {{ totals.auftraege }}</span>
        <span>Zeile 2 {{ totals.bonus }}</span>
      </div>
    </header>

    <ul class="rows">
      <li v-for="category in CATEGORIES" :key="category.key" class="row">
        <div class="row-head">
          <span class="icon-badge"><CatIcon :name="category.key" /></span>
          <span class="row-name">{{ category.label }}</span>
          <span class="row-sum" :class="{ zero: totals.proKategorie[category.key] === 0 }">
            {{ totals.proKategorie[category.key] }}
          </span>
        </div>

        <div class="row-body">
          <div class="auftraege">
            <span class="field-label">
              Aufträge
              <em v-if="category.auftragsWerte">{{ totals.proAuftrag[category.key] }}</em>
            </span>
            <AuftragsChips
              v-if="category.auftragsWerte"
              v-model="sheet.auftragsChips[category.key]"
              :werte="category.auftragsWerte"
              :kategorie="category.label"
            />
            <NumberField
              v-else
              v-model="sheet.auftraege[category.key]"
              label="Aufträge"
              hide-label
            />
          </div>

          <NumberField
            v-if="category.bonusLabel"
            v-model="sheet.bonus[category.key]"
            :label="category.bonusLabel"
            class="bonus"
          />
          <p v-else class="hatched">keine Wertung</p>
        </div>

        <p v-if="category.bonusHint" class="row-hint">{{ category.bonusHint }}</p>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.rows {
  list-style: none;
  margin: 0;
  padding: 0;
}

.row {
  padding: 0.7rem 0.85rem 0.85rem;
  border-top: 1px solid var(--line-soft);
}

.row:first-child {
  border-top: 0;
}

.row-head {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.5rem;
}

.icon-badge {
  width: 1.9rem;
  height: 1.9rem;
  flex: none;
}

.row-name {
  font-weight: 700;
  color: var(--ink);
  flex: 1 1 auto;
}

.row-sum {
  font-variant-numeric: tabular-nums;
  font-weight: 700;
  font-size: 1.05rem;
  color: var(--sakura-700);
  background: var(--sakura-50);
  border-radius: 999px;
  padding: 0.1rem 0.6rem;
  min-width: 2.4rem;
  text-align: center;
}

.row-sum.zero {
  color: #b9a7a9;
  background: transparent;
}

.row-body {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 0.6rem;
}

.auftraege {
  flex: 1 1 15rem;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.field-label {
  display: flex;
  align-items: baseline;
  gap: 0.35rem;
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--ink-soft);
}

.field-label em {
  font-style: normal;
  font-variant-numeric: tabular-nums;
  color: var(--sakura-700);
}

.bonus {
  flex: 0 1 8.5rem;
}

.hatched {
  margin: 0;
  flex: 0 1 8.5rem;
  border-radius: 0.7rem;
  padding: 0.62rem 0.5rem;
  text-align: center;
  font-size: 0.78rem;
  color: #b09a9d;
  background: repeating-linear-gradient(
    -45deg,
    #f3e6e7,
    #f3e6e7 5px,
    #fbf4f4 5px,
    #fbf4f4 10px
  );
}

.row-hint {
  margin: 0.4rem 0 0;
  font-size: 0.75rem;
  color: var(--ink-soft);
}
</style>
