import { Loader2 } from 'lucide-react'

type SpinnerProps = {
  className?: string
}

export function Spinner({ className }: SpinnerProps) {
  return (
    <div className="flex items-center justify-center py-12">
      <Loader2 className={`h-8 w-8 animate-spin text-blue-600 ${className ?? ''}`} />
    </div>
  )
}
