const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''

export const apiService = {
  async get<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`)
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }
      return (await response.json()) as T
    } catch (error) {
      console.error('API fetch error:', error)
      throw error
    }
  },

  async post<BP, Rs>(endpoint: string, formData: BP): Promise<Rs> {
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

      return (await response.json()) as Rs
    } catch (error) {
      console.error('Form submission error:', error)
      throw error
    }
  },

  async submitMembershipRequest(data: MembershipRequest): Promise<MembershipRequest> {
    const response = await fetch('/api/members/membership-request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error('Failed to submit membership request')
    }

    const result = await response.json()
  },
}
