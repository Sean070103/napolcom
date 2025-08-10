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
  Eye,
  TrendingUp
} from "lucide-react"

export default function AdminLeavesPage() {
  // Mock data for system-wide leave requests
  const leaveRequests = [
    {
      id: "LR001",
      employeeName: "Maria Santos",
      employeeId: "EMP001",
      department: "Human Resources",
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
      department: "Information Technology",
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
      department: "Finance",
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
      department: "Operations",
      leaveType: "Emergency Leave",
      startDate: "2024-01-16",
      endDate: "2024-01-17",
      days: 2,
      reason: "Family emergency",
      status: "pending",
      submittedAt: "2024-01-15T16:10:00Z"
    }
  ]

  const systemStats = {
    total: 45,
    pending: 12,
    approved: 28,
    rejected: 5,
    thisMonth: 8
  }

  const leaveTypeStats = [
    { type: "Vacation Leave", count: 15, approved: 12, pending: 3 },
    { type: "Sick Leave", count: 12, approved: 10, pending: 2 },
    { type: "Personal Leave", count: 8, approved: 4, pending: 4 },
    { type: "Emergency Leave", count: 6, approved: 2, pending: 4 },
    { type: "Maternity Leave", count: 2, approved: 0, pending: 2 },
    { type: "Study Leave", count: 2, approved: 0, pending: 2 }
  ]

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
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-6 border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">System Leave Management</h1>
              <p className="text-gray-600 mt-1">Manage leave requests across all departments</p>
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
                  <p className="text-2xl font-bold text-gray-900">{systemStats.total}</p>
                  <p className="text-xs text-blue-600">{systemStats.thisMonth} this month</p>
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
                  <p className="text-2xl font-bold text-gray-900">{systemStats.pending}</p>
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
                  <p className="text-2xl font-bold text-gray-900">{systemStats.approved}</p>
                  <p className="text-xs text-green-600">
                    <TrendingUp className="inline h-3 w-3 mr-1" />
                    +3 from last week
                  </p>
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
                  <p className="text-2xl font-bold text-gray-900">{systemStats.rejected}</p>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-orange-600" />
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
                    <span>Pending ({systemStats.pending})</span>
                  </TabsTrigger>
                  <TabsTrigger value="approved" className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Approved ({systemStats.approved})</span>
                  </TabsTrigger>
                  <TabsTrigger value="rejected" className="flex items-center space-x-2">
                    <XCircle className="h-4 w-4" />
                    <span>Rejected ({systemStats.rejected})</span>
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
                              <p className="text-sm text-gray-600">{request.department}</p>
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
                              <p className="text-sm text-gray-600">{request.department}</p>
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
                              <p className="text-sm text-gray-600">{request.department}</p>
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

          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <span>Leave Type Overview</span>
              </CardTitle>
              <CardDescription>
                Breakdown of leave requests by type
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaveTypeStats.map((stat, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">{stat.type}</h3>
                      <Badge variant="outline">{stat.count} total</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-center">
                        <p className="text-green-600 font-medium">{stat.approved}</p>
                        <p className="text-gray-600">Approved</p>
                      </div>
                      <div className="text-center">
                        <p className="text-yellow-600 font-medium">{stat.pending}</p>
                        <p className="text-gray-600">Pending</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
} 