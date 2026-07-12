export type VehicleType = 'Electric Bus' | 'Electric Truck' | 'Electric Light Truck'
export type VehicleStatus = 'active' | 'maintenance' | 'offline' | 'available'

export type Vehicle = {
  id: string
  plateNumber: string
  model: string
  type: VehicleType
  capacity: number
  status: VehicleStatus
  driver: string
  battery: string
}

export type DriverStatus = 'active' | 'inactive' | 'on_break'

export type Driver = {
  id: string
  name: string
  licenseNumber: string
  licenseExpiry: string
  status: DriverStatus
  vehicleAssigned: string
  rating: number
  phoneNumber: string
}

export type ReportCategory = 'vehicle' | 'trip' | 'fuel'
export type ReportStatus = 'ready' | 'generating' | 'failed'

export type ReportItem = {
  id: string
  name: string
  category: ReportCategory
  createdDate: string
  size: string
  status: ReportStatus
}

export type RecentTrip = {
  id: string
  vehicle: string
  driver: string
  startLocation: string
  endLocation: string
  status: 'Completed' | 'In Transit' | 'Delayed'
  departure: string
}

export type DashboardStats = {
  activeVehicles: number
  availableVehicles: number
  vehiclesInMaintenance: number
  activeTrips: number
  driversOnDuty: number
  fleetUtilization: number
  vehicleStatusChart: {
    active: number
    available: number
    maintenance: number
    offline: number
  }
  tripStatusChart: {
    labels: string[]
    completed: number[]
    delayed: number[]
  }
  recentTrips: RecentTrip[]
}
