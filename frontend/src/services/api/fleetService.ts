import { axiosClient } from './axiosClient'
import type { DashboardStats, Vehicle, Driver, ReportItem } from '@/types/schema'

export const fleetService = {
    getDashboardStats: async (): Promise<DashboardStats> => {
        const response = await axiosClient.get<DashboardStats>('/dashboard')
        return response.data
    },

    getVehicles: async (): Promise<Vehicle[]> => {
        const response = await axiosClient.get<Vehicle[]>('/vehicles')
        return response.data
    },

    getDrivers: async (): Promise<Driver[]> => {
        const response = await axiosClient.get<Driver[]>('/drivers')
        return response.data
    },

    getReports: async (): Promise<ReportItem[]> => {
        const response = await axiosClient.get<ReportItem[]>('/reports')
        return response.data
    },
}
