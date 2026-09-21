<script setup lang="ts">
/**
 * Category glyphs for both score pads. The shapes follow the task markers of
 * the printed games: a white silhouette on the colour of the terrain.
 */
defineProps<{ name: string }>()
</script>

<template>
  <svg class="cat-icon" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
    <!-- ---------- Sakura ---------- -->

    <!-- Cherry blossom: five petals around a stamen -->
    <g v-if="name === 's-cherry'" fill="#f2a6c4" stroke="#fff" stroke-width="1.4">
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

    <!-- Rice field: rounded patch of land -->
    <path
      v-else-if="name === 's-rice'"
      d="M9 7h11c3 0 5 2 5 5v11c0 2-1.6 3.5-3.6 3.5H10c-2.4 0-4.4-2-4.4-4.4V11C5.6 8.8 7 7 9 7z"
      fill="#82bb4a"
      stroke="#fff"
      stroke-width="1.6"
      stroke-linejoin="round"
    />

    <!-- Village: gabled house -->
    <path
      v-else-if="name === 's-village'"
      d="M16 5.5l9 6.2v10.9c0 2-1.5 3.4-3.5 3.4h-11c-2 0-3.5-1.4-3.5-3.4V11.7z"
      fill="#7b5544"
      stroke="#fff"
      stroke-width="1.6"
      stroke-linejoin="round"
    />

    <!-- Roads: winding stretch of road -->
    <path
      v-else-if="name === 's-road'"
      d="M10.5 26c-2 0-3.4-1.6-3-3.6C8.6 16 12 13.6 16 12.4c2.6-.8 3.6-1.6 3.6-3 0-1.4-1.2-2.4-3-2.4H12c-1.8 0-3-1-3-2.2h12.2c3.4 0 5.6 2 5.6 4.8 0 3.2-2.2 5-6.2 6.2-3.4 1-5 2.6-5.6 6-.3 2.2-1.6 4.2-4.5 4.2z"
      fill="#3f2f28"
      stroke="#fff"
      stroke-width="1.5"
      stroke-linejoin="round"
    />

    <!-- Sakura river: water drop -->
    <path
      v-else-if="name === 's-river'"
      d="M16 4.5c4.4 5 8 9 8 13.1 0 4.6-3.6 8.2-8 8.2s-8-3.6-8-8.2c0-4.1 3.6-8.1 8-13.1z"
      fill="#4ec7c0"
      stroke="#fff"
      stroke-width="1.6"
      stroke-linejoin="round"
    />

    <!-- Wraparound Task: closed ring of segments -->
    <circle
      v-else-if="name === 's-wraparound'"
      cx="16"
      cy="16"
      r="9.4"
      fill="none"
      stroke="#2f2620"
      stroke-width="5.4"
      stroke-dasharray="4.6 3.2"
      stroke-linecap="round"
    />

    <!-- The "7" column: speech bubble with a number -->
    <g v-else-if="name === 's-seven'">
      <path
        d="M6.5 7.5h19c1.4 0 2.5 1.1 2.5 2.5v9.6c0 1.4-1.1 2.5-2.5 2.5H14l-5.4 4.2.5-4.2H6.5C5.1 22.1 4 21 4 19.6V10c0-1.4 1.1-2.5 2.5-2.5z"
        fill="#fff"
        stroke="#c9566d"
        stroke-width="1.4"
        stroke-linejoin="round"
      />
      <text x="16" y="19.6" text-anchor="middle" font-size="12" font-weight="700" fill="#3f2f28">
        7
      </text>
    </g>

    <!-- ---------- Classic ---------- -->

    <!-- Forest: a cluster of treetops -->
    <g v-else-if="name === 'c-forest'" fill="#3f7d31" stroke="#fff" stroke-width="1.3">
      <circle cx="10.5" cy="19" r="5.6" />
      <circle cx="21.5" cy="19" r="5.6" />
      <circle cx="16" cy="11.5" r="6.6" />
    </g>

    <!-- Grain: the wedge-shaped field of the tiles -->
    <path
      v-else-if="name === 'c-grain'"
      d="M16 5.6l11 7.4-4.3 12.4c-.4 1.2-1.5 2-2.8 2H12c-1.3 0-2.4-.8-2.8-2L5 13z"
      fill="#f0bf33"
      stroke="#fff"
      stroke-width="1.6"
      stroke-linejoin="round"
    />

    <!-- Village: red-roofed house -->
    <g v-else-if="name === 'c-village'" stroke="#fff" stroke-width="1.5" stroke-linejoin="round">
      <path d="M16 5.2l11 8.2H5z" fill="#d94f32" />
      <path d="M8.6 13.4h14.8v9.4c0 2-1.4 3.4-3.4 3.4h-8c-2 0-3.4-1.4-3.4-3.4z" fill="#e8e2d6" />
    </g>

    <!-- Track: two rails with sleepers -->
    <g v-else-if="name === 'c-rail'">
      <g stroke="#8d949b" stroke-width="3.1" stroke-linecap="round">
        <line x1="11" y1="5.5" x2="11" y2="26.5" />
        <line x1="21" y1="5.5" x2="21" y2="26.5" />
      </g>
      <g stroke="#fff" stroke-width="2.3" stroke-linecap="round">
        <line v-for="i in 4" :key="i" x1="7.5" :y1="4 + i * 5.4" x2="24.5" :y2="4 + i * 5.4" />
      </g>
    </g>

    <!-- Stream: water drop in the light blue of the tiles -->
    <path
      v-else-if="name === 'c-river'"
      d="M16 4.5c4.4 5 8 9 8 13.1 0 4.6-3.6 8.2-8 8.2s-8-3.6-8-8.2c0-4.1 3.6-8.1 8-13.1z"
      fill="#5bb4e0"
      stroke="#fff"
      stroke-width="1.6"
      stroke-linejoin="round"
    />
  </svg>
</template>

<style scoped>
.cat-icon {
  width: 100%;
  height: 100%;
  display: block;
}

text {
  font-family: system-ui, sans-serif;
}
</style>
