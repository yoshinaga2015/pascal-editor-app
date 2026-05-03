'use client'

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  DEFAULT_LOCALE,
  getMessages,
  LOCALE_STORAGE_KEY,
  type Locale,
  SUPPORTED_LOCALES,
} from './dictionaries'

function interpolate(template: string, params?: Record<string, string | number>): string {
  if (!params) return template
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    params[key] !== undefined ? String(params[key]) : `{${key}}`,
  )
}

export type I18nContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string, params?: Record<string, string | number>) => string
}

const I18nContext = createContext<I18nContextValue | null>(null)

function readStoredLocale(): Locale | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(LOCALE_STORAGE_KEY)
    if (raw === 'ja' || raw === 'en') return raw
  } catch {
    /* ignore */
  }
  return null
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const stored = readStoredLocale()
    if (stored) setLocaleState(stored)
    setHydrated(true)
  }, [])

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
  }, [])

  const messages = useMemo(() => getMessages(locale), [locale])

  const t = useCallback(
    (key: string, params?: Record<string, string | number>) => {
      const raw = messages[key] ?? key
      return interpolate(raw, params)
    },
    [messages],
  )

  useEffect(() => {
    if (!hydrated || typeof document === 'undefined') return
    document.documentElement.lang = locale === 'ja' ? 'ja' : 'en'
  }, [locale, hydrated])

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext)
  if (!ctx) {
    throw new Error('useI18n must be used within I18nProvider')
  }
  return ctx
}

/** Optional hook for leaf components that may render outside the provider (e.g. Storybook). */
export function useOptionalI18n(): I18nContextValue | null {
  return useContext(I18nContext)
}

export function isLocale(value: string): value is Locale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(value)
}
