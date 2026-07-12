import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Spinner } from '@/components/feedback/Spinner'
import { ROUTES } from '@/constants/routes'

export function LogoutPage() {
    const navigate = useNavigate()

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate(ROUTES.LOGIN)
        }, 1500)

        return () => clearTimeout(timer)
    }, [navigate])

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
            <Card className="w-full max-w-md text-center">
                <CardContent className="space-y-6 py-10">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-600 animate-pulse">
                        <LogOut className="h-8 w-8" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-slate-800">Signing Out...</h2>
                        <p className="text-slate-500 text-sm">
                            Clearing session data and disconnecting operations.
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <Spinner />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
