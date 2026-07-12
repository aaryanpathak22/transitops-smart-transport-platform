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

// Dummy JSON Data matching fleet management scope
const kpisData = [
  {
    title: 'Total Fleet',
    value: '48',
    change: '+3 new this month',
    icon: Truck,
    iconColor: 'text-blue-600 bg-blue-50',
  },
  {
    title: 'Active Trips',
    value: '36',
    change: '82% utilization rate',
    icon: Activity,
    iconColor: 'text-emerald-600 bg-emerald-50',
  },
  {
    title: 'Under Maintenance',
    value: '4',
    change: '2 scheduled for tomorrow',
    icon: Wrench,
    iconColor: 'text-amber-600 bg-amber-50',
  },
  {
    title: 'On-Time Dispatch',
    value: '96.2%',
    change: '+0.8% change since last week',
    icon: Clock,
    iconColor: 'text-indigo-600 bg-indigo-50',
  },
  {
    title: 'Avg Battery Level',
    value: '84.5%',
    change: 'Clean energy fleet',
    icon: BatteryCharging,
    iconColor: 'text-teal-600 bg-teal-50',
  },
  {
    title: 'Critical Alerts',
    value: '2',
    change: 'Requires dispatch review',
    icon: AlertTriangle,
    iconColor: 'text-rose-600 bg-rose-50',
  },
]

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

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <PageHeader
        title="Fleet Overview"
        description="Comprehensive monitoring of active assets, trips and analytics"
        action={
          <Button className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            July 12, 2026
          </Button>
        }
      />

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {kpisData.map((kpi, idx) => {
          const Icon = kpi.icon
          return (
            <Card key={idx} className="rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardContent className="flex flex-col justify-between h-full p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 tracking-wide uppercase">
                    {kpi.title}
                  </span>
                  <div className={`p-2 rounded-lg ${kpi.iconColor}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-2xl font-bold text-slate-900 leading-tight">
                    {kpi.value}
                  </h3>
                  <p className="mt-1 text-[11px] font-medium text-slate-500">
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
        <Card className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <CardHeader className="border-b border-slate-100 flex flex-row items-center justify-between py-4">
            <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
              Vehicle Status Breakdown
            </h2>
          </CardHeader>
          <CardContent className="flex items-center justify-center p-6 min-h-[300px]">
            <div className="h-68 w-68">
              <Doughnut
                data={vehicleStatusChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: {
                        boxWidth: 12,
                        padding: 15,
                        font: { size: 11, family: 'Inter, system-ui, sans-serif' },
                        color: '#475569',
                      },
                    },
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Bar Chart -> Trip Status (2/3 cols) */}
        <Card className="rounded-xl border border-slate-200 bg-white shadow-sm lg:col-span-2">
          <CardHeader className="border-b border-slate-100 flex flex-row items-center justify-between py-4">
            <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
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
                      grid: { color: '#F1F5F9' },
                      border: { dash: [4, 4] },
                      ticks: { color: '#64748B', font: { size: 10 } },
                    },
                    x: {
                      grid: { display: false },
                      ticks: { color: '#64748B', font: { size: 10 } },
                    },
                  },
                  plugins: {
                    legend: {
                      position: 'top',
                      align: 'end',
                      labels: {
                        boxWidth: 12,
                        padding: 10,
                        font: { size: 11, family: 'Inter, system-ui, sans-serif' },
                        color: '#475569',
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
      <Card className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <CardHeader className="border-b border-slate-100 flex flex-row items-center justify-between py-4 px-6">
          <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
            Live Trip Tracking Panel
          </h2>
          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
            View All Trips
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <th className="px-6 py-4">Trip Unit</th>
                  <th className="px-6 py-4">Assigned Vehicle / Driver</th>
                  <th className="px-6 py-4">Departure Path</th>
                  <th className="px-6 py-4">Schedule</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Monitoring</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentTrips.map((trip) => (
                  <tr key={trip.id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4 font-semibold text-slate-900">
                      {trip.id}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-semibold text-slate-900">{trip.vehicle}</div>
                        <div className="text-xs text-slate-500">{trip.driver}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-600">
                        <span>{trip.startLocation}</span>
                        <ArrowRight className="h-3 w-3 text-slate-400 shrink-0" />
                        <span>{trip.endLocation}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      <span className="font-medium">{trip.departure}</span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={getStatusVariant(trip.status)}>
                        {trip.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="sm" className="text-blue-600 flex items-center gap-1.5 ml-auto">
                        <MapPin className="h-3.5 w-3.5" />
                        Live Map
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
