import { axiosClient } from './axiosClient'
import {
  mockDashboardStats,
  mockVehicles,
  mockDrivers,
  mockReports,
} from './mockFleetData'
import type { DashboardStats, Vehicle, Driver, ReportItem } from '@/types/schema'

async function fetchWithFallback<T>(request: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await request()
  } catch {
    return fallback
  }
}

export const fleetService = {
  getDashboardStats: () =>
    fetchWithFallback(
      async () => {
        const response = await axiosClient.get<DashboardStats>('/dashboard')
        return response.data
      },
      mockDashboardStats,
    ),

  getVehicles: () =>
    fetchWithFallback(
      async () => {
        const response = await axiosClient.get<Vehicle[]>('/vehicles')
        return response.data
      },
      mockVehicles,
    ),

  getDrivers: () =>
    fetchWithFallback(
      async () => {
        const response = await axiosClient.get<Driver[]>('/drivers')
        return response.data
      },
      mockDrivers,
    ),

  getReports: () =>
    fetchWithFallback(
      async () => {
        const response = await axiosClient.get<ReportItem[]>('/reports')
        return response.data
      },
      mockReports,
    ),
}
