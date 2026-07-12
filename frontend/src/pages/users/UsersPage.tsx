import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Button } from '@/components/ui/Button'
import { DataTable } from '@/components/data/DataTable'
import { Spinner } from '@/components/feedback/Spinner'
import { ErrorState } from '@/components/feedback/ErrorState'
import { usersService } from '@/services/api/users'

export function UsersPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: usersService.getAll,
  })

  if (isLoading) return <Spinner />
  if (error) return <ErrorState message="Failed to load users" />

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <PageHeader
        title="Users"
        description="Manage platform users and roles"
        action={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        }
      />
      <DataTable data={data ?? []} />
    </div>
  )
}
