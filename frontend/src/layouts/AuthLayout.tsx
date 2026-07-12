import { Outlet } from 'react-router-dom'
import { Bus } from 'lucide-react'

export function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center gap-2 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
            <Bus className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">TransitOps</h1>
          <p className="text-sm text-slate-500">Smart Transport Operations Platform</p>
        </div>
        <Outlet />
      </div>
    </div>
  )
}
