"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  BarChart3, 
  Users, 
  Clock, 
  Calendar,
  TrendingUp,
  TrendingDown,
  Download,
  Eye,
  FileText
} from "lucide-react"

export default function AdminReportsPage() {
  // Mock data for reports
  const systemStats = {
    totalUsers: 156,
    activeUsers: 142,
    totalDepartments: 8,
    totalEmployees: 145,
    attendanceRate: 91.2,
    leaveApprovalRate: 85.7
  }

  const monthlyTrends = [
    { month: "Jan", users: 150, attendance: 92, leaves: 45 },
    { month: "Feb", users: 152, attendance: 89, leaves: 52 },
    { month: "Mar", users: 154, attendance: 94, leaves: 38 },
    { month: "Apr", users: 155, attendance: 91, leaves: 61 },
    { month: "May", users: 156, attendance: 93, leaves: 47 },
    { month: "Jun", users: 156, attendance: 91, leaves: 43 }
  ]

  const departmentStats = [
    { name: "Human Resources", employees: 15, attendance: 94, leaves: 12 },
    { name: "Information Technology", employees: 22, attendance: 89, leaves: 18 },
    { name: "Finance", employees: 18, attendance: 92, leaves: 15 },
    { name: "Operations", employees: 28, attendance: 88, leaves: 25 },
    { name: "Legal", employees: 10, attendance: 95, leaves: 8 },
    { name: "Communications", employees: 12, attendance: 90, leaves: 10 }
  ]

  const recentReports = [
    {
      id: "RPT001",
      title: "Monthly Attendance Report",
      type: "Attendance",
      generatedBy: "System Admin",
      date: "2024-01-15",
      status: "completed"
    },
    {
      id: "RPT002",
      title: "Leave Request Summary",
      type: "Leave",
      generatedBy: "HR Manager",
      date: "2024-01-14",
      status: "completed"
    },
    {
      id: "RPT003",
      title: "User Activity Report",
      type: "Analytics",
      generatedBy: "IT Admin",
      date: "2024-01-13",
      status: "processing"
    }
  ]

  return (
    <AppLayout userRole="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-6 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
              <p className="text-gray-600 mt-1">Comprehensive system analytics and reporting</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{systemStats.totalUsers}</p>
                  <p className="text-xs text-green-600">
                    <TrendingUp className="inline h-3 w-3 mr-1" />
                    +6 this month
                  </p>
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
                  <p className="text-2xl font-bold text-gray-900">{systemStats.attendanceRate}%</p>
                  <p className="text-xs text-green-600">Above target</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Leave Approval</p>
                  <p className="text-2xl font-bold text-gray-900">{systemStats.leaveApprovalRate}%</p>
                  <p className="text-xs text-blue-600">Efficient processing</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Departments</p>
                  <p className="text-2xl font-bold text-gray-900">{systemStats.totalDepartments}</p>
                  <p className="text-xs text-purple-600">Active departments</p>
                </div>
                <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-purple-600" />
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
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <span>Monthly Trends</span>
              </CardTitle>
              <CardDescription>
                System performance over the last 6 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyTrends.map((trend, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">{trend.month}</h3>
                      <Badge variant="outline">{trend.users} users</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-center">
                        <p className="text-green-600 font-medium">{trend.attendance}%</p>
                        <p className="text-gray-600">Attendance</p>
                      </div>
                      <div className="text-center">
                        <p className="text-blue-600 font-medium">{trend.leaves}</p>
                        <p className="text-gray-600">Leave Requests</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-indigo-600" />
                <span>Department Performance</span>
              </CardTitle>
              <CardDescription>
                Attendance and leave statistics by department
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departmentStats.map((dept, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">{dept.name}</h3>
                      <Badge variant="outline">{dept.employees} employees</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-center">
                        <p className="text-green-600 font-medium">{dept.attendance}%</p>
                        <p className="text-gray-600">Attendance</p>
                      </div>
                      <div className="text-center">
                        <p className="text-orange-600 font-medium">{dept.leaves}</p>
                        <p className="text-gray-600">Leave Requests</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Reports */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-purple-600" />
              <span>Recent Reports</span>
            </CardTitle>
            <CardDescription>
              Recently generated reports and analytics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReports.map((report) => (
                <div key={report.id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center">
                        <FileText className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{report.title}</h3>
                        <p className="text-sm text-gray-600">Generated by {report.generatedBy}</p>
                        <p className="text-sm text-gray-600">Date: {report.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{report.type}</Badge>
                      <Badge className={report.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                        {report.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-xs text-gray-500">Report ID: {report.id}</p>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Report Generation */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Download className="h-5 w-5 text-blue-600" />
              <span>Generate Reports</span>
            </CardTitle>
            <CardDescription>
              Create new reports and analytics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-12">
                <BarChart3 className="h-4 w-4 mr-2" />
                Attendance Report
              </Button>
              <Button variant="outline" className="h-12">
                <Calendar className="h-4 w-4 mr-2" />
                Leave Summary
              </Button>
              <Button variant="outline" className="h-12">
                <Users className="h-4 w-4 mr-2" />
                User Activity
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
} 