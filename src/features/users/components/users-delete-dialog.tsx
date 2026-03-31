'use client'

import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { type User } from '../data/schema'

type UserDeleteDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: User
}

export function UsersDeleteDialog({
  open,
  onOpenChange,
  currentRow,
}: UserDeleteDialogProps) {
  const [value, setValue] = useState('')
  const { t } = useTranslation('users')

  const handleDelete = () => {
    if (value.trim() !== currentRow.username) return

    onOpenChange(false)
    showSubmittedData(currentRow, t('dialogs.delete.submittedTitle'))
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={value.trim() !== currentRow.username}
      title={
        <span className='text-destructive'>
          <AlertTriangle
            className='me-1 inline-block stroke-destructive'
            size={18}
          />{' '}
          {t('dialogs.delete.title')}
        </span>
      }
      desc={
        <div className='space-y-4'>
          <p className='mb-2'>
            {t('dialogs.delete.description', {
              username: currentRow.username,
            })}
            <br />
            {t('dialogs.delete.roleDescription', {
              role: t(`table.roles.${currentRow.role}` as never),
            })}
          </p>

          <Label className='my-2'>
            {t('dialogs.delete.usernameLabel')}
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={t('dialogs.delete.usernamePlaceholder')}
            />
          </Label>

          <Alert variant='destructive'>
            <AlertTitle>{t('dialogs.delete.warningTitle')}</AlertTitle>
            <AlertDescription>
              {t('dialogs.delete.warningDescription')}
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText={t('actions.delete')}
      cancelBtnText={t('actions.cancel')}
      destructive
    />
  )
}
