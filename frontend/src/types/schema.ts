export type VehicleType = 'Electric Bus' | 'Electric Truck' | 'Electric Light Truck'
export type VehicleStatus = 'active' | 'maintenance' | 'offline'

export type Vehicle = {
    id: string
    plateNumber: string
    model: string
    type: VehicleType
    status: VehicleStatus
    driver: string
    battery: string
}

export type DriverStatus = 'active' | 'inactive' | 'on_break'

export type Driver = {
    id: string
    name: string
    licenseNumber: string
    status: DriverStatus
    vehicleAssigned: string
    rating: number
    phoneNumber: string
}

export type ReportCategory = 'efficiency' | 'safety' | 'maintenance' | 'operations'
export type ReportStatus = 'ready' | 'generating' | 'failed'

export type ReportItem = {
    id: string
    name: string
    category: ReportCategory
    createdDate: string
    size: string
    status: ReportStatus
}

export type DashboardStats = {
    totalVehicles: number
    activeRoutes: number
    onTimeRate: number
    alerts: number
}
