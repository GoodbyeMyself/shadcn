import { useTranslation } from 'react-i18next'
import { ContentSection } from '../components/content-section'
import { AppearanceForm } from './appearance-form'

export function SettingsAppearance() {
  const { t } = useTranslation('settings')

  return (
    <ContentSection
      title={t('sections.appearance.title')}
      desc={t('sections.appearance.description')}
    >
      <AppearanceForm />
    </ContentSection>
  )
}
