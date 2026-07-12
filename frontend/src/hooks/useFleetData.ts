import { useState, useEffect, useCallback } from 'react'
import { fleetService } from '@/services/api/fleetService'
import type { DashboardStats, Vehicle, Driver, ReportItem } from '@/types/schema'
import type { ApiError } from '@/types/api'

// Fallback Mock Datasets for offline standalone operations
const mockDashboardStats: DashboardStats = {
    totalVehicles: 12,
    activeRoutes: 4,
    onTimeRate: 96.8,
    alerts: 14,
}

const mockVehicles: Vehicle[] = [
    { id: '1', plateNumber: 'MH-12-QX-4029', model: 'Volvo 9400 B11R', type: 'Electric Bus', status: 'active', driver: 'Rohan Sharma', battery: '92%' },
    { id: '2', plateNumber: 'MH-14-EU-8812', model: 'TATA Ultra T.7', type: 'Electric Truck', status: 'active', driver: 'Amit Patel', battery: '81%' },
    { id: '3', plateNumber: 'MH-12-TR-9081', model: 'BYD K9', type: 'Electric Bus', status: 'maintenance', driver: 'N/A', battery: '14%' },
    { id: '4', plateNumber: 'MH-12-YT-2345', model: 'Eicher Pro 2049', type: 'Electric Light Truck', status: 'offline', driver: 'Karan Malhotra', battery: '0%' },
    { id: '5', plateNumber: 'MH-14-GP-5511', model: 'Volvo Electric Bus', type: 'Electric Bus', status: 'active', driver: 'Suresh Kumar', battery: '76%' },
]

const mockDrivers: Driver[] = [
    { id: '1', name: 'Rohan Sharma', licenseNumber: 'DL-142019008272', status: 'active', vehicleAssigned: 'MH-12-QX-4029', rating: 4.9, phoneNumber: '+91 98765 43210' },
    { id: '2', name: 'Amit Patel', licenseNumber: 'DL-122018991201', status: 'active', vehicleAssigned: 'MH-14-EU-8812', rating: 4.8, phoneNumber: '+91 98765 43211' },
    { id: '3', name: 'Suresh Kumar', licenseNumber: 'DL-092020229873', status: 'active', vehicleAssigned: 'MH-14-GP-5511', rating: 4.7, phoneNumber: '+91 98765 43212' },
    { id: '4', name: 'Karan Malhotra', licenseNumber: 'DL-202015091811', status: 'on_break', vehicleAssigned: 'MH-12-YT-2345', rating: 4.5, phoneNumber: '+91 98765 43213' },
    { id: '5', name: 'Vikram Singh', licenseNumber: 'DL-032014022131', status: 'inactive', vehicleAssigned: 'N/A', rating: 4.2, phoneNumber: '+91 98765 43214' },
]

const mockReports: ReportItem[] = [
    { id: 'REP-001', name: 'June Fleet Fuel & Battery Efficiency Report', category: 'efficiency', createdDate: '2026-07-01', size: '2.4 MB', status: 'ready' },
    { id: 'REP-002', name: 'Q2 Safety Audit and Harsh Braking Incidents', category: 'safety', createdDate: '2026-06-30', size: '4.1 MB', status: 'ready' },
    { id: 'REP-003', name: 'Preventative Maintenance Logs - June 2026', category: 'maintenance', createdDate: '2026-06-28', size: '1.8 MB', status: 'ready' },
    { id: 'REP-004', name: 'Daily On-Time Dispatch Performance Statistics', category: 'operations', createdDate: '2026-07-11', size: '840 KB', status: 'ready' },
    { id: 'REP-005', name: 'Annual Transit Route Optimization Recommendations', category: 'operations', createdDate: '2026-05-15', size: '12.4 MB', status: 'ready' },
]

// 1. Hook for Dashboard Stats
export function useDashboardData() {
    const [data, setData] = useState<DashboardStats | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<ApiError | null>(null)

    const fetchData = useCallback(async () => {
        setIsLoading(true)
        setError(null)
        try {
            const stats = await fleetService.getDashboardStats()
            setData(stats)
        } catch (err) {
            const apiErr = err as ApiError
            setError(apiErr)
            // Fallback in case of server connection issue (offline mock)
            if (apiErr.status === 0 || apiErr.status === 500) {
                console.warn('Dashboard stats API offline, yielding mock fallback dataset')
                setData(mockDashboardStats)
            }
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return { data, isLoading, error, refetch: fetchData }
}

// 2. Hook for Vehicles
export function useVehiclesData() {
    const [data, setData] = useState<Vehicle[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<ApiError | null>(null)

    const fetchData = useCallback(async () => {
        setIsLoading(true)
        setError(null)
        try {
            const vehicles = await fleetService.getVehicles()
            setData(vehicles)
        } catch (err) {
            const apiErr = err as ApiError
            setError(apiErr)
            if (apiErr.status === 0 || apiErr.status === 500) {
                console.warn('Vehicles registry API offline, yielding mock fallback dataset')
                setData(mockVehicles)
            }
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return { data, setData, isLoading, error, refetch: fetchData }
}

// 3. Hook for Drivers
export function useDriversData() {
    const [data, setData] = useState<Driver[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<ApiError | null>(null)

    const fetchData = useCallback(async () => {
        setIsLoading(true)
        setError(null)
        try {
            const drivers = await fleetService.getDrivers()
            setData(drivers)
        } catch (err) {
            const apiErr = err as ApiError
            setError(apiErr)
            if (apiErr.status === 0 || apiErr.status === 500) {
                console.warn('Drivers registry API offline, yielding mock fallback dataset')
                setData(mockDrivers)
            }
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return { data, setData, isLoading, error, refetch: fetchData }
}

// 4. Hook for Reports
export function useReportsData() {
    const [data, setData] = useState<ReportItem[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<ApiError | null>(null)

    const fetchData = useCallback(async () => {
        setIsLoading(true)
        setError(null)
        try {
            const reports = await fleetService.getReports()
            setData(reports)
        } catch (err) {
            const apiErr = err as ApiError
            setError(apiErr)
            if (apiErr.status === 0 || apiErr.status === 500) {
                console.warn('Reports registry API offline, yielding mock fallback dataset')
                setData(mockReports)
            }
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return { data, setData, isLoading, error, refetch: fetchData }
}
