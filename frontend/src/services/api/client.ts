import type { ApiError } from '@/types/api'

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api'

export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  })

  if (!response.ok) {
    const error: ApiError = {
      message: `Request failed with status ${response.status}`,
      status: response.status,
    }
    throw error
  }

  return response.json() as Promise<T>
}
