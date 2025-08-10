"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { useAuth } from "@/lib/auth-context"
import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  User, 
  Mail, 
  Calendar, 
  Shield, 
  Save,
  Edit,
  Key,
  Bell,
  Settings,
  Activity,
  Award,
  CheckCircle
} from "lucide-react"
import { useState } from "react"

function UserProfileContent() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    username: user?.username || ""
  })

  const handleSave = () => {
    // In a real app, this would update the user data
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData({
      fullName: user?.fullName || "",
      email: user?.email || "",
      username: user?.username || ""
    })
    setIsEditing(false)
  }

  return (
    <AppLayout userRole="user">
      <div className="space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-xl p-8 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">My Profile</h1>
              <p className="text-blue-100 text-lg">Manage your account information and preferences.</p>
            </div>
            <div className="h-16 w-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <User className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="card-hover border-0 shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center space-x-2 text-xl">
                      <User className="h-6 w-6 text-blue-600" />
                      <span>Personal Information</span>
                    </CardTitle>
                    <CardDescription className="text-base">
                      Update your personal details and contact information
                    </CardDescription>
                  </div>
                  {!isEditing && (
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">Full Name</Label>
                    {isEditing ? (
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                        className="h-11"
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-lg border">
                        <p className="text-sm font-medium text-gray-900">{user!.fullName}</p>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="h-11"
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-lg border">
                        <p className="text-sm font-medium text-gray-900">{user!.email}</p>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-sm font-medium text-gray-700">Username</Label>
                    {isEditing ? (
                      <Input
                        id="username"
                        value={formData.username}
                        onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                        className="h-11"
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-lg border">
                        <p className="text-sm font-medium text-gray-900">{user!.username}</p>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Account Status</Label>
                    <div className="p-3 bg-gray-50 rounded-lg border">
                      <Badge variant={user!.isActive ? "default" : "secondary"} className="flex items-center space-x-1">
                        <CheckCircle className="h-3 w-3" />
                        <span>{user!.isActive ? "Active" : "Inactive"}</span>
                      </Badge>
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <div className="flex space-x-3 pt-4">
                    <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Account Security */}
            <Card className="card-hover border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-xl">
                  <Shield className="h-6 w-6 text-green-600" />
                  <span>Account Security</span>
                </CardTitle>
                <CardDescription className="text-base">
                  Manage your password and security settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Key className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Password</p>
                        <p className="text-sm text-gray-600">Last changed: 3 months ago</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Change Password
                    </Button>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Shield className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                        <p className="text-sm text-gray-600">Add an extra layer of security</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Enable 2FA
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Account Summary */}
          <div className="space-y-6">
            <Card className="card-hover border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-xl">
                  <Award className="h-6 w-6 text-purple-600" />
                  <span>Account Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Member Since</span>
                  <span className="text-sm font-medium text-gray-900">
                    {user!.createdAt ? new Date(user!.createdAt).toLocaleDateString() : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Last Login</span>
                  <span className="text-sm font-medium text-gray-900">
                    {user!.lastLoginAt ? new Date(user!.lastLoginAt).toLocaleDateString() : "Never"}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Account Type</span>
                  <Badge variant="secondary" className="flex items-center space-x-1">
                    <User className="h-3 w-3" />
                    <span>User</span>
                  </Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Status</span>
                  <Badge variant={user!.isActive ? "default" : "secondary"} className="flex items-center space-x-1">
                    <CheckCircle className="h-3 w-3" />
                    <span>{user!.isActive ? "Active" : "Inactive"}</span>
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="card-hover border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-xl">
                  <Settings className="h-6 w-6 text-orange-600" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start h-12">
                  <Mail className="h-4 w-4 mr-3" />
                  Update Email Preferences
                </Button>
                <Button variant="outline" className="w-full justify-start h-12">
                  <Shield className="h-4 w-4 mr-3" />
                  Privacy Settings
                </Button>
                <Button variant="outline" className="w-full justify-start h-12">
                  <Activity className="h-4 w-4 mr-3" />
                  View Activity Log
                </Button>
                <Button variant="outline" className="w-full justify-start h-12">
                  <Bell className="h-4 w-4 mr-3" />
                  Notification Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default function UserProfilePage() {
  return (
    <ProtectedRoute requiredRoles={['user']}>
      <UserProfileContent />
    </ProtectedRoute>
  )
}
