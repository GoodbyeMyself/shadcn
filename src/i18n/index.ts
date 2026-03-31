import enApps from '@/locales/en-US/apps.json'
import enAuth from '@/locales/en-US/auth.json'
import enChats from '@/locales/en-US/chats.json'
import enClerk from '@/locales/en-US/clerk.json'
import enCommon from '@/locales/en-US/common.json'
import enDashboard from '@/locales/en-US/dashboard.json'
import enErrors from '@/locales/en-US/errors.json'
import enSettings from '@/locales/en-US/settings.json'
import enSidebar from '@/locales/en-US/sidebar.json'
import enTasks from '@/locales/en-US/tasks.json'
import enUsers from '@/locales/en-US/users.json'
import zhApps from '@/locales/zh-CN/apps.json'
import zhAuth from '@/locales/zh-CN/auth.json'
import zhChats from '@/locales/zh-CN/chats.json'
import zhClerk from '@/locales/zh-CN/clerk.json'
import zhCommon from '@/locales/zh-CN/common.json'
import zhDashboard from '@/locales/zh-CN/dashboard.json'
import zhErrors from '@/locales/zh-CN/errors.json'
import zhSettings from '@/locales/zh-CN/settings.json'
import zhSidebar from '@/locales/zh-CN/sidebar.json'
import zhTasks from '@/locales/zh-CN/tasks.json'
import zhUsers from '@/locales/zh-CN/users.json'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { setCookie } from '@/lib/cookies'
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_COOKIE_MAX_AGE,
  LANGUAGE_COOKIE_NAME,
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from './constants'
import { detectLanguage, normalizeLanguage } from './detect-language'

const resources = {
  'en-US': {
    apps: enApps,
    auth: enAuth,
    chats: enChats,
    clerk: enClerk,
    common: enCommon,
    dashboard: enDashboard,
    errors: enErrors,
    settings: enSettings,
    sidebar: enSidebar,
    tasks: enTasks,
    users: enUsers,
  },
  'zh-CN': {
    apps: zhApps,
    auth: zhAuth,
    chats: zhChats,
    clerk: zhClerk,
    common: zhCommon,
    dashboard: zhDashboard,
    errors: zhErrors,
    settings: zhSettings,
    sidebar: zhSidebar,
    tasks: zhTasks,
    users: zhUsers,
  },
} as const

function syncDocumentLanguage(language: SupportedLanguage) {
  if (typeof document === 'undefined') return

  document.documentElement.lang = language
}

if (!i18n.isInitialized) {
  const initialLanguage = detectLanguage()

  void i18n.use(initReactI18next).init({
    resources,
    lng: initialLanguage,
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: SUPPORTED_LANGUAGES,
    defaultNS: 'common',
    ns: [
      'apps',
      'auth',
      'chats',
      'clerk',
      'common',
      'dashboard',
      'errors',
      'settings',
      'sidebar',
      'tasks',
      'users',
    ],
    interpolation: {
      escapeValue: false,
    },
    returnNull: false,
  })

  syncDocumentLanguage(initialLanguage)

  i18n.on('languageChanged', (language) => {
    const normalizedLanguage = normalizeLanguage(language) ?? DEFAULT_LANGUAGE

    syncDocumentLanguage(normalizedLanguage)
    setCookie(LANGUAGE_COOKIE_NAME, normalizedLanguage, LANGUAGE_COOKIE_MAX_AGE)
  })
}

export function setLanguage(language: SupportedLanguage) {
  return i18n.changeLanguage(language)
}

export { i18n }
