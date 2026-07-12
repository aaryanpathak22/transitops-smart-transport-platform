import { useState } from 'react'
import { Plus, Search, User, ShieldAlert, Star, ShieldCheck } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

type Driver = {
    id: string
    name: string
    licenseNumber: string
    status: 'active' | 'inactive' | 'on_break'
    vehicleAssigned: string
    rating: number
    phoneNumber: string
}

const mockDrivers: Driver[] = [
    { id: '1', name: 'Rohan Sharma', licenseNumber: 'DL-142019008272', status: 'active', vehicleAssigned: 'MH-12-QX-4029', rating: 4.9, phoneNumber: '+91 98765 43210' },
    { id: '2', name: 'Amit Patel', licenseNumber: 'DL-122018991201', status: 'active', vehicleAssigned: 'MH-14-EU-8812', rating: 4.8, phoneNumber: '+91 98765 43211' },
    { id: '3', name: 'Suresh Kumar', licenseNumber: 'DL-092020229873', status: 'active', vehicleAssigned: 'MH-14-GP-5511', rating: 4.7, phoneNumber: '+91 98765 43212' },
    { id: '4', name: 'Karan Malhotra', licenseNumber: 'DL-202015091811', status: 'on_break', vehicleAssigned: 'MH-12-YT-2345', rating: 4.5, phoneNumber: '+91 98765 43213' },
    { id: '5', name: 'Vikram Singh', licenseNumber: 'DL-032014022131', status: 'inactive', vehicleAssigned: 'N/A', rating: 4.2, phoneNumber: '+91 98765 43214' },
]

export function DriversPage() {
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'on_break'>('all')

    const filteredDrivers = mockDrivers.filter((driver) => {
        const matchesSearch =
            driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            driver.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            driver.vehicleAssigned.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesStatus = statusFilter === 'all' || driver.status === statusFilter

        return matchesSearch && matchesStatus
    })

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

    const totals = {
        all: mockDrivers.length,
        active: mockDrivers.filter(d => d.status === 'active').length,
        onBreak: mockDrivers.filter(d => d.status === 'on_break').length,
        inactive: mockDrivers.filter(d => d.status === 'inactive').length,
    }

    return (
        <div className="space-y-6 pb-20 lg:pb-0">
            <PageHeader
                title="Drivers"
                description="Manage driver personnel, licensing, and assignments"
                action={
                    <Button className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Add Driver
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
                            <p className="text-sm text-slate-500 font-medium">On Duty</p>
                            <p className="text-2xl font-bold text-slate-900">{totals.active} / {totals.all}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                            <Star className="h-6 w-6 fill-amber-400 text-amber-500" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium">Avg Fleet Rating</p>
                            <p className="text-2xl font-bold text-slate-900">4.7 / 5.0</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
                            <ShieldAlert className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium">On Leave / Inactive</p>
                            <p className="text-2xl font-bold text-slate-900">{totals.inactive}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filter and Table */}
            <Card>
                <CardContent className="p-0">
                    <div className="flex flex-col gap-4 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search driver name, license..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="h-10 w-full rounded-lg border border-slate-200 pl-9 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                            />
                        </div>
                        <div className="flex gap-2">
                            {(['all', 'active', 'on_break', 'inactive'] as const).map((status) => (
                                <Button
                                    key={status}
                                    variant={statusFilter === status ? 'primary' : 'secondary'}
                                    size="sm"
                                    onClick={() => setStatusFilter(status)}
                                    className="capitalize"
                                >
                                    {status === 'on_break' ? 'On Break' : status}
                                </Button>
                            ))}
                        </div>
                    </div>

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
                                {filteredDrivers.length > 0 ? (
                                    filteredDrivers.map((driver) => (
                                        <tr key={driver.id} className="hover:bg-slate-50/50">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                                                        <User className="h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-slate-900">{driver.name}</div>
                                                        <div className="text-xs text-slate-500">ID: DRV00{driver.id}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-slate-600 font-mono text-xs">{driver.licenseNumber}</td>
                                            <td className="px-6 py-4 text-slate-600">{driver.phoneNumber}</td>
                                            <td className="px-6 py-4 font-semibold text-slate-700">{driver.vehicleAssigned}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-1">
                                                    <Star className="h-4 w-4 fill-amber-400 text-amber-500" />
                                                    <span className="font-medium text-slate-700">{driver.rating}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">{getStatusBadge(driver.status)}</td>
                                            <td className="px-6 py-4 text-right">
                                                <Button variant="ghost" size="sm">
                                                    Edit
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                                            No drivers found matching the filters
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
