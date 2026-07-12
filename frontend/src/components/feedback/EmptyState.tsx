import { Inbox } from 'lucide-react'

type EmptyStateProps = {
  title?: string
  description?: string
}

export function EmptyState({
  title = 'No data found',
  description = 'There is nothing to display yet.',
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
      <Inbox className="h-8 w-8 text-slate-400" />
      <p className="font-medium text-slate-700">{title}</p>
      <p className="text-sm text-slate-500">{description}</p>
    </div>
  )
}
