import { setLanguage } from '@/i18n'
import { DEFAULT_LANGUAGE, type SupportedLanguage } from '@/i18n/constants'
import { normalizeLanguage } from '@/i18n/detect-language'
import { Check, Languages } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function LanguageDropdown() {
  const { t, i18n } = useTranslation()

  const currentLanguage =
    normalizeLanguage(i18n.resolvedLanguage) ?? DEFAULT_LANGUAGE

  const handleLanguageChange = (language: string) => {
    void setLanguage(language as SupportedLanguage)
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          size='icon'
          variant='ghost'
          aria-label={t('language.openMenu')}
          className='scale-95 rounded-full'
        >
          <Languages aria-hidden='true' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => handleLanguageChange('zh-CN')}>
          {t('language.chinese')}
          <Check
            size={14}
            className={cn('ms-auto', currentLanguage !== 'zh-CN' && 'hidden')}
          />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange('en-US')}>
          {t('language.english')}
          <Check
            size={14}
            className={cn('ms-auto', currentLanguage !== 'en-US' && 'hidden')}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
