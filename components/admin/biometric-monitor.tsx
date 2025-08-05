"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Fingerprint, Users, Clock, CheckCircle, XCircle, AlertTriangle, Activity } from "lucide-react"
import { dataStore } from "@/lib/data-store"
import { format } from "date-fns"

export function BiometricMonitor() {
  const [selectedDate, setSelectedDate] = useState(format(new Date(), "yyyy-MM-dd"))
  const [scannerStatus, setScannerStatus] = useState("all")
  const [biometricRecords, setBiometricRecords] = useState<any[]>([])
  const [stats, setStats] = useState({
    totalScans: 0,
    successfulScans: 0,
    failedScans: 0,
    activeScanners: 3,
    averageScanTime: 2.5,
  })

  useEffect(() => {
    loadBiometricData()
  }, [selectedDate, scannerStatus])

  const loadBiometricData = () => {
    // Get attendance records that were logged via biometric scanner
    const records = dataStore.getAttendanceRecords(selectedDate)
    const biometricRecords = records.filter(record => 
      record.location && record.location.includes("Biometric Scanner")
    )

    // Filter by scanner status if needed
    let filteredRecords = biometricRecords
    if (scannerStatus !== "all") {
      filteredRecords = biometricRecords.filter(record => 
        record.status === scannerStatus
      )
    }

    setBiometricRecords(filteredRecords)

    // Calculate stats
    const totalScans = biometricRecords.length
    const successfulScans = biometricRecords.filter(r => r.status !== "absent").length
    const failedScans = biometricRecords.filter(r => r.status === "absent").length

    setStats({
      totalScans,
      successfulScans,
      failedScans,
      activeScanners: 3, // Mock data
      averageScanTime: 2.5, // Mock data
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
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getScannerLocation = (location: string) => {
    if (location.includes("Main Office")) return "Main Office - Scanner 1"
    if (location.includes("Building A")) return "Building A - Scanner 2"
    if (location.includes("Building B")) return "Building B - Scanner 3"
    return location
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Biometric Scanner Monitor</h1>
          <p className="text-gray-600">Real-time monitoring of biometric attendance systems</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Activity className="w-4 h-4 mr-2" />
            Live Monitor
          </Button>
          <Button>
            <Fingerprint className="w-4 h-4 mr-2" />
            Scanner Status
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
            <Fingerprint className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalScans}</div>
            <p className="text-xs text-muted-foreground">Today's scans</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Successful Scans</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.successfulScans}</div>
            <p className="text-xs text-muted-foreground">
              {stats.totalScans > 0 ? ((stats.successfulScans / stats.totalScans) * 100).toFixed(1) : 0}% success rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Scans</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.failedScans}</div>
            <p className="text-xs text-muted-foreground">Authentication failures</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Scanners</CardTitle>
            <div className="h-4 w-4 text-blue-600">📱</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.activeScanners}</div>
            <p className="text-xs text-muted-foreground">Online devices</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Scan Time</CardTitle>
            <Clock className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{stats.averageScanTime}s</div>
            <p className="text-xs text-muted-foreground">Per authentication</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Biometric Scan Records</CardTitle>
          <CardDescription>Detailed log of all biometric authentication attempts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label className="text-sm font-medium">Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="w-[200px]">
              <label className="text-sm font-medium">Status</label>
              <Select value={scannerStatus} onValueChange={setScannerStatus}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="present">Present</SelectItem>
                  <SelectItem value="late">Late</SelectItem>
                  <SelectItem value="absent">Absent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Biometric Records Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Scanner Location</TableHead>
                  <TableHead>Time In</TableHead>
                  <TableHead>Time Out</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Scan Quality</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {biometricRecords.map((record) => {
                  const employee = dataStore.getEmployeeById(record.employeeId)
                  return (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">
                        <div>
                          <div>{employee?.name || "Unknown"}</div>
                          <div className="text-sm text-gray-500">{employee?.employeeId}</div>
                        </div>
                      </TableCell>
                      <TableCell>{getScannerLocation(record.location)}</TableCell>
                      <TableCell className="font-mono">
                        {record.timeIn || "Not logged"}
                      </TableCell>
                      <TableCell className="font-mono">
                        {record.timeOut || "Not logged"}
                      </TableCell>
                      <TableCell>{getStatusBadge(record.status)}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          High Quality
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                          <Button variant="ghost" size="sm">
                            Verify
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
                {biometricRecords.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      No biometric scan records found for the selected date and filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Scanner Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              Main Office - Scanner 1
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Status: <span className="text-green-600 font-medium">Online</span></p>
              <p className="text-sm text-gray-600">Last Scan: 2 minutes ago</p>
              <p className="text-sm text-gray-600">Today's Scans: 45</p>
              <p className="text-sm text-gray-600">Success Rate: 98.2%</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              Building A - Scanner 2
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Status: <span className="text-green-600 font-medium">Online</span></p>
              <p className="text-sm text-gray-600">Last Scan: 5 minutes ago</p>
              <p className="text-sm text-gray-600">Today's Scans: 32</p>
              <p className="text-sm text-gray-600">Success Rate: 96.9%</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              Building B - Scanner 3
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Status: <span className="text-green-600 font-medium">Online</span></p>
              <p className="text-sm text-gray-600">Last Scan: 1 minute ago</p>
              <p className="text-sm text-gray-600">Today's Scans: 28</p>
              <p className="text-sm text-gray-600">Success Rate: 97.1%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            Security Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-yellow-600" />
              <div>
                <p className="text-sm font-medium text-yellow-800">Multiple Failed Attempts</p>
                <p className="text-xs text-yellow-700">Employee ID: EMP003 - 3 failed scans in 10 minutes</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <Activity className="w-4 h-4 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-blue-800">Scanner Maintenance</p>
                <p className="text-xs text-blue-700">Building A Scanner scheduled for maintenance tomorrow</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 