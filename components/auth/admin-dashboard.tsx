"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { dataStore } from "@/lib/data-store"
import { User } from "@/lib/data-store"
import { AccountCreation } from "./account-creation"
import { UserManagement } from "./user-management"
import { 
  Shield, 
  Users, 
  UserPlus, 
  Settings, 
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp
} from "lucide-react"

interface AdminDashboardProps {
  currentUser?: User
}

export function AdminDashboard({ currentUser }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")

  // Check permissions
  const isSuperAdmin = currentUser?.role === "super_admin"
  const isAdmin = currentUser?.role === "admin" || isSuperAdmin
  const canAccessAdmin = isAdmin

  // Get statistics
  const users = dataStore.getUsers()
  const totalUsers = users.length
  const activeUsers = users.filter(u => u.isActive).length
  const inactiveUsers = totalUsers - activeUsers
  const superAdmins = users.filter(u => u.role === "super_admin").length
  const admins = users.filter(u => u.role === "admin").length
  const regularUsers = users.filter(u => u.role === "user").length

  const recentLogs = dataStore.getAccountCreationLogs().slice(0, 5)

  if (!canAccessAdmin) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Access Denied
          </CardTitle>
          <CardDescription>
            You do not have permission to access the admin dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Shield className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Admin Access Required</h3>
            <p className="text-gray-500">
              Only Super Administrators and Administrators can access this dashboard.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Admin Dashboard
          </CardTitle>
          <CardDescription>
            Manage user accounts, roles, and system permissions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="create" className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                Create Account
              </TabsTrigger>
              <TabsTrigger value="manage" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Manage Users
              </TabsTrigger>
              {isSuperAdmin && (
                <TabsTrigger value="settings" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Users</p>
                        <p className="text-2xl font-bold">{totalUsers}</p>
                      </div>
                      <Users className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Active Users</p>
                        <p className="text-2xl font-bold text-green-600">{activeUsers}</p>
                      </div>
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Inactive Users</p>
                        <p className="text-2xl font-bold text-orange-600">{inactiveUsers}</p>
                      </div>
                      <AlertTriangle className="h-8 w-8 text-orange-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Recent Activity</p>
                        <p className="text-2xl font-bold">{recentLogs.length}</p>
                      </div>
                      <Clock className="h-8 w-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Role Distribution */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Role Distribution</CardTitle>
                    <CardDescription>
                      Breakdown of users by role
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="destructive">Super Admin</Badge>
                          <span className="text-sm text-gray-600">{superAdmins} users</span>
                        </div>
                        <span className="text-sm font-medium">
                          {totalUsers > 0 ? ((superAdmins / totalUsers) * 100).toFixed(1) : 0}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="default">Admin</Badge>
                          <span className="text-sm text-gray-600">{admins} users</span>
                        </div>
                        <span className="text-sm font-medium">
                          {totalUsers > 0 ? ((admins / totalUsers) * 100).toFixed(1) : 0}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">User</Badge>
                          <span className="text-sm text-gray-600">{regularUsers} users</span>
                        </div>
                        <span className="text-sm font-medium">
                          {totalUsers > 0 ? ((regularUsers / totalUsers) * 100).toFixed(1) : 0}%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Account Creations</CardTitle>
                    <CardDescription>
                      Latest account creation activity
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {recentLogs.length === 0 ? (
                      <div className="text-center py-4 text-gray-500">
                        No recent account creations
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {recentLogs.map((log) => (
                          <div key={log.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <div className="font-medium">{log.createdUserName}</div>
                              <div className="text-sm text-gray-500">
                                Created by {log.createdByUserName}
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge variant="secondary" className="capitalize">
                                {log.role.replace("_", " ")}
                              </Badge>
                              <div className="text-xs text-gray-400 mt-1">
                                {new Date(log.createdAt).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Current User Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Your Permissions</CardTitle>
                  <CardDescription>
                    Current user capabilities and access levels
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">Role</h4>
                      <Badge variant={currentUser?.role === "super_admin" ? "destructive" : "default"} className="capitalize">
                        {currentUser?.role?.replace("_", " ") || "Unknown"}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Capabilities</h4>
                      <div className="space-y-1">
                        {isSuperAdmin && (
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>Create any role account</span>
                          </div>
                        )}
                        {isAdmin && (
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>Create user accounts</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>View user management</span>
                        </div>
                        {isSuperAdmin && (
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>Delete user accounts</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="create">
              <AccountCreation currentUser={currentUser} />
            </TabsContent>

            <TabsContent value="manage">
              <UserManagement currentUser={currentUser} />
            </TabsContent>

            {isSuperAdmin && (
              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      System Settings
                    </CardTitle>
                    <CardDescription>
                      Advanced system configuration and security settings.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">Security Settings</h4>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div>• Password hashing: bcrypt/argon2</div>
                          <div>• Role-based authorization middleware</div>
                          <div>• Account creation logging enabled</div>
                          <div>• Session management active</div>
                        </div>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">System Information</h4>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div>• Total users: {totalUsers}</div>
                          <div>• Active sessions: {activeUsers}</div>
                          <div>• Last system update: {new Date().toLocaleDateString()}</div>
                          <div>• System status: Operational</div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline">
                          Export User Data
                        </Button>
                        <Button variant="outline">
                          System Backup
                        </Button>
                        <Button variant="outline">
                          View Logs
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

