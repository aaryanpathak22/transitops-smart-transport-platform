import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Settings, Users } from 'lucide-react'
import { ROUTES } from '@/constants/routes'
import { cn } from '@/utils/cn'

const navItems = [
  { to: ROUTES.HOME, label: 'Home', icon: LayoutDashboard },
  { to: ROUTES.USERS, label: 'Users', icon: Users },
  { to: ROUTES.SETTINGS, label: 'Settings', icon: Settings },
]

type MobileNavProps = {
  className?: string
}

export function MobileNav({ className }: MobileNavProps) {
  return (
    <nav
      className={cn(
        'fixed bottom-0 left-0 right-0 z-30 flex items-center justify-around border-t border-slate-200 bg-white px-2 py-2',
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
              'flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 text-xs font-medium',
              isActive ? 'text-blue-600' : 'text-slate-500',
            )
          }
        >
          <Icon className="h-5 w-5" />
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
