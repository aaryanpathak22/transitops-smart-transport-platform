import { useState, useEffect } from 'react'
import {
    Download,
    FileText,
    Calendar,
    Filter,
    BarChart3,
    TrendingUp,
    AlertTriangle,
    Search,
    X,
    Loader2,
    Trash2,
    PlusCircle,
    RefreshCw,
    ChevronLeft,
    ChevronRight,
    CheckCircle2,
    FileSpreadsheet,
    Play
} from 'lucide-react'
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
    status: 'ready' | 'generating' | 'failed'
}

type Toast = {
    id: string
    message: string
    type: 'success' | 'info' | 'error'
}

const initialReports: ReportItem[] = [
    { id: 'REP-001', name: 'June Fleet Fuel & Battery Efficiency Report', category: 'efficiency', createdDate: '2026-07-01', size: '2.4 MB', status: 'ready' },
    { id: 'REP-002', name: 'Q2 Safety Audit and Harsh Braking Incidents', category: 'safety', createdDate: '2026-06-30', size: '4.1 MB', status: 'ready' },
    { id: 'REP-003', name: 'Preventative Maintenance Logs - June 2026', category: 'maintenance', createdDate: '2026-06-28', size: '1.8 MB', status: 'ready' },
    { id: 'REP-004', name: 'Daily On-Time Dispatch Performance Statistics', category: 'operations', createdDate: '2026-07-11', size: '840 KB', status: 'ready' },
    { id: 'REP-005', name: 'Annual Transit Route Optimization Recommendations', category: 'operations', createdDate: '2026-05-15', size: '12.4 MB', status: 'ready' },
    { id: 'REP-006', name: 'High-Voltage Battery Degradation Report Q1', category: 'efficiency', createdDate: '2026-04-10', size: '3.2 MB', status: 'ready' },
    { id: 'REP-007', name: 'Driver Speeding & Aggressive Acceleration Logs', category: 'safety', createdDate: '2026-07-08', size: '1.5 MB', status: 'failed' },
    { id: 'REP-008', name: 'EV Charger Utilization and Peak Demand Analysis', category: 'efficiency', createdDate: '2026-07-12', size: '950 KB', status: 'generating' },
    { id: 'REP-009', name: 'Tire Pressure & Wear Diagnostic Log', category: 'maintenance', createdDate: '2026-07-02', size: '1.2 MB', status: 'ready' },
    { id: 'REP-010', name: 'Weekly Passenger Load Factor Report', category: 'operations', createdDate: '2026-07-09', size: '610 KB', status: 'ready' }
]

