"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download, Calendar, Clock, TrendingUp, TrendingDown } from "lucide-react"
import { dataStore } from "@/lib/data-store"
import { format, subDays, startOfMonth, endOfMonth } from "date-fns"

interface AttendanceHistoryProps {
  employeeId: string
}

export function AttendanceHistory({ employeeId }: AttendanceHistoryProps) {
  const [attendanceRecords, setAttendanceRecords] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [stats, setStats] = useState({
    totalDays: 0,
    presentDays: 0,
    absentDays: 0,
    lateDays: 0,
    averageHours: 0,
  })

  useEffect(() => {
    loadAttendanceData()
  }, [employeeId, dateFilter])

  const loadAttendanceData = () => {
    let startDate: string | undefined
    let endDate: string | undefined

    switch (dateFilter) {
      case "week":
        startDate = format(subDays(new Date(), 7), "yyyy-MM-dd")
        endDate = format(new Date(), "yyyy-MM-dd")
        break
      case "month":
        startDate = format(startOfMonth(new Date()), "yyyy-MM-dd")
        endDate = format(endOfMonth(new Date()), "yyyy-MM-dd")
        break
      case "quarter":
        startDate = format(subDays(new Date(), 90), "yyyy-MM-dd")
        endDate = format(new Date(), "yyyy-MM-dd")
        break
      default:
        // All time
        break
    }

    const records = dataStore.getAttendanceByEmployee(employeeId, startDate, endDate)
    setAttendanceRecords(records)
    calculateStats(records)
  }

  const calculateStats = (records: any[]) => {
    const totalDays = records.length
    const presentDays = records.filter(r => r.status === "present").length
    const absentDays = records.filter(r => r.status === "absent").length
    const lateDays = records.filter(r => r.status === "late").length

    // Calculate average working hours
    const workingRecords = records.filter(r => r.timeIn && r.timeOut)
    let totalHours = 0
    workingRecords.forEach(record => {
      const timeIn = new Date(`2000-01-01T${record.timeIn}:00`)
      const timeOut = new Date(`2000-01-01T${record.timeOut}:00`)
      const diffMs = timeOut.getTime() - timeIn.getTime()
      const diffHours = diffMs / (1000 * 60 * 60)
      totalHours += diffHours
    })

    const averageHours = workingRecords.length > 0 ? totalHours / workingRecords.length : 0

    setStats({
      totalDays,
      presentDays,
      absentDays,
      lateDays,
      averageHours: Math.round(averageHours * 10) / 10,
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "present":
        return <Badge className="bg-green-100 text-green-800">Present</Badge>
      case "late":
        return <Badge className="bg-orange-100 text-orange-800">Late</Badge>
      case "absent":
        return <Badge className="bg-red-100 text-red-800">Absent</Badge>
      case "on-leave":
        return <Badge className="bg-blue-100 text-blue-800">On Leave</Badge>
      case "half-day":
        return <Badge className="bg-yellow-100 text-yellow-800">Half Day</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getWorkingHours = (timeIn: string, timeOut: string) => {
    if (!timeIn || !timeOut) return "N/A"
    
    const start = new Date(`2000-01-01T${timeIn}:00`)
    const end = new Date(`2000-01-01T${timeOut}:00`)
    const diffMs = end.getTime() - start.getTime()
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60))
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
    
    return `${diffHrs}h ${diffMins}m`
  }

  const filteredRecords = attendanceRecords.filter((record) => {
    const matchesSearch = record.date.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || record.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const attendanceRate = stats.totalDays > 0 ? (stats.presentDays / stats.totalDays) * 100 : 0

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Days</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDays}</div>
            <p className="text-xs text-muted-foreground">Tracked period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Present Days</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.presentDays}</div>
            <p className="text-xs text-muted-foreground">
              {attendanceRate.toFixed(1)}% attendance rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Absent Days</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.absentDays}</div>
            <p className="text-xs text-muted-foreground">Including leaves</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Late Days</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.lateDays}</div>
            <p className="text-xs text-muted-foreground">Tardiness incidents</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Hours</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.averageHours}h</div>
            <p className="text-xs text-muted-foreground">Per working day</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Attendance History</CardTitle>
          <CardDescription>Your attendance records and history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by date..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="week">Last Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">Last 3 Months</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="present">Present</SelectItem>
                <SelectItem value="late">Late</SelectItem>
                <SelectItem value="absent">Absent</SelectItem>
                <SelectItem value="on-leave">On Leave</SelectItem>
                <SelectItem value="half-day">Half Day</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Time In</TableHead>
                  <TableHead>Time Out</TableHead>
                  <TableHead>Working Hours</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Overtime</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <div className="flex flex-col items-center gap-2">
                        <Calendar className="w-12 h-12 text-gray-400" />
                        <p className="text-gray-500">No attendance records found</p>
                        <p className="text-sm text-gray-400">
                          Your attendance history will appear here
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
                {filteredRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">
                      {format(new Date(record.date), "MMM dd, yyyy")}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        {record.timeIn || "Not logged in"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        {record.timeOut || "Not logged out"}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getWorkingHours(record.timeIn, record.timeOut)}
                    </TableCell>
                    <TableCell>{getStatusBadge(record.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        {record.location || "N/A"}
                      </div>
                    </TableCell>
                    <TableCell>{record.overtime}h</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
