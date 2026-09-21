import { computed, ref, watch } from 'vue'
import { LOCALES, MESSAGES, type Locale } from './messages'

export { LOCALES, LOCALE_NAMES, type Locale } from './messages'

const STORAGE_KEY = 'dorfromantik-sakura:sprache'

const isLocale = (value: string): value is Locale => (LOCALES as readonly string[]).includes(value)

/** Gespeicherte Wahl, sonst die Sprache des Geräts, sonst Englisch. */
function detectLocale(): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && isLocale(stored)) return stored
  } catch {
    /* Privatmodus – dann eben die Gerätesprache */
  }
  for (const tag of navigator.languages ?? [navigator.language]) {
    const base = tag.toLowerCase().split('-')[0]
    if (isLocale(base)) return base
  }
  return 'en'
}

export const locale = ref<Locale>(detectLocale())

watch(
  locale,
  (value) => {
    document.documentElement.lang = value
    document.title = `Dorfromantik Sakura – ${MESSAGES[value].ui.title}`
    try {
      localStorage.setItem(STORAGE_KEY, value)
    } catch {
      /* siehe oben */
    }
  },
  { immediate: true },
)

/** Texte der aktuellen Sprache. */
export const t = computed(() => MESSAGES[locale.value])

/** Platzhalter der Form {name} ersetzen. */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  )
}
