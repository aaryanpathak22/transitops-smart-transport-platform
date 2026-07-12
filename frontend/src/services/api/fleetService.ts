import { axiosClient } from './axiosClient'
import {
  mockDashboardStats,
  mockVehicles,
  mockDrivers,
  mockReports,
} from './mockFleetData'

import type {
  DashboardStats,
  Vehicle,
  Driver,
  ReportItem,
} from '@/types/schema'

async function fetchWithFallback<T>(
  request: () => Promise<T>,
  fallback: T,
): Promise<T> {
  try {
    return await request()
  } catch (error) {
    console.error(error)
    return fallback
  }
}

export const fleetService = {
  getDashboardStats: () =>
    fetchWithFallback(
      async () => {
        const response = await axiosClient.get<DashboardStats>('/dashboard/')
        return response.data
      },
      mockDashboardStats,
    ),

  getVehicles: () =>
    fetchWithFallback(
      async () => {
        const response = await axiosClient.get('/vehicles/')

        return response.data.map((vehicle: any) => ({
          id: vehicle.id.toString(),
          plateNumber: vehicle.registration_number,
          model: vehicle.vehicle_type,
          type: vehicle.vehicle_type,
          capacity: vehicle.cargo_capacity,

          status:
            vehicle.status === 'AVAILABLE'
              ? 'available'
              : vehicle.status === 'MAINTENANCE'
              ? 'maintenance'
              : 'active',

          driver: 'Not Assigned',
          battery: 'N/A',
        }))
      },
      mockVehicles,
    ),

  getDrivers: () =>
    fetchWithFallback(
      async () => {
        const response = await axiosClient.get<Driver[]>('/drivers/')
        return response.data
      },
      mockDrivers,
    ),

  getReports: () =>
    fetchWithFallback(
      async () => {
        const response = await axiosClient.get<ReportItem[]>('/reports/')
        return response.data
      },
      mockReports,
    ),
}