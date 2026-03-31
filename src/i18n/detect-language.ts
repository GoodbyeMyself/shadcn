import { getCookie } from '@/lib/cookies'
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_COOKIE_NAME,
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from './constants'

function isSupportedLanguage(value: string): value is SupportedLanguage {
  return SUPPORTED_LANGUAGES.includes(value as SupportedLanguage)
}

export function normalizeLanguage(
  value: string | undefined
): SupportedLanguage | undefined {
  if (!value) return undefined

  const normalizedValue = value.trim().replace('_', '-')

  if (isSupportedLanguage(normalizedValue)) {
    return normalizedValue
  }

  const languageCode = normalizedValue.toLowerCase()

  if (languageCode.startsWith('zh')) {
    return 'zh-CN'
  }

  if (languageCode.startsWith('en')) {
    return 'en-US'
  }

  return undefined
}

export function detectLanguage(): SupportedLanguage {
  const cookieLanguage = normalizeLanguage(getCookie(LANGUAGE_COOKIE_NAME))
  if (cookieLanguage) {
    return cookieLanguage
  }

  if (typeof navigator !== 'undefined') {
    const browserLanguage = normalizeLanguage(navigator.language)
    if (browserLanguage) {
      return browserLanguage
    }
  }

  return DEFAULT_LANGUAGE
}