export function ReportsPage() {
    // Reports list state
    const [reports, setReports] = useState<ReportItem[]>(initialReports)

    // Filter states
    const [searchTerm, setSearchTerm] = useState('')
    const [categoryFilter, setCategoryFilter] = useState<'all' | ReportItem['category']>('all')
    const [statusFilter, setStatusFilter] = useState<'all' | ReportItem['status']>('all')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    // Generator panel & form states
    const [isGeneratorOpen, setIsGeneratorOpen] = useState(false)
    const [genName, setGenName] = useState('')
    const [genCategory, setGenCategory] = useState<ReportItem['category']>('efficiency')
    const [isGenerating, setIsGenerating] = useState(false)

    // Pagination
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5

    // Toast alerts state
    const [toasts, setToasts] = useState<Toast[]>([])

    // Simulated refresh state
    const [isRefreshing, setIsRefreshing] = useState(false)

    // Show toast notifications helper
    const triggerToast = (message: string, type: Toast['type'] = 'success') => {
        const id = String(Date.now())
        setToasts((prev) => [...prev, { id, message, type }])
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id))
        }, 4000)
    }

    // Simulate background process for generating reports
    useEffect(() => {
        const generatingReports = reports.filter((r) => r.status === 'generating')
        if (generatingReports.length === 0) return

        const timers = generatingReports.map((report) => {
            return setTimeout(() => {
                setReports((prevReports) =>
                    prevReports.map((r) => {
                        if (r.id === report.id) {
                            // 90% chance of success, 10% chance of failure for demo purposes
                            const isSuccessful = Math.random() > 0.1
                            if (isSuccessful) {
                                triggerToast(`Report "${r.name}" has been generated successfully!`, 'success')
                                return {
                                    ...r,
                                    status: 'ready',
                                    size: `${(Math.random() * 5 + 0.5).toFixed(1)} MB`
                                }
                            } else {
                                triggerToast(`Failed to generate report "${r.name}". Please retry.`, 'error')
                                return {
                                    ...r,
                                    status: 'failed',
                                    size: '--'
                                }
                            }
                        }
                        return r
                    })
                )
            }, 3000)
        })

        return () => {
            timers.forEach((t) => clearTimeout(t))
        }
    }, [reports])

    // Reset pagination when filter criteria change
    useEffect(() => {
        setCurrentPage(1)
    }, [searchTerm, categoryFilter, statusFilter, startDate, endDate])

    // Handlers
    const handleClearFilters = () => {
        setSearchTerm('')
        setCategoryFilter('all')
        setStatusFilter('all')
        setStartDate('')
        setEndDate('')
        triggerToast('Filters have been cleared', 'info')
    }

    const handleCreateReport = (e: React.FormEvent) => {
        e.preventDefault()
        if (!genName.trim()) {
            triggerToast('Please provide a report title', 'error')
            return
        }

        setIsGenerating(true)
        const newReportId = `REP-${String(reports.length + 1).padStart(3, '0')}`
        const newReport: ReportItem = {
            id: newReportId,
            name: genName.trim(),
            category: genCategory,
            createdDate: new Date().toISOString().split('T')[0],
            size: '--',
            status: 'generating'
        }

        setTimeout(() => {
            setReports((prev) => [newReport, ...prev])
            setGenName('')
            setIsGenerating(false)
            setIsGeneratorOpen(false)
            triggerToast(`Initiated report compilation process for ${newReportId}`, 'info')
        }, 600)
    }

    const handleRetryReport = (id: string) => {
        triggerToast(`Retrying generation for ${id}...`, 'info')
        setReports((prev) =>
            prev.map((r) => (r.id === id ? { ...r, status: 'generating' } : r))
        )
    }

    const handleDeleteReport = (id: string, name: string) => {
        if (confirm(`Are you sure you want to permanently delete "${name}"?`)) {
            setReports((prev) => prev.filter((r) => r.id !== id))
            triggerToast(`Deleted ${id} successfully`, 'success')
        }
    }

    const handleDownloadReport = (report: ReportItem) => {
        if (report.status !== 'ready') return

        const fileContent = `TransitOps Smart Fleet Analytics Report
===================================================
Document Reference : ${report.id}
Report Title       : ${report.name}
Domain Category    : ${report.category.toUpperCase()}
Generated Calendar : ${report.createdDate}
Payload File Size  : ${report.size}
Delivery Status    : SUCCESS (VERIFIED)
---------------------------------------------------
This analytical summary is synthesized using transit metrics, telemetry indicators, 
and sensor inputs from active vehicle units in the TransitOps Platform workspace.

Diagnostic Checksums:
- GPS Signal Consistency   : 99.8%
- Operational Availability  : 96.4%
- Battery Reserve Capacity  : 82.5% avg
- Braking Integrity Safety  : Optimal

[CONFIDENTIAL DOCUMENT FOR SYSTEM USE AND FLEET OPERATION MANAGERS]
TransitOps Platforms Co. 2026. All rights reserved.`

        const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8;' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.setAttribute('href', url)
        link.setAttribute('download', `${report.name.toLowerCase().replace(/[^a-z0-9]+/g, '_')}.txt`)
        link.style.visibility = 'hidden'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        triggerToast(`Downloading report: ${report.name}`, 'success')
    }

    // Refresh simulation
    const handleRefreshLogs = () => {
        setIsRefreshing(true)
        setTimeout(() => {
            setIsRefreshing(false)
            triggerToast('Report index synchronization complete', 'success')
        }, 700)
    }

    // Export CSV of visible/filtered reports list
    const handleExportCSV = () => {
        if (filteredReports.length === 0) {
            triggerToast('No compiled reports list available for export', 'error')
            return
        }

        const headers = ['Report ID', 'Report Name', 'Category', 'Created Date', 'Size', 'Status']
        const csvContent = [
            headers.join(','),
            ...filteredReports.map((r) => [
                r.id,
                `"${r.name.replace(/"/g, '""')}"`,
                r.category,
                r.createdDate,
                r.size,
                r.status
            ].join(','))
        ].join('\n')

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.setAttribute('href', url)
        link.setAttribute('download', `transitops_fleet_reports_summary_${new Date().toISOString().split('T')[0]}.csv`)
        link.style.visibility = 'hidden'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        triggerToast(`Exported ${filteredReports.length} reports dynamically to CSV`, 'success')
    }

    // Filter logs
    const filteredReports = reports.filter((report) => {
        const matchesSearch =
            report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.id.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesCategory = categoryFilter === 'all' || report.category === categoryFilter
        const matchesStatus = statusFilter === 'all' || report.status === statusFilter

        let matchesDate = true
        if (startDate) {
            matchesDate = matchesDate && report.createdDate >= startDate
        }
        if (endDate) {
            matchesDate = matchesDate && report.createdDate <= endDate
        }

        return matchesSearch && matchesCategory && matchesStatus && matchesDate
    })

    // Pagination calculations
    const totalItems = filteredReports.length
    const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage))
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedReports = filteredReports.slice(startIndex, startIndex + itemsPerPage)

    // Badges UI rendering helpers
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

    const getStatusElement = (status: ReportItem['status']) => {
        switch (status) {
            case 'ready':
                return (
                    <div className="flex items-center gap-1.5 text-emerald-600 font-semibold text-xs">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Ready
                    </div>
                )
            case 'generating':
                return (
                    <div className="flex items-center gap-1.5 text-blue-600 font-semibold text-xs">
                        <Loader2 className="h-3 w-3 animate-spin" />
                        Generating
                    </div>
                )
            case 'failed':
                return (
                    <div className="flex items-center gap-1.5 text-red-600 font-semibold text-xs">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                        Failed
                    </div>
                )
        }
    }

    // Quick Stats Calculations
    const totals = {
        all: reports.length,
        ready: reports.filter((r) => r.status === 'ready').length,
        generating: reports.filter((r) => r.status === 'generating').length,
        failed: reports.filter((r) => r.status === 'failed').length
    }

    return (
        <div className="relative space-y-6 pb-20 lg:pb-0">
            {/* Absolute Toast Elements container */}
            <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`pointer-events-auto flex items-center justify-between gap-3 rounded-lg border px-4 py-3 shadow-lg transition-transform duration-300 animate-in slide-in-from-top-4 ${toast.type === 'success'
                            ? 'border-emerald-250 bg-emerald-50 text-emerald-800'
                            : toast.type === 'error'
                                ? 'border-red-250 bg-red-50 text-red-800'
                                : 'border-blue-250 bg-blue-50 text-blue-800'
                            }`}
                    >
                        <div className="flex items-center gap-2 text-sm font-semibold">
                            {toast.type === 'success' && <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
                            {toast.type === 'error' && <AlertTriangle className="h-4 w-4 text-red-600" />}
                            {toast.type === 'info' && <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />}
                            <span>{toast.message}</span>
                        </div>
                        <button
                            onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
                            className="text-slate-400 hover:text-slate-600"
                        >
                            <X className="h-3.5 w-3.5" />
                        </button>
                    </div>
                ))}
            </div>

            <PageHeader
                title="System Reports"
                description="Inspect operations efficiency logs, fleet status metrics, and compliance logs."
                action={
                    <div className="flex gap-2">
                        <Button
                            variant="secondary"
                            onClick={handleRefreshLogs}
                            className="flex items-center justify-center p-2 rounded-lg"
                            title="Synchronize Reports Database"
                        >
                            <RefreshCw className={`h-4 w-4 text-slate-600 ${isRefreshing ? 'animate-spin' : ''}`} />
                        </Button>
                        <Button
                            className="flex items-center gap-2"
                            onClick={() => setIsGeneratorOpen(!isGeneratorOpen)}
                        >
                            <PlusCircle className="h-4 w-4" />
                            {isGeneratorOpen ? 'Hide Panel' : 'Generate Custom Report'}
                        </Button>
                    </div>
                }
            />

            {/* Simulated Live Report Generation Form Panel */}
            {isGeneratorOpen && (
                <Card className="border border-blue-100 bg-blue-50/20 rounded-xl overflow-hidden animate-in fade-in duration-300">
                    <CardHeader className="flex flex-row items-center justify-between pb-3 bg-blue-50/40 px-6 py-4">
                        <div className="flex items-center gap-2.5">
                            <PlusCircle className="h-5 w-5 text-blue-600" />
                            <div>
                                <h3 className="font-bold text-slate-800">Generate a custom Analytics Report</h3>
                                <p className="text-xs text-slate-500 font-medium mt-0.5">Parameters selected here control output data compilation.</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsGeneratorOpen(false)}
                            className="p-1 rounded-full hover:bg-slate-200/50 text-slate-400 hover:text-slate-700 transition"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </CardHeader>
                    <CardContent className="p-6">
                        <form onSubmit={handleCreateReport} className="grid grid-cols-1 gap-4 lg:grid-cols-4 items-end">
                            <div className="lg:col-span-2">
                                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500 selection:bg-slate-900">
                                    Report Title
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Enter descriptive report name..."
                                    value={genName}
                                    onChange={(e) => setGenName(e.target.value)}
                                    className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
                                    Data Category
                                </label>
                                <select
                                    value={genCategory}
                                    onChange={(e) => setGenCategory(e.target.value as ReportItem['category'])}
                                    className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500"
                                >
                                    <option value="efficiency">Fleet Efficiency</option>
                                    <option value="safety">Safety & Driving Compliance</option>
                                    <option value="maintenance">Maintenance Logs</option>
                                    <option value="operations">On-Time Operations</option>
                                </select>
                            </div>
                            <div className="flex gap-2">
                                <Button type="submit" disabled={isGenerating} className="w-full flex items-center justify-center gap-2">
                                    {isGenerating ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Scheduling...
                                        </>
                                    ) : (
                                        <>
                                            <Play className="h-4 w-4 fill-current" />
                                            Compile Report
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            {/* Operational Metrics Row */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Card className="hover:shadow transition shadow-sm border border-slate-200 bg-white">
                    <CardContent className="flex items-center gap-4 p-5">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 text-slate-600">
                            <FileText className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Total Reports</p>
                            <p className="text-2xl font-bold text-slate-900 mt-0.5">{totals.all}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="hover:shadow transition shadow-sm border border-slate-200 bg-white">
                    <CardContent className="flex items-center gap-4 p-5">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600">
                            <CheckCircle2 className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Ready Files</p>
                            <p className="text-2xl font-bold text-slate-900 mt-0.5">{totals.ready}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="hover:shadow transition shadow-sm border border-slate-200 bg-white">
                    <CardContent className="flex items-center gap-4 p-5">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 border border-sky-100 text-sky-600">
                            <Loader2 className="h-6 w-6 animate-spin" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Generating</p>
                            <p className="text-2xl font-bold text-slate-900 mt-0.5">{totals.generating}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="hover:shadow transition shadow-sm border border-slate-200 bg-white">
                    <CardContent className="flex items-center gap-4 p-5">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 border border-red-100 text-red-600">
                            <AlertTriangle className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Failed Jobs</p>
                            <p className="text-2xl font-bold text-slate-900 mt-0.5">{totals.failed}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filter and Selection Dashboard Panel */}
            <Card className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                <CardContent className="p-0">
                    {/* Filter controls body */}
                    <div className="p-4 border-b border-slate-100 space-y-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 items-end">
                            {/* Search Name */}
                            <div className="relative">
                                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">Search</label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Search by title or ID..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="h-10 w-full rounded-lg border border-slate-200 pl-9 pr-8 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                                    />
                                    {searchTerm && (
                                        <button
                                            onClick={() => setSearchTerm('')}
                                            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600"
                                        >
                                            <X className="h-3.5 w-3.5" />
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Category Filter */}
                            <div>
                                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">Category</label>
                                <select
                                    value={categoryFilter}
                                    onChange={(e) => setCategoryFilter(e.target.value as 'all' | ReportItem['category'])}
                                    className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none focus:border-blue-500"
                                >
                                    <option value="all">All Categories</option>
                                    <option value="efficiency">Fleet Efficiency</option>
                                    <option value="safety">Safety & Risks</option>
                                    <option value="maintenance">Maintenance Logs</option>
                                    <option value="operations">On-Time Operations</option>
                                </select>
                            </div>

                            {/* Status Filter */}
                            <div>
                                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">Job Status</label>
                                <div className="flex bg-slate-50 border border-slate-200 rounded-lg p-1 gap-1 h-10 items-center justify-around">
                                    {(['all', 'ready', 'generating', 'failed'] as const).map((status) => (
                                        <button
                                            key={status}
                                            type="button"
                                            onClick={() => setStatusFilter(status)}
                                            className={`flex-1 py-1 text-xs font-semibold rounded-md capitalize transition-colors ${statusFilter === status
                                                ? 'bg-blue-600 text-white shadow-sm'
                                                : 'text-slate-650 hover:bg-slate-205 text-slate-600 hover:text-slate-900'
                                                }`}
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Date filters controls */}
                            <div>
                                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                                    <Calendar className="h-3.5 w-3.5 text-slate-400" />
                                    Date Range Selection
                                </label>
                                <div className="flex items-center gap-1.5">
                                    <div className="relative flex-1">
                                        <input
                                            type="date"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                            className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 text-xs outline-none focus:border-blue-500 font-semibold text-slate-700"
                                            title="Start Date"
                                        />
                                    </div>
                                    <span className="text-slate-400 text-xs font-medium">to</span>
                                    <div className="relative flex-1">
                                        <input
                                            type="date"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 text-xs outline-none focus:border-blue-500 font-semibold text-slate-700"
                                            title="End Date"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Secondary controls row */}
                        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between pt-1">
                            <div className="text-xs text-slate-500 font-medium">
                                {filteredReports.length !== reports.length ? (
                                    <span className="bg-amber-50 text-amber-800 px-2.5 py-1 rounded-full border border-amber-100 font-semibold inline-flex items-center gap-1.5">
                                        <Filter className="h-3 w-3" />
                                        Showing {filteredReports.length} matches of total {reports.length}
                                    </span>
                                ) : (
                                    <span>All reports indexing properly.</span>
                                )}
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                                {(searchTerm || categoryFilter !== 'all' || statusFilter !== 'all' || startDate || endDate) && (
                                    <Button variant="ghost" size="sm" onClick={handleClearFilters} className="text-xs flex items-center gap-1 text-slate-500 hover:text-slate-700">
                                        <X className="h-3.5 w-3.5" />
                                        Reset Filters
                                    </Button>
                                )}
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={handleExportCSV}
                                    disabled={filteredReports.length === 0}
                                    className="flex items-center gap-1.5 text-xs font-bold"
                                >
                                    <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-600" />
                                    Export CSV Summary
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Table container & Responsive table */}
                    <div className="relative min-h-[350px]">
                        {isRefreshing && (
                            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 backdrop-blur-[1px] animate-in fade-in duration-100">
                                <div className="flex flex-col items-center gap-2.5 text-slate-600">
                                    <Loader2 className="h-7 w-7 animate-spin text-blue-600" />
                                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Syncing database index...</span>
                                </div>
                            </div>
                        )}

                        {paginatedReports.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse text-left text-sm">
                                    <thead>
                                        <tr className="border-b border-slate-100 bg-slate-50/70 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                            <th className="px-6 py-4">Report Info</th>
                                            <th className="px-6 py-4">Category</th>
                                            <th className="px-6 py-4">Generation Date</th>
                                            <th className="px-6 py-4">File Size</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {paginatedReports.map((report) => (
                                            <tr key={report.id} className="hover:bg-slate-50/40 transition-colors">
                                                {/* Report ID & Name */}
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${report.status === 'failed'
                                                            ? 'bg-red-50 border-red-100 text-red-500'
                                                            : report.status === 'generating'
                                                                ? 'bg-blue-50 border-blue-105 text-blue-500 animation-pulse'
                                                                : 'bg-slate-50 border-slate-105 text-slate-500'
                                                            }`}>
                                                            <FileText className="h-5 w-5" />
                                                        </div>
                                                        <div className="min-w-0">
                                                            <div className="font-semibold text-slate-800 truncate max-w-sm lg:max-w-md" title={report.name}>
                                                                {report.name}
                                                            </div>
                                                            <div className="text-[10px] font-bold text-slate-400 tracking-wider">
                                                                {report.id}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Category Badge */}
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {getCategoryBadge(report.category)}
                                                </td>

                                                {/* Generated Date */}
                                                <td className="px-6 py-4 text-slate-600 font-medium whitespace-nowrap">
                                                    {report.createdDate}
                                                </td>

                                                {/* File Size */}
                                                <td className="px-6 py-4 text-slate-500 font-semibold whitespace-nowrap">
                                                    {report.size}
                                                </td>

                                                {/* Job Status */}
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {getStatusElement(report.status)}
                                                </td>

                                                {/* Action Buttons */}
                                                <td className="px-6 py-4 text-right whitespace-nowrap">
                                                    <div className="flex justify-end gap-1.5">
                                                        {report.status === 'ready' && (
                                                            <Button
                                                                variant="secondary"
                                                                size="sm"
                                                                onClick={() => handleDownloadReport(report)}
                                                                className="flex items-center gap-1 text-xs py-1"
                                                                title="Download Report Output File"
                                                            >
                                                                <Download className="h-3.5 w-3.5" />
                                                                Download
                                                            </Button>
                                                        )}
                                                        {report.status === 'failed' && (
                                                            <Button
                                                                variant="primary"
                                                                size="sm"
                                                                onClick={() => handleRetryReport(report.id)}
                                                                className="flex items-center gap-1 text-xs py-1 bg-amber-600 hover:bg-amber-700"
                                                                title="Re-run Report Compilation"
                                                            >
                                                                <RefreshCw className="h-3.5 w-3.5" />
                                                                Retry
                                                            </Button>
                                                        )}
                                                        {report.status === 'generating' && (
                                                            <Button
                                                                disabled
                                                                variant="secondary"
                                                                size="sm"
                                                                className="flex items-center gap-1 text-xs py-1 opacity-50 cursor-not-allowed"
                                                            >
                                                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                                                Drafting
                                                            </Button>
                                                        )}
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            disabled={report.status === 'generating'}
                                                            onClick={() => handleDeleteReport(report.id, report.name)}
                                                            className="text-slate-400 hover:text-red-650 hover:bg-red-50 hover:text-red-600 py-1"
                                                            title="Delete Permanently"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            /* Modern Empty Match Table UI State */
                            <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-50 text-slate-400 mb-4 border border-dashed border-slate-205">
                                    <FileText className="h-6 w-6" />
                                </div>
                                <h3 className="text-base font-bold text-slate-800">No report instances match filters</h3>
                                <p className="mt-1 text-sm text-slate-500 max-w-sm">
                                    Adjust search phrase, date boundaries, status filters or check category selectors.
                                </p>
                                <div className="mt-6 flex gap-2">
                                    <Button variant="secondary" size="sm" onClick={handleClearFilters}>
                                        Clear Active Filters
                                    </Button>
                                    <Button
                                        size="sm"
                                        onClick={() => {
                                            setIsGeneratorOpen(true)
                                            triggerToast('Configure parameters in compilation card', 'info')
                                        }}
                                    >
                                        Create New Report Custom
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Compact Footer Pagination */}
                    {totalItems > 0 && (
                        <div className="flex flex-col gap-4 border-t border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between bg-slate-50/30">
                            <span className="text-[10px] font-bold text-slate-450 uppercase tracking-widest text-slate-400">
                                Page {currentPage} of {totalPages} &bull; Displaying {startIndex + 1} to {Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems} items
                            </span>
                            <div className="flex items-center gap-1.5 self-end">
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage((p) => p - 1)}
                                    className="p-2 min-w-0"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                {Array.from({ length: totalPages }).map((_, idx) => (
                                    <Button
                                        key={idx}
                                        variant={currentPage === idx + 1 ? 'primary' : 'secondary'}
                                        size="sm"
                                        className="w-8 h-8 p-0"
                                        onClick={() => setCurrentPage(idx + 1)}
                                        title={`Go to page ${idx + 1}`}
                                    >
                                        {idx + 1}
                                    </Button>
                                ))}
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage((p) => p + 1)}
                                    className="p-2 min-w-0"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Modern Weekly Graph and Summaries cards */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <Card className="lg:col-span-2 border border-slate-200">
                    <CardHeader className="flex flex-row items-center justify-between pb-4 bg-slate-50/20 px-6 py-4 border-b border-slate-105">
                        <div>
                            <h2 className="text-base font-bold text-slate-800">Efficiency Trends Overview</h2>
                            <p className="text-xs text-slate-400 font-medium">Running performance index across weekly logs</p>
                        </div>
                        <BarChart3 className="h-5 w-5 text-slate-400" />
                    </CardHeader>
                    <CardContent className="p-6">
                        {/* Mock Chart Visualizer */}
                        <div className="flex h-48 items-end gap-3 pt-6 border-b border-l border-slate-100 px-2 relative">
                            {/* Horizontal gridlines */}
                            <div className="absolute left-0 right-0 border-t border-slate-100/50 top-1/4" />
                            <div className="absolute left-0 right-0 border-t border-slate-100/50 top-2/4" />
                            <div className="absolute left-0 right-0 border-t border-slate-100/50 top-3/4" />

                            {[65, 80, 55, 95, 70, 85, 90, 60, 75, 98, 80, 88].map((val, idx) => (
                                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group z-2">
                                    <div className="flex-1 w-full flex items-end justify-center">
                                        <div
                                            className="w-full rounded-t-md bg-blue-600 hover:bg-blue-700 transition-all duration-300 relative group cursor-pointer"
                                            style={{ height: `${val * 1.5}px` }}
                                        >
                                            {/* Tooltip */}
                                            <span className="absolute -top-9 left-1/2 -translate-x-1/2 rounded bg-slate-900 px-2 py-1 text-[10px] font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity z-50 shadow-md whitespace-nowrap">
                                                Efficiency: {val}%
                                            </span>
                                        </div>
                                    </div>
                                    <span className="text-[10px] text-slate-400 font-bold select-none">W{idx + 1}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Auxiliary Performance Cards */}
                <div className="space-y-4 flex flex-col justify-between">
                    <Card className="flex-1 border border-slate-200">
                        <CardContent className="flex items-center gap-4 p-5 h-full">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                <TrendingUp className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">On-Time Performance</p>
                                <p className="text-2xl font-bold text-slate-900 mt-1">96.8%</p>
                                <span className="inline-block text-[10px] font-bold text-emerald-650 bg-emerald-100/50 text-emerald-700 border border-emerald-100 rounded px-1.5 py-0.5 mt-2">
                                    &uarr; 1.2% this week
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="flex-1 border border-slate-200">
                        <CardContent className="flex items-center gap-4 p-5 h-full">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                                <AlertTriangle className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Unresolved Safety Alerts</p>
                                <p className="text-2xl font-bold text-slate-900 mt-1">11 Alerts</p>
                                <span className="inline-block text-[10px] font-bold text-amber-650 bg-amber-100/50 text-amber-700 border border-amber-100 rounded px-1.5 py-0.5 mt-2">
                                    &darr; 4 resolved today
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
