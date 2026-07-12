import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Truck, Users, FileText, LogOut, Bus } from 'lucide-react'
import { ROUTES } from '@/constants/routes'
import { cn } from '@/utils/cn'

const navItems = [
  { to: ROUTES.HOME, label: 'Dashboard', icon: LayoutDashboard },
  { to: ROUTES.VEHICLES, label: 'Vehicles', icon: Truck },
  { to: ROUTES.DRIVERS, label: 'Drivers', icon: Users },
  { to: ROUTES.REPORTS, label: 'Reports', icon: FileText },
]

type SidebarProps = {
  onNavigate?: () => void
}

export function Sidebar({ onNavigate }: SidebarProps) {
  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex h-16 items-center gap-2 border-b border-slate-200 px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
          <Bus className="h-4 w-4" />
        </div>
        <span className="text-lg font-semibold text-slate-900">TransitOps</span>
      </div>

      <div className="flex flex-1 flex-col justify-between p-4">
        <nav className="space-y-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === ROUTES.HOME}
              onClick={onNavigate}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
                )
              }
            >
              <Icon className="h-5 w-5" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-slate-100 pt-4">
          <NavLink
            to={ROUTES.LOGOUT}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-red-50 text-red-700'
                  : 'text-slate-600 hover:bg-red-50 hover:text-red-600',
              )
            }
          >
            <LogOut className="h-5 w-5" />
            Logout
          </NavLink>
        </div>
      </div>
    </div>
  )
}

