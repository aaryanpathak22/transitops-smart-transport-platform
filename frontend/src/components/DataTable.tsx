import type { ReactNode } from 'react'
import { EmptyState } from '@/components/feedback/EmptyState'

type Column<T> = {
  key: string
  header: string
  render: (row: T) => ReactNode
  className?: string
}

type DataTableProps<T> = {
  data: T[]
  columns: Column<T>[]
  keyExtractor: (row: T) => string
  emptyTitle?: string
  emptyDescription?: string
}

export function DataTable<T>({
  data,
  columns,
  keyExtractor,
  emptyTitle = 'No data found',
  emptyDescription = 'There is nothing to display yet.',
}: DataTableProps<T>) {
  if (data.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
            {columns.map((col) => (
              <th key={col.key} className={`px-6 py-4 ${col.className ?? ''}`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((row) => (
            <tr key={keyExtractor(row)} className="transition-colors hover:bg-slate-50/40">
              {columns.map((col) => (
                <td key={col.key} className={`px-6 py-4 ${col.className ?? ''}`}>
                  {col.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
