import type { User } from '@/types/user'

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    email: 'priya@transitops.io',
    role: 'admin',
    status: 'active',
    createdAt: '2026-01-15',
  },
  {
    id: '2',
    name: 'Rahul Mehta',
    email: 'rahul@transitops.io',
    role: 'operator',
    status: 'active',
    createdAt: '2026-02-03',
  },
  {
    id: '3',
    name: 'Anita Desai',
    email: 'anita@transitops.io',
    role: 'viewer',
    status: 'inactive',
    createdAt: '2026-03-10',
  },
]

export const usersService = {
  getAll: async (): Promise<User[]> => {
    await delay(400)
    return mockUsers
  },

  getById: async (id: string): Promise<User> => {
    await delay(300)
    const user = mockUsers.find((u) => u.id === id)
    if (!user) throw new Error('User not found')
    return user
  },
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
