import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import { Doughnut, Bar } from 'react-chartjs-2'
import {
  Truck,
  Activity,
  Wrench,
  Clock,
  BatteryCharging,
  AlertTriangle,
  ArrowRight,
  MapPin,
  Calendar,
} from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { useDashboardData } from '@/hooks/useFleetData'

// Register ChartJS elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)



const recentTrips = [
  {
    id: 'TR-1029',
    vehicle: 'MH-12-QX-4029',
    driver: 'Rohan Sharma',
    startLocation: 'Terminal A, Pune',
    endLocation: 'East Hub, Mumbai',
    status: 'In Transit',
    departure: '09:12 AM',
  },
  {
    id: 'TR-1028',
    vehicle: 'MH-14-EU-8812',
    driver: 'Amit Patel',
    startLocation: 'South Hub, Pune',
    endLocation: 'Logistics City, Thane',
    status: 'Completed',
    departure: '07:30 AM',
  },
  {
    id: 'TR-1027',
    vehicle: 'MH-14-GP-5511',
    driver: 'Suresh Kumar',
    startLocation: 'Airport Cargo, Mumbai',
    endLocation: 'Terminal B, Pune',
    status: 'Delayed',
    departure: '06:45 AM',
  },
  {
    id: 'TR-1026',
    vehicle: 'MH-12-YT-2345',
    driver: 'Karan Malhotra',
    startLocation: 'Hinjewadi Phase 3',
    endLocation: 'Kothrud Depot',
    status: 'Completed',
    departure: '05:15 AM',
  },
]

// Professional Blue & White palette for charts
const vehicleStatusChartData = {
  labels: ['Active / In Service', 'Idle / Available', 'Maintenance', 'Offline'],
  datasets: [
    {
      data: [36, 6, 4, 2],
      backgroundColor: [
        '#2563EB', // Blue-600
        '#60A5FA', // Blue-400
        '#FBBF24', // Amber-400
        '#EF4444', // Red-500
      ],
      borderWidth: 1,
      hoverOffset: 4,
    },
  ],
}

const tripStatusBarChartData = {
  labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  datasets: [
    {
      label: 'Completed Trips',
      data: [42, 45, 50, 48, 52, 38, 30],
      backgroundColor: '#2563EB', // Primary Blue
      borderRadius: 6,
    },
    {
      label: 'Delayed Trips',
      data: [3, 2, 4, 1, 3, 5, 2],
      backgroundColor: '#93C5FD', // Light Blue-300
      borderRadius: 6,
    },
  ],
}

