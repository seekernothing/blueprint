import React from 'react'
import { useOutletContext } from 'react-router'

export const useRequireAuth = () => {
  const auth = useOutletContext<AuthContext>()
  return auth
}

export const RequireAuth = ({
  children,
  fallback = null,
}: {
  children: React.ReactNode
  fallback?: React.ReactNode
}) => {
  const { isSignedIn, isLoading } = useRequireAuth()

  if (isLoading) return null

  if (!isSignedIn) return <>{fallback}</>

  return <>{children}</>
}
