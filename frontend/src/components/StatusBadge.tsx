import { Badge } from '@/components/ui/Badge'

type StatusBadgeProps = {
  status: string
}

const statusMap: Record<string, 'success' | 'warning' | 'danger' | 'default'> = {
  active: 'success',
  available: 'default',
  maintenance: 'warning',
  offline: 'danger',
  inactive: 'danger',
  on_break: 'warning',
  completed: 'success',
  'in transit': 'default',
  delayed: 'warning',
  ready: 'success',
  generating: 'default',
  failed: 'danger',
  vehicle: 'default',
  trip: 'success',
  fuel: 'warning',
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const key = status.toLowerCase().replace(/\s+/g, '_')
  const variant = statusMap[key] ?? 'default'
  const label = status.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

  return <Badge variant={variant}>{label}</Badge>
}
