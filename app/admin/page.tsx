"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminDashboard } from "@/components/auth/admin-dashboard"
import { useAuth } from "@/lib/auth-context"

export default function AdminPage() {
  const { user } = useAuth()

  return (
    <ProtectedRoute requiredRoles={['admin', 'super_admin']}>
      <div className="container mx-auto py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <p className="text-gray-600">
            Manage user accounts, roles, and system permissions
          </p>
        </div>
        
        <AdminDashboard currentUser={user!} />
      </div>
    </ProtectedRoute>
  )
}
