"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, XCircle, Eye, Calendar, Clock } from "lucide-react"
import { dataStore } from "@/lib/data-store"
import { format } from "date-fns"

interface LeaveApprovalTableProps {
  departmentName?: string
}

export function LeaveApprovalTable({ departmentName }: LeaveApprovalTableProps) {
  const [selectedRequest, setSelectedRequest] = useState<any>(null)
  const [approvalComment, setApprovalComment] = useState("")
  const [leaveRequests, setLeaveRequests] = useState<any[]>([])
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    if (!departmentName) return
    
    const requests = dataStore.getLeaveRequests()
    const employees = dataStore.getEmployees()
    
    // Filter requests for this department
    const departmentRequests = requests.filter(request => {
      const employee = employees.find(emp => emp.employeeId === request.employeeId)
      return employee?.department === departmentName
    })
    
    // Combine leave requests with employee data
    const combinedData = departmentRequests.map(request => {
      const employee = employees.find(emp => emp.employeeId === request.employeeId)
      return {
        ...request,
        employeeName: employee?.name || "Unknown Employee",
        department: employee?.department || "Unknown Department",
      }
    })
    
    setLeaveRequests(combinedData)
  }, [departmentName])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

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

  const handleApprove = (requestId: string) => {
    const updatedRequest = dataStore.updateLeaveRequest(requestId, {
      status: "approved",
      approvedBy: "department_head@napolcom.gov.ph",
      approvedAt: new Date().toISOString(),
      comments: approvalComment,
    })
    
    if (updatedRequest) {
      // Refresh data
      const requests = dataStore.getLeaveRequests()
      const employees = dataStore.getEmployees()
      const departmentRequests = requests.filter(request => {
        const employee = employees.find(emp => emp.employeeId === request.employeeId)
        return employee?.department === departmentName
      })
      
      const combinedData = departmentRequests.map(request => {
        const employee = employees.find(emp => emp.employeeId === request.employeeId)
        return {
          ...request,
          employeeName: employee?.name || "Unknown Employee",
          department: employee?.department || "Unknown Department",
        }
      })
      setLeaveRequests(combinedData)
    }
    
    setApprovalComment("")
    setSelectedRequest(null)
  }

  const handleReject = (requestId: string) => {
    const updatedRequest = dataStore.updateLeaveRequest(requestId, {
      status: "rejected",
      approvedBy: "department_head@napolcom.gov.ph",
      approvedAt: new Date().toISOString(),
      comments: approvalComment,
    })
    
    if (updatedRequest) {
      // Refresh data
      const requests = dataStore.getLeaveRequests()
      const employees = dataStore.getEmployees()
      const departmentRequests = requests.filter(request => {
        const employee = employees.find(emp => emp.employeeId === request.employeeId)
        return employee?.department === departmentName
      })
      
      const combinedData = departmentRequests.map(request => {
        const employee = employees.find(emp => emp.employeeId === request.employeeId)
        return {
          ...request,
          employeeName: employee?.name || "Unknown Employee",
          department: employee?.department || "Unknown Department",
        }
      })
      setLeaveRequests(combinedData)
    }
    
    setApprovalComment("")
    setSelectedRequest(null)
  }

  const filteredRequests = leaveRequests.filter(request => {
    return statusFilter === "all" || request.status === statusFilter
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leave Request Management</CardTitle>
        <CardDescription>Review and manage leave requests from your team</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Filter */}
        <div className="mb-6">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Leave Type</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Applied Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <div className="flex flex-col items-center gap-2">
                      <Calendar className="w-12 h-12 text-gray-400" />
                      <p className="text-gray-500">No leave requests found</p>
                      <p className="text-sm text-gray-400">
                        Leave requests from your team will appear here
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
              {filteredRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{request.employeeName}</div>
                      <div className="text-sm text-gray-500">
                        {request.department} • ID: {request.employeeId}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-gray-400" />
                      {getLeaveTypeLabel(request.leaveType)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{request.days} days</div>
                      <div className="text-sm text-gray-500">
                        {format(new Date(request.startDate), "MMM dd")} to {format(new Date(request.endDate), "MMM dd, yyyy")}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{format(new Date(request.createdAt), "MMM dd, yyyy")}</TableCell>
                  <TableCell>{getStatusBadge(request.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => setSelectedRequest(request)}>
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Leave Request Details</DialogTitle>
                            <DialogDescription>Review and take action on this leave request</DialogDescription>
                          </DialogHeader>

                          {selectedRequest && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium">Employee</label>
                                  <p className="text-sm text-gray-600">
                                    {selectedRequest.employeeName} (ID: {selectedRequest.employeeId})
                                  </p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Department</label>
                                  <p className="text-sm text-gray-600">{selectedRequest.department}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Leave Type</label>
                                  <p className="text-sm text-gray-600">{getLeaveTypeLabel(selectedRequest.leaveType)}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Duration</label>
                                  <p className="text-sm text-gray-600">
                                    {selectedRequest.days} days ({format(new Date(selectedRequest.startDate), "MMM dd")} to{" "}
                                    {format(new Date(selectedRequest.endDate), "MMM dd, yyyy")})
                                  </p>
                                </div>
                              </div>

                              <div>
                                <label className="text-sm font-medium">Reason</label>
                                <p className="text-sm text-gray-600 mt-1">{selectedRequest.reason}</p>
                              </div>

                              <div>
                                <label className="text-sm font-medium">Current Status</label>
                                <div className="mt-1">{getStatusBadge(selectedRequest.status)}</div>
                              </div>

                              {selectedRequest.status === "pending" && (
                                <div>
                                  <label className="text-sm font-medium">Approval Comments</label>
                                  <Textarea
                                    placeholder="Add comments for your decision..."
                                    value={approvalComment}
                                    onChange={(e) => setApprovalComment(e.target.value)}
                                    className="mt-1"
                                  />
                                </div>
                              )}

                              {selectedRequest.status !== "pending" && selectedRequest.comments && (
                                <div>
                                  <label className="text-sm font-medium">Comments</label>
                                  <p className="text-sm text-gray-600 mt-1">{selectedRequest.comments}</p>
                                </div>
                              )}
                            </div>
                          )}

                          {selectedRequest?.status === "pending" && (
                            <DialogFooter>
                              <Button
                                variant="outline"
                                onClick={() => handleReject(selectedRequest.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <XCircle className="w-4 h-4 mr-2" />
                                Reject
                              </Button>
                              <Button
                                onClick={() => handleApprove(selectedRequest.id)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Approve
                              </Button>
                            </DialogFooter>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

