"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Clock, 
  Users, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  User,
  Calendar,
  TrendingUp,
  BarChart3
} from "lucide-react"

export default function AdminAttendancePage() {
  // Mock data for system-wide attendance
  const attendanceData = [
    {
      id: "ATT001",
      employeeName: "Maria Santos",
      employeeId: "EMP001",
      department: "Human Resources",
      date: "2024-01-15",
      clockIn: "08:00 AM",
      clockOut: "05:00 PM",
      totalHours: 9,
      status: "present",
      location: "Main Office"
    },
    {
      id: "ATT002",
      employeeName: "Juan Dela Cruz",
      employeeId: "EMP002",
      department: "Information Technology",
      date: "2024-01-15",
      clockIn: "08:15 AM",
      clockOut: "05:30 PM",
      totalHours: 9.25,
      status: "present",
      location: "Main Office"
    },
    {
      id: "ATT003",
      employeeName: "Ana Reyes",
      employeeId: "EMP003",
      department: "Finance",
      date: "2024-01-15",
      clockIn: "09:00 AM",
      clockOut: "06:00 PM",
      totalHours: 9,
      status: "late",
      location: "Main Office"
    },
    {
      id: "ATT004",
      employeeName: "Pedro Martinez",
      employeeId: "EMP004",
      department: "Operations",
      date: "2024-01-15",
      clockIn: null,
      clockOut: null,
      totalHours: 0,
      status: "absent",
      location: null
    }
  ]

  const systemStats = {
    totalEmployees: 156,
    present: 142,
    absent: 8,
    late: 6,
    averageHours: 8.3,
    attendanceRate: 91.0
  }

  const departmentStats = [
    { name: "Human Resources", present: 12, absent: 1, late: 1 },
    { name: "Information Technology", present: 18, absent: 2, late: 1 },
    { name: "Finance", present: 15, absent: 1, late: 2 },
    { name: "Operations", present: 25, absent: 2, late: 1 },
    { name: "Legal", present: 8, absent: 0, late: 0 },
    { name: "Communications", present: 10, absent: 1, late: 1 }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present": return "bg-green-100 text-green-800"
      case "absent": return "bg-red-100 text-red-800"
      case "late": return "bg-yellow-100 text-yellow-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present": return <CheckCircle className="h-4 w-4" />
      case "absent": return <XCircle className="h-4 w-4" />
      case "late": return <AlertTriangle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  return (
    <AppLayout userRole="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">System Attendance Monitor</h1>
              <p className="text-gray-600 mt-1">Monitor attendance across all departments</p>
            </div>
            <div className="h-12 w-12 bg-primary rounded-full flex items-center justify-center">
              <Clock className="h-6 w-6 text-primary-foreground" />
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
                  <p className="text-2xl font-bold text-gray-900">{systemStats.totalEmployees}</p>
                  <p className="text-xs text-blue-600">Across all departments</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Present Today</p>
                  <p className="text-2xl font-bold text-gray-900">{systemStats.present}</p>
                  <p className="text-xs text-green-600">
                    <TrendingUp className="inline h-3 w-3 mr-1" />
                    +5 from yesterday
                  </p>
                </div>
                <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Absent</p>
                  <p className="text-2xl font-bold text-gray-900">{systemStats.absent}</p>
                  <p className="text-xs text-red-600">Requires attention</p>
                </div>
                <div className="h-10 w-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <XCircle className="h-5 w-5 text-red-600" />
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
                  <p className="text-xs text-blue-600">Avg {systemStats.averageHours}h per day</p>
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
                <Clock className="h-5 w-5 text-green-600" />
                <span>Today's Attendance</span>
              </CardTitle>
              <CardDescription>
                Real-time attendance tracking for {new Date().toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {attendanceData.map((record) => (
                  <div key={record.id} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{record.employeeName}</h3>
                          <p className="text-sm text-gray-600">{record.department}</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(record.status)}>
                        {getStatusIcon(record.status)}
                        <span className="ml-1 capitalize">{record.status}</span>
                      </Badge>
                    </div>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Time Details</p>
                        <p className="text-sm text-gray-600">
                          {record.clockIn ? `In: ${record.clockIn}` : 'Not clocked in'}
                        </p>
                        <p className="text-sm text-gray-600">
                          {record.clockOut ? `Out: ${record.clockOut}` : 'Not clocked out'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Hours</p>
                        <p className="text-sm text-gray-600">{record.totalHours} hours</p>
                        <p className="text-sm text-gray-600">{record.location || 'No location'}</p>
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
                <BarChart3 className="h-5 w-5 text-blue-600" />
                <span>Department Overview</span>
              </CardTitle>
              <CardDescription>
                Attendance breakdown by department
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departmentStats.map((dept, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">{dept.name}</h3>
                      <Badge variant="outline">{dept.present + dept.absent + dept.late} total</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center">
                        <p className="text-green-600 font-medium">{dept.present}</p>
                        <p className="text-gray-600">Present</p>
                      </div>
                      <div className="text-center">
                        <p className="text-red-600 font-medium">{dept.absent}</p>
                        <p className="text-gray-600">Absent</p>
                      </div>
                      <div className="text-center">
                        <p className="text-yellow-600 font-medium">{dept.late}</p>
                        <p className="text-gray-600">Late</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
} 