import { useState, useEffect } from 'react'
import {
    Plus,
    Search,
    User,
    ShieldAlert,
    Star,
    ShieldCheck,
    Trash2,
    Edit,
    RefreshCw,
    X,
    ChevronLeft,
    ChevronRight,
    Phone,
} from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Spinner } from '@/components/feedback/Spinner'

type Driver = {
    id: string
    name: string
    licenseNumber: string
    status: 'active' | 'inactive' | 'on_break'
    vehicleAssigned: string
    rating: number
    phoneNumber: string
}

const initialDrivers: Driver[] = [
    { id: '1', name: 'Rohan Sharma', licenseNumber: 'DL-142019008272', status: 'active', vehicleAssigned: 'MH-12-QX-4029', rating: 4.9, phoneNumber: '+91 98765 43210' },
    { id: '2', name: 'Amit Patel', licenseNumber: 'DL-122018991201', status: 'active', vehicleAssigned: 'MH-14-EU-8812', rating: 4.8, phoneNumber: '+91 98765 43211' },
    { id: '3', name: 'Suresh Kumar', licenseNumber: 'DL-092020229873', status: 'active', vehicleAssigned: 'MH-14-GP-5511', rating: 4.7, phoneNumber: '+91 98765 43212' },
    { id: '4', name: 'Karan Malhotra', licenseNumber: 'DL-202015091811', status: 'on_break', vehicleAssigned: 'MH-12-YT-2345', rating: 4.5, phoneNumber: '+91 98765 43213' },
    { id: '5', name: 'Vikram Singh', licenseNumber: 'DL-032014022131', status: 'inactive', vehicleAssigned: 'N/A', rating: 4.2, phoneNumber: '+91 98765 43214' },
    { id: '6', name: 'Rajesh More', licenseNumber: 'DL-122019992345', status: 'active', vehicleAssigned: 'MH-14-LK-3344', rating: 4.6, phoneNumber: '+91 98765 43215' },
    { id: '7', name: 'Nilesh Patil', licenseNumber: 'DL-142018903344', status: 'active', vehicleAssigned: 'MH-14-JJ-7788', rating: 4.8, phoneNumber: '+91 98765 43216' },
    { id: '8', name: 'Sunil Shinde', licenseNumber: 'DL-092021114455', status: 'inactive', vehicleAssigned: 'N/A', rating: 4.3, phoneNumber: '+91 98765 43217' },
    { id: '9', name: 'Ajay Devgan', licenseNumber: 'DL-202017008899', status: 'active', vehicleAssigned: 'MH-14-QQ-1122', rating: 4.9, phoneNumber: '+91 98765 43218' },
    { id: '10', name: 'Akshay Kumar', licenseNumber: 'DL-032015998811', status: 'active', vehicleAssigned: 'MH-12-ZZ-3344', rating: 4.7, phoneNumber: '+91 98765 43219' },
    { id: '11', name: 'Abhishek Bachchan', licenseNumber: 'DL-142021445566', status: 'on_break', vehicleAssigned: 'N/A', rating: 4.4, phoneNumber: '+91 98765 43220' },
    { id: '12', name: 'Salman Khan', licenseNumber: 'DL-122019001122', status: 'inactive', vehicleAssigned: 'N/A', rating: 3.9, phoneNumber: '+91 98765 43221' },
]