export function DashboardPage() {
  const { data, isLoading } = useDashboardData()
  const CalendarIcon = Calendar

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'success'
      case 'In Transit':
        return 'default'
      default:
        return 'warning'
    }
  }

  // Dynamic KPI mappings connected to API service layer
  const kpis = [
    {
      title: 'Total Fleet',
      value: String(data?.totalVehicles ?? 48),
      change: '+3 new this month',
      icon: Truck,
      iconColor: 'text-blue-600 bg-blue-50/60',
    },
    {
      title: 'Active Trips',
      value: String(data?.activeRoutes ?? 36),
      change: '82% utilization rate',
      icon: Activity,
      iconColor: 'text-emerald-600 bg-emerald-50/60',
    },
    {
      title: 'Under Maintenance',
      value: '4',
      change: '2 scheduled for tomorrow',
      icon: Wrench,
      iconColor: 'text-amber-600 bg-amber-50/60',
    },
    {
      title: 'On-Time Dispatch',
      value: `${data?.onTimeRate ?? 96.2}%`,
      change: '+0.8% change since last week',
      icon: Clock,
      iconColor: 'text-indigo-600 bg-indigo-50/60',
    },
    {
      title: 'Avg Battery Level',
      value: '84.5%',
      change: 'Clean energy fleet',
      icon: BatteryCharging,
      iconColor: 'text-teal-600 bg-teal-50/60',
    },
    {
      title: 'Critical Alerts',
      value: String(data?.alerts ?? 2),
      change: 'Requires dispatch review',
      icon: AlertTriangle,
      iconColor: 'text-rose-600 bg-rose-50/60',
    },
  ]

  // Render Skeleton Loading UI if calling API Client
  if (isLoading) {
    return (
      <div className="space-y-6 pb-20 lg:pb-0 animate-pulse">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="space-y-2">
            <div className="h-8 w-44 rounded-lg bg-slate-200"></div>
            <div className="h-4 w-60 rounded bg-slate-200"></div>
          </div>
          <div className="h-10 w-32 rounded-lg bg-slate-200"></div>
        </div>

        {/* KPI Skeleton grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="h-32 rounded-2xl border border-slate-100 bg-white p-5 space-y-4 shadow-sm">
              <div className="flex justify-between items-center">
                <div className="h-3 w-16 rounded bg-slate-200"></div>
                <div className="h-8 w-8 rounded-lg bg-slate-200"></div>
              </div>
              <div className="space-y-2">
                <div className="h-6 w-12 rounded bg-slate-200"></div>
                <div className="h-3 w-20 rounded bg-slate-200"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Skeleton grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="h-80 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm flex flex-col justify-between">
            <div className="h-4 w-32 rounded bg-slate-200 mb-6"></div>
            <div className="h-44 w-44 rounded-full bg-slate-100 mx-auto"></div>
            <div className="h-4 w-24 rounded bg-slate-200 mx-auto mt-4"></div>
          </div>
          <div className="h-80 rounded-2xl border border-slate-100 bg-white p-6 lg:col-span-2 shadow-sm flex flex-col justify-between">
            <div className="h-4 w-48 rounded bg-slate-200 mb-6"></div>
            <div className="h-44 w-full rounded bg-slate-100"></div>
            <div className="h-4 w-32 rounded bg-slate-200 mt-4"></div>
          </div>
        </div>

        {/* Table Skeleton */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm space-y-4">
          <div className="h-5 w-40 rounded bg-slate-200"></div>
          <div className="space-y-3">
            <div className="h-12 w-full rounded-lg bg-slate-50"></div>
            <div className="h-12 w-full rounded-lg bg-slate-50"></div>
            <div className="h-12 w-full rounded-lg bg-slate-50"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <PageHeader
        title="Fleet Overview"
        description="Comprehensive monitoring of active assets, trips and analytics"
        action={
          <Button className="flex items-center gap-2 shadow-sm rounded-lg hover:shadow transition-shadow">
            <CalendarIcon className="h-4 w-4" />
            July 12, 2026
          </Button>
        }
      />

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon
          return (
            <Card key={idx} className="rounded-2xl border border-slate-100 bg-white shadow-[0_4px_20px_-4px_rgba(148,163,184,0.08)] hover:-translate-y-1 hover:shadow-[0_12px_24px_-4px_rgba(148,163,184,0.16)] transition-all duration-300 ease-out">
              <CardContent className="flex flex-col justify-between h-full p-5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                    {kpi.title}
                  </span>
                  <div className={`p-2 rounded-lg ${kpi.iconColor}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-2xl font-bold text-slate-800 leading-none tracking-tight">
                    {kpi.value}
                  </h3>
                  <p className="mt-1.5 text-[11px] font-medium text-slate-500">
                    {kpi.change}
                  </p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Doughnut Chart -> Vehicle Status (1/3 cols) */}
        <Card className="rounded-2xl border border-slate-100 bg-white shadow-[0_4px_20px_-4px_rgba(148,163,184,0.08)]">
          <CardHeader className="border-b border-slate-50 flex flex-row items-center justify-between py-4 px-6">
            <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              Vehicle Status Breakdown
            </h2>
          </CardHeader>
          <CardContent className="flex items-center justify-center p-6 min-h-[300px]">
            <div className="w-full max-w-[260px] h-[260px]">
              <Doughnut
                data={vehicleStatusChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: {
                        boxWidth: 10,
                        padding: 15,
                        font: { size: 10, family: 'Inter, system-ui, sans-serif' },
                        color: '#64748B',
                      },
                    },
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Bar Chart -> Trip Status (2/3 cols) */}
        <Card className="rounded-2xl border border-slate-100 bg-white shadow-[0_4px_20px_-4px_rgba(148,163,184,0.08)] lg:col-span-2">
          <CardHeader className="border-b border-slate-50 flex flex-row items-center justify-between py-4 px-6">
            <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              Weekly Fleet Trip Performance
            </h2>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[280px]">
              <Bar
                data={tripStatusBarChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: { color: '#F8FAFC' },
                      border: { dash: [4, 4], display: false },
                      ticks: { color: '#94A3B8', font: { size: 10 } },
                    },
                    x: {
                      grid: { display: false },
                      ticks: { color: '#94A3B8', font: { size: 10 } },
                    },
                  },
                  plugins: {
                    legend: {
                      position: 'top',
                      align: 'end',
                      labels: {
                        boxWidth: 10,
                        padding: 10,
                        font: { size: 10, family: 'Inter, system-ui, sans-serif' },
                        color: '#64748B',
                      },
                    },
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Trips Table */}
      <Card className="rounded-2xl border border-slate-100 bg-white shadow-[0_4px_20px_-4px_rgba(148,163,184,0.08)] overflow-hidden">
        <CardHeader className="border-b border-slate-50 flex flex-row items-center justify-between py-4 px-6">
          <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            Live Trip Tracking Panel
          </h2>
          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-750 flex items-center gap-1 font-semibold text-xs">
            View All Trips
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          {recentTrips.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    <th className="px-6 py-4">Trip Unit</th>
                    <th className="px-6 py-4">Assigned Vehicle / Driver</th>
                    <th className="px-6 py-4 hidden md:table-cell">Departure Path</th>
                    <th className="px-6 py-4 hidden sm:table-cell">Schedule</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Monitoring</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {recentTrips.map((trip) => (
                    <tr key={trip.id} className="hover:bg-slate-50/40 transition-colors">
                      <td className="px-6 py-4 font-semibold text-slate-800">
                        {trip.id}
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-semibold text-slate-800">{trip.vehicle}</div>
                          <div className="text-xs text-slate-400">{trip.driver}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <div className="flex items-center gap-2 text-slate-650">
                          <span>{trip.startLocation}</span>
                          <ArrowRight className="h-3 w-3 text-slate-350 shrink-0" />
                          <span className="text-slate-700">{trip.endLocation}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-500 hidden sm:table-cell">
                        <span className="font-medium">{trip.departure}</span>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={getStatusVariant(trip.status)}>
                          {trip.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-750 flex items-center gap-1.5 ml-auto font-medium text-xs">
                          <MapPin className="h-3.5 w-3.5" />
                          Live Map
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 text-slate-400 mb-3 border border-slate-100">
                <Activity className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-800">No active trips currently logged</h3>
              <p className="mt-1 text-xs text-slate-500 max-w-xs">
                Check back later or schedule dynamic operations in dispatch center.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
