"use client"

import { useAuth } from "@/lib/auth-context"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { AppLayout } from "@/components/layout/app-layout"
import { AccountCreation } from "@/components/auth/account-creation"

export default function AccountCreationPage() {
  const { user } = useAuth()

  return (
    <ProtectedRoute allowedRoles={['admin', 'super_admin']}>
      <AppLayout userRole={user?.role}>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Account Creation</h1>
            <p className="text-gray-600 mt-2">
              Create new user accounts for the NAPOLCOM system
            </p>
          </div>
          
          <AccountCreation />
        </div>
      </AppLayout>
    </ProtectedRoute>
  )
}

