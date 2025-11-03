'use client'

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/contexts/LanguageContext"
import { Language } from "@/lib/i18n"

const languages = [
  { code: 'en' as Language, name: 'English', flag: 'ᴇɴ' },
  { code: 'uz' as Language, name: "O'zbekcha", flag: '🇺🇿' },
  { code: 'ru' as Language, name: 'Русский', flag: '🇷🇺' },
]

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  
  const currentLanguage = languages.find(lang => lang.code === language)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <span className="text-xl">{currentLanguage?.flag}</span>
          <span className="hidden sm:inline">{currentLanguage?.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={language === lang.code ? 'bg-accent' : ''}
          >
            <span className="mr-2 text-xl">{lang.flag}</span>
            <span>{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
