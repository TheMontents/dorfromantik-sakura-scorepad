<script setup lang="ts">
import { nextTick, onUnmounted, ref, watch } from 'vue'

const props = defineProps<{
  open: boolean
  title: string
  message: string
  confirmLabel: string
  cancelLabel: string
}>()

const emit = defineEmits<{ confirm: []; cancel: [] }>()

const confirmButton = ref<HTMLButtonElement | null>(null)

// On open the focus goes to the confirming action, so the dialog can be
// answered from the keyboard with a single key press.
watch(
  () => props.open,
  async (open) => {
    if (!open) return
    await nextTick()
    confirmButton.value?.focus()
  },
)

// Keep the sheet behind the dialog from scrolling away under the thumb.
watch(
  () => props.open,
  (open) => {
    document.body.style.overflow = open ? 'hidden' : ''
  },
)

onUnmounted(() => {
  document.body.style.overflow = ''
})

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') emit('cancel')
}
</script>

<template>
  <Teleport to="body">
    <Transition name="dialog">
      <div
        v-if="open"
        class="backdrop"
        role="dialog"
        aria-modal="true"
        :aria-label="title"
        tabindex="-1"
        @click.self="emit('cancel')"
        @keydown="onKeydown"
      >
        <div class="card">
          <svg class="mark" viewBox="0 0 32 32" aria-hidden="true">
            <circle cx="16" cy="16" r="13" fill="var(--accent-50)" />
            <path
              d="M16 8.6v9.2M16 22.2v1.2"
              stroke="var(--accent-600)"
              stroke-width="2.6"
              stroke-linecap="round"
            />
          </svg>

          <h2>{{ title }}</h2>
          <p>{{ message }}</p>

          <div class="actions">
            <button type="button" class="ghost" @click="emit('cancel')">{{ cancelLabel }}</button>
            <button ref="confirmButton" type="button" class="primary" @click="emit('confirm')">
              {{ confirmLabel }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.backdrop {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem;
  background: rgba(35, 28, 20, 0.45);
  backdrop-filter: blur(3px);
}

.card {
  width: 100%;
  max-width: 21rem;
  background: #fff;
  border-radius: 1.2rem;
  padding: 1.6rem 1.25rem 1.1rem;
  text-align: center;
  box-shadow: 0 18px 44px rgba(40, 30, 20, 0.32);
}

.mark {
  width: 2.6rem;
  height: 2.6rem;
  display: block;
  margin: 0 auto 0.6rem;
}

h2 {
  margin: 0 0 0.4rem;
  font-size: 1.12rem;
  color: var(--ink);
}

p {
  margin: 0 0 1.2rem;
  font-size: 0.9rem;
  line-height: 1.45;
  color: var(--ink-soft);
}

.actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.6rem;
}

.actions button {
  appearance: none;
  border-radius: 0.75rem;
  padding: 0.72rem 0.5rem;
  font: inherit;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

.ghost {
  border: 1.5px solid var(--line);
  background: #fff;
  color: var(--ink-soft);
}

.ghost:active {
  background: var(--accent-25);
}

.primary {
  border: 1.5px solid var(--accent-600);
  background: var(--accent-600);
  color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.primary:active {
  background: var(--accent-700);
}

.actions button:focus-visible {
  outline: 3px solid var(--accent-300);
  outline-offset: 2px;
}

/* The card lifts slightly, the backdrop only fades. */
.dialog-enter-active,
.dialog-leave-active {
  transition: opacity 0.18s ease;
}

.dialog-enter-active .card,
.dialog-leave-active .card {
  transition:
    transform 0.18s cubic-bezier(0.2, 0.9, 0.3, 1),
    opacity 0.18s ease;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
}

.dialog-enter-from .card,
.dialog-leave-to .card {
  transform: translateY(0.75rem) scale(0.97);
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .dialog-enter-active,
  .dialog-leave-active,
  .dialog-enter-active .card,
  .dialog-leave-active .card {
    transition: none;
  }
}
</style>
