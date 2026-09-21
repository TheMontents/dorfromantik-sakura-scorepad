<script setup lang="ts">
import AuftragsChips from './AuftragsChips.vue'
import CatIcon from './CatIcon.vue'
import NumberField from './NumberField.vue'
import { t } from '../lib/i18n'
import { CATEGORIES, type Sheet, type Totals } from '../lib/scoring'

defineProps<{ sheet: Sheet; totals: Totals }>()
</script>

<template>
  <section class="panel">
    <header class="panel-head">
      <h2>{{ t.ui.tasks }}</h2>
      <div class="head-sums">
        <span>{{ t.ui.tasks }} {{ totals.auftraege }}</span>
        <span>{{ t.ui.bonusRow }} {{ totals.bonus }}</span>
      </div>
    </header>

    <ul class="rows">
      <li v-for="category in CATEGORIES" :key="category.key" class="row">
        <div class="row-head">
          <span class="icon-badge"><CatIcon :name="category.key" /></span>
          <span class="row-name">{{ t.categories[category.key].label }}</span>
          <span class="row-sum" :class="{ zero: totals.proKategorie[category.key] === 0 }">
            {{ totals.proKategorie[category.key] }}
          </span>
        </div>

        <div class="row-body">
          <div class="auftraege">
            <span class="field-label">
              {{ category.auftragsFaktor ? t.ui.completedTasks : t.ui.tasks }}
              <em v-if="category.auftragsWerte || category.auftragsFaktor">
                {{ totals.proAuftrag[category.key] }} {{ t.ui.pointsShort }}
              </em>
            </span>
            <AuftragsChips
              v-if="category.auftragsWerte"
              v-model="sheet.auftragsChips[category.key]"
              :werte="category.auftragsWerte"
              :kategorie="t.categories[category.key].label"
            />
            <div v-else class="frei">
              <NumberField
                v-model="sheet.auftraege[category.key]"
                :label="category.auftragsFaktor ? t.ui.amount : t.ui.tasks"
                hide-label
              />
              <span v-if="category.auftragsFaktor" class="faktor">
                × {{ category.auftragsFaktor }} {{ t.ui.points }}
              </span>
            </div>
          </div>

          <NumberField
            v-if="category.hasBonus"
            v-model="sheet.bonus[category.key]"
            :label="t.categories[category.key].bonus ?? ''"
            class="bonus"
          />
          <p v-else class="hatched">{{ t.ui.noScore }}</p>
        </div>

        <p v-if="t.categories[category.key].bonusHint" class="row-hint">
          {{ t.categories[category.key].bonusHint }}
        </p>
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

.frei {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.frei > :first-child {
  flex: 1 1 auto;
  min-width: 0;
}

.faktor {
  flex: none;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--ink-soft);
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
