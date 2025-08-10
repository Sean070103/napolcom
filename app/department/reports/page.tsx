"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  BarChart3, 
  Users, 
  FileText, 
  CheckSquare, 
  Clock, 
  Calendar,
  TrendingUp,
  TrendingDown,
  Download,
  Eye
} from "lucide-react"

export default function DepartmentReportsPage() {
  // Mock data for reports
  const departmentStats = {
    totalEmployees: 45,
    activeEmployees: 42,
    onLeave: 3,
    attendanceRate: 93.3,
    leaveRequests: 8,
    pendingApprovals: 5,
    memorandumsSent: 23,
    tasksCompleted: 67,
    tasksPending: 12
  }

  const recentActivity = [
    {
      id: 1,
      type: "attendance",
      employee: "Maria Santos",
      action: "Clock in",
      time: "08:00 AM",
      date: "2024-01-15"
    },
    {
      id: 2,
      type: "leave",
      employee: "Juan Dela Cruz",
      action: "Leave request submitted",
      time: "09:30 AM",
      date: "2024-01-15"
    },
    {
      id: 3,
      type: "memorandum",
      employee: "Ana Reyes",
      action: "Memorandum sent",
      time: "10:15 AM",
      date: "2024-01-15"
    },
    {
      id: 4,
      type: "task",
      employee: "Pedro Martinez",
      action: "Task completed",
      time: "11:45 AM",
      date: "2024-01-15"
    }
  ]

  const monthlyStats = [
    { month: "Jan", attendance: 95, leaves: 8, tasks: 45 },
    { month: "Feb", attendance: 92, leaves: 12, tasks: 52 },
    { month: "Mar", attendance: 94, leaves: 6, tasks: 38 },
    { month: "Apr", attendance: 91, leaves: 15, tasks: 61 },
    { month: "May", attendance: 93, leaves: 9, tasks: 47 },
    { month: "Jun", attendance: 96, leaves: 5, tasks: 43 }
  ]

  return (
    <AppLayout userRole="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-6 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Department Reports</h1>
              <p className="text-gray-600 mt-1">Comprehensive analytics and insights for Human Resources Department</p>
            </div>
            <div className="h-12 w-12 bg-primary rounded-full flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Employees</p>
                  <p className="text-2xl font-bold text-gray-900">{departmentStats.totalEmployees}</p>
                  <p className="text-xs text-green-600">{departmentStats.activeEmployees} active</p>
                </div>
                <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Attendance Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{departmentStats.attendanceRate}%</p>
                  <p className="text-xs text-green-600">
                    <TrendingUp className="inline h-3 w-3 mr-1" />
                    +2.1% from last month
                  </p>
                </div>
                <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Leave Requests</p>
                  <p className="text-2xl font-bold text-gray-900">{departmentStats.leaveRequests}</p>
                  <p className="text-xs text-orange-600">{departmentStats.pendingApprovals} pending</p>
                </div>
                <div className="h-10 w-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Tasks Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{departmentStats.tasksCompleted}</p>
                  <p className="text-xs text-blue-600">{departmentStats.tasksPending} pending</p>
                </div>
                <div className="h-10 w-10 bg-teal-100 rounded-lg flex items-center justify-center">
                  <CheckSquare className="h-5 w-5 text-teal-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-purple-600" />
                <span>Monthly Trends</span>
              </CardTitle>
              <CardDescription>
                Department performance over the last 6 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyStats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-900">{stat.month}</span>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-blue-600">Attendance: {stat.attendance}%</span>
                      <span className="text-orange-600">Leaves: {stat.leaves}</span>
                      <span className="text-green-600">Tasks: {stat.tasks}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-green-600" />
                <span>Recent Activity</span>
              </CardTitle>
              <CardDescription>
                Latest department activities and updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
                      {activity.type === 'attendance' && <Clock className="h-4 w-4 text-white" />}
                      {activity.type === 'leave' && <Calendar className="h-4 w-4 text-white" />}
                      {activity.type === 'memorandum' && <FileText className="h-4 w-4 text-white" />}
                      {activity.type === 'task' && <CheckSquare className="h-4 w-4 text-white" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.employee}</p>
                      <p className="text-xs text-gray-600">{activity.action}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">{activity.time}</p>
                      <p className="text-xs text-gray-400">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Report Actions */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Download className="h-5 w-5 text-blue-600" />
              <span>Generate Reports</span>
            </CardTitle>
            <CardDescription>
              Download detailed reports and analytics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-12">
                <Download className="h-4 w-4 mr-2" />
                Attendance Report
              </Button>
              <Button variant="outline" className="h-12">
                <Download className="h-4 w-4 mr-2" />
                Leave Summary
              </Button>
              <Button variant="outline" className="h-12">
                <Download className="h-4 w-4 mr-2" />
                Task Performance
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
} 