<script setup lang="ts">
import { computed } from 'vue'
import TaskCards from './TaskCards.vue'
import CatIcon from './CatIcon.vue'
import NumberField from './NumberField.vue'
import { t } from '../lib/i18n'
import type { Game } from '../lib/games'
import { doublingAvailable, visibleMarkers, type Sheet, type Totals } from '../lib/scoring'

const props = defineProps<{ game: Game; sheet: Sheet; totals: Totals }>()

const text = computed(() => t.value.games[props.game.id])

/** Campaign switches that change the task markers belong right here. */
const options = computed(() => props.game.options.filter((o) => o.placement === 'tasks'))
</script>

<template>
  <section class="panel">
    <header class="panel-head">
      <h2>{{ t.ui.tasks }}</h2>
      <div class="head-sums">
        <span>{{ t.ui.tasks }} {{ totals.tasks }}</span>
        <span>{{ t.ui.bonusRow }} {{ totals.bonus }}</span>
      </div>
    </header>

    <ul class="rows">
      <li v-for="category in game.categories" :key="category.key" class="row">
        <div class="row-head">
          <span class="icon-badge"><CatIcon :name="category.icon" /></span>
          <span class="row-name">{{ text.categories[category.key].label }}</span>
          <span class="row-sum" :class="{ zero: totals.perCategory[category.key] === 0 }">
            {{ totals.perCategory[category.key] }}
          </span>
        </div>

        <div class="row-body">
          <div class="tasks">
            <span class="field-label">
              {{ category.taskFactor ? t.ui.completedTasks : t.ui.tasks }}
              <em v-if="category.taskValues || category.taskFactor">
                {{ totals.perCategoryTasks[category.key] }} {{ t.ui.pointsShort }}
              </em>
            </span>
            <TaskCards
              v-if="category.taskValues"
              v-model="sheet.taskCards[category.key]"
              :markers="visibleMarkers(game, sheet, category)"
              :category="text.categories[category.key].label"
              :doubling="doublingAvailable(sheet, category)"
            />
            <div v-else class="typed">
              <NumberField
                v-model="sheet.tasks[category.key]"
                :label="category.taskFactor ? t.ui.amount : t.ui.tasks"
                hide-label
              />
              <span v-if="category.taskFactor" class="factor">
                × {{ category.taskFactor }} {{ t.ui.points }}
              </span>
            </div>
          </div>

          <NumberField
            v-if="category.hasBonus"
            v-model="sheet.bonus[category.key]"
            :label="text.categories[category.key].bonus ?? ''"
            class="bonus"
          />
          <p v-else class="hatched">{{ t.ui.noScore }}</p>
        </div>

        <p v-if="doublingAvailable(sheet, category)" class="row-hint doubling">
          {{ t.ui.doublingHint }}
        </p>
        <p v-if="text.categories[category.key].bonusHint" class="row-hint">
          {{ text.categories[category.key].bonusHint }}
        </p>
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
  color: var(--accent-700);
  background: var(--accent-50);
  border-radius: 999px;
  padding: 0.1rem 0.6rem;
  min-width: 2.4rem;
  text-align: center;
}

.row-sum.zero {
  color: var(--muted);
  background: transparent;
}

.row-body {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 0.6rem;
}

.tasks {
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
  color: var(--accent-700);
}

.typed {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.typed > :first-child {
  flex: 1 1 auto;
  min-width: 0;
}

.factor {
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
  color: var(--muted);
  background: repeating-linear-gradient(
    -45deg,
    var(--hatch-a),
    var(--hatch-a) 5px,
    var(--hatch-b) 5px,
    var(--hatch-b) 10px
  );
}

.row-hint {
  margin: 0.4rem 0 0;
  font-size: 0.75rem;
  color: var(--ink-soft);
}

.row-hint.doubling {
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
</style>
