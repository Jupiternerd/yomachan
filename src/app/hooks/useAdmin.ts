import { useSession } from 'next-auth/react'

export function useAdmin() {
  const { data: session } = useSession()
  return session?.user?.isAdmin || false
}