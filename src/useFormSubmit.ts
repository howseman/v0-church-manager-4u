import { useState } from 'react'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''

export type MembershipRequestSubmissionResponse = {
  message: string
  data: {
    id: string
    createdAt: string
    updatedAt: string
  }
}

interface SubmissionStatus<T> {
  submitting: boolean
  success: boolean
  error: string | null
  data: T | null
}

interface UseFormSubmitReturn<T> {
  submitForm: (formData: Record<string, any>) => Promise<T | void>
  resetStatus: () => void
  isSubmitting: boolean
  isSuccess: boolean
  error: string | null
  data: T | null
}

const initialStatus = {
  submitting: false,
  success: false,
  error: null,
  data: null,
} as const

// Generic type parameter T represents the expected response data type
export function useFormSubmit<T>(endpoint: string): UseFormSubmitReturn<T> {
  const [status, setStatus] = useState<SubmissionStatus<T>>(initialStatus)

  async function submitForm(formData: Record<string, any>): Promise<T | void> {
    setStatus({
      submitting: true,
      success: false,
      error: null,
      data: null,
    })

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const responseData = (await response.json()) as T

      setStatus({
        submitting: false,
        success: true,
        error: null,
        data: responseData,
      })

      return responseData
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'

      setStatus({
        submitting: false,
        success: false,
        error: errorMessage,
        data: null,
      })
      throw error
    }
  }

  function resetStatus(): void {
    setStatus(initialStatus)
  }

  return {
    submitForm,
    resetStatus,
    isSubmitting: status.submitting,
    isSuccess: status.success,
    error: status.error,
    data: status.data,
  }
}
