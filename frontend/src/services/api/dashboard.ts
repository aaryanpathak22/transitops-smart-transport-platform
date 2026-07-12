import type { DashboardStats } from '@/types/user'

export const dashboardService = {
  getStats: async (): Promise<DashboardStats> => {
    await delay(350)
    return {
      totalVehicles: 128,
      activeRoutes: 42,
      onTimeRate: 94,
      alerts: 7,
    }
  },
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
