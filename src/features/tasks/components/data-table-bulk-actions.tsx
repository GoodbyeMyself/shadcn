import { useState } from 'react'
import { type Table } from '@tanstack/react-table'
import { Trash2, CircleArrowUp, ArrowUpDown, Download } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { sleep } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { DataTableBulkActions as BulkActionsToolbar } from '@/components/data-table'
import { priorities, statuses } from '../data/data'
import { type Task } from '../data/schema'
import { TasksMultiDeleteDialog } from './tasks-multi-delete-dialog'

type DataTableBulkActionsProps<TData> = {
  table: Table<TData>
}

export function DataTableBulkActions<TData>({
  table,
}: DataTableBulkActionsProps<TData>) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const { t } = useTranslation('tasks')
  const selectedRows = table.getFilteredSelectedRowModel().rows

  const handleBulkStatusChange = (statusLabel: string) => {
    const selectedTasks = selectedRows.map((row) => row.original as Task)
    toast.promise(sleep(2000), {
      loading: t('bulkActions.loadingStatus'),
      success: () => {
        table.resetRowSelection()
        return t('bulkActions.statusUpdated', {
          status: statusLabel,
          count: selectedTasks.length,
        })
      },
      error: t('bulkActions.error'),
    })
    table.resetRowSelection()
  }

  const handleBulkPriorityChange = (priorityLabel: string) => {
    const selectedTasks = selectedRows.map((row) => row.original as Task)
    toast.promise(sleep(2000), {
      loading: t('bulkActions.loadingPriority'),
      success: () => {
        table.resetRowSelection()
        return t('bulkActions.priorityUpdated', {
          priority: priorityLabel,
          count: selectedTasks.length,
        })
      },
      error: t('bulkActions.error'),
    })
    table.resetRowSelection()
  }

  const handleBulkExport = () => {
    const selectedTasks = selectedRows.map((row) => row.original as Task)
    toast.promise(sleep(2000), {
      loading: t('bulkActions.loadingExport'),
      success: () => {
        table.resetRowSelection()
        return t('bulkActions.exportSuccess', {
          count: selectedTasks.length,
        })
      },
      error: t('bulkActions.error'),
    })
    table.resetRowSelection()
  }

  return (
    <>
      <BulkActionsToolbar
        table={table}
        entityName='task'
        getEntityLabel={(count) => t('bulkActions.entityName', { count })}
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
        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='outline'
                  size='icon'
                  className='size-8'
                  aria-label={t('bulkActions.updateStatus')}
                  title={t('bulkActions.updateStatus')}
                >
                  <CircleArrowUp />
                  <span className='sr-only'>
                    {t('bulkActions.updateStatus')}
                  </span>
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('bulkActions.updateStatus')}</p>
            </TooltipContent>
          </Tooltip>
          <DropdownMenuContent sideOffset={14}>
            {statuses.map((status) => (
              <DropdownMenuItem
                key={status.value}
                defaultValue={status.value}
                onClick={() =>
                  handleBulkStatusChange(t(status.labelKey as never))
                }
              >
                {status.icon && (
                  <status.icon className='size-4 text-muted-foreground' />
                )}
                {t(status.labelKey as never)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='outline'
                  size='icon'
                  className='size-8'
                  aria-label={t('bulkActions.updatePriority')}
                  title={t('bulkActions.updatePriority')}
                >
                  <ArrowUpDown />
                  <span className='sr-only'>
                    {t('bulkActions.updatePriority')}
                  </span>
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('bulkActions.updatePriority')}</p>
            </TooltipContent>
          </Tooltip>
          <DropdownMenuContent sideOffset={14}>
            {priorities.map((priority) => (
              <DropdownMenuItem
                key={priority.value}
                defaultValue={priority.value}
                onClick={() =>
                  handleBulkPriorityChange(t(priority.labelKey as never))
                }
              >
                {priority.icon && (
                  <priority.icon className='size-4 text-muted-foreground' />
                )}
                {t(priority.labelKey as never)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              onClick={() => handleBulkExport()}
              className='size-8'
              aria-label={t('bulkActions.exportTasks')}
              title={t('bulkActions.exportTasks')}
            >
              <Download />
              <span className='sr-only'>{t('bulkActions.exportTasks')}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t('bulkActions.exportTasks')}</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='destructive'
              size='icon'
              onClick={() => setShowDeleteConfirm(true)}
              className='size-8'
              aria-label={t('bulkActions.deleteSelectedTasks')}
              title={t('bulkActions.deleteSelectedTasks')}
            >
              <Trash2 />
              <span className='sr-only'>
                {t('bulkActions.deleteSelectedTasks')}
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t('bulkActions.deleteSelectedTasks')}</p>
          </TooltipContent>
        </Tooltip>
      </BulkActionsToolbar>

      <TasksMultiDeleteDialog
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        table={table}
      />
    </>
  )
}
