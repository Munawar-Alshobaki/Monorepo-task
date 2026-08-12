export interface User {
  id: number
  name: string
  email: string
  created_at: string
  updated_at: string
}

const API_BASE_URL = import.meta.env.VITE_API_URL ?? '/api'

export async function fetchUsers(): Promise<User[]> {
  const response = await fetch(`${API_BASE_URL}/users`, {
    headers: { Accept: 'application/json' },
  })

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText}`)
  }

  return (await response.json()) as User[]
}
