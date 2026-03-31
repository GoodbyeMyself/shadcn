import { useEffect, useState } from 'react'
import {
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { type NavigateFn, useTableUrlState } from '@/hooks/use-table-url-state'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DataTablePagination, DataTableToolbar } from '@/components/data-table'
import { roles } from '../data/data'
import { type User } from '../data/schema'
import { DataTableBulkActions } from './data-table-bulk-actions'
import { useUsersColumns } from './users-columns'

type DataTableProps = {
  data: User[]
  search: Record<string, unknown>
  navigate: NavigateFn
}

export function UsersTable({ data, search, navigate }: DataTableProps) {
  const { t } = useTranslation('users')
  const columns = useUsersColumns()

  // Local UI-only states
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [sorting, setSorting] = useState<SortingState>([])

  // Local state management for table (uncomment to use local-only state, not synced with URL)
  // const [columnFilters, onColumnFiltersChange] = useState<ColumnFiltersState>([])
  // const [pagination, onPaginationChange] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 })

  // Synced with URL states (keys/defaults mirror users route search schema)
  const {
    columnFilters,
    onColumnFiltersChange,
    pagination,
    onPaginationChange,
    ensurePageInRange,
  } = useTableUrlState({
    search,
    navigate,
    pagination: { defaultPage: 1, defaultPageSize: 10 },
    globalFilter: { enabled: false },
    columnFilters: [
      // username per-column text filter
      { columnId: 'username', searchKey: 'username', type: 'string' },
      { columnId: 'status', searchKey: 'status', type: 'array' },
      { columnId: 'role', searchKey: 'role', type: 'array' },
    ],
  })

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      pagination,
      rowSelection,
      columnFilters,
      columnVisibility,
    },
    enableRowSelection: true,
    onPaginationChange,
    onColumnFiltersChange,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  useEffect(() => {
    ensurePageInRange(table.getPageCount())
  }, [table, ensurePageInRange])

  return (
    <div
      className={cn(
        'max-sm:has-[div[role="toolbar"]]:mb-16', // Add margin bottom to the table on mobile when the toolbar is visible
        'flex flex-1 flex-col gap-4'
      )}
    >
      <DataTableToolbar
        table={table}
        searchPlaceholder={t('table.searchPlaceholder')}
        searchKey='username'
        resetLabel={t('table.reset')}
        facetedFilterLabels={{
          selectedLabel: (count) => t('table.selectedCount', { count }),
          noResultsLabel: t('table.facetedNoResults'),
          clearFiltersLabel: t('table.clearFilters'),
        }}
        viewOptionsLabels={{
          viewLabel: t('table.view'),
          toggleColumnsLabel: t('table.toggleColumns'),
          columnLabels: {
            username: t('table.columns.username'),
            fullName: t('table.columns.name'),
            email: t('table.columns.email'),
            phoneNumber: t('table.columns.phoneNumber'),
            status: t('table.columns.status'),
            role: t('table.columns.role'),
          },
        }}
        filters={[
          {
            columnId: 'status',
            title: t('table.filters.status'),
            options: [
              { label: t('table.statuses.active'), value: 'active' },
              { label: t('table.statuses.inactive'), value: 'inactive' },
              { label: t('table.statuses.invited'), value: 'invited' },
              { label: t('table.statuses.suspended'), value: 'suspended' },
            ],
          },
          {
            columnId: 'role',
            title: t('table.filters.role'),
            options: roles.map((role) => ({
              ...role,
              label: t(role.labelKey as never),
            })),
          },
        ]}
      />
      <div className='overflow-hidden rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className='group/row'>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className={cn(
                        'bg-background group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
                        header.column.columnDef.meta?.className,
                        header.column.columnDef.meta?.thClassName
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className='group/row'
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        'bg-background group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
                        cell.column.columnDef.meta?.className,
                        cell.column.columnDef.meta?.tdClassName
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  {t('table.noResults')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination
        table={table}
        className='mt-auto'
        labels={{
          pageOf: (current, total) => t('table.pageOf', { current, total }),
          rowsPerPage: t('table.rowsPerPage'),
          goToFirstPage: t('table.goToFirstPage'),
          goToPreviousPage: t('table.goToPreviousPage'),
          goToNextPage: t('table.goToNextPage'),
          goToLastPage: t('table.goToLastPage'),
          goToPage: (page) => t('table.goToPage', { page }),
        }}
      />
      <DataTableBulkActions table={table} />
    </div>
  )
}
