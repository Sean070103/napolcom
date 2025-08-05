"use client"

import { BiometricScanner } from "@/components/employee/biometric-scanner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Fingerprint, Shield, Clock, CheckCircle } from "lucide-react"

export default function EmployeeBiometricPage() {
  // In a real app, this would come from authentication context
  const employeeId = "EMP001" // This would be the logged-in user's ID

  const handleAttendanceLogged = (success: boolean) => {
    if (success) {
      console.log("Attendance logged successfully via biometric scan")
    } else {
      console.log("Biometric scan failed")
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Biometric Attendance</h1>
          <p className="text-gray-600">Log your attendance using biometric authentication</p>
        </div>
      </div>

      {/* Security Notice */}
      <Alert className="border-blue-200 bg-blue-50">
        <Shield className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Security Notice:</strong> Your biometric data is encrypted and stored securely. 
          This system uses advanced fingerprint recognition technology for secure attendance logging.
        </AlertDescription>
      </Alert>

      {/* Biometric Scanner */}
      <BiometricScanner 
        employeeId={employeeId}
        onAttendanceLogged={handleAttendanceLogged}
      />

      {/* Additional Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Fingerprint className="w-5 h-5" />
              Biometric Security
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Your fingerprint data is encrypted and never stored in plain text. 
              The system only stores a mathematical representation of your biometric pattern.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Real-time Logging
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Attendance is logged immediately upon successful biometric verification. 
              No manual intervention required.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Automatic Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              The system automatically determines if you're on time, late, or have other 
              attendance status based on your scan time.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 