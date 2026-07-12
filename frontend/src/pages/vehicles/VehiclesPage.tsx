import { useState, useEffect } from 'react'
import { showToast } from '@/utils/toast'
import {
    Plus,
    Search,
    Truck,
    AlertCircle,
    Wrench,
    ShieldCheck,
    Trash2,
    Edit,
    RefreshCw,
    X,
    ChevronLeft,
    ChevronRight,
    Filter,
} from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Spinner } from '@/components/feedback/Spinner'

type Vehicle = {
    id: string
    plateNumber: string
    model: string
    type: 'Electric Bus' | 'Electric Truck' | 'Electric Light Truck'
    status: 'active' | 'maintenance' | 'offline'
    driver: string
    battery: string
}

const initialVehicles: Vehicle[] = [
    { id: '1', plateNumber: 'MH-12-QX-4029', model: 'Volvo 9400 B11R', type: 'Electric Bus', status: 'active', driver: 'Rohan Sharma', battery: '92%' },
    { id: '2', plateNumber: 'MH-14-EU-8812', model: 'TATA Ultra T.7', type: 'Electric Truck', status: 'active', driver: 'Amit Patel', battery: '81%' },
    { id: '3', plateNumber: 'MH-12-TR-9081', model: 'BYD K9', type: 'Electric Bus', status: 'maintenance', driver: 'N/A', battery: '14%' },
    { id: '4', plateNumber: 'MH-12-YT-2345', model: 'Eicher Pro 2049', type: 'Electric Light Truck', status: 'offline', driver: 'Karan Malhotra', battery: '0%' },
    { id: '5', plateNumber: 'MH-14-GP-5511', model: 'Volvo Electric Bus', type: 'Electric Bus', status: 'active', driver: 'Suresh Kumar', battery: '76%' },
    { id: '6', plateNumber: 'MH-12-XF-1122', model: 'TATA Starbus Ev', type: 'Electric Bus', status: 'active', driver: 'Vikram Singh', battery: '88%' },
    { id: '7', plateNumber: 'MH-14-LK-3344', model: 'Mahindra Treo', type: 'Electric Light Truck', status: 'active', driver: 'Rajesh More', battery: '95%' },
    { id: '8', plateNumber: 'MH-12-PP-5566', model: 'Ashok Leyland Circuit', type: 'Electric Bus', status: 'maintenance', driver: 'N/A', battery: '10%' },
    { id: '9', plateNumber: 'MH-14-JJ-7788', model: 'BYD T8', type: 'Electric Truck', status: 'active', driver: 'Nilesh Patil', battery: '68%' },
    { id: '10', plateNumber: 'MH-12-OO-9900', model: 'Proterra ZX5', type: 'Electric Bus', status: 'offline', driver: 'Sunil Shinde', battery: '0%' },
    { id: '11', plateNumber: 'MH-14-QQ-1122', model: 'Rivian EDV', type: 'Electric Light Truck', status: 'active', driver: 'Ajay Devgan', battery: '70%' },
    { id: '12', plateNumber: 'MH-12-ZZ-3344', model: 'Tesla Semi', type: 'Electric Truck', status: 'active', driver: 'Akshay Kumar', battery: '85%' },
]

