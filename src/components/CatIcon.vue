<script setup lang="ts">
/**
 * Category glyphs for both score pads, drawn like the games' task markers: a
 * rounded square in the colour of the terrain with a white symbol on it.
 *
 * The printed markers put a white speech bubble between the two and the symbol
 * inside that; at icon size those three layers turn to mush, so the middle one
 * is dropped. Only the "7" keeps its bubble, because a numeral survives it.
 */
const props = defineProps<{ name: string }>()

/** Badge colour per category, taken from the tiles and markers of the games. */
const BADGE: Record<string, string> = {
  'c-forest': '#4b8b2b',
  'c-grain': '#cf9a12',
  'c-village': '#d1452a',
  'c-rail': '#5f676e',
  'c-river': '#3f9bd1',
  's-cherry': '#e07aa5',
  's-rice': '#6ba63a',
  's-village': '#7b5544',
  's-road': '#4a3a31',
  's-river': '#2fb3ab',
  's-wraparound': '#3b332c',
  's-seven': '#c9566d',
}

const badge = () => BADGE[props.name] ?? '#8a8a8a'
</script>

<template>
  <svg class="cat-icon" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
    <rect x="1.5" y="1.5" width="29" height="29" rx="7.5" :fill="badge()" />

    <!-- Forest / Rice: a treetop over a trunk -->
    <g v-if="name === 'c-forest'" fill="#fff">
      <circle cx="11.4" cy="15.2" r="4.9" />
      <circle cx="20.6" cy="15.2" r="4.9" />
      <circle cx="16" cy="11" r="5.6" />
      <rect x="14.6" y="17.4" width="2.8" height="7.6" rx="1.3" />
    </g>

    <!-- Grain / Rice: an ear on its stalk -->
    <g v-else-if="name === 'c-grain' || name === 's-rice'" fill="#fff">
      <rect x="15.1" y="14" width="1.8" height="11.4" rx="0.9" />
      <g v-for="i in 3" :key="i">
        <ellipse
          :cx="12.3"
          :cy="10.4 + (i - 1) * 3.6"
          rx="2.1"
          ry="3.2"
          :transform="`rotate(-38 12.3 ${10.4 + (i - 1) * 3.6})`"
        />
        <ellipse
          :cx="19.7"
          :cy="10.4 + (i - 1) * 3.6"
          rx="2.1"
          ry="3.2"
          :transform="`rotate(38 19.7 ${10.4 + (i - 1) * 3.6})`"
        />
      </g>
      <ellipse cx="16" cy="8.2" rx="2.1" ry="3.4" />
    </g>

    <!-- Village: pitched roof over the house -->
    <g v-else-if="name === 'c-village' || name === 's-village'" fill="#fff">
      <path d="M16 6.4l10.6 8.4H5.4z" />
      <rect x="9.2" y="15.6" width="13.6" height="9.8" rx="1.6" />
    </g>

    <!-- Track: two rails on their sleepers -->
    <g v-else-if="name === 'c-rail'" stroke="#fff" stroke-linecap="round" fill="none">
      <g stroke-width="2.6">
        <line x1="11.6" y1="6.4" x2="11.6" y2="25.6" />
        <line x1="20.4" y1="6.4" x2="20.4" y2="25.6" />
      </g>
      <g stroke-width="2.2">
        <line v-for="i in 3" :key="i" x1="7.6" :y1="5.2 + i * 5.4" x2="24.4" :y2="5.2 + i * 5.4" />
      </g>
    </g>

    <!-- Stream / River: a drop -->
    <path
      v-else-if="name === 'c-river' || name === 's-river'"
      d="M16 5.6c4 4.6 7.2 8.3 7.2 12 0 4.2-3.2 7.5-7.2 7.5s-7.2-3.3-7.2-7.5c0-3.7 3.2-7.4 7.2-12z"
      fill="#fff"
    />

    <!-- Cherry blossom: five petals around a stamen -->
    <g v-else-if="name === 's-cherry'" fill="#fff">
      <ellipse
        v-for="i in 5"
        :key="i"
        cx="16"
        cy="9.4"
        rx="4"
        ry="5.4"
        :transform="`rotate(${(i - 1) * 72} 16 16)`"
      />
      <circle cx="16" cy="16" r="2.4" :fill="badge()" />
    </g>

    <!-- Roads: a winding road -->
    <path
      v-else-if="name === 's-road'"
      d="M11.6 25.4c-1.7 0-2.9-1.4-2.6-3.1.9-5.4 3.8-7.4 7.2-8.4 2.2-.7 3-1.4 3-2.5 0-1.2-1-2-2.5-2h-4.7c-1.5 0-2.5-.9-2.5-1.9h10.4c2.9 0 4.8 1.7 4.8 4.1 0 2.7-1.9 4.3-5.3 5.3-2.9.9-4.3 2.2-4.8 5.1-.3 1.9-1.4 3.4-3 3.4z"
      fill="#fff"
    />

    <!-- Wraparound Task: a closed ring of segments -->
    <circle
      v-else-if="name === 's-wraparound'"
      cx="16"
      cy="16"
      r="8.4"
      fill="none"
      stroke="#fff"
      stroke-width="4.6"
      stroke-dasharray="4 2.8"
      stroke-linecap="round"
    />

    <!-- The "7" column: the sheet's speech bubble, the one place it survives -->
    <g v-else-if="name === 's-seven'">
      <path
        d="M8 7.6h16c1.3 0 2.3 1 2.3 2.3v8.4c0 1.3-1 2.3-2.3 2.3h-9.6l-4.6 3.8.4-3.8H8c-1.3 0-2.3-1-2.3-2.3V9.9c0-1.3 1-2.3 2.3-2.3z"
        fill="#fff"
      />
      <text x="16" y="18.2" text-anchor="middle" font-size="11" font-weight="700" :fill="badge()">
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

text {
  font-family: system-ui, sans-serif;
}
</style>
