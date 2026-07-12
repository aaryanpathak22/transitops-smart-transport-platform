import { useQuery } from '@tanstack/react-query'
import { AlertTriangle, Bus, Clock, Route } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card, CardContent } from '@/components/ui/Card'
import { Spinner } from '@/components/feedback/Spinner'
import { ErrorState } from '@/components/feedback/ErrorState'
import { dashboardService } from '@/services/api/dashboard'

const statConfig = [
  { key: 'totalVehicles' as const, label: 'Total Vehicles', icon: Bus, color: 'text-blue-600 bg-blue-50' },
  { key: 'activeRoutes' as const, label: 'Active Routes', icon: Route, color: 'text-emerald-600 bg-emerald-50' },
  { key: 'onTimeRate' as const, label: 'On-Time Rate', icon: Clock, color: 'text-violet-600 bg-violet-50', suffix: '%' },
  { key: 'alerts' as const, label: 'Active Alerts', icon: AlertTriangle, color: 'text-amber-600 bg-amber-50' },
]

export function DashboardPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: dashboardService.getStats,
  })

  if (isLoading) return <Spinner />
  if (error) return <ErrorState message="Failed to load dashboard stats" />

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <PageHeader
        title="Dashboard"
        description="Overview of your transport operations"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statConfig.map(({ key, label, icon: Icon, color, suffix }) => (
          <Card key={key}>
            <CardContent className="flex items-center gap-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${color}`}>
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-slate-500">{label}</p>
                <p className="text-2xl font-bold text-slate-900">
                  {data?.[key]}
                  {suffix ?? ''}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
