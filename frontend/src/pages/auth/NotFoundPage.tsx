import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { ROUTES } from '@/constants/routes'

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50 p-4 text-center">
      <h1 className="text-6xl font-bold text-slate-900">404</h1>
      <p className="text-lg text-slate-600">Page not found</p>
      <Link to={ROUTES.HOME}>
        <Button>Back to Dashboard</Button>
      </Link>
    </div>
  )
}
