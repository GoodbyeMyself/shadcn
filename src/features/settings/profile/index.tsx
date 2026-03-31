import { useTranslation } from 'react-i18next'
import { ContentSection } from '../components/content-section'
import { ProfileForm } from './profile-form'

export function SettingsProfile() {
  const { t } = useTranslation('settings')

  return (
    <ContentSection
      title={t('sections.profile.title')}
      desc={t('sections.profile.description')}
    >
      <ProfileForm />
    </ContentSection>
  )
}
