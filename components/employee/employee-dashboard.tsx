"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Calendar, MapPin, CheckCircle, User, AlertCircle, Fingerprint } from "lucide-react"
import { EmployeeLayout } from "@/components/layouts/employee-layout"
import { AttendanceLogger } from "@/components/employee/attendance-logger"
import { LeaveRequestForm } from "@/components/employee/leave-request-form"
import { AttendanceHistory } from "@/components/employee/attendance-history"
import { dataStore } from "@/lib/data-store"
import { format } from "date-fns"

export function EmployeeDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [employeeData, setEmployeeData] = useState<any>(null)
  const [todayAttendance, setTodayAttendance] = useState<any>(null)
  const [leaveBalances, setLeaveBalances] = useState<any>(null)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    // Get current user from localStorage (in real app, this would come from auth context)
    const userStr = localStorage.getItem("user")
    if (userStr) {
      const user = JSON.parse(userStr)
      const employee = dataStore.getEmployeeByEmail(user.email)
      
      if (employee) {
        setEmployeeData(employee)
        setLeaveBalances(employee.leaveBalances)
        
        // Get today's attendance
        const today = format(new Date(), "yyyy-MM-dd")
        const attendance = dataStore.getAttendanceByEmployee(employee.employeeId, today, today)[0]
        setTodayAttendance(attendance)
      }
    }
  }, [])

  if (!employeeData) {
    return (
      <EmployeeLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Loading employee data...</p>
          </div>
        </div>
      </EmployeeLayout>
    )
  }

  const getWorkingHours = () => {
    if (!todayAttendance || !todayAttendance.timeIn) return "0h 0m"
    
    const timeIn = new Date(`2000-01-01T${todayAttendance.timeIn}:00`)
    const timeOut = todayAttendance.timeOut ? new Date(`2000-01-01T${todayAttendance.timeOut}:00`) : currentTime
    
    const diffMs = timeOut.getTime() - timeIn.getTime()
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60))
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
    
    return `${diffHrs}h ${diffMins}m`
  }

  const getAttendanceStatus = () => {
    if (!todayAttendance) return "Not logged in"
    if (!todayAttendance.timeIn) return "Not logged in"
    if (!todayAttendance.timeOut) return "Present"
    return "Completed"
  }

  return (
    <EmployeeLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {employeeData.name}!</h1>
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
            <div className="text-sm text-gray-500">Employee ID</div>
            <div className="font-medium">{employeeData.employeeId}</div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Status</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{getAttendanceStatus()}</div>
              <p className="text-xs text-muted-foreground">
                {todayAttendance?.timeIn ? `Logged in at ${todayAttendance.timeIn}` : "Not logged in yet"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Working Hours</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{getWorkingHours()}</div>
              <p className="text-xs text-muted-foreground">Today's total</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vacation Leave</CardTitle>
              <Calendar className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{leaveBalances?.vacation || 0}</div>
              <p className="text-xs text-muted-foreground">Days remaining</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Location</CardTitle>
              <MapPin className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">Office</div>
              <p className="text-xs text-muted-foreground">Main Building</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="attendance" className="space-y-4">
          <TabsList>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="leaves">Leave Requests</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="attendance" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AttendanceLogger employeeId={employeeData.employeeId} />

              <Card>
                <CardHeader>
                  <CardTitle>Today's Summary</CardTitle>
                  <CardDescription>Your attendance details for today</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Time In:</span>
                    <Badge variant="outline">{todayAttendance?.timeIn || "Not logged in"}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Time Out:</span>
                    <Badge variant="outline">{todayAttendance?.timeOut || "Not logged out"}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Status:</span>
                    <Badge className="bg-green-100 text-green-800">{getAttendanceStatus()}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Location:</span>
                    <span className="text-sm">{todayAttendance?.location || "Main Office"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Working Hours:</span>
                    <span className="text-sm font-bold">{getWorkingHours()}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Biometric Scanner Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Fingerprint className="w-5 h-5" />
                  Biometric Attendance
                </CardTitle>
                <CardDescription>
                  Use biometric authentication for secure attendance logging
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                    <Fingerprint className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg font-semibold text-gray-700">Biometric Scanner Available</p>
                    <p className="text-sm text-gray-500 mb-4">
                      Use your fingerprint for secure attendance logging
                    </p>
                    <Button asChild>
                      <a href="/employee/biometric">
                        <Fingerprint className="w-4 h-4 mr-2" />
                        Access Biometric Scanner
                      </a>
                    </Button>
                  </div>
                  <div className="text-xs text-gray-500">
                    <p>• Secure fingerprint authentication</p>
                    <p>• Real-time attendance logging</p>
                    <p>• Automatic status determination</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leaves" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <LeaveRequestForm employeeId={employeeData.employeeId} />

              <Card>
                <CardHeader>
                  <CardTitle>Leave Balances</CardTitle>
                  <CardDescription>Your available leave credits</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Vacation Leave:</span>
                    <Badge variant="outline">{leaveBalances?.vacation || 0} days</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Sick Leave:</span>
                    <Badge variant="outline">{leaveBalances?.sick || 0} days</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Emergency Leave:</span>
                    <Badge variant="outline">{leaveBalances?.emergency || 0} days</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Study Leave:</span>
                    <Badge variant="outline">{leaveBalances?.study || 0} days</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Maternity/Paternity:</span>
                    <Badge variant="outline">{leaveBalances?.maternity || 0} days</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history">
            <AttendanceHistory employeeId={employeeData.employeeId} />
          </TabsContent>

          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Employee Profile</CardTitle>
                <CardDescription>Your personal and employment information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Full Name</label>
                    <p className="text-sm text-gray-600">{employeeData.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Employee ID</label>
                    <p className="text-sm text-gray-600">{employeeData.employeeId}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Department</label>
                    <p className="text-sm text-gray-600">{employeeData.department}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Position</label>
                    <p className="text-sm text-gray-600">{employeeData.position}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <p className="text-sm text-gray-600">{employeeData.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Hire Date</label>
                    <p className="text-sm text-gray-600">{format(new Date(employeeData.hireDate), "MMM dd, yyyy")}</p>
                  </div>
                </div>
                <Button variant="outline" className="mt-4 bg-transparent">
                  <User className="w-4 h-4 mr-2" />
                  Update Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </EmployeeLayout>
  )
}
