import { useState } from 'react'
import { type Table } from '@tanstack/react-table'
import { Trash2, UserX, UserCheck, Mail } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { sleep } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { DataTableBulkActions as BulkActionsToolbar } from '@/components/data-table'
import { type User } from '../data/schema'
import { UsersMultiDeleteDialog } from './users-multi-delete-dialog'

type DataTableBulkActionsProps<TData> = {
  table: Table<TData>
}

export function DataTableBulkActions<TData>({
  table,
}: DataTableBulkActionsProps<TData>) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const { t } = useTranslation('users')
  const selectedRows = table.getFilteredSelectedRowModel().rows

  const handleBulkStatusChange = (status: 'active' | 'inactive') => {
    const selectedUsers = selectedRows.map((row) => row.original as User)
    toast.promise(sleep(2000), {
      loading:
        status === 'active'
          ? t('table.bulkActions.activating')
          : t('table.bulkActions.deactivating'),
      success: () => {
        table.resetRowSelection()
        return t(
          status === 'active'
            ? 'table.bulkActions.activated'
            : 'table.bulkActions.deactivated',
          { count: selectedUsers.length }
        )
      },
      error:
        status === 'active'
          ? t('table.bulkActions.errorActivating')
          : t('table.bulkActions.errorDeactivating'),
    })
    table.resetRowSelection()
  }

  const handleBulkInvite = () => {
    const selectedUsers = selectedRows.map((row) => row.original as User)
    toast.promise(sleep(2000), {
      loading: t('table.bulkActions.inviting'),
      success: () => {
        table.resetRowSelection()
        return t('table.bulkActions.invited', {
          count: selectedUsers.length,
        })
      },
      error: t('table.bulkActions.errorInviting'),
    })
    table.resetRowSelection()
  }

  return (
    <>
      <BulkActionsToolbar
        table={table}
        entityName='user'
        getEntityLabel={(count) => t('table.bulkActions.entityName', { count })}
        labels={{
          clearSelection: t('table.selection.clearSelection'),
          clearSelectionWithShortcut: t(
            'table.selection.clearSelectionWithShortcut'
          ),
          toolbarLabel: (count, entityLabel) =>
            t('table.selection.toolbarLabel', {
              count,
              entity: entityLabel,
            }),
          announcement: (count, entityLabel) =>
            t('table.selection.announcement', {
              count,
              entity: entityLabel,
            }),
          summary: (entityLabel) =>
            t('table.selection.summary', { entity: entityLabel }),
        }}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              onClick={handleBulkInvite}
              className='size-8'
              aria-label={t('table.bulkActions.inviteSelectedUsers')}
              title={t('table.bulkActions.inviteSelectedUsers')}
            >
              <Mail />
              <span className='sr-only'>
                {t('table.bulkActions.inviteSelectedUsers')}
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t('table.bulkActions.inviteSelectedUsers')}</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              onClick={() => handleBulkStatusChange('active')}
              className='size-8'
              aria-label={t('table.bulkActions.activateSelectedUsers')}
              title={t('table.bulkActions.activateSelectedUsers')}
            >
              <UserCheck />
              <span className='sr-only'>
                {t('table.bulkActions.activateSelectedUsers')}
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t('table.bulkActions.activateSelectedUsers')}</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              onClick={() => handleBulkStatusChange('inactive')}
              className='size-8'
              aria-label={t('table.bulkActions.deactivateSelectedUsers')}
              title={t('table.bulkActions.deactivateSelectedUsers')}
            >
              <UserX />
              <span className='sr-only'>
                {t('table.bulkActions.deactivateSelectedUsers')}
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t('table.bulkActions.deactivateSelectedUsers')}</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='destructive'
              size='icon'
              onClick={() => setShowDeleteConfirm(true)}
              className='size-8'
              aria-label={t('table.bulkActions.deleteSelectedUsers')}
              title={t('table.bulkActions.deleteSelectedUsers')}
            >
              <Trash2 />
              <span className='sr-only'>
                {t('table.bulkActions.deleteSelectedUsers')}
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t('table.bulkActions.deleteSelectedUsers')}</p>
          </TooltipContent>
        </Tooltip>
      </BulkActionsToolbar>

      <UsersMultiDeleteDialog
        table={table}
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
      />
    </>
  )
}
