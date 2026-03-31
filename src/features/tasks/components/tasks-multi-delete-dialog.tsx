'use client'

import { useState } from 'react'
import { type Table } from '@tanstack/react-table'
import { AlertTriangle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { sleep } from '@/lib/utils'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ConfirmDialog } from '@/components/confirm-dialog'

type TaskMultiDeleteDialogProps<TData> = {
  open: boolean
  onOpenChange: (open: boolean) => void
  table: Table<TData>
}

export function TasksMultiDeleteDialog<TData>({
  open,
  onOpenChange,
  table,
}: TaskMultiDeleteDialogProps<TData>) {
  const [value, setValue] = useState('')
  const { t } = useTranslation('tasks')
  const confirmWord = t('dialogs.multiDelete.confirmWord')

  const selectedRows = table.getFilteredSelectedRowModel().rows

  const handleDelete = () => {
    if (value.trim() !== confirmWord) {
      toast.error(
        t('dialogs.multiDelete.confirmMismatch', { word: confirmWord })
      )
      return
    }

    onOpenChange(false)

    toast.promise(sleep(2000), {
      loading: t('dialogs.multiDelete.loading'),
      success: () => {
        setValue('')
        table.resetRowSelection()
        return t('dialogs.multiDelete.deleted', { count: selectedRows.length })
      },
      error: t('bulkActions.error'),
    })
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={value.trim() !== confirmWord}
      title={
        <span className='text-destructive'>
          <AlertTriangle
            className='me-1 inline-block stroke-destructive'
            size={18}
          />{' '}
          {t('dialogs.multiDelete.title', { count: selectedRows.length })}
        </span>
      }
      desc={
        <div className='space-y-4'>
          <p className='mb-2'>
            {t('dialogs.multiDelete.description')} <br />
            {t('dialogs.multiDelete.undo')}
          </p>

          <Label className='my-4 flex flex-col items-start gap-1.5'>
            <span>
              {t('dialogs.multiDelete.confirmPrompt', { word: confirmWord })}
            </span>
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={t('dialogs.multiDelete.confirmPlaceholder', {
                word: confirmWord,
              })}
            />
          </Label>

          <Alert variant='destructive'>
            <AlertTitle>{t('dialogs.multiDelete.warningTitle')}</AlertTitle>
            <AlertDescription>
              {t('dialogs.multiDelete.warningDescription')}
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
