"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download, MapPin, Clock, Users, Eye, Edit } from "lucide-react"
import { dataStore } from "@/lib/data-store"
import { format } from "date-fns"

interface TeamAttendanceTableProps {
  selectedDate?: string
  departmentName?: string
}

export function TeamAttendanceTable({ selectedDate, departmentName }: TeamAttendanceTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [attendanceData, setAttendanceData] = useState<any[]>([])

  useEffect(() => {
    if (!departmentName) return
    
    const date = selectedDate || format(new Date(), "yyyy-MM-dd")
    const employees = dataStore.getEmployees().filter(emp => emp.department === departmentName)
    const records = dataStore.getAttendanceRecords(date)
    
    // Combine attendance records with employee data
    const combinedData = employees.map(employee => {
      const record = records.find(r => r.employeeId === employee.employeeId)
      return {
        ...employee,
        attendance: record || {
          id: "",
          employeeId: employee.employeeId,
          date: date,
          timeIn: null,
          timeOut: null,
          status: "absent" as const,
          location: "",
          overtime: 0,
          remarks: "",
          createdAt: "",
          updatedAt: "",
        }
      }
    })
    
    setAttendanceData(combinedData)
  }, [selectedDate, departmentName])

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

  const filteredData = attendanceData.filter((record) => {
    const matchesSearch =
      record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || record.attendance.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleTimeIn = (employeeId: string) => {
    const now = new Date()
    const timeString = format(now, "HH:mm")
    
    const newRecord = dataStore.addAttendanceRecord({
      employeeId,
      date: selectedDate || format(new Date(), "yyyy-MM-dd"),
      timeIn: timeString,
      timeOut: null,
      status: "present",
      location: "Main Office",
      overtime: 0,
      remarks: "",
    })
    
    // Refresh data
    const date = selectedDate || format(new Date(), "yyyy-MM-dd")
    const employees = dataStore.getEmployees().filter(emp => emp.department === departmentName)
    const records = dataStore.getAttendanceRecords(date)
    const combinedData = employees.map(employee => {
      const record = records.find(r => r.employeeId === employee.employeeId)
      return {
        ...employee,
        attendance: record || {
          id: "",
          employeeId: employee.employeeId,
          date: date,
          timeIn: null,
          timeOut: null,
          status: "absent" as const,
          location: "",
          overtime: 0,
          remarks: "",
          createdAt: "",
          updatedAt: "",
        }
      }
    })
    setAttendanceData(combinedData)
  }

  const handleTimeOut = (employeeId: string) => {
    const now = new Date()
    const timeString = format(now, "HH:mm")
    
    const existingRecord = dataStore.getAttendanceRecords(selectedDate || format(new Date(), "yyyy-MM-dd"))
      .find(r => r.employeeId === employeeId)
    
    if (existingRecord) {
      dataStore.updateAttendanceRecord(existingRecord.id, {
        timeOut: timeString,
        updatedAt: new Date().toISOString()
      })
    }
    
    // Refresh data
    const date = selectedDate || format(new Date(), "yyyy-MM-dd")
    const employees = dataStore.getEmployees().filter(emp => emp.department === departmentName)
    const records = dataStore.getAttendanceRecords(date)
    const combinedData = employees.map(employee => {
      const record = records.find(r => r.employeeId === employee.employeeId)
      return {
        ...employee,
        attendance: record || {
          id: "",
          employeeId: employee.employeeId,
          date: date,
          timeIn: null,
          timeOut: null,
          status: "absent" as const,
          location: "",
          overtime: 0,
          remarks: "",
          createdAt: "",
          updatedAt: "",
        }
      }
    })
    setAttendanceData(combinedData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Attendance Monitor</CardTitle>
        <CardDescription>Real-time attendance tracking for {departmentName} team</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search team members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
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
                <TableHead>Employee</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Time In</TableHead>
                <TableHead>Time Out</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Overtime</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    <div className="flex flex-col items-center gap-2">
                      <Users className="w-12 h-12 text-gray-400" />
                      <p className="text-gray-500">No team members found</p>
                      <p className="text-sm text-gray-400">Team attendance will appear here</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
              {filteredData.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div>{record.name}</div>
                      <div className="text-sm text-gray-500">ID: {record.employeeId}</div>
                    </div>
                  </TableCell>
                  <TableCell>{record.position}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      {record.attendance.timeIn || "Not logged in"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      {record.attendance.timeOut || "Not logged out"}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(record.attendance.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      {record.attendance.location || "N/A"}
                    </div>
                  </TableCell>
                  <TableCell>{record.attendance.overtime}h</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {!record.attendance.timeIn && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleTimeIn(record.employeeId)}
                        >
                          Time In
                        </Button>
                      )}
                      {record.attendance.timeIn && !record.attendance.timeOut && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleTimeOut(record.employeeId)}
                        >
                          Time Out
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
