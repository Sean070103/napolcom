"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { useAuth } from "@/lib/auth-context"
import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Users, 
  FileText, 
  Calendar, 
  Settings, 
  User,
  Building,
  ClipboardList,
  Shield,
  BarChart3,
  Activity,
  UserPlus,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Eye,
  Plus
} from "lucide-react"
import Link from "next/link"

function AdminDashboardContent() {
  const { user } = useAuth()

  // Mock statistics
  const stats = {
    users: { total: 45, active: 42, inactive: 3 },
    departments: { total: 8, active: 8 },
    memorandums: { total: 23, pending: 5, sent: 18 },
    tasks: { total: 67, completed: 52, pending: 15 }
  }

  const recentActivity = [
    {
      id: 1,
      type: "user",
      title: "New User Created",
      description: "John Doe was added to the system",
      time: "2 hours ago",
      icon: UserPlus,
      color: "text-green-600"
    },
    {
      id: 2,
      type: "memorandum",
      title: "Memorandum Sent",
      description: "Q4 Policy Update sent to all departments",
      time: "4 hours ago",
      icon: FileText,
      color: "text-blue-600"
    },
    {
      id: 3,
      type: "task",
      title: "Task Completed",
      description: "System maintenance completed by IT team",
      time: "1 day ago",
      icon: CheckCircle,
      color: "text-purple-600"
    }
  ]

  const quickActions = [
    {
      title: "Create Account",
      description: "Add new user to the system",
      href: "/admin",
      icon: UserPlus,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Manage Users",
      description: "View and edit user accounts",
      href: "/admin",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Send Memorandum",
      description: "Create and send new memorandum",
      href: "/department/memorandums",
      icon: FileText,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    },
    {
      title: "Assign Tasks",
      description: "Create and assign new tasks",
      href: "/department/tasks",
      icon: ClipboardList,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    }
  ]

  return (
    <AppLayout userRole="admin">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-6 border border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Administrative Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage system users, monitor activities, and oversee operations.</p>
            </div>
            <div className="h-12 w-12 bg-primary rounded-full flex items-center justify-center">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.users.total}</p>
                  <p className="text-xs text-green-600">{stats.users.active} active</p>
                </div>
                <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Departments</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.departments.total}</p>
                  <p className="text-xs text-blue-600">All active</p>
                </div>
                <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Building className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Memorandums</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.memorandums.total}</p>
                  <p className="text-xs text-orange-600">{stats.memorandums.pending} pending</p>
                </div>
                <div className="h-10 w-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-5 w-5 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Tasks</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.tasks.completed}/{stats.tasks.total}</p>
                  <p className="text-xs text-purple-600">78% completed</p>
                </div>
                <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon
            return (
              <Card key={index} className="card-hover">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className={`h-12 w-12 ${action.bgColor} rounded-lg flex items-center justify-center`}>
                      <Icon className={`h-6 w-6 ${action.color}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{action.title}</h3>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </div>
                    <Link href={action.href}>
                      <Button variant="outline" size="sm" className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Action
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* System Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-red-600" />
                <span>User Management</span>
              </CardTitle>
              <CardDescription>
                Manage system users, roles, and permissions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 gap-3">
                <Link href="/admin">
                  <Button variant="outline" className="w-full justify-start h-12">
                    <UserPlus className="h-4 w-4 mr-3" />
                    Create Accounts
                  </Button>
                </Link>
                <Link href="/admin">
                  <Button variant="outline" className="w-full justify-start h-12">
                    <Users className="h-4 w-4 mr-3" />
                    Manage Users
                  </Button>
                </Link>
                <Link href="/admin">
                  <Button variant="outline" className="w-full justify-start h-12">
                    <Shield className="h-4 w-4 mr-3" />
                    Role Management
                  </Button>
                </Link>
                <Link href="/admin">
                  <Button variant="outline" className="w-full justify-start h-12">
                    <Activity className="h-4 w-4 mr-3" />
                    User Activity
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building className="h-5 w-5 text-blue-600" />
                <span>Department Oversight</span>
              </CardTitle>
              <CardDescription>
                Monitor department activities and communications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 gap-3">
                <Link href="/department/communication">
                  <Button variant="outline" className="w-full justify-start h-12">
                    <FileText className="h-4 w-4 mr-3" />
                    Communication Hub
                  </Button>
                </Link>
                <Link href="/department/employees">
                  <Button variant="outline" className="w-full justify-start h-12">
                    <Users className="h-4 w-4 mr-3" />
                    Employee Directory
                  </Button>
                </Link>
                <Link href="/department/memorandums">
                  <Button variant="outline" className="w-full justify-start h-12">
                    <FileText className="h-4 w-4 mr-3" />
                    Memorandums
                  </Button>
                </Link>
                <Link href="/department/tasks">
                  <Button variant="outline" className="w-full justify-start h-12">
                    <ClipboardList className="h-4 w-4 mr-3" />
                    Task Management
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-green-600" />
              <span>Recent Administrative Activity</span>
            </CardTitle>
            <CardDescription>
              Latest system activities and administrative actions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => {
                const Icon = activity.icon
                return (
                  <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className={`h-8 w-8 ${activity.color} bg-muted rounded-lg flex items-center justify-center`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                    </div>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute requiredRoles={['admin', 'super_admin']}>
      <AdminDashboardContent />
    </ProtectedRoute>
  )
}
