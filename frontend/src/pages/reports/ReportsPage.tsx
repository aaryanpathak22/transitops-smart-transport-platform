import { Download, FileText, Calendar, Filter, BarChart3, TrendingUp, AlertTriangle } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

type ReportItem = {
    id: string
    name: string
    category: 'efficiency' | 'safety' | 'maintenance' | 'operations'
    createdDate: string
    size: string
    status: 'ready' | 'generating'
}

const mockReports: ReportItem[] = [
    { id: '1', name: 'June Fleet Fuel & Battery Efficiency Report', category: 'efficiency', createdDate: '2026-07-01', size: '2.4 MB', status: 'ready' },
    { id: '2', name: 'Q2 Safety Audit and Harsh Braking Incidents', category: 'safety', createdDate: '2026-06-30', size: '4.1 MB', status: 'ready' },
    { id: '3', name: 'Preventative Maintenance Logs - June 2026', category: 'maintenance', createdDate: '2026-06-28', size: '1.8 MB', status: 'ready' },
    { id: '4', name: 'Daily On-Time Dispatch Performance Statistics', category: 'operations', createdDate: '2026-07-11', size: '840 KB', status: 'ready' },
    { id: '5', name: 'Annual Transit Route Optimization Recommendations', category: 'operations', createdDate: '2026-05-15', size: '12.4 MB', status: 'ready' },
]

export function ReportsPage() {
    const getCategoryBadge = (category: ReportItem['category']) => {
        switch (category) {
            case 'efficiency':
                return <Badge variant="success">Efficiency</Badge>
            case 'safety':
                return <Badge variant="danger">Safety</Badge>
            case 'maintenance':
                return <Badge variant="warning">Maintenance</Badge>
            case 'operations':
                return <Badge variant="default">Operations</Badge>
        }
    }

    return (
        <div className="space-y-6 pb-20 lg:pb-0">
            <PageHeader
                title="Reports"
                description="Access analysis tools, statistics, and system logs"
                action={
                    <div className="flex gap-2">
                        <Button variant="secondary" className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Date Range
                        </Button>
                        <Button className="flex items-center gap-2">
                            <Filter className="h-4 w-4" />
                            Filter Reports
                        </Button>
                    </div>
                }
            />

            {/* Modern Mock Charts & Summaries */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <Card className="lg:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between pb-4">
                        <h2 className="text-lg font-semibold text-slate-900">Efficiency Trends (Weekly)</h2>
                        <BarChart3 className="h-5 w-5 text-slate-400" />
                    </CardHeader>
                    <CardContent>
                        {/* Mock Chart Visualizer */}
                        <div className="flex h-48 items-end gap-3 pt-4 border-b border-l border-slate-100 px-2">
                            {[65, 80, 55, 95, 70, 85, 90, 60, 75, 98, 80, 88].map((val, idx) => (
                                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                                    <div
                                        className="w-full rounded-t bg-blue-600 hover:bg-blue-700 transition-all duration-300 relative group"
                                        style={{ height: `${val * 1.5}px` }}
                                    >
                                        {/* Tooltip */}
                                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-slate-900 px-2 py-1 text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                            {val}%
                                        </span>
                                    </div>
                                    <span className="text-[10px] text-slate-400 font-semibold">W{idx + 1}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Small operational performance overview panel */}
                <div className="space-y-4">
                    <Card>
                        <CardContent className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                <TrendingUp className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500 font-medium">On-Time Performance</p>
                                <p className="text-2xl font-bold text-slate-900">96.8%</p>
                                <p className="text-xs text-emerald-600 font-semibold mt-0.5">↑ 1.2% this week</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
                                <AlertTriangle className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500 font-medium">Unresolved Alerts</p>
                                <p className="text-2xl font-bold text-slate-900">14</p>
                                <p className="text-xs text-red-600 font-semibold mt-0.5">↓ 4 issues resolved today</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Generated Reports Table */}
            <Card>
                <CardHeader className="pb-4">
                    <h2 className="text-lg font-semibold text-slate-900">Available PDF / CSV Reports</h2>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-left text-sm">
                            <thead>
                                <tr className="border-b border-slate-100 bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    <th className="px-6 py-4">Report Name</th>
                                    <th className="px-6 py-4">Category</th>
                                    <th className="px-6 py-4">Generated Date</th>
                                    <th className="px-6 py-4">File Size</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {mockReports.map((report) => (
                                    <tr key={report.id} className="hover:bg-slate-50/50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-600">
                                                    <FileText className="h-5 w-5" />
                                                </div>
                                                <div className="font-semibold text-slate-900">{report.name}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">{getCategoryBadge(report.category)}</td>
                                        <td className="px-6 py-4 text-slate-600 font-medium">{report.createdDate}</td>
                                        <td className="px-6 py-4 text-slate-500 font-medium">{report.size}</td>
                                        <td className="px-6 py-4 text-right">
                                            <Button variant="secondary" size="sm" className="flex items-center gap-1.5 ml-auto">
                                                <Download className="h-3.5 w-3.5" />
                                                Download
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
