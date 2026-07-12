import { Outlet } from 'react-router-dom'
import { Sidebar } from './components/Sidebar'
import { Header } from './components/Header'
import { MobileNav } from './components/MobileNav'
import { useSidebar } from '@/hooks/useSidebar'

export function DashboardLayout() {
  const { isOpen, close, toggle } = useSidebar()

  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white lg:block">
        <Sidebar />
      </aside>

      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            aria-label="Close sidebar"
            className="absolute inset-0 bg-slate-900/40"
            onClick={close}
          />
          <aside className="relative z-50 h-full w-64 border-r border-slate-200 bg-white shadow-xl">
            <Sidebar onNavigate={close} />
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <Header onMenuClick={toggle} />
        <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

      <MobileNav />
    </div>
  )
}
