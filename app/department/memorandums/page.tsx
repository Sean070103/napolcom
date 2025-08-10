"use client"

import { useAuth } from "@/lib/auth-context"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { AppLayout } from "@/components/layout/app-layout"
import { MemorandumList } from "@/components/department/memorandum-list"

export default function MemorandumsPage() {
  const { user } = useAuth()
  
  // In a real app, you would get these from authentication context
  const currentEmployeeId = user?.id || "EMP001"
  const departmentName = "Human Resources"

  return (
    <ProtectedRoute requiredRoles={['user', 'admin', 'super_admin']}>
      <AppLayout userRole={user?.role}>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Memorandums</h1>
            <p className="text-gray-600 mt-2">
              {user?.role === 'user' ? 'View official communications and memorandums' : 'Manage and send official communications'}
            </p>
          </div>
          
          <MemorandumList 
            currentEmployeeId={currentEmployeeId}
            departmentName={departmentName}
            userRole={user?.role}
          />
        </div>
      </AppLayout>
    </ProtectedRoute>
  )
} 