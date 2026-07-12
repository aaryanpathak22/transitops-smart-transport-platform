import { Bell, Menu, Search } from 'lucide-react'

type HeaderProps = {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-100 bg-white/80 backdrop-blur-md px-4 md:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-xl p-2 text-slate-600 hover:bg-slate-50 lg:hidden transition-colors"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="relative hidden sm:block">
          <Search className="absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="Search assets, records, operators..."
            className="h-9 w-64 rounded-xl border border-slate-100 bg-slate-50 pl-10 pr-3.5 text-xs font-semibold text-slate-600 placeholder-slate-400 outline-none transition-all duration-205 focus:border-blue-500/80 focus:bg-white focus:ring-2 focus:ring-blue-500/5"
          />
        </div>
      </div>

      <div className="flex items-center gap-4.5">
        <button
          type="button"
          className="relative rounded-xl p-2 text-slate-500 hover:bg-slate-55 hover:text-slate-700 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-red-500 ring-2 ring-white animate-pulse" />
        </button>

        <div className="flex items-center gap-2.5 border border-slate-100 rounded-xl p-1 bg-slate-50/40">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 text-[10px] font-bold text-white shadow-sm shadow-blue-500/10">
            PS
          </div>
          <span className="hidden text-xs font-bold text-slate-700 md:block pr-2 select-none">
            Priya Sharma
          </span>
        </div>
      </div>
    </header>
  )
}
