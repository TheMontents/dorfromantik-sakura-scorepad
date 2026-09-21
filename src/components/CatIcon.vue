<script setup lang="ts">
import type { CategoryKey } from '../lib/scoring'

defineProps<{ name: CategoryKey }>()
</script>

<template>
  <svg class="cat-icon" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
    <!-- Kirschblüte: fünf Blütenblätter um einen Stempel -->
    <g v-if="name === 'kirschbluete'" fill="#f2a6c4" stroke="#fff" stroke-width="1.4">
      <ellipse
        v-for="i in 5"
        :key="i"
        cx="16"
        cy="8.5"
        rx="4.6"
        ry="6"
        :transform="`rotate(${(i - 1) * 72} 16 16)`"
      />
      <circle cx="16" cy="16" r="2.6" fill="#e07aa5" />
    </g>

    <!-- Reisfeld: gerundetes Feldstück -->
    <path
      v-else-if="name === 'reisfeld'"
      d="M9 7h11c3 0 5 2 5 5v11c0 2-1.6 3.5-3.6 3.5H10c-2.4 0-4.4-2-4.4-4.4V11C5.6 8.8 7 7 9 7z"
      fill="#82bb4a"
      stroke="#fff"
      stroke-width="1.6"
      stroke-linejoin="round"
    />

    <!-- Dorf: Haus mit Giebel -->
    <path
      v-else-if="name === 'dorf'"
      d="M16 5.5l9 6.2v10.9c0 2-1.5 3.4-3.5 3.4h-11c-2 0-3.5-1.4-3.5-3.4V11.7z"
      fill="#7b5544"
      stroke="#fff"
      stroke-width="1.6"
      stroke-linejoin="round"
    />

    <!-- Wege: geschwungener Straßenzug -->
    <path
      v-else-if="name === 'weg'"
      d="M10.5 26c-2 0-3.4-1.6-3-3.6C8.6 16 12 13.6 16 12.4c2.6-.8 3.6-1.6 3.6-3 0-1.4-1.2-2.4-3-2.4H12c-1.8 0-3-1-3-2.2h12.2c3.4 0 5.6 2 5.6 4.8 0 3.2-2.2 5-6.2 6.2-3.4 1-5 2.6-5.6 6-.3 2.2-1.6 4.2-4.5 4.2z"
      fill="#3f2f28"
      stroke="#fff"
      stroke-width="1.5"
      stroke-linejoin="round"
    />

    <!-- Wasser: Tropfen -->
    <path
      v-else-if="name === 'wasser'"
      d="M16 4.5c4.4 5 8 9 8 13.1 0 4.6-3.6 8.2-8 8.2s-8-3.6-8-8.2c0-4.1 3.6-8.1 8-13.1z"
      fill="#4ec7c0"
      stroke="#fff"
      stroke-width="1.6"
      stroke-linejoin="round"
    />

    <!-- Rundumauftrag: geschlossener Ring aus Segmenten -->
    <g v-else-if="name === 'rundum'">
      <circle
        cx="16"
        cy="16"
        r="9.4"
        fill="none"
        stroke="#2f2620"
        stroke-width="5.4"
        stroke-dasharray="4.6 3.2"
        stroke-linecap="round"
      />
    </g>

    <!-- 7er-Auftrag: Sprechblase mit Zahl -->
    <g v-else>
      <path
        d="M6.5 7.5h19c1.4 0 2.5 1.1 2.5 2.5v9.6c0 1.4-1.1 2.5-2.5 2.5H14l-5.4 4.2.5-4.2H6.5C5.1 22.1 4 21 4 19.6V10c0-1.4 1.1-2.5 2.5-2.5z"
        fill="#fff"
        stroke="#c9566d"
        stroke-width="1.4"
        stroke-linejoin="round"
      />
      <text
        x="16"
        y="19.6"
        text-anchor="middle"
        font-size="12"
        font-weight="700"
        fill="#3f2f28"
        font-family="system-ui, sans-serif"
      >
        7
      </text>
    </g>
  </svg>
</template>

<style scoped>
.cat-icon {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
