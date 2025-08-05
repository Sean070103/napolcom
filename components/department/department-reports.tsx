"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts"
import { 
  Download, 
  Calendar, 
  Users, 
  TrendingUp, 
  TrendingDown,
  FileText,
  PieChart as PieChartIcon,
  BarChart3
} from "lucide-react"
import { dataStore } from "@/lib/data-store"
import { format, subDays, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns"

interface DepartmentReportsProps {
  departmentName?: string
}

export function DepartmentReports({ departmentName }: DepartmentReportsProps) {
  const [selectedReport, setSelectedReport] = useState("attendance")
  const [dateRange, setDateRange] = useState("month")
  const [attendanceData, setAttendanceData] = useState<any[]>([])
  const [leaveData, setLeaveData] = useState<any[]>([])
  const [summaryStats, setSummaryStats] = useState({
    totalEmployees: 0,
    averageAttendance: 0,
    totalLeaveRequests: 0,
    pendingLeaves: 0,
  })

  useEffect(() => {
    if (!departmentName) return
    loadReportData()
  }, [dateRange, departmentName])

  const loadReportData = () => {
    if (!departmentName) return
    
    const employees = dataStore.getEmployees().filter(emp => emp.department === departmentName)
    
    // Get date range
    let startDate: Date
    let endDate = new Date()
    
    switch (dateRange) {
      case "week":
        startDate = subDays(new Date(), 7)
        break
      case "month":
        startDate = startOfMonth(new Date())
        endDate = endOfMonth(new Date())
        break
      case "quarter":
        startDate = subDays(new Date(), 90)
        break
      default:
        startDate = subDays(new Date(), 30)
    }

    // Generate attendance data for department
    const days = eachDayOfInterval({ start: startDate, end: endDate })
    const attendanceStats = days.map(day => {
      const dateStr = format(day, "yyyy-MM-dd")
      const allStats = dataStore.getAttendanceStats(dateStr)
      const departmentRecords = dataStore.getAttendanceRecords(dateStr).filter(record => 
        employees.some(emp => emp.employeeId === record.employeeId)
      )
      
      const present = departmentRecords.filter(r => r.status === "present").length
      const absent = departmentRecords.filter(r => r.status === "absent").length
      const late = departmentRecords.filter(r => r.status === "late").length
      const onLeave = departmentRecords.filter(r => r.status === "on-leave").length
      const attendanceRate = employees.length > 0 ? (present / employees.length) * 100 : 0
      
      return {
        date: format(day, "MMM dd"),
        present,
        absent,
        late,
        onLeave,
        attendanceRate,
      }
    })

    // Generate leave data for department
    const leaveRequests = dataStore.getLeaveRequests()
    const departmentLeaves = leaveRequests.filter(request => 
      employees.some(emp => emp.employeeId === request.employeeId)
    )
    
    const leaveStats = departmentLeaves.map(request => {
      const employee = employees.find(emp => emp.employeeId === request.employeeId)
      return {
        ...request,
        employeeName: employee?.name || "Unknown",
        department: employee?.department || "Unknown",
      }
    })

    setAttendanceData(attendanceStats)
    setLeaveData(leaveStats)

    // Calculate summary stats
    const totalEmployees = employees.length
    const averageAttendance = attendanceStats.length > 0 
      ? attendanceStats.reduce((sum, day) => sum + day.attendanceRate, 0) / attendanceStats.length 
      : 0
    const totalLeaveRequests = departmentLeaves.length
    const pendingLeaves = departmentLeaves.filter(r => r.status === "pending").length

    setSummaryStats({
      totalEmployees,
      averageAttendance,
      totalLeaveRequests,
      pendingLeaves,
    })
  }

  const getLeaveTypeColor = (type: string) => {
    const colors = {
      vacation: "#8884d8",
      sick: "#82ca9d",
      emergency: "#ffc658",
      maternity: "#ff7300",
      paternity: "#00ff00",
      study: "#0088fe",
      bereavement: "#ff0000",
    }
    return colors[type as keyof typeof colors] || "#8884d8"
  }

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

  return (
    <div className="space-y-6">
      {/* Report Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Department Reports & Analytics</CardTitle>
          <CardDescription>Generate reports specific to {departmentName}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={selectedReport} onValueChange={setSelectedReport}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="attendance">Attendance Report</SelectItem>
                <SelectItem value="leave">Leave Report</SelectItem>
                <SelectItem value="performance">Performance Report</SelectItem>
                <SelectItem value="summary">Summary Report</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Last Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">Last Quarter</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Department Size</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryStats.totalEmployees}</div>
            <p className="text-xs text-muted-foreground">Team members</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Attendance</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {summaryStats.averageAttendance.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">This period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leave Requests</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{summaryStats.totalLeaveRequests}</div>
            <p className="text-xs text-muted-foreground">Total requests</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Leaves</CardTitle>
            <TrendingDown className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{summaryStats.pendingLeaves}</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      {selectedReport === "attendance" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Department Attendance Trend</CardTitle>
              <CardDescription>Daily attendance rate for {departmentName}</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="attendanceRate" 
                    stroke="#8884d8" 
                    strokeWidth={2}
                    name="Attendance Rate (%)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Attendance Breakdown</CardTitle>
              <CardDescription>Status distribution for the period</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={attendanceData.slice(-7)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="present" fill="#82ca9d" name="Present" />
                  <Bar dataKey="late" fill="#ffc658" name="Late" />
                  <Bar dataKey="absent" fill="#ff0000" name="Absent" />
                  <Bar dataKey="onLeave" fill="#0088fe" name="On Leave" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {selectedReport === "leave" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Leave Type Distribution</CardTitle>
              <CardDescription>Breakdown by leave type for {departmentName}</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={leaveData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="days"
                  >
                    {leaveData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getLeaveTypeColor(entry.leaveType)} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Leave Status Distribution</CardTitle>
              <CardDescription>Approval status breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={leaveData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="leaveType" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="days" fill="#8884d8" name="Days Requested" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Detailed Tables */}
      <Card>
        <CardHeader>
          <CardTitle>
            {selectedReport === "attendance" && "Department Attendance Details"}
            {selectedReport === "leave" && "Department Leave Request Details"}
            {selectedReport === "performance" && "Department Performance Details"}
            {selectedReport === "summary" && "Department Summary"}
          </CardTitle>
          <CardDescription>
            Detailed breakdown of {selectedReport} data for {departmentName}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {selectedReport === "attendance" && (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Present</TableHead>
                    <TableHead>Late</TableHead>
                    <TableHead>Absent</TableHead>
                    <TableHead>On Leave</TableHead>
                    <TableHead>Attendance Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceData.map((day, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{day.date}</TableCell>
                      <TableCell>{day.present}</TableCell>
                      <TableCell>{day.late}</TableCell>
                      <TableCell>{day.absent}</TableCell>
                      <TableCell>{day.onLeave}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{day.attendanceRate.toFixed(1)}%</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {selectedReport === "leave" && (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Leave Type</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Applied Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaveData.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.employeeName}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{request.leaveType}</Badge>
                      </TableCell>
                      <TableCell>{request.days} days</TableCell>
                      <TableCell>
                        <Badge 
                          className={request.status === "approved" ? "bg-green-100 text-green-800" :
                                   request.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                                   "bg-red-100 text-red-800"}
                        >
                          {request.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{format(new Date(request.createdAt), "MMM dd, yyyy")}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
