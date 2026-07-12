import axios, { AxiosError } from 'axios'
import type { ApiError } from '@/types/api'

const BASE_URL =
  import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000"
export const axiosClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

// Request Interceptor: Attach JWT authorization token
axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Response Interceptor: Global Error handler
axiosClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        const apiError: ApiError = {
            message: 'An unexpected connection error occurred.',
            status: 500,
        }

        if (error.response) {
            const data = error.response.data as any
            apiError.message = data?.message || error.response.statusText || apiError.message
            apiError.status = error.response.status

            // JWT Expiration: Clear local credentials if session drops with 401
            if (error.response.status === 401) {
                localStorage.removeItem('token')
            }
        } else if (error.request) {
            apiError.message = 'No reply received from server. Verify connection.'
            apiError.status = 0
        } else {
            apiError.message = error.message
        }

        return Promise.reject(apiError)
    }
)
