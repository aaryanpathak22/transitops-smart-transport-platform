export type UserRole = 'admin' | 'operator' | 'viewer'

export type User = {
  id: string
  name: string
  email: string
  role: UserRole
  status: 'active' | 'inactive'
  createdAt: string
}

export type DashboardStats = {
  totalVehicles: number
  activeRoutes: number
  onTimeRate: number
  alerts: number
}