export function VehiclesPage() {
    // State
    const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles)
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'maintenance' | 'offline'>('all')
    const [typeFilter, setTypeFilter] = useState<'all' | 'Electric Bus' | 'Electric Truck' | 'Electric Light Truck'>('all')
    const [isLoading, setIsLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5

    // Modals state
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [currentEditVehicle, setCurrentEditVehicle] = useState<Vehicle | null>(null)

    // Form states
    const [formPlate, setFormPlate] = useState('')
    const [formModel, setFormModel] = useState('')
    const [formType, setFormType] = useState<Vehicle['type']>('Electric Bus')
    const [formStatus, setFormStatus] = useState<Vehicle['status']>('active')
    const [formDriver, setFormDriver] = useState('')
    const [formBattery, setFormBattery] = useState('100%')

    // Simulate refresh
    const triggerRefresh = () => {
        const toastId = showToast.loading('Synchronizing fleet logs...')
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
            showToast.dismiss(toastId)
            showToast.success('Fleet logs synchronized successfully!')
        }, 700)
    }

    // Effect to reset page on search/filter changes
    useEffect(() => {
        setCurrentPage(1)
    }, [searchTerm, statusFilter, typeFilter])

    // Handlers
    const handleAddNew = (e: React.FormEvent) => {
        e.preventDefault()
        if (!formPlate || !formModel) return

        const newVehicle: Vehicle = {
            id: String(Date.now()),
            plateNumber: formPlate.toUpperCase(),
            model: formModel,
            type: formType,
            status: formStatus,
            driver: formStatus === 'maintenance' ? 'N/A' : formDriver || 'Unassigned',
            battery: formBattery.endsWith('%') ? formBattery : `${formBattery}%`,
        }

        setVehicles([newVehicle, ...vehicles])
        setIsAddOpen(false)
        resetForm()
        showToast.success(`Vehicle unit "${newVehicle.plateNumber}" has been registered.`)
    }

    const handleEditSave = (e: React.FormEvent) => {
        e.preventDefault()
        if (!currentEditVehicle || !formPlate || !formModel) return

        const updated = vehicles.map((v) => {
            if (v.id === currentEditVehicle.id) {
                return {
                    ...v,
                    plateNumber: formPlate.toUpperCase(),
                    model: formModel,
                    type: formType,
                    status: formStatus,
                    driver: formStatus === 'maintenance' ? 'N/A' : formDriver || 'Unassigned',
                    battery: formBattery.endsWith('%') ? formBattery : `${formBattery}%`,
                }
            }
            return v
        })

        setVehicles(updated)
        setIsEditOpen(false)
        resetForm()
        showToast.success(`Changes saved for transit unit "${formPlate.toUpperCase()}"`)
    }

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this vehicle from the fleet?')) {
            setVehicles(vehicles.filter((v) => v.id !== id))
            showToast.success(`Vehicle removed from registry.`)
        }
    }

    const openEdit = (vehicle: Vehicle) => {
        setCurrentEditVehicle(vehicle)
        setFormPlate(vehicle.plateNumber)
        setFormModel(vehicle.model)
        setFormType(vehicle.type)
        setFormStatus(vehicle.status)
        setFormDriver(vehicle.driver === 'N/A' ? '' : vehicle.driver)
        setFormBattery(vehicle.battery.replace('%', ''))
        setIsEditOpen(true)
    }

    const resetForm = () => {
        setFormPlate('')
        setFormModel('')
        setFormType('Electric Bus')
        setFormStatus('active')
        setFormDriver('')
        setFormBattery('100%')
        setCurrentEditVehicle(null)
    }

    // Clear all filters
    const handleClearFilters = () => {
        setSearchTerm('')
        setStatusFilter('all')
        setTypeFilter('all')
    }

    // Filter logic
    const filteredVehicles = vehicles.filter((vehicle) => {
        const matchesSearch =
            vehicle.plateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vehicle.driver.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesStatus = statusFilter === 'all' || vehicle.status === statusFilter
        const matchesType = typeFilter === 'all' || vehicle.type === typeFilter

        return matchesSearch && matchesStatus && matchesType
    })

    // Pagination logic
    const totalItems = filteredVehicles.length
    const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage))
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedVehicles = filteredVehicles.slice(startIndex, startIndex + itemsPerPage)

    const getStatusBadge = (status: Vehicle['status']) => {
        switch (status) {
            case 'active':
                return <Badge variant="success">Active</Badge>
            case 'maintenance':
                return <Badge variant="warning">Maintenance</Badge>
            case 'offline':
                return <Badge variant="danger">Offline</Badge>
        }
    }

    // Metrics for quick summary
    const totals = {
        all: vehicles.length,
        active: vehicles.filter((v) => v.status === 'active').length,
        maintenance: vehicles.filter((v) => v.status === 'maintenance').length,
        offline: vehicles.filter((v) => v.status === 'offline').length,
    }

    return (
        <div className="space-y-6 pb-20 lg:pb-0">
            <PageHeader
                title="Vehicles"
                description="Monitor, customize and deploy your fleet units"
                action={
                    <div className="flex gap-2">
                        <Button
                            variant="secondary"
                            size="md"
                            onClick={triggerRefresh}
                            className="flex items-center justify-center p-2 rounded-lg"
                            title="Refresh Data"
                        >
                            <RefreshCw className={`h-4 w-4 text-slate-600 ${isLoading ? 'animate-spin' : ''}`} />
                        </Button>
                        <Button
                            className="flex items-center gap-2"
                            onClick={() => {
                                resetForm()
                                setIsAddOpen(true)
                            }}
                        >
                            <Plus className="h-4 w-4" />
                            Add Vehicle
                        </Button>
                    </div>
                }
            />

            {/* Summary Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Card className="rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow transition-shadow">
                    <CardContent className="flex items-center gap-4 p-5">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                            <ShieldCheck className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium">Active Vehicles</p>
                            <p className="text-2xl font-bold text-slate-900">
                                {totals.active} / {totals.all}
                            </p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow transition-shadow">
                    <CardContent className="flex items-center gap-4 p-5">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                            <Wrench className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium font-semibold">In Maintenance</p>
                            <p className="text-2xl font-bold text-slate-900">{totals.maintenance}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow transition-shadow">
                    <CardContent className="flex items-center gap-4 p-5">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
                            <AlertCircle className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium font-semibold">Offline Status</p>
                            <p className="text-2xl font-bold text-slate-900">{totals.offline}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Grid Filters Panel */}
            <Card className="rounded-xl border border-slate-200 bg-white shadow-sm">
                <CardContent className="p-0">
                    <div className="flex flex-col gap-4 border-b border-slate-100 p-4 lg:flex-row lg:items-center lg:justify-between">
                        {/* Search */}
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search plate number, vehicle model or driver..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="h-10 w-full rounded-lg border border-slate-200 pl-9 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                            />
                        </div>

                        {/* Selection filters */}
                        <div className="flex flex-wrap items-center gap-3">
                            {/* Type Category Filter */}
                            <div className="flex items-center gap-2">
                                <Filter className="h-4 w-4 text-slate-400" />
                                <select
                                    value={typeFilter}
                                    onChange={(e) => setTypeFilter(e.target.value as 'all' | 'Electric Bus' | 'Electric Truck' | 'Electric Light Truck')}
                                    className="h-10 rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none bg-slate-50 focus:border-blue-500"
                                >
                                    <option value="all">All Types</option>
                                    <option value="Electric Bus">Electric Buses</option>
                                    <option value="Electric Truck">Electric Trucks</option>
                                    <option value="Electric Light Truck">Light Trucks</option>
                                </select>
                            </div>

                            {/* Status Filters */}
                            <div className="flex bg-slate-50 border border-slate-200 rounded-lg p-1 gap-1">
                                {(['all', 'active', 'maintenance', 'offline'] as const).map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => setStatusFilter(status)}
                                        className={`px-3 py-1.5 text-xs font-semibold rounded-md capitalize transition-colors ${statusFilter === status
                                            ? 'bg-blue-600 text-white shadow-sm'
                                            : 'text-slate-600 hover:bg-slate-100'
                                            }`}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="relative min-h-[300px]">
                        {/* Loading Overlay */}
                        {isLoading ? (
                            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 backdrop-blur-[1px]">
                                <div className="flex flex-col items-center gap-3 text-slate-600">
                                    <Spinner />
                                    <span className="text-xs font-semibold">Updating fleet logs...</span>
                                </div>
                            </div>
                        ) : null}

                        {/* Table or Empty State */}
                        {paginatedVehicles.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse text-left text-sm">
                                    <thead>
                                        <tr className="border-b border-slate-100 bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            <th className="px-6 py-4">Vehicle Details</th>
                                            <th className="px-6 py-4 hidden sm:table-cell">Type</th>
                                            <th className="px-6 py-4 hidden md:table-cell">Active Driver</th>
                                            <th className="px-6 py-4">Battery Level</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {paginatedVehicles.map((vehicle) => (
                                            <tr key={vehicle.id} className="hover:bg-slate-50/40 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                                            <Truck className="h-5 w-5" />
                                                        </div>
                                                        <div>
                                                            <div className="font-semibold text-slate-900">{vehicle.plateNumber}</div>
                                                            <div className="text-xs text-slate-500">{vehicle.model}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-slate-600 font-medium hidden sm:table-cell">{vehicle.type}</td>
                                                <td className="px-6 py-4 text-slate-600 font-medium hidden md:table-cell">
                                                    {vehicle.driver === 'N/A' || vehicle.driver === 'Unassigned' ? (
                                                        <span className="text-slate-400 font-normal italic">{vehicle.driver}</span>
                                                    ) : (
                                                        vehicle.driver
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className="h-2 w-16 rounded-full bg-slate-100 overflow-hidden shrink-0">
                                                            <div
                                                                className={`h-full rounded-full ${parseInt(vehicle.battery) > 50
                                                                    ? 'bg-emerald-500'
                                                                    : parseInt(vehicle.battery) > 20
                                                                        ? 'bg-amber-500'
                                                                        : 'bg-red-500'
                                                                    }`}
                                                                style={{ width: vehicle.battery }}
                                                            />
                                                        </div>
                                                        <span className="text-xs font-semibold text-slate-700">{vehicle.battery}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">{getStatusBadge(vehicle.status)}</td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-end gap-1">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="text-slate-500 hover:text-blue-600"
                                                            onClick={() => openEdit(vehicle)}
                                                            title="Edit Vehicle"
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="text-slate-500 hover:text-red-600 hover:bg-red-50"
                                                            onClick={() => handleDelete(vehicle.id)}
                                                            title="Delete Vehicle"
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
                            /* Premium Empty State */
                            <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-50 text-slate-400 mb-4 border border-dashed border-slate-200">
                                    <Truck className="h-6 w-6" />
                                </div>
                                <h3 className="text-base font-semibold text-slate-900">No vehicles found</h3>
                                <p className="mt-1 text-sm text-slate-500 max-w-sm">
                                    We couldn't find any fleet matches for "{searchTerm || 'selected filter combination'}". Try widening your search queries.
                                </p>
                                <div className="mt-6 flex gap-2">
                                    <Button variant="secondary" size="sm" onClick={handleClearFilters}>
                                        Clear Filters
                                    </Button>
                                    <Button
                                        size="sm"
                                        onClick={() => {
                                            resetForm()
                                            setIsAddOpen(true)
                                        }}
                                    >
                                        Add Vehicle
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Pagination Controls */}
                    {totalItems > 0 && (
                        <div className="flex flex-col gap-4 border-t border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between">
                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, totalItems)} of{' '}
                                {totalItems} vehicles
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

            {/* Add Modal */}
            {isAddOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px]" onClick={() => setIsAddOpen(false)} />
                    <Card className="relative z-10 w-full max-w-md bg-white shadow-2xl rounded-2xl animate-in fade-in duration-200">
                        <div className="flex items-center justify-between border-b border-slate-100 p-4">
                            <h2 className="text-lg font-bold text-slate-900">Add New Transit vehicle</h2>
                            <button onClick={() => setIsAddOpen(false)} className="rounded-lg p-1 text-slate-400 hover:bg-slate-50 hover:text-slate-700">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <form onSubmit={handleAddNew}>
                            <div className="p-5 space-y-4">
                                <div>
                                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">Plate Number</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="E.g., MH-12-AB-1234"
                                        value={formPlate}
                                        onChange={(e) => setFormPlate(e.target.value)}
                                        className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">Model Name</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="E.g., Tesla Semi / BYD K9"
                                        value={formModel}
                                        onChange={(e) => setFormModel(e.target.value)}
                                        className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">Type</label>
                                        <select
                                            value={formType}
                                            onChange={(e) => setFormType(e.target.value as Vehicle['type'])}
                                            className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none bg-white focus:border-blue-500"
                                        >
                                            <option value="Electric Bus">Electric Bus</option>
                                            <option value="Electric Truck">Electric Truck</option>
                                            <option value="Electric Light Truck">Light Truck</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">Status</label>
                                        <select
                                            value={formStatus}
                                            onChange={(e) => setFormStatus(e.target.value as Vehicle['status'])}
                                            className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none bg-white focus:border-blue-500"
                                        >
                                            <option value="active">Active</option>
                                            <option value="maintenance">Maintenance</option>
                                            <option value="offline">Offline</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">Driver Name</label>
                                    <input
                                        type="text"
                                        disabled={formStatus === 'maintenance'}
                                        placeholder={formStatus === 'maintenance' ? 'N/A' : 'Name of assigned operator'}
                                        value={formDriver}
                                        onChange={(e) => setFormDriver(e.target.value)}
                                        className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-blue-500 disabled:bg-slate-50 disabled:text-slate-400"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">Battery Level (%)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={formBattery}
                                        onChange={(e) => setFormBattery(e.target.value)}
                                        className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-blue-500"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-2 border-t border-slate-100 p-4">
                                <Button type="button" variant="secondary" onClick={() => setIsAddOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit">Deploy Vehicle</Button>
                            </div>
                        </form>
                    </Card>
                </div>
            )}

            {/* Edit Modal */}
            {isEditOpen && currentEditVehicle && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px]" onClick={() => setIsEditOpen(false)} />
                    <Card className="relative z-10 w-full max-w-md bg-white shadow-2xl rounded-2xl animate-in fade-in duration-200">
                        <div className="flex items-center justify-between border-b border-slate-100 p-4">
                            <h2 className="text-lg font-bold text-slate-900">Edit Asset Details</h2>
                            <button onClick={() => setIsEditOpen(false)} className="rounded-lg p-1 text-slate-400 hover:bg-slate-50 hover:text-slate-700">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <form onSubmit={handleEditSave}>
                            <div className="p-5 space-y-4">
                                <div>
                                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">Plate Number</label>
                                    <input
                                        type="text"
                                        required
                                        value={formPlate}
                                        onChange={(e) => setFormPlate(e.target.value)}
                                        className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">Model Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formModel}
                                        onChange={(e) => setFormModel(e.target.value)}
                                        className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">Type</label>
                                        <select
                                            value={formType}
                                            onChange={(e) => setFormType(e.target.value as Vehicle['type'])}
                                            className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none bg-white focus:border-blue-500"
                                        >
                                            <option value="Electric Bus">Electric Bus</option>
                                            <option value="Electric Truck">Electric Truck</option>
                                            <option value="Electric Light Truck">Light Truck</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">Status</label>
                                        <select
                                            value={formStatus}
                                            onChange={(e) => setFormStatus(e.target.value as Vehicle['status'])}
                                            className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none bg-white focus:border-blue-500"
                                        >
                                            <option value="active">Active</option>
                                            <option value="maintenance">Maintenance</option>
                                            <option value="offline">Offline</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">Driver Name</label>
                                    <input
                                        type="text"
                                        disabled={formStatus === 'maintenance'}
                                        placeholder={formStatus === 'maintenance' ? 'N/A' : 'Name of assigned operator'}
                                        value={formDriver}
                                        onChange={(e) => setFormDriver(e.target.value)}
                                        className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-blue-500 disabled:bg-slate-50 disabled:text-slate-400"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">Battery Level (%)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={formBattery}
                                        onChange={(e) => setFormBattery(e.target.value)}
                                        className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-blue-500"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-2 border-t border-slate-100 p-4">
                                <Button type="button" variant="secondary" onClick={() => setIsEditOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit">Save Changes</Button>
                            </div>
                        </form>
                    </Card>
                </div>
            )}
        </div>
    )
}
