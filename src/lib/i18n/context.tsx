import { useState, useEffect, type ReactNode } from 'react'
import type { LocalizedString, LocalizedStringArray, ResumeConfig } from '@/data/types'
import { LanguageContext } from './LanguageContext'

function getUrlLanguage(resumeConfig: ResumeConfig): string | null {
  const params = new URLSearchParams(window.location.search)
  const lang = params.get('lang')
  if (lang && resumeConfig.languages.available.includes(lang)) return lang
  return null
}

function detectBrowserLanguage(resumeConfig: ResumeConfig): string {
  const { available, default: defaultLang } = resumeConfig.languages
  const browserLang = navigator.language.split('-')[0]
  return available.includes(browserLang) ? browserLang : defaultLang
}

function updateUrlLanguage(lang: string) {
  const url = new URL(window.location.href)
  url.searchParams.set('lang', lang)
  window.history.replaceState({}, '', url.toString())
}

export function LanguageProvider({ children, resumeConfig }: { children: ReactNode; resumeConfig: ResumeConfig }) {
  const { default: defaultLang } = resumeConfig.languages

  const [language, setLanguageState] = useState(() => {
    // Priority: 1. URL param 3. browser detection
    const urlLang = getUrlLanguage(resumeConfig)
    if (urlLang) return urlLang

    return detectBrowserLanguage(resumeConfig)
  })

  const setLanguage = (lang: string) => {
    setLanguageState(lang)
    updateUrlLanguage(lang)
  }

  useEffect(() => {
    document.documentElement.lang = language
    updateUrlLanguage(language)
  }, [language])

  const resolve = (ls: LocalizedString): string => {
    return ls[language] ?? ls[defaultLang] ?? Object.values(ls)[0] ?? ''
  }

  const resolveArray = (lsa: LocalizedStringArray): string[] => {
    return lsa[language] ?? lsa[defaultLang] ?? Object.values(lsa)[0] ?? []
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, resolve, resolveArray }}>
      {children}
    </LanguageContext.Provider>
  )
}
