"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar, AlertCircle, CheckCircle, Clock } from "lucide-react"
import { dataStore } from "@/lib/data-store"
import { format, differenceInDays, addDays } from "date-fns"

interface LeaveRequestFormProps {
  employeeId: string
}

export function LeaveRequestForm({ employeeId }: LeaveRequestFormProps) {
  const [leaveType, setLeaveType] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [reason, setReason] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [employeeData, setEmployeeData] = useState<any>(null)
  const [calculatedDays, setCalculatedDays] = useState(0)

  useEffect(() => {
    const employee = dataStore.getEmployeeById(employeeId)
    if (employee) {
      setEmployeeData(employee)
    }
  }, [employeeId])

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate)
      const end = new Date(endDate)
      const days = differenceInDays(end, start) + 1
      setCalculatedDays(days > 0 ? days : 0)
    } else {
      setCalculatedDays(0)
    }
  }, [startDate, endDate])

  const getLeaveTypeLabel = (type: string) => {
    switch (type) {
      case "vacation":
        return "Vacation Leave"
      case "sick":
        return "Sick Leave"
      case "emergency":
        return "Emergency Leave"
      case "maternity":
        return "Maternity Leave"
      case "paternity":
        return "Paternity Leave"
      case "study":
        return "Study Leave"
      case "bereavement":
        return "Bereavement Leave"
      default:
        return type
    }
  }

  const getAvailableDays = (type: string) => {
    if (!employeeData) return 0
    return employeeData.leaveBalances[type] || 0
  }

  const canSubmitRequest = () => {
    return (
      leaveType &&
      startDate &&
      endDate &&
      reason.trim() &&
      calculatedDays > 0 &&
      calculatedDays <= getAvailableDays(leaveType)
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    try {
      if (!canSubmitRequest()) {
        setMessage("Please fill in all required fields and ensure you have sufficient leave balance.")
        return
      }

      const newRequest = dataStore.addLeaveRequest({
        employeeId,
        leaveType: leaveType as any,
        startDate,
        endDate,
        days: calculatedDays,
        reason: reason.trim(),
        status: "pending",
      })

      if (newRequest) {
        setMessage("Leave request submitted successfully!")
        
        // Reset form
        setLeaveType("")
        setStartDate("")
        setEndDate("")
        setReason("")
        setCalculatedDays(0)
        
        // Clear message after 3 seconds
        setTimeout(() => setMessage(""), 3000)
      }
    } catch (error) {
      setMessage("Error submitting leave request. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const getMinDate = () => {
    return format(addDays(new Date(), 1), "yyyy-MM-dd")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Submit Leave Request
        </CardTitle>
        <CardDescription>Request time off from work</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Leave Type */}
          <div className="space-y-2">
            <Label htmlFor="leaveType">Leave Type *</Label>
            <Select value={leaveType} onValueChange={setLeaveType}>
              <SelectTrigger>
                <SelectValue placeholder="Select leave type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vacation">Vacation Leave</SelectItem>
                <SelectItem value="sick">Sick Leave</SelectItem>
                <SelectItem value="emergency">Emergency Leave</SelectItem>
                <SelectItem value="study">Study Leave</SelectItem>
                <SelectItem value="maternity">Maternity Leave</SelectItem>
                <SelectItem value="paternity">Paternity Leave</SelectItem>
                <SelectItem value="bereavement">Bereavement Leave</SelectItem>
              </SelectContent>
            </Select>
            {leaveType && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-600">Available:</span>
                <Badge variant="outline">{getAvailableDays(leaveType)} days</Badge>
              </div>
            )}
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date *</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                min={getMinDate()}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date *</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={startDate || getMinDate()}
                required
              />
            </div>
          </div>

          {/* Calculated Days */}
          {calculatedDays > 0 && (
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium">Duration</span>
              </div>
              <Badge className="bg-blue-100 text-blue-800">
                {calculatedDays} day{calculatedDays > 1 ? 's' : ''}
              </Badge>
            </div>
          )}

          {/* Validation Message */}
          {leaveType && calculatedDays > 0 && calculatedDays > getAvailableDays(leaveType) && (
            <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <span className="text-sm text-red-800">
                Insufficient leave balance. You have {getAvailableDays(leaveType)} days available.
              </span>
            </div>
          )}

          {/* Reason */}
          <div className="space-y-2">
            <Label htmlFor="reason">Reason *</Label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Please provide a detailed reason for your leave request..."
              rows={4}
              required
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!canSubmitRequest() || isLoading}
            className="w-full"
          >
            {isLoading ? "Submitting..." : "Submit Leave Request"}
          </Button>

          {/* Message Display */}
          {message && (
            <div className={`p-3 rounded-lg text-sm ${
              message.includes("Error") || message.includes("Insufficient") 
                ? "bg-red-100 text-red-800" 
                : "bg-green-100 text-green-800"
            }`}>
              <div className="flex items-center gap-2">
                {message.includes("Error") || message.includes("Insufficient") ? (
                  <AlertCircle className="w-4 h-4" />
                ) : (
                  <CheckCircle className="w-4 h-4" />
                )}
                {message}
              </div>
            </div>
          )}
        </form>

        {/* Leave Balance Summary */}
        {employeeData && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-sm mb-3">Leave Balance Summary</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex justify-between">
                <span>Vacation:</span>
                <Badge variant="outline" className="text-xs">{employeeData.leaveBalances.vacation}</Badge>
              </div>
              <div className="flex justify-between">
                <span>Sick:</span>
                <Badge variant="outline" className="text-xs">{employeeData.leaveBalances.sick}</Badge>
              </div>
              <div className="flex justify-between">
                <span>Emergency:</span>
                <Badge variant="outline" className="text-xs">{employeeData.leaveBalances.emergency}</Badge>
              </div>
              <div className="flex justify-between">
                <span>Study:</span>
                <Badge variant="outline" className="text-xs">{employeeData.leaveBalances.study}</Badge>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
