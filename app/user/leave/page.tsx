"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { useAuth } from "@/lib/auth-context"
import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Calendar, 
  Plus,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText
} from "lucide-react"
import { useState } from "react"

function LeaveContent() {
  const { user } = useAuth()
  const [leaveRequests, setLeaveRequests] = useState<any[]>([])
  const [showRequestForm, setShowRequestForm] = useState(false)
  const [requestForm, setRequestForm] = useState({
    type: "",
    startDate: "",
    endDate: "",
    reason: ""
  })

  const handleSubmitRequest = () => {
    const newRequest = {
      id: Date.now(),
      ...requestForm,
      days: calculateDays(requestForm.startDate, requestForm.endDate),
      status: "pending",
      submittedAt: new Date().toISOString().split('T')[0]
    }

    setLeaveRequests(prev => [newRequest, ...prev])

    setRequestForm({
      type: "",
      startDate: "",
      endDate: "",
      reason: ""
    })
    setShowRequestForm(false)
  }

  const calculateDays = (startDate: string, endDate: string) => {
    if (!startDate || !endDate) return 0
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays + 1 // Include both start and end dates
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge variant="default" className="flex items-center space-x-1">
          <CheckCircle className="h-3 w-3" />
          <span>Approved</span>
        </Badge>
      case 'rejected':
        return <Badge variant="destructive" className="flex items-center space-x-1">
          <XCircle className="h-3 w-3" />
          <span>Rejected</span>
        </Badge>
      case 'pending':
        return <Badge variant="secondary" className="flex items-center space-x-1">
          <Clock className="h-3 w-3" />
          <span>Pending</span>
        </Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getLeaveTypeLabel = (type: string) => {
    switch (type) {
      case 'vacation':
        return 'Vacation Leave'
      case 'sick':
        return 'Sick Leave'
      case 'personal':
        return 'Personal Leave'
      case 'compensatory':
        return 'Compensatory Time Off'
      default:
        return type
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <AppLayout userRole="user">
      <div className="space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 rounded-xl p-8 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span className="text-sm font-medium opacity-90">Leave Management</span>
              </div>
              <h1 className="text-3xl font-bold">Request Time Off</h1>
              <p className="text-purple-100 text-lg">Manage your leave requests and time off.</p>
            </div>
            <div className="h-16 w-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Calendar className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>

        {/* Leave Credits Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="card-hover border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium">Vacation Leave</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 mt-2">-</p>
              <p className="text-xs text-gray-500">Contact HR for details</p>
            </CardContent>
          </Card>
          <Card className="card-hover border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <span className="text-sm font-medium">Sick Leave</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 mt-2">-</p>
              <p className="text-xs text-gray-500">Contact HR for details</p>
            </CardContent>
          </Card>
          <Card className="card-hover border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">Personal Leave</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 mt-2">-</p>
              <p className="text-xs text-gray-500">Contact HR for details</p>
            </CardContent>
          </Card>
          <Card className="card-hover border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium">Compensatory Time</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 mt-2">-</p>
              <p className="text-xs text-gray-500">Contact HR for details</p>
            </CardContent>
          </Card>
        </div>

        {/* Leave Request Form */}
        {showRequestForm && (
          <Card className="card-hover border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">Request Leave</CardTitle>
              <CardDescription className="text-base">
                Submit a new leave request
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="leaveType">Leave Type</Label>
                  <Select value={requestForm.type} onValueChange={(value) => setRequestForm(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select leave type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vacation">Vacation Leave</SelectItem>
                      <SelectItem value="sick">Sick Leave</SelectItem>
                      <SelectItem value="personal">Personal Leave</SelectItem>
                      <SelectItem value="compensatory">Compensatory Time Off</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="days">Number of Days</Label>
                  <Input
                    id="days"
                    value={calculateDays(requestForm.startDate, requestForm.endDate)}
                    disabled
                    placeholder="Calculated automatically"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={requestForm.startDate}
                    onChange={(e) => setRequestForm(prev => ({ ...prev, startDate: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={requestForm.endDate}
                    onChange={(e) => setRequestForm(prev => ({ ...prev, endDate: e.target.value }))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason">Reason</Label>
                <Textarea
                  id="reason"
                  placeholder="Please provide a reason for your leave request..."
                  value={requestForm.reason}
                  onChange={(e) => setRequestForm(prev => ({ ...prev, reason: e.target.value }))}
                  rows={3}
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleSubmitRequest}>
                  Submit Request
                </Button>
                <Button variant="outline" onClick={() => setShowRequestForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Leave Requests History */}
        <Card className="card-hover border-0 shadow-lg">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl">Leave Requests</CardTitle>
                <CardDescription className="text-base">
                  Track the status of your leave requests
                </CardDescription>
              </div>
              <Button onClick={() => setShowRequestForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Request Leave
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {leaveRequests.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No leave requests</h3>
                <p className="text-gray-600">You haven't submitted any leave requests yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {leaveRequests.map((request) => (
                  <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-2">
                        <h3 className="font-medium text-gray-900">
                          {getLeaveTypeLabel(request.type)}
                        </h3>
                        {getStatusBadge(request.status)}
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>
                          <span className="font-medium">Period:</span> {formatDate(request.startDate)} - {formatDate(request.endDate)} ({request.days} days)
                        </p>
                        <p>
                          <span className="font-medium">Reason:</span> {request.reason}
                        </p>
                        <p>
                          <span className="font-medium">Submitted:</span> {formatDate(request.submittedAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}

export default function LeavePage() {
  return (
    <ProtectedRoute requiredRoles={['user']}>
      <LeaveContent />
    </ProtectedRoute>
  )
}
