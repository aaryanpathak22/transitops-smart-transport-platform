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
      <div className="flex h-16 items-center gap-2.5 border-b border-slate-100 px-6 bg-slate-50/30">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-[0_4px_12px_rgba(37,99,235,0.22)]">
          <Bus className="h-4.5 w-4.5" />
        </div>
        <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">TransitOps</span>
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
                  'flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 hover:translate-x-0.5',
                  isActive
                    ? 'bg-blue-50/80 text-blue-600 shadow-[inset_0_0_0_1px_rgba(59,130,246,0.06)]'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800',
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
                'flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 hover:translate-x-0.5',
                isActive
                  ? 'bg-red-50 text-red-650'
                  : 'text-slate-500 hover:bg-red-50/50 hover:text-red-600',
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

