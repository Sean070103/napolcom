"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  User,
  FileText,
  Eye
} from "lucide-react"

export default function DepartmentLeavesPage() {
  // Mock data for leave requests
  const leaveRequests = [
    {
      id: "LR001",
      employeeName: "Maria Santos",
      employeeId: "EMP001",
      leaveType: "Vacation Leave",
      startDate: "2024-01-20",
      endDate: "2024-01-25",
      days: 5,
      reason: "Family vacation",
      status: "pending",
      submittedAt: "2024-01-15T09:30:00Z"
    },
    {
      id: "LR002",
      employeeName: "Juan Dela Cruz",
      employeeId: "EMP002",
      leaveType: "Sick Leave",
      startDate: "2024-01-18",
      endDate: "2024-01-19",
      days: 2,
      reason: "Medical appointment",
      status: "approved",
      submittedAt: "2024-01-15T14:20:00Z"
    },
    {
      id: "LR003",
      employeeName: "Ana Reyes",
      employeeId: "EMP003",
      leaveType: "Personal Leave",
      startDate: "2024-01-22",
      endDate: "2024-01-22",
      days: 1,
      reason: "Personal matters",
      status: "rejected",
      submittedAt: "2024-01-15T11:45:00Z"
    },
    {
      id: "LR004",
      employeeName: "Pedro Martinez",
      employeeId: "EMP004",
      leaveType: "Emergency Leave",
      startDate: "2024-01-16",
      endDate: "2024-01-17",
      days: 2,
      reason: "Family emergency",
      status: "pending",
      submittedAt: "2024-01-15T16:10:00Z"
    }
  ]

  const leaveStats = {
    total: 24,
    pending: 8,
    approved: 12,
    rejected: 4,
    thisMonth: 6
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "bg-green-100 text-green-800"
      case "rejected": return "bg-red-100 text-red-800"
      case "pending": return "bg-yellow-100 text-yellow-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved": return <CheckCircle className="h-4 w-4" />
      case "rejected": return <XCircle className="h-4 w-4" />
      case "pending": return <AlertTriangle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  return (
    <AppLayout userRole="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Leave Approvals</h1>
              <p className="text-gray-600 mt-1">Manage and approve employee leave requests</p>
            </div>
            <div className="h-12 w-12 bg-primary rounded-full flex items-center justify-center">
              <Calendar className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Requests</p>
                  <p className="text-2xl font-bold text-gray-900">{leaveStats.total}</p>
                  <p className="text-xs text-blue-600">{leaveStats.thisMonth} this month</p>
                </div>
                <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">{leaveStats.pending}</p>
                  <p className="text-xs text-yellow-600">Requires action</p>
                </div>
                <div className="h-10 w-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Approved</p>
                  <p className="text-2xl font-bold text-gray-900">{leaveStats.approved}</p>
                  <p className="text-xs text-green-600">Successfully processed</p>
                </div>
                <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Rejected</p>
                  <p className="text-2xl font-bold text-gray-900">{leaveStats.rejected}</p>
                  <p className="text-xs text-red-600">Not approved</p>
                </div>
                <div className="h-10 w-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <XCircle className="h-5 w-5 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-green-600" />
              <span>Leave Requests</span>
            </CardTitle>
            <CardDescription>
              Review and manage employee leave requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="pending" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="pending" className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Pending ({leaveStats.pending})</span>
                </TabsTrigger>
                <TabsTrigger value="approved" className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Approved ({leaveStats.approved})</span>
                </TabsTrigger>
                <TabsTrigger value="rejected" className="flex items-center space-x-2">
                  <XCircle className="h-4 w-4" />
                  <span>Rejected ({leaveStats.rejected})</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="pending" className="mt-6">
                <div className="space-y-4">
                  {leaveRequests.filter(req => req.status === 'pending').map((request) => (
                    <div key={request.id} className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{request.employeeName}</h3>
                            <p className="text-sm text-gray-600">ID: {request.employeeId}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(request.status)}>
                          {getStatusIcon(request.status)}
                          <span className="ml-1 capitalize">{request.status}</span>
                        </Badge>
                      </div>
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Leave Details</p>
                          <p className="text-sm text-gray-600">{request.leaveType}</p>
                          <p className="text-sm text-gray-600">{request.startDate} to {request.endDate}</p>
                          <p className="text-sm text-gray-600">{request.days} day(s)</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Reason</p>
                          <p className="text-sm text-gray-600">{request.reason}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <p className="text-xs text-gray-500">
                          Submitted: {new Date(request.submittedAt).toLocaleDateString()}
                        </p>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve
                          </Button>
                          <Button size="sm" variant="destructive">
                            <XCircle className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="approved" className="mt-6">
                <div className="space-y-4">
                  {leaveRequests.filter(req => req.status === 'approved').map((request) => (
                    <div key={request.id} className="border rounded-lg p-4 bg-green-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 bg-green-600 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{request.employeeName}</h3>
                            <p className="text-sm text-gray-600">ID: {request.employeeId}</p>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approved
                        </Badge>
                      </div>
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Leave Details</p>
                          <p className="text-sm text-gray-600">{request.leaveType}</p>
                          <p className="text-sm text-gray-600">{request.startDate} to {request.endDate}</p>
                          <p className="text-sm text-gray-600">{request.days} day(s)</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Reason</p>
                          <p className="text-sm text-gray-600">{request.reason}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="rejected" className="mt-6">
                <div className="space-y-4">
                  {leaveRequests.filter(req => req.status === 'rejected').map((request) => (
                    <div key={request.id} className="border rounded-lg p-4 bg-red-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 bg-red-600 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{request.employeeName}</h3>
                            <p className="text-sm text-gray-600">ID: {request.employeeId}</p>
                          </div>
                        </div>
                        <Badge className="bg-red-100 text-red-800">
                          <XCircle className="h-4 w-4 mr-1" />
                          Rejected
                        </Badge>
                      </div>
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Leave Details</p>
                          <p className="text-sm text-gray-600">{request.leaveType}</p>
                          <p className="text-sm text-gray-600">{request.startDate} to {request.endDate}</p>
                          <p className="text-sm text-gray-600">{request.days} day(s)</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Reason</p>
                          <p className="text-sm text-gray-600">{request.reason}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
} 