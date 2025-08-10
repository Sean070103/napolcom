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
  TrendingDown
} from "lucide-react"

export default function DepartmentAttendancePage() {
  // Mock data for attendance
  const attendanceData = [
    {
      id: "ATT001",
      employeeName: "Maria Santos",
      employeeId: "EMP001",
      date: "2024-01-15",
      clockIn: "08:00 AM",
      clockOut: "05:00 PM",
      totalHours: 9,
      status: "present",
      location: "Office"
    },
    {
      id: "ATT002",
      employeeName: "Juan Dela Cruz",
      employeeId: "EMP002",
      date: "2024-01-15",
      clockIn: "08:15 AM",
      clockOut: "05:30 PM",
      totalHours: 9.25,
      status: "present",
      location: "Office"
    },
    {
      id: "ATT003",
      employeeName: "Ana Reyes",
      employeeId: "EMP003",
      date: "2024-01-15",
      clockIn: "09:00 AM",
      clockOut: "06:00 PM",
      totalHours: 9,
      status: "late",
      location: "Office"
    },
    {
      id: "ATT004",
      employeeName: "Pedro Martinez",
      employeeId: "EMP004",
      date: "2024-01-15",
      clockIn: null,
      clockOut: null,
      totalHours: 0,
      status: "absent",
      location: null
    }
  ]

  const attendanceStats = {
    totalEmployees: 45,
    present: 38,
    absent: 4,
    late: 3,
    averageHours: 8.5,
    attendanceRate: 84.4
  }

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
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Attendance Monitor</h1>
              <p className="text-gray-600 mt-1">Monitor employee attendance and time tracking</p>
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
                  <p className="text-2xl font-bold text-gray-900">{attendanceStats.totalEmployees}</p>
                  <p className="text-xs text-blue-600">All active employees</p>
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
                  <p className="text-2xl font-bold text-gray-900">{attendanceStats.present}</p>
                  <p className="text-xs text-green-600">
                    <TrendingUp className="inline h-3 w-3 mr-1" />
                    +2 from yesterday
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
                  <p className="text-2xl font-bold text-gray-900">{attendanceStats.absent}</p>
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
                  <p className="text-2xl font-bold text-gray-900">{attendanceStats.attendanceRate}%</p>
                  <p className="text-xs text-blue-600">Avg {attendanceStats.averageHours}h per day</p>
                </div>
                <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-5 w-5 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-600" />
              <span>Today's Attendance</span>
            </CardTitle>
            <CardDescription>
              Real-time attendance tracking for {new Date().toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all" className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>All ({attendanceStats.totalEmployees})</span>
                </TabsTrigger>
                <TabsTrigger value="present" className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Present ({attendanceStats.present})</span>
                </TabsTrigger>
                <TabsTrigger value="absent" className="flex items-center space-x-2">
                  <XCircle className="h-4 w-4" />
                  <span>Absent ({attendanceStats.absent})</span>
                </TabsTrigger>
                <TabsTrigger value="late" className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Late ({attendanceStats.late})</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6">
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
                            <p className="text-sm text-gray-600">ID: {record.employeeId}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(record.status)}>
                          {getStatusIcon(record.status)}
                          <span className="ml-1 capitalize">{record.status}</span>
                        </Badge>
                      </div>
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
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
                        <div>
                          <p className="text-sm font-medium text-gray-700">Date</p>
                          <p className="text-sm text-gray-600">{record.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="present" className="mt-6">
                <div className="space-y-4">
                  {attendanceData.filter(record => record.status === 'present').map((record) => (
                    <div key={record.id} className="border rounded-lg p-4 bg-green-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 bg-green-600 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{record.employeeName}</h3>
                            <p className="text-sm text-gray-600">ID: {record.employeeId}</p>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Present
                        </Badge>
                      </div>
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Time Details</p>
                          <p className="text-sm text-gray-600">In: {record.clockIn}</p>
                          <p className="text-sm text-gray-600">Out: {record.clockOut}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Hours</p>
                          <p className="text-sm text-gray-600">{record.totalHours} hours</p>
                          <p className="text-sm text-gray-600">{record.location}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Date</p>
                          <p className="text-sm text-gray-600">{record.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="absent" className="mt-6">
                <div className="space-y-4">
                  {attendanceData.filter(record => record.status === 'absent').map((record) => (
                    <div key={record.id} className="border rounded-lg p-4 bg-red-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 bg-red-600 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{record.employeeName}</h3>
                            <p className="text-sm text-gray-600">ID: {record.employeeId}</p>
                          </div>
                        </div>
                        <Badge className="bg-red-100 text-red-800">
                          <XCircle className="h-4 w-4 mr-1" />
                          Absent
                        </Badge>
                      </div>
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Status</p>
                          <p className="text-sm text-gray-600">No clock in/out</p>
                          <p className="text-sm text-gray-600">0 hours</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Action Required</p>
                          <p className="text-sm text-red-600">Follow up needed</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Date</p>
                          <p className="text-sm text-gray-600">{record.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="late" className="mt-6">
                <div className="space-y-4">
                  {attendanceData.filter(record => record.status === 'late').map((record) => (
                    <div key={record.id} className="border rounded-lg p-4 bg-yellow-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 bg-yellow-600 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{record.employeeName}</h3>
                            <p className="text-sm text-gray-600">ID: {record.employeeId}</p>
                          </div>
                        </div>
                        <Badge className="bg-yellow-100 text-yellow-800">
                          <AlertTriangle className="h-4 w-4 mr-1" />
                          Late
                        </Badge>
                      </div>
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Time Details</p>
                          <p className="text-sm text-gray-600">In: {record.clockIn}</p>
                          <p className="text-sm text-gray-600">Out: {record.clockOut}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Hours</p>
                          <p className="text-sm text-gray-600">{record.totalHours} hours</p>
                          <p className="text-sm text-gray-600">{record.location}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Date</p>
                          <p className="text-sm text-gray-600">{record.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
} 