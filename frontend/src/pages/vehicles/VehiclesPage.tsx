import { useState } from 'react'
import { Plus, Search, Truck, AlertCircle, Wrench, ShieldCheck } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

type Vehicle = {
    id: string
    plateNumber: string
    model: string
    type: string
    status: 'active' | 'maintenance' | 'offline'
    driver: string
    battery: string
}

const mockVehicles: Vehicle[] = [
    { id: '1', plateNumber: 'MH-12-QX-4029', model: 'Volvo 9400 B11R', type: 'Electric Bus', status: 'active', driver: 'Rohan Sharma', battery: '92%' },
    { id: '2', plateNumber: 'MH-14-EU-8812', model: 'TATA Ultra T.7', type: 'Electric Truck', status: 'active', driver: 'Amit Patel', battery: '81%' },
    { id: '3', plateNumber: 'MH-12-TR-9081', model: 'BYD K9', type: 'Electric Bus', status: 'maintenance', driver: 'N/A', battery: '14%' },
    { id: '4', plateNumber: 'MH-12-YT-2345', model: 'Eicher Pro 2049', type: 'Electric Light Truck', status: 'offline', driver: 'Karan Malhotra', battery: '0%' },
    { id: '5', plateNumber: 'MH-14-GP-5511', model: 'Volvo Electric Bus', type: 'Electric Bus', status: 'active', driver: 'Suresh Kumar', battery: '76%' },
]

export function VehiclesPage() {
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'maintenance' | 'offline'>('all')

    const filteredVehicles = mockVehicles.filter((vehicle) => {
        const matchesSearch =
            vehicle.plateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vehicle.driver.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesStatus = statusFilter === 'all' || vehicle.status === statusFilter

        return matchesSearch && matchesStatus
    })

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

    const totals = {
        all: mockVehicles.length,
        active: mockVehicles.filter(v => v.status === 'active').length,
        maintenance: mockVehicles.filter(v => v.status === 'maintenance').length,
        offline: mockVehicles.filter(v => v.status === 'offline').length,
    }

    return (
        <div className="space-y-6 pb-20 lg:pb-0">
            <PageHeader
                title="Vehicles"
                description="Monitor and manage your transit fleet"
                action={
                    <Button className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Add Vehicle
                    </Button>
                }
            />

            {/* Summary Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Card>
                    <CardContent className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                            <ShieldCheck className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium">Active Vehicles</p>
                            <p className="text-2xl font-bold text-slate-900">{totals.active} / {totals.all}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                            <Wrench className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium">In Maintenance</p>
                            <p className="text-2xl font-bold text-slate-900">{totals.maintenance}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
                            <AlertCircle className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium">Offline</p>
                            <p className="text-2xl font-bold text-slate-900">{totals.offline}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters & Content */}
            <Card>
                <CardContent className="p-0">
                    <div className="flex flex-col gap-4 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search plate, model or driver..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="h-10 w-full rounded-lg border border-slate-200 pl-9 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                            />
                        </div>
                        <div className="flex gap-2">
                            {(['all', 'active', 'maintenance', 'offline'] as const).map((status) => (
                                <Button
                                    key={status}
                                    variant={statusFilter === status ? 'primary' : 'secondary'}
                                    size="sm"
                                    onClick={() => setStatusFilter(status)}
                                    className="capitalize"
                                >
                                    {status}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-left text-sm">
                            <thead>
                                <tr className="border-b border-slate-100 bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    <th className="px-6 py-4">Vehicle Detail</th>
                                    <th className="px-6 py-4">Type</th>
                                    <th className="px-6 py-4">Active Driver</th>
                                    <th className="px-6 py-4">Battery / Fuel</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredVehicles.length > 0 ? (
                                    filteredVehicles.map((vehicle) => (
                                        <tr key={vehicle.id} className="hover:bg-slate-50/50">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                                        <Truck className="h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-slate-900">{vehicle.plateNumber}</div>
                                                        <div className="text-xs text-slate-500">{vehicle.model}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-slate-600 font-medium">{vehicle.type}</td>
                                            <td className="px-6 py-4 text-slate-600">{vehicle.driver}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-2 w-12 rounded-full bg-slate-100 overflow-hidden">
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
                                                    <span className="text-xs font-medium text-slate-700">{vehicle.battery}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">{getStatusBadge(vehicle.status)}</td>
                                            <td className="px-6 py-4 text-right">
                                                <Button variant="ghost" size="sm">
                                                    Edit
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                                            No vehicles found matching the filters
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