export function DriversPage() {
    // State
    const [drivers, setDrivers] = useState<Driver[]>(initialDrivers)
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'on_break'>('all')
    const [isLoading, setIsLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5

    // Modals state
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [currentEditDriver, setCurrentEditDriver] = useState<Driver | null>(null)

    // Form states
    const [formName, setFormName] = useState('')
    const [formLicense, setFormLicense] = useState('')
    const [formStatus, setFormStatus] = useState<Driver['status']>('active')
    const [formVehicle, setFormVehicle] = useState('')
    const [formRating, setFormRating] = useState('5.0')
    const [formPhone, setFormPhone] = useState('')

    // Simulate refresh
    const triggerRefresh = () => {
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
        }, 600)
    }

    // Reset page when filters change
    useEffect(() => {
        setCurrentPage(1)
    }, [searchTerm, statusFilter])

    // Handlers
    const handleAddNew = (e: React.FormEvent) => {
        e.preventDefault()
        if (!formName || !formLicense) return

        const newDriver: Driver = {
            id: String(Date.now()),
            name: formName,
            licenseNumber: formLicense.toUpperCase(),
            status: formStatus,
            vehicleAssigned: formStatus === 'inactive' ? 'N/A' : formVehicle || 'Unassigned',
            rating: parseFloat(formRating) || 5.0,
            phoneNumber: formPhone || 'N/A',
        }

        setDrivers([newDriver, ...drivers])
        setIsAddOpen(false)
        resetForm()
    }

    const handleEditSave = (e: React.FormEvent) => {
        e.preventDefault()
        if (!currentEditDriver || !formName || !formLicense) return

        const updated = drivers.map((d) => {
            if (d.id === currentEditDriver.id) {
                return {
                    ...d,
                    name: formName,
                    licenseNumber: formLicense.toUpperCase(),
                    status: formStatus,
                    vehicleAssigned: formStatus === 'inactive' ? 'N/A' : formVehicle || 'Unassigned',
                    rating: parseFloat(formRating) || 5.0,
                    phoneNumber: formPhone || 'N/A',
                }
            }
            return d
        })

        setDrivers(updated)
        setIsEditOpen(false)
        resetForm()
    }

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this driver profile?')) {
            setDrivers(drivers.filter((d) => d.id !== id))
        }
    }

    const openEdit = (driver: Driver) => {
        setCurrentEditDriver(driver)
        setFormName(driver.name)
        setFormLicense(driver.licenseNumber)
        setFormStatus(driver.status)
        setFormVehicle(driver.vehicleAssigned === 'N/A' ? '' : driver.vehicleAssigned)
        setFormRating(String(driver.rating))
        setFormPhone(driver.phoneNumber === 'N/A' ? '' : driver.phoneNumber)
        setIsEditOpen(true)
    }

    const resetForm = () => {
        setFormName('')
        setFormLicense('')
        setFormStatus('active')
        setFormVehicle('')
        setFormRating('5.0')
        setFormPhone('')
        setCurrentEditDriver(null)
    }

    // Clear all filters
    const handleClearFilters = () => {
        setSearchTerm('')
        setStatusFilter('all')
    }

    // Filter logic
    const filteredDrivers = drivers.filter((driver) => {
        const matchesSearch =
            driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            driver.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            driver.vehicleAssigned.toLowerCase().includes(searchTerm.toLowerCase()) ||
            driver.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesStatus = statusFilter === 'all' || driver.status === statusFilter

        return matchesSearch && matchesStatus
    })

    // Pagination logic
    const totalItems = filteredDrivers.length
    const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage))
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedDrivers = filteredDrivers.slice(startIndex, startIndex + itemsPerPage)

    const getStatusBadge = (status: Driver['status']) => {
        switch (status) {
            case 'active':
                return <Badge variant="success">Active</Badge>
            case 'on_break':
                return <Badge variant="warning">On Break</Badge>
            case 'inactive':
                return <Badge variant="danger">Inactive</Badge>
        }
    }

    // Metrics summary
    const totals = {
        all: drivers.length,
        active: drivers.filter((d) => d.status === 'active').length,
        onBreak: drivers.filter((d) => d.status === 'on_break').length,
        inactive: drivers.filter((d) => d.status === 'inactive').length,
    }

    return (
        <div className="space-y-6 pb-20 lg:pb-0">
            <PageHeader
                title="Drivers"
                description="Monitor driver personnel, licensing, ratings and assignments"
                action={
                    <div className="flex gap-2">
                        <Button
                            variant="secondary"
                            size="md"
                            onClick={triggerRefresh}
                            className="flex items-center justify-center p-2 rounded-lg"
                            title="Refresh Registry"
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
                            Add Driver
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
                            <p className="text-sm text-slate-500 font-semibold font-semibold">Active Operators</p>
                            <p className="text-2xl font-bold text-slate-900">
                                {totals.active} / {totals.all}
                            </p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow transition-shadow">
                    <CardContent className="flex items-center gap-4 p-5">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                            <Star className="h-6 w-6 fill-amber-400 text-amber-500" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-semibold font-semibold">Avg fleet Rating</p>
                            <p className="text-2xl font-bold text-slate-900">4.7 / 5.0</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow transition-shadow">
                    <CardContent className="flex items-center gap-4 p-5">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
                            <ShieldAlert className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-semibold font-semibold">Inactive / Off Duty</p>
                            <p className="text-2xl font-bold text-slate-900">{totals.inactive}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Grid Filters Panel */}
            <Card className="rounded-xl border border-slate-200 bg-white shadow-sm">
                <CardContent className="p-0">
                    <div className="flex flex-col gap-4 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between">
                        {/* Search */}
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search driver name, license, vehicle..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="h-10 w-full rounded-lg border border-slate-200 pl-9 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                            />
                        </div>

                        {/* Status filters */}
                        <div className="flex bg-slate-50 border border-slate-200 rounded-lg p-1 gap-1 self-start sm:self-auto">
                            {(['all', 'active', 'on_break', 'inactive'] as const).map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setStatusFilter(status)}
                                    className={`px-3 py-1.5 text-xs font-semibold rounded-md capitalize transition-colors ${statusFilter === status
                                        ? 'bg-blue-600 text-white shadow-sm'
                                        : 'text-slate-600 hover:bg-slate-100'
                                        }`}
                                >
                                    {status === 'on_break' ? 'On Break' : status}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="relative min-h-[300px]">
                        {/* Loading Overlay */}
                        {isLoading ? (
                            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 backdrop-blur-[1px]">
                                <div className="flex flex-col items-center gap-3 text-slate-600">
                                    <Spinner />
                                    <span className="text-xs font-semibold">Updating operator registry...</span>
                                </div>
                            </div>
                        ) : null}

                        {/* Table or Empty State */}
                        {paginatedDrivers.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse text-left text-sm">
                                    <thead>
                                        <tr className="border-b border-slate-100 bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            <th className="px-6 py-4">Driver Name</th>
                                            <th className="px-6 py-4">License Number</th>
                                            <th className="px-6 py-4">Phone Number</th>
                                            <th className="px-6 py-4">Vehicle Assigned</th>
                                            <th className="px-6 py-4">Rating</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {paginatedDrivers.map((driver) => (
                                            <tr key={driver.id} className="hover:bg-slate-50/40 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-10 w-10 shrink-0 select-none items-center justify-center rounded-full bg-slate-100 text-slate-600">
                                                            <User className="h-5 w-5" />
                                                        </div>
                                                        <div>
                                                            <div className="font-semibold text-slate-900">{driver.name}</div>
                                                            <div className="text-xs text-slate-500">ID: DRV00{driver.id}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 font-mono text-xs text-slate-600">{driver.licenseNumber}</td>
                                                <td className="px-6 py-4 text-slate-600">
                                                    <div className="flex items-center gap-1.5">
                                                        <Phone className="h-3.5 w-3.5 text-slate-400" />
                                                        <span>{driver.phoneNumber}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 font-semibold text-slate-700">
                                                    {driver.vehicleAssigned === 'N/A' || driver.vehicleAssigned === 'Unassigned' ? (
                                                        <span className="text-slate-400 font-normal italic">{driver.vehicleAssigned}</span>
                                                    ) : (
                                                        driver.vehicleAssigned
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-1">
                                                        <Star className="h-4 w-4 fill-amber-400 text-amber-500" />
                                                        <span className="font-semibold text-slate-700">{driver.rating}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">{getStatusBadge(driver.status)}</td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-end gap-1">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="text-slate-500 hover:text-blue-600"
                                                            onClick={() => openEdit(driver)}
                                                            title="Edit Driver"
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="text-slate-500 hover:text-red-600 hover:bg-red-50"
                                                            onClick={() => handleDelete(driver.id)}
                                                            title="Delete Driver"
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
                                    <User className="h-6 w-6" />
                                </div>
                                <h3 className="text-base font-semibold text-slate-900">No operators found</h3>
                                <p className="mt-1 text-sm text-slate-500 max-w-sm">
                                    We couldn't find any driver profile matches for "{searchTerm || 'selected status filter'}". Try widening your searches.
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
                                        Add Driver
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
                                {totalItems} operators
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
                                    onClick={() => setCurrentPage((p) => p - 1)}
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
                            <h2 className="text-lg font-bold text-slate-900">Add New Operator</h2>
                            <button onClick={() => setIsAddOpen(false)} className="rounded-lg p-1 text-slate-400 hover:bg-slate-50 hover:text-slate-700">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <form onSubmit={handleAddNew}>
                            <div className="p-5 space-y-4">
                                <div>
                                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="E.g., Vikram Rathore"
                                        value={formName}
                                        onChange={(e) => setFormName(e.target.value)}
                                        className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">License Number</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="E.g., DL-12XXXXXXXXXX"
                                        value={formLicense}
                                        onChange={(e) => setFormLicense(e.target.value)}
                                        className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">Phone Number</label>
                                        <input
                                            type="text"
                                            placeholder="E.g., +91 98765..."
                                            value={formPhone}
                                            onChange={(e) => setFormPhone(e.target.value)}
                                            className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">Status</label>
                                        <select
                                            value={formStatus}
                                            onChange={(e) => setFormStatus(e.target.value as Driver['status'])}
                                            className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none bg-white focus:border-blue-500"
                                        >
                                            <option value="active">Active</option>
                                            <option value="on_break">On Break</option>
                                            <option value="inactive">Inactive</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">Assigned Transit Unit</label>
                                    <input
                                        type="text"
                                        disabled={formStatus === 'inactive'}
                                        placeholder={formStatus === 'inactive' ? 'N/A' : 'E.g., MH-12-QX-4029'}
                                        value={formVehicle}
                                        onChange={(e) => setFormVehicle(e.target.value)}
                                        className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-blue-500 disabled:bg-slate-50 disabled:text-slate-400"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">Operator Rating</label>
                                    <input
                                        type="number"
                                        min="1.0"
                                        max="5.0"
                                        step="0.1"
                                        value={formRating}
                                        onChange={(e) => setFormRating(e.target.value)}
                                        className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-blue-500"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-2 border-t border-slate-100 p-4">
                                <Button type="button" variant="secondary" onClick={() => setIsAddOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit">Deploy Driver</Button>
                            </div>
                        </form>
                    </Card>
                </div>
            )}

            {/* Edit Modal */}
            {isEditOpen && currentEditDriver && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px]" onClick={() => setIsEditOpen(false)} />
                    <Card className="relative z-10 w-full max-w-md bg-white shadow-2xl rounded-2xl animate-in fade-in duration-200">
                        <div className="flex items-center justify-between border-b border-slate-100 p-4">
                            <h2 className="text-lg font-bold text-slate-900">Edit Operator Registry</h2>
                            <button onClick={() => setIsEditOpen(false)} className="rounded-lg p-1 text-slate-400 hover:bg-slate-50 hover:text-slate-700">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <form onSubmit={handleEditSave}>
                            <div className="p-5 space-y-4">
                                <div>
                                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formName}
                                        onChange={(e) => setFormName(e.target.value)}
                                        className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">License Number</label>
                                    <input
                                        type="text"
                                        required
                                        value={formLicense}
                                        onChange={(e) => setFormLicense(e.target.value)}
                                        className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">Phone Number</label>
                                        <input
                                            type="text"
                                            value={formPhone}
                                            onChange={(e) => setFormPhone(e.target.value)}
                                            className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">Status</label>
                                        <select
                                            value={formStatus}
                                            onChange={(e) => setFormStatus(e.target.value as Driver['status'])}
                                            className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none bg-white focus:border-blue-500"
                                        >
                                            <option value="active">Active</option>
                                            <option value="on_break">On Break</option>
                                            <option value="inactive">Inactive</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">Assigned Transit Unit</label>
                                    <input
                                        type="text"
                                        disabled={formStatus === 'inactive'}
                                        placeholder={formStatus === 'inactive' ? 'N/A' : 'E.g., MH-12-QX-4029'}
                                        value={formVehicle}
                                        onChange={(e) => setFormVehicle(e.target.value)}
                                        className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-blue-500 disabled:bg-slate-50 disabled:text-slate-400"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">Operator Rating</label>
                                    <input
                                        type="number"
                                        min="1.0"
                                        max="5.0"
                                        step="0.1"
                                        value={formRating}
                                        onChange={(e) => setFormRating(e.target.value)}
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
