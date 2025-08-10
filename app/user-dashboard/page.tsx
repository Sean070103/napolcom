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
  User,
  Building,
  ClipboardList,
  Bell,
  Clock,
  CheckCircle,
  TrendingUp,
  Activity,
  BarChart3,
  Plus,
  ArrowRight,
  Sparkles,
  Target,
  Award,
  Zap
} from "lucide-react"
import Link from "next/link"

function UserDashboardContent() {
  const { user } = useAuth()

  return (
    <AppLayout userRole="user">
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-xl p-8 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5" />
                <span className="text-sm font-medium opacity-90">Welcome back!</span>
              </div>
              <h1 className="text-3xl font-bold">{user?.fullName}</h1>
              <p className="text-blue-100 text-lg">Access your workspace and manage your activities.</p>
            </div>
            <div className="h-16 w-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <User className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="card-hover border-0 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-2 text-xl">
                <Zap className="h-6 w-6 text-yellow-600" />
                <span>Quick Actions</span>
              </CardTitle>
              <CardDescription className="text-base">
                Access your most frequently used features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                <Link href="/user/attendance">
                  <div className="group p-4 rounded-lg border-2 border-blue-200 bg-blue-50 hover:shadow-md transition-all duration-200 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                          <Clock className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 group-hover:text-gray-700">Clock In/Out</h3>
                          <p className="text-sm text-gray-600">Record your attendance</p>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    </div>
                  </div>
                </Link>
                <Link href="/user/leave">
                  <div className="group p-4 rounded-lg border-2 border-green-200 bg-green-50 hover:shadow-md transition-all duration-200 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
                          <Calendar className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 group-hover:text-gray-700">Request Leave</h3>
                          <p className="text-sm text-gray-600">Submit leave application</p>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    </div>
                  </div>
                </Link>
                <Link href="/department/tasks">
                  <div className="group p-4 rounded-lg border-2 border-purple-200 bg-purple-50 hover:shadow-md transition-all duration-200 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
                          <ClipboardList className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 group-hover:text-gray-700">View Tasks</h3>
                          <p className="text-sm text-gray-600">Check assigned tasks</p>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    </div>
                  </div>
                </Link>
                <Link href="/department/memorandums">
                  <div className="group p-4 rounded-lg border-2 border-orange-200 bg-orange-50 hover:shadow-md transition-all duration-200 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center">
                          <FileText className="h-6 w-6 text-orange-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 group-hover:text-gray-700">Read Memorandums</h3>
                          <p className="text-sm text-gray-600">Latest communications</p>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    </div>
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover border-0 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-2 text-xl">
                <Target className="h-6 w-6 text-red-600" />
                <span>My Workspace</span>
              </CardTitle>
              <CardDescription className="text-base">
                Manage your personal information and activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                <Link href="/user/profile">
                  <div className="group p-4 rounded-lg border-2 border-gray-200 bg-gray-50 hover:border-blue-200 hover:bg-blue-50 transition-all duration-200 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                          <User className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 group-hover:text-blue-700">My Profile</h3>
                          <p className="text-sm text-gray-600">Update personal information</p>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                  </div>
                </Link>
                <Link href="/user/notifications">
                  <div className="group p-4 rounded-lg border-2 border-gray-200 bg-gray-50 hover:border-orange-200 hover:bg-orange-50 transition-all duration-200 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center">
                          <Bell className="h-6 w-6 text-orange-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 group-hover:text-orange-700">Notifications</h3>
                          <p className="text-sm text-gray-600">View and manage alerts</p>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-orange-600 transition-colors" />
                    </div>
                  </div>
                </Link>
                <Link href="/user/attendance">
                  <div className="group p-4 rounded-lg border-2 border-gray-200 bg-gray-50 hover:border-green-200 hover:bg-green-50 transition-all duration-200 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
                          <Clock className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 group-hover:text-green-700">My Attendance</h3>
                          <p className="text-sm text-gray-600">Track work hours</p>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-green-600 transition-colors" />
                    </div>
                  </div>
                </Link>
                <Link href="/user/leave">
                  <div className="group p-4 rounded-lg border-2 border-gray-200 bg-gray-50 hover:border-purple-200 hover:bg-purple-50 transition-all duration-200 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
                          <Calendar className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 group-hover:text-purple-700">Leave Requests</h3>
                          <p className="text-sm text-gray-600">Manage time off</p>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                    </div>
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Department Access */}
        <Card className="card-hover border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-xl">
              <Building className="h-6 w-6 text-teal-600" />
              <span>Department Access</span>
            </CardTitle>
            <CardDescription className="text-base">
              Access department resources and communications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/department/communication">
                <div className="group p-4 rounded-lg border-2 border-gray-200 bg-gray-50 hover:border-teal-200 hover:bg-teal-50 transition-all duration-200 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 rounded-lg bg-teal-100 flex items-center justify-center">
                        <FileText className="h-6 w-6 text-teal-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-teal-700">Communication Hub</h3>
                        <p className="text-sm text-gray-600">View messages and tasks</p>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-teal-600 transition-colors" />
                  </div>
                </div>
              </Link>
              <Link href="/department/employees">
                <div className="group p-4 rounded-lg border-2 border-gray-200 bg-gray-50 hover:border-indigo-200 hover:bg-indigo-50 transition-all duration-200 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 rounded-lg bg-indigo-100 flex items-center justify-center">
                        <Users className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-indigo-700">Employee Directory</h3>
                        <p className="text-sm text-gray-600">Browse team members</p>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                  </div>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}

export default function UserDashboardPage() {
  return (
    <ProtectedRoute requiredRoles={['user']}>
      <UserDashboardContent />
    </ProtectedRoute>
  )
}
