import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Truck, Users, FileText } from 'lucide-react'
import { ROUTES } from '@/constants/routes'
import { cn } from '@/utils/cn'

const navItems = [
  { to: ROUTES.HOME, label: 'Dashboard', icon: LayoutDashboard },
  { to: ROUTES.VEHICLES, label: 'Vehicles', icon: Truck },
  { to: ROUTES.DRIVERS, label: 'Drivers', icon: Users },
  { to: ROUTES.REPORTS, label: 'Reports', icon: FileText },
]

type MobileNavProps = {
  className?: string
}

export function MobileNav({ className }: MobileNavProps) {
  return (
    <nav
      className={cn(
        'fixed bottom-0 left-0 right-0 z-30 flex items-center justify-around border-t border-slate-100 bg-white/95 backdrop-blur-md px-2 py-2 lg:hidden shadow-[0_-4px_20px_rgba(148,163,184,0.06)]',
        className,
      )}
    >
      {navItems.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === ROUTES.HOME}
          className={({ isActive }) =>
            cn(
              'flex flex-col items-center gap-0.5 rounded-xl px-3 py-1 text-xs font-bold transition-all duration-200',
              isActive ? 'text-blue-600 scale-[1.03]' : 'text-slate-400 hover:text-slate-600',
            )
          }
        >
          <Icon className="h-5 w-5" />
          <span className="text-[10px]">{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}

