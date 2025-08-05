"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Clock, Calendar, TrendingUp, UserCheck, UserX, AlertTriangle } from "lucide-react"
import { DepartmentLayout } from "@/components/layouts/department-layout"
import { TeamAttendanceTable } from "@/components/department/team-attendance-table"
import { LeaveApprovalTable } from "@/components/department/leave-approval-table"
import { DepartmentReports } from "@/components/department/department-reports"
import { dataStore } from "@/lib/data-store"
import { format } from "date-fns"

export function DepartmentDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(format(new Date(), "yyyy-MM-dd"))
  const [departmentData, setDepartmentData] = useState<any>(null)
  const [departmentStats, setDepartmentStats] = useState({
    totalEmployees: 0,
    presentToday: 0,
    absentToday: 0,
    lateToday: 0,
    onLeaveToday: 0,
    attendanceRate: 0,
    pendingLeaves: 0,
  })

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    // Get current user's department
    const userStr = localStorage.getItem("user")
    if (userStr) {
      const user = JSON.parse(userStr)
      const employee = dataStore.getEmployeeByEmail(user.email)
      
      if (employee) {
        const department = dataStore.getDepartments().find(dept => dept.name === employee.department)
        setDepartmentData(department)
        
        // Get department employees
        const employees = dataStore.getEmployees().filter(emp => emp.department === employee.department)
        
        // Get today's attendance for department
        const today = format(new Date(), "yyyy-MM-dd")
        const attendanceRecords = dataStore.getAttendanceRecords(today)
        const departmentAttendance = attendanceRecords.filter(record => 
          employees.some(emp => emp.employeeId === record.employeeId)
        )
        
        const present = departmentAttendance.filter(r => r.status === "present").length
        const absent = departmentAttendance.filter(r => r.status === "absent").length
        const late = departmentAttendance.filter(r => r.status === "late").length
        const onLeave = departmentAttendance.filter(r => r.status === "on-leave").length
        
        // Get pending leave requests for department
        const leaveRequests = dataStore.getLeaveRequests("pending")
        const departmentLeaves = leaveRequests.filter(request => 
          employees.some(emp => emp.employeeId === request.employeeId)
        )
        
        setDepartmentStats({
          totalEmployees: employees.length,
          presentToday: present,
          absentToday: absent,
          lateToday: late,
          onLeaveToday: onLeave,
          attendanceRate: employees.length > 0 ? (present / employees.length) * 100 : 0,
          pendingLeaves: departmentLeaves.length,
        })
      }
    }
  }, [selectedDate])

  if (!departmentData) {
    return (
      <DepartmentLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Loading department data...</p>
          </div>
        </div>
      </DepartmentLayout>
    )
  }

  return (
    <DepartmentLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{departmentData.name} Dashboard</h1>
            <p className="text-gray-600">
              {currentTime.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              - {currentTime.toLocaleTimeString()}
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Department Head</div>
            <div className="font-medium">{departmentData.head}</div>
          </div>
        </div>

        {/* Date Selector */}
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium">View Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button
            variant="outline"
            onClick={() => setSelectedDate(format(new Date(), "yyyy-MM-dd"))}
          >
            Today
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{departmentStats.totalEmployees}</div>
              <p className="text-xs text-muted-foreground">Department personnel</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Present Today</CardTitle>
              <UserCheck className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{departmentStats.presentToday}</div>
              <p className="text-xs text-muted-foreground">
                {departmentStats.attendanceRate.toFixed(1)}% attendance rate
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Absent Today</CardTitle>
              <UserX className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{departmentStats.absentToday}</div>
              <p className="text-xs text-muted-foreground">Including sick leaves</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Late Today</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{departmentStats.lateToday}</div>
              <p className="text-xs text-muted-foreground">Tardiness incidents</p>
            </CardContent>
          </Card>
        </div>

        {/* Leave Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Leave Requests</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{departmentStats.pendingLeaves}</div>
              <p className="text-xs text-muted-foreground">Awaiting your approval</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">On Leave Today</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{departmentStats.onLeaveToday}</div>
              <p className="text-xs text-muted-foreground">Approved leaves</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Department Performance</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {departmentStats.attendanceRate.toFixed(1)}%
              </div>
              <p className="text-xs text-muted-foreground">Today's attendance rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="attendance">Team Attendance</TabsTrigger>
            <TabsTrigger value="leaves">Leave Management</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest team activities</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Maria Santos logged in</p>
                      <p className="text-xs text-gray-500">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Leave request submitted</p>
                      <p className="text-xs text-gray-500">5 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Late arrival detected</p>
                      <p className="text-xs text-gray-500">15 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Team meeting scheduled</p>
                      <p className="text-xs text-gray-500">1 hour ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common department management tasks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Leave Requests</p>
                      <p className="text-xs text-gray-500">Review pending requests</p>
                    </div>
                    <Badge variant="destructive">{departmentStats.pendingLeaves}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Attendance Review</p>
                      <p className="text-xs text-gray-500">Check today's attendance</p>
                    </div>
                    <Badge variant="secondary">{departmentStats.totalEmployees}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Team Reports</p>
                      <p className="text-xs text-gray-500">Generate department reports</p>
                    </div>
                    <Badge variant="outline">Available</Badge>
                  </div>
                  <Button className="w-full mt-4">Manage Team</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="attendance">
            <TeamAttendanceTable selectedDate={selectedDate} departmentName={departmentData.name} />
          </TabsContent>

          <TabsContent value="leaves">
            <LeaveApprovalTable departmentName={departmentData.name} />
          </TabsContent>

          <TabsContent value="reports">
            <DepartmentReports departmentName={departmentData.name} />
          </TabsContent>
        </Tabs>
      </div>
    </DepartmentLayout>
  )
}
