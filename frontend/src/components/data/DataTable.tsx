import type { User } from '@/types/user'
import { Badge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/feedback/EmptyState'

type DataTableProps = {
  data: User[]
}

const roleVariant = {
  admin: 'danger',
  operator: 'warning',
  viewer: 'default',
} as const

const statusVariant = {
  active: 'success',
  inactive: 'default',
} as const

export function DataTable({ data }: DataTableProps) {
  if (data.length === 0) {
    return <EmptyState title="No users found" description="Add users to get started." />
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="border-b border-slate-200 bg-slate-50">
          <tr>
            <th className="px-4 py-3 font-medium text-slate-600">Name</th>
            <th className="px-4 py-3 font-medium text-slate-600">Email</th>
            <th className="px-4 py-3 font-medium text-slate-600">Role</th>
            <th className="px-4 py-3 font-medium text-slate-600">Status</th>
            <th className="px-4 py-3 font-medium text-slate-600">Joined</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((user) => (
            <tr key={user.id} className="hover:bg-slate-50">
              <td className="px-4 py-3 font-medium text-slate-900">{user.name}</td>
              <td className="px-4 py-3 text-slate-600">{user.email}</td>
              <td className="px-4 py-3">
                <Badge variant={roleVariant[user.role]}>{user.role}</Badge>
              </td>
              <td className="px-4 py-3">
                <Badge variant={statusVariant[user.status]}>{user.status}</Badge>
              </td>
              <td className="px-4 py-3 text-slate-500">{user.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
