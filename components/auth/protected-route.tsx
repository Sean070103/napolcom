"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, ReactNode } from "react"

interface ProtectedRouteProps {
  children: ReactNode
  requiredRoles?: string[]
  redirectTo?: string
}

export function ProtectedRoute({ 
  children, 
  requiredRoles = [], 
  redirectTo = "/login" 
}: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push(redirectTo)
        return
      }

      // Check role requirements if specified
      if (requiredRoles.length > 0 && user) {
        const hasRequiredRole = requiredRoles.includes(user.role)
        if (!hasRequiredRole) {
          router.push("/dashboard")
          return
        }
      }
    }
  }, [isAuthenticated, isLoading, user, requiredRoles, redirectTo, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  // Check role requirements
  if (requiredRoles.length > 0 && user && !requiredRoles.includes(user.role)) {
    return null
  }

  return <>{children}</>
}

