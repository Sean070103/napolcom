"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { useAuth } from "@/lib/auth-context"
import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Clock, 
  CheckCircle,
  XCircle,
  Calendar,
  TrendingUp,
  BarChart3
} from "lucide-react"
import { useState, useEffect } from "react"

function AttendanceContent() {
  const { user } = useAuth()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isClockingIn, setIsClockingIn] = useState(false)
  const [isClockingOut, setIsClockingOut] = useState(false)
  const [todayStatus, setTodayStatus] = useState({
    clockIn: null as string | null,
    clockOut: null as string | null,
    status: "not-started" as "not-started" | "present" | "completed"
  })

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const handleClockIn = () => {
    setIsClockingIn(true)
    // Simulate API call
    setTimeout(() => {
      const clockInTime = currentTime.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit' 
      })
      setTodayStatus({
        clockIn: clockInTime,
        clockOut: null,
        status: "present"
      })
      setIsClockingIn(false)
    }, 1000)
  }

  const handleClockOut = () => {
    setIsClockingOut(true)
    // Simulate API call
    setTimeout(() => {
      const clockOutTime = currentTime.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit' 
      })
      setTodayStatus({
        ...todayStatus,
        clockOut: clockOutTime,
        status: "completed"
      })
      setIsClockingOut(false)
    }, 1000)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return <Badge variant="default" className="flex items-center space-x-1">
          <CheckCircle className="h-3 w-3" />
          <span>Present</span>
        </Badge>
      case 'completed':
        return <Badge variant="default" className="flex items-center space-x-1">
          <CheckCircle className="h-3 w-3" />
          <span>Completed</span>
        </Badge>
      case 'not-started':
        return <Badge variant="secondary" className="flex items-center space-x-1">
          <Clock className="h-3 w-3" />
          <span>Not Started</span>
        </Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const canClockIn = !todayStatus.clockIn
  const canClockOut = todayStatus.clockIn && !todayStatus.clockOut

  return (
    <AppLayout userRole="user">
      <div className="space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-xl p-8 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span className="text-sm font-medium opacity-90">Attendance</span>
              </div>
              <h1 className="text-3xl font-bold">Track Your Time</h1>
              <p className="text-green-100 text-lg">Record your work hours and attendance.</p>
            </div>
            <div className="h-16 w-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Clock className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>

        {/* Current Time and Clock In/Out */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Time */}
          <Card className="card-hover border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-xl">
                <Clock className="h-6 w-6 text-blue-600" />
                <span>Current Time</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {currentTime.toLocaleTimeString('en-US', { 
                    hour12: false, 
                    hour: '2-digit', 
                    minute: '2-digit', 
                    second: '2-digit' 
                  })}
                </div>
                <p className="text-sm text-gray-600">
                  {currentTime.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Today's Status */}
          <Card className="card-hover border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-xl">
                <Calendar className="h-6 w-6 text-green-600" />
                <span>Today's Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Status:</span>
                  {getStatusBadge(todayStatus.status)}
                </div>
                {todayStatus.clockIn && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Clock In:</span>
                    <span className="text-sm font-medium">{todayStatus.clockIn}</span>
                  </div>
                )}
                {todayStatus.clockOut && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Clock Out:</span>
                    <span className="text-sm font-medium">{todayStatus.clockOut}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Clock In/Out Actions */}
          <Card className="card-hover border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-xl">
                <Clock className="h-6 w-6 text-purple-600" />
                <span>Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {canClockIn && (
                  <Button 
                    className="w-full" 
                    onClick={handleClockIn}
                    disabled={isClockingIn}
                  >
                    {isClockingIn ? "Clocking In..." : "Clock In"}
                  </Button>
                )}
                {canClockOut && (
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={handleClockOut}
                    disabled={isClockingOut}
                  >
                    {isClockingOut ? "Clocking Out..." : "Clock Out"}
                  </Button>
                )}
                {todayStatus.status === "present" && (
                  <div className="text-center">
                    <Badge variant="default" className="mb-2">
                      Currently Clocked In
                    </Badge>
                    <p className="text-xs text-gray-600">
                      Started at {todayStatus.clockIn}
                    </p>
                  </div>
                )}
                {todayStatus.status === "completed" && (
                  <div className="text-center">
                    <Badge variant="default" className="mb-2">
                      Day Completed
                    </Badge>
                    <p className="text-xs text-gray-600">
                      {todayStatus.clockIn} - {todayStatus.clockOut}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Attendance Information */}
        <Card className="card-hover border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-xl">
              <BarChart3 className="h-6 w-6 text-orange-600" />
              <span>Attendance Information</span>
            </CardTitle>
            <CardDescription className="text-base">
              Your attendance records and information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Clock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No attendance records</h3>
              <p className="text-gray-600">
                Your attendance records will appear here once you start clocking in and out.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}

export default function AttendancePage() {
  return (
    <ProtectedRoute requiredRoles={['user']}>
      <AttendanceContent />
    </ProtectedRoute>
  )
}
