"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Fingerprint, User, Clock, CheckCircle, XCircle, AlertCircle, Scan } from "lucide-react"
import { dataStore } from "@/lib/data-store"
import { format } from "date-fns"

interface BiometricScannerProps {
  employeeId: string
  onAttendanceLogged?: (success: boolean) => void
}

type ScanStatus = 'idle' | 'scanning' | 'processing' | 'success' | 'error' | 'timeout'

export function BiometricScanner({ employeeId, onAttendanceLogged }: BiometricScannerProps) {
  const [scanStatus, setScanStatus] = useState<ScanStatus>('idle')
  const [scanProgress, setScanProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [employee, setEmployee] = useState<any>(null)
  const [todayAttendance, setTodayAttendance] = useState<any>(null)
  const [scanMessage, setScanMessage] = useState("")
  const [scanAttempts, setScanAttempts] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    // Get employee data
    const emp = dataStore.getEmployeeById(employeeId)
    setEmployee(emp)

    // Get today's attendance
    const today = format(new Date(), "yyyy-MM-dd")
    const attendance = dataStore.getAttendanceByEmployee(employeeId, today, today)[0]
    setTodayAttendance(attendance)
  }, [employeeId])

  const simulateBiometricScan = async () => {
    setScanStatus('scanning')
    setScanProgress(0)
    setScanMessage("Please place your finger on the scanner...")
    setScanAttempts(prev => prev + 1)

    // Simulate scanning process
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 100))
      setScanProgress(i)
      
      if (i === 30) {
        setScanMessage("Reading fingerprint pattern...")
      } else if (i === 60) {
        setScanMessage("Verifying identity...")
      } else if (i === 90) {
        setScanMessage("Processing attendance...")
      }
    }

    // Simulate success/failure based on attempts
    const success = scanAttempts < 3 || Math.random() > 0.2

    if (success) {
      setScanStatus('processing')
      setScanMessage("Identity verified. Logging attendance...")
      
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Log attendance
      const today = format(new Date(), "yyyy-MM-dd")
      const now = format(new Date(), "HH:mm")
      
      let status = "present"
      const hour = new Date().getHours()
      const minute = new Date().getMinutes()
      
      // Determine if late (after 8:30 AM)
      if (hour > 8 || (hour === 8 && minute > 30)) {
        status = "late"
      }

      // Check if already logged in today
      if (todayAttendance && todayAttendance.timeIn) {
        // Log out
        const updatedRecord = dataStore.updateAttendanceRecord(todayAttendance.id, {
          timeOut: now,
          status: todayAttendance.status,
          updatedAt: new Date().toISOString()
        })
        
        if (updatedRecord) {
          setTodayAttendance(updatedRecord)
          setScanStatus('success')
          setScanMessage("Time out logged successfully!")
          onAttendanceLogged?.(true)
        }
      } else {
        // Log in
        const newRecord = dataStore.addAttendanceRecord({
          employeeId: employeeId,
          date: today,
          timeIn: now,
          timeOut: null,
          status: status as any,
          location: "Biometric Scanner - Main Office",
          overtime: 0,
          remarks: `Biometric scan at ${now}`,
        })
        
        if (newRecord) {
          setTodayAttendance(newRecord)
          setScanStatus('success')
          setScanMessage(`Time in logged successfully! Status: ${status}`)
          onAttendanceLogged?.(true)
        }
      }
    } else {
      setScanStatus('error')
      setScanMessage("Fingerprint not recognized. Please try again.")
      onAttendanceLogged?.(false)
    }

    // Reset after 3 seconds
    setTimeout(() => {
      setScanStatus('idle')
      setScanProgress(0)
      setScanMessage("")
    }, 3000)
  }

  const getStatusColor = () => {
    switch (scanStatus) {
      case 'scanning':
        return 'text-blue-600'
      case 'processing':
        return 'text-yellow-600'
      case 'success':
        return 'text-green-600'
      case 'error':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  const getStatusIcon = () => {
    switch (scanStatus) {
      case 'scanning':
        return <Scan className="w-6 h-6 animate-pulse" />
      case 'processing':
        return <Clock className="w-6 h-6 animate-spin" />
      case 'success':
        return <CheckCircle className="w-6 h-6" />
      case 'error':
        return <XCircle className="w-6 h-6" />
      default:
        return <Fingerprint className="w-6 h-6" />
    }
  }

  const getAttendanceStatus = () => {
    if (!todayAttendance) return "Not logged in today"
    if (todayAttendance.timeIn && !todayAttendance.timeOut) return "Currently logged in"
    if (todayAttendance.timeIn && todayAttendance.timeOut) return "Completed for today"
    return "Not logged in today"
  }

  const getAttendanceStatusColor = () => {
    if (!todayAttendance) return "bg-gray-100 text-gray-800"
    if (todayAttendance.timeIn && !todayAttendance.timeOut) return "bg-green-100 text-green-800"
    if (todayAttendance.timeIn && todayAttendance.timeOut) return "bg-blue-100 text-blue-800"
    return "bg-gray-100 text-gray-800"
  }

  return (
    <div className="space-y-6">
      {/* Employee Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Employee Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          {employee && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Name</p>
                <p className="text-lg font-semibold">{employee.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Employee ID</p>
                <p className="text-lg font-semibold">{employee.employeeId}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Department</p>
                <p className="text-lg">{employee.department}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Current Time</p>
                <p className="text-lg font-mono">{format(currentTime, "HH:mm:ss")}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Biometric Scanner */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Fingerprint className="w-5 h-5" />
            Biometric Scanner
          </CardTitle>
          <CardDescription>
            Place your finger on the scanner to log your attendance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Scanner Status */}
          <div className="flex items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
            <div className="text-center space-y-4">
              <div className={`mx-auto ${getStatusColor()}`}>
                {getStatusIcon()}
              </div>
              <div>
                <p className="text-lg font-semibold">
                  {scanStatus === 'idle' && "Ready to Scan"}
                  {scanStatus === 'scanning' && "Scanning Fingerprint"}
                  {scanStatus === 'processing' && "Processing"}
                  {scanStatus === 'success' && "Success"}
                  {scanStatus === 'error' && "Error"}
                </p>
                {scanMessage && (
                  <p className="text-sm text-gray-600 mt-2">{scanMessage}</p>
                )}
              </div>
              
              {/* Progress Bar */}
              {scanStatus === 'scanning' && (
                <div className="w-full max-w-xs">
                  <Progress value={scanProgress} className="w-full" />
                  <p className="text-xs text-gray-500 mt-1">{scanProgress}%</p>
                </div>
              )}
            </div>
          </div>

          {/* Scan Button */}
          <div className="flex justify-center">
            <Button
              onClick={simulateBiometricScan}
              disabled={scanStatus !== 'idle'}
              size="lg"
              className="w-48 h-12"
            >
              <Fingerprint className="w-5 h-5 mr-2" />
              {scanStatus === 'idle' ? "Start Scan" : "Scanning..."}
            </Button>
          </div>

          {/* Error Alert */}
          {scanStatus === 'error' && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Biometric scan failed. Please ensure your finger is properly placed on the scanner and try again.
              </AlertDescription>
            </Alert>
          )}

          {/* Success Alert */}
          {scanStatus === 'success' && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Attendance logged successfully! Your biometric data has been verified and recorded.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Today's Attendance Status */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Status:</span>
              <Badge className={getAttendanceStatusColor()}>
                {getAttendanceStatus()}
              </Badge>
            </div>
            
            {todayAttendance && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Time In</p>
                  <p className="text-lg font-mono">
                    {todayAttendance.timeIn || "Not logged"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Time Out</p>
                  <p className="text-lg font-mono">
                    {todayAttendance.timeOut || "Not logged"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Location</p>
                  <p className="text-sm">{todayAttendance.location || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Status</p>
                  <Badge variant="outline">{todayAttendance.status}</Badge>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Biometric Scanner Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p>• Ensure your finger is clean and dry before scanning</p>
            <p>• Place your finger firmly on the scanner surface</p>
            <p>• Keep your finger steady during the scanning process</p>
            <p>• Wait for the green light before removing your finger</p>
            <p>• If scan fails, try again with a different finger</p>
            <p>• Contact IT support if you experience persistent issues</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 