import { createBrowserRouter } from 'react-router-dom'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import { AuthLayout } from '@/layouts/AuthLayout'
import { DashboardPage } from '@/pages/dashboard/DashboardPage'
import { VehiclesPage } from '@/pages/vehicles/VehiclesPage'
import { DriversPage } from '@/pages/drivers/DriversPage'
import { ReportsPage } from '@/pages/reports/ReportsPage'
import { LoginPage } from '@/pages/auth/LoginPage'
import { LogoutPage } from '@/pages/auth/LogoutPage'
import { NotFoundPage } from '@/pages/auth/NotFoundPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'vehicles', element: <VehiclesPage /> },
      { path: 'drivers', element: <DriversPage /> },
      { path: 'reports', element: <ReportsPage /> },
    ],
  },
  {
    path: '/login',
    element: <AuthLayout />,
    children: [{ index: true, element: <LoginPage /> }],
  },
  {
    path: '/logout',
    element: <LogoutPage />,
  },
  { path: '*', element: <NotFoundPage /> },
])

