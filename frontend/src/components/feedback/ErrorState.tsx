import { AlertCircle } from 'lucide-react'

type ErrorStateProps = {
  message?: string
}

export function ErrorState({ message = 'Something went wrong' }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
      <AlertCircle className="h-8 w-8 text-red-500" />
      <p className="text-sm text-slate-600">{message}</p>
    </div>
  )
}
