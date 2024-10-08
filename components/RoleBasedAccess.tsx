import { ReactNode } from 'react'
import { useUser } from '@/hooks/useUser'

interface RoleBasedAccessProps {
  children: ReactNode
  allowedRoles: string[]
}

export function RoleBasedAccess({ children, allowedRoles }: RoleBasedAccessProps) {
  const { user } = useUser()

  if (!user || !allowedRoles.includes(user.role)) {
    return null
  }

  return <>{children}</>
}