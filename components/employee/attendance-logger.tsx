"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { dataStore } from "@/lib/data-store"
import { format } from "date-fns"

interface AttendanceLoggerProps {
  employeeId: string
}

export function AttendanceLogger({ employeeId }: AttendanceLoggerProps) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [todayAttendance, setTodayAttendance] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    // Get today's attendance
    const today = format(new Date(), "yyyy-MM-dd")
    const attendance = dataStore.getAttendanceByEmployee(employeeId, today, today)[0]
    setTodayAttendance(attendance)
  }, [employeeId])

  const handleTimeIn = async () => {
    setIsLoading(true)
    setMessage("")
    
    try {
      const now = new Date()
      const timeString = format(now, "HH:mm")
      
      // Check if already logged in today
      if (todayAttendance?.timeIn) {
        setMessage("You have already logged in today!")
        return
      }
      
      const newRecord = dataStore.addAttendanceRecord({
        employeeId,
        date: format(new Date(), "yyyy-MM-dd"),
        timeIn: timeString,
        timeOut: null,
        status: "present",
        location: "Main Office",
        overtime: 0,
        remarks: "",
      })
      
      setTodayAttendance(newRecord)
      setMessage("Time in recorded successfully!")
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(""), 3000)
    } catch (error) {
      setMessage("Error recording time in. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleTimeOut = async () => {
    setIsLoading(true)
    setMessage("")
    
    try {
      const now = new Date()
      const timeString = format(now, "HH:mm")
      
      if (!todayAttendance?.timeIn) {
        setMessage("You need to log in first!")
        return
      }
      
      if (todayAttendance?.timeOut) {
        setMessage("You have already logged out today!")
        return
      }
      
      if (todayAttendance) {
        const updatedRecord = dataStore.updateAttendanceRecord(todayAttendance.id, {
          timeOut: timeString,
          updatedAt: new Date().toISOString()
        })
        
        setTodayAttendance(updatedRecord)
        setMessage("Time out recorded successfully!")
        
        // Clear message after 3 seconds
        setTimeout(() => setMessage(""), 3000)
      }
    } catch (error) {
      setMessage("Error recording time out. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const getStatus = () => {
    if (!todayAttendance) return "Not logged in"
    if (!todayAttendance.timeIn) return "Not logged in"
    if (!todayAttendance.timeOut) return "Present"
    return "Completed"
  }

  const getStatusColor = () => {
    const status = getStatus()
    switch (status) {
      case "Present":
        return "text-green-600"
      case "Completed":
        return "text-blue-600"
      default:
        return "text-gray-600"
    }
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

  const canTimeIn = !todayAttendance?.timeIn
  const canTimeOut = todayAttendance?.timeIn && !todayAttendance?.timeOut

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Attendance Logger
        </CardTitle>
        <CardDescription>Log your time in and time out</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Status */}
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold mb-2">{format(currentTime, "HH:mm:ss")}</div>
          <div className="text-sm text-gray-600">
            {format(currentTime, "EEEE, MMMM dd, yyyy")}
          </div>
        </div>

        {/* Status Display */}
        <div className="flex items-center justify-center gap-2">
          <div className={`text-lg font-semibold ${getStatusColor()}`}>
            {getStatus()}
          </div>
          {getStatus() === "Present" && (
            <CheckCircle className="w-5 h-5 text-green-600" />
          )}
          {getStatus() === "Completed" && (
            <XCircle className="w-5 h-5 text-blue-600" />
          )}
        </div>

        {/* Time Display */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-1">Time In</div>
            <div className="font-semibold">
              {todayAttendance?.timeIn || "Not logged in"}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-1">Time Out</div>
            <div className="font-semibold">
              {todayAttendance?.timeOut || "Not logged out"}
            </div>
          </div>
        </div>

        {/* Working Hours */}
        <div className="text-center">
          <div className="text-sm text-gray-600 mb-1">Working Hours</div>
          <div className="text-xl font-bold text-blue-600">{getWorkingHours()}</div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={handleTimeIn}
            disabled={!canTimeIn || isLoading}
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            {isLoading ? "Processing..." : "Time In"}
          </Button>
          <Button
            onClick={handleTimeOut}
            disabled={!canTimeOut || isLoading}
            variant="outline"
            className="flex-1"
          >
            {isLoading ? "Processing..." : "Time Out"}
          </Button>
        </div>

        {/* Message Display */}
        {message && (
          <div className={`p-3 rounded-lg text-sm ${
            message.includes("Error") || message.includes("already") 
              ? "bg-red-100 text-red-800" 
              : "bg-green-100 text-green-800"
          }`}>
            <div className="flex items-center gap-2">
              {message.includes("Error") || message.includes("already") ? (
                <AlertCircle className="w-4 h-4" />
              ) : (
                <CheckCircle className="w-4 h-4" />
              )}
              {message}
            </div>
          </div>
        )}

        {/* Location Info */}
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          Main Office - Building A
        </div>
      </CardContent>
    </Card>
  )
}
