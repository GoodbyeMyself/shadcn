import { useTranslation } from 'react-i18next'
import { ContentSection } from '../components/content-section'
import { AccountForm } from './account-form'

export function SettingsAccount() {
  const { t } = useTranslation('settings')

  return (
    <ContentSection
      title={t('sections.account.title')}
      desc={t('sections.account.description')}
    >
      <AccountForm />
    </ContentSection>
  )
}
