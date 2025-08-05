"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Clock, Download, Eye, UserCheck, UserX, Calendar, AlertTriangle, TrendingUp } from "lucide-react"
import { AdminLayout } from "@/components/layouts/admin-layout"
import { AttendanceTable } from "@/components/admin/attendance-table"
import { LeaveRequestsTable } from "@/components/admin/leave-requests-table"
import { ReportsSection } from "@/components/admin/reports-section"
import { dataStore } from "@/lib/data-store"
import { format } from "date-fns"

export function AdminDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(format(new Date(), "yyyy-MM-dd"))
  const [attendanceStats, setAttendanceStats] = useState({
    totalEmployees: 0,
    present: 0,
    absent: 0,
    late: 0,
    onLeave: 0,
    attendanceRate: 0,
  })
  const [leaveStats, setLeaveStats] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
    total: 0,
  })

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    // Update stats when date changes
    const stats = dataStore.getAttendanceStats(selectedDate)
    const leaveStatsData = dataStore.getLeaveStats()
    
    setAttendanceStats(stats)
    setLeaveStats(leaveStatsData)
  }, [selectedDate])

  const getAttendanceTrend = () => {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    
    const todayStats = dataStore.getAttendanceStats(format(today, "yyyy-MM-dd"))
    const yesterdayStats = dataStore.getAttendanceStats(format(yesterday, "yyyy-MM-dd"))
    
    if (yesterdayStats.attendanceRate === 0) return "new"
    if (todayStats.attendanceRate > yesterdayStats.attendanceRate) return "up"
    if (todayStats.attendanceRate < yesterdayStats.attendanceRate) return "down"
    return "stable"
  }

  const trend = getAttendanceTrend()

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
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
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Button>
              <Eye className="w-4 h-4 mr-2" />
              Live Monitor
            </Button>
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
              <div className="text-2xl font-bold">{attendanceStats.totalEmployees.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Active personnel</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Present Today</CardTitle>
              <UserCheck className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{attendanceStats.present.toLocaleString()}</div>
              <div className="flex items-center gap-2">
                <p className="text-xs text-muted-foreground">
                  {attendanceStats.attendanceRate.toFixed(1)}% attendance rate
                </p>
                {trend !== "new" && (
                  <TrendingUp className={`w-3 h-3 ${
                    trend === "up" ? "text-green-500" : 
                    trend === "down" ? "text-red-500" : "text-gray-500"
                  }`} />
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Absent Today</CardTitle>
              <UserX className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{attendanceStats.absent}</div>
              <p className="text-xs text-muted-foreground">Including sick leaves</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Late Today</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{attendanceStats.late}</div>
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
              <div className="text-2xl font-bold text-yellow-600">{leaveStats.pending}</div>
              <p className="text-xs text-muted-foreground">Awaiting approval</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved Leaves</CardTitle>
              <Calendar className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{leaveStats.approved}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Leave Requests</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{leaveStats.total}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="leaves">Leave Requests</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest attendance and leave activities</CardDescription>
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
                      <p className="text-sm font-medium">Leave request approved</p>
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
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Unauthorized access attempt</p>
                      <p className="text-xs text-gray-500">1 hour ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pending Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Pending Actions</CardTitle>
                  <CardDescription>Items requiring your attention</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Leave Requests</p>
                      <p className="text-xs text-gray-500">Awaiting approval</p>
                    </div>
                    <Badge variant="destructive">{leaveStats.pending}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Attendance Corrections</p>
                      <p className="text-xs text-gray-500">Manual review needed</p>
                    </div>
                    <Badge variant="secondary">7</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">System Alerts</p>
                      <p className="text-xs text-gray-500">Security notifications</p>
                    </div>
                    <Badge variant="outline">3</Badge>
                  </div>
                  <Button className="w-full mt-4">Review All Pending Items</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="attendance">
            <AttendanceTable selectedDate={selectedDate} />
          </TabsContent>

          <TabsContent value="leaves">
            <LeaveRequestsTable />
          </TabsContent>

          <TabsContent value="reports">
            <ReportsSection />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
