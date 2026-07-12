import { toast } from 'react-hot-toast'
import type { ToastOptions } from 'react-hot-toast'

const defaultOptions: ToastOptions = {
    duration: 4000,
    style: {
        fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
        borderRadius: '12px',
        background: '#ffffff',
        color: '#1e293b',
        border: '1px solid #e2e8f0',
        fontWeight: '505',
        fontSize: '14px',
        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.05), 0 4px 6px -4px rgb(0 0 0 / 0.05)',
    },
}

export const showToast = {
    success: (message: string, options?: ToastOptions) => {
        return toast.success(message, { ...defaultOptions, ...options })
    },
    error: (message: string, options?: ToastOptions) => {
        return toast.error(message, { ...defaultOptions, ...options })
    },
    warning: (message: string, options?: ToastOptions) => {
        return toast(message, {
            ...defaultOptions,
            icon: '⚠️',
            style: {
                ...defaultOptions.style,
                borderLeft: '4px solid #f59e0b',
                background: '#fffbeb',
                color: '#78350f',
            },
            ...options,
        })
    },
    info: (message: string, options?: ToastOptions) => {
        return toast(message, {
            ...defaultOptions,
            icon: 'ℹ️',
            style: {
                ...defaultOptions.style,
                borderLeft: '4px solid #3b82f6',
                background: '#eff6ff',
                color: '#1e3a8a',
            },
            ...options,
        })
    },
    loading: (message: string, options?: ToastOptions) => {
        return toast.loading(message, { ...defaultOptions, ...options })
    },
    dismiss: (id?: string) => {
        toast.dismiss(id)
    },
    promise: <T>(
        promise: Promise<T>,
        msgs: { loading: string; success: string; error: string },
        options?: ToastOptions
    ) => {
        return toast.promise(
            promise,
            {
                loading: msgs.loading,
                success: msgs.success,
                error: msgs.error,
            },
            { ...defaultOptions, ...options }
        )
    },
}
