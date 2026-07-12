import type { LucideIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'

type DashboardCardProps = {
  title: string
  value: string
  subtitle?: string
  icon: LucideIcon
  iconColor?: string
}

export function DashboardCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = 'text-blue-600 bg-blue-50',
}: DashboardCardProps) {
  return (
    <Card className="rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <CardContent className="flex flex-col justify-between p-5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            {title}
          </span>
          <div className={`rounded-lg p-2 ${iconColor}`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
          {subtitle && (
            <p className="mt-1.5 text-[11px] font-medium text-slate-500">{subtitle}</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
