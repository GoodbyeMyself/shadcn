export const SUPPORTED_LANGUAGES = ['en-US', 'zh-CN'] as const

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]

export const DEFAULT_LANGUAGE: SupportedLanguage = 'en-US'
export const LANGUAGE_COOKIE_NAME = 'lang'
export const LANGUAGE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365
