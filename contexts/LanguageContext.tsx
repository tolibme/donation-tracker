'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Language, translations, Translations } from '@/lib/i18n'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Get initial language from localStorage safely (only on client)
function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'en'
  
  const savedLanguage = localStorage.getItem('language') as Language
  if (savedLanguage && ['en', 'uz', 'ru'].includes(savedLanguage)) {
    return savedLanguage
  }
  return 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Load language from localStorage on mount
    setMounted(true)
    const initialLanguage = getInitialLanguage()
    setLanguageState(initialLanguage)
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang)
    }
  }

  const t = translations[language]

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <LanguageContext.Provider value={{ language: 'en', setLanguage, t: translations['en'] }}>
        {children}
      </LanguageContext.Provider>
    )
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
