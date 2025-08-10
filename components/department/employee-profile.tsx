"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog"
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  FileText, 
  Download, 
  Eye,
  Search,
  Filter,
  Clock,
  Award,
  Shield,
  Heart,
  BookOpen,
  GraduationCap,
  Baby,
  Users,
  AlertCircle,
  CheckCircle,
  XCircle
} from "lucide-react"
import { dataStore } from "@/lib/data-store"
import { format } from "date-fns"

interface EmployeeProfileProps {
  employeeId: string
}

export function EmployeeProfile({ employeeId }: EmployeeProfileProps) {
  const [employee, setEmployee] = useState<any>(null)
  const [documents, setDocuments] = useState<any[]>([])
  const [documentFilter, setDocumentFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDocument, setSelectedDocument] = useState<any>(null)

  useEffect(() => {
    loadEmployeeData()
  }, [employeeId])

  const loadEmployeeData = () => {
    const emp = dataStore.getEmployeeById(employeeId)
    if (emp) {
      setEmployee(emp)
      const docs = dataStore.getEmployeeDocuments(employeeId)
      setDocuments(docs)
    }
  }

  const getDocumentTypeBadge = (type: string) => {
    switch (type) {
      case "letter_order":
        return <Badge className="bg-blue-100 text-blue-800">Letter Order</Badge>
      case "special_order":
        return <Badge className="bg-green-100 text-green-800">Special Order</Badge>
      case "memorandum":
        return <Badge className="bg-purple-100 text-purple-800">Memorandum</Badge>
      default:
        return <Badge variant="secondary">{type}</Badge>
    }
  }

  const getDocumentStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "expired":
        return <Badge className="bg-red-100 text-red-800">Expired</Badge>
      case "cancelled":
        return <Badge className="bg-gray-100 text-gray-600">Cancelled</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getLeaveTypeIcon = (type: string) => {
    switch (type) {
      case "vacation":
        return <Calendar className="w-4 h-4 text-blue-600" />
      case "sick":
        return <Heart className="w-4 h-4 text-red-600" />
      case "emergency":
        return <AlertCircle className="w-4 h-4 text-orange-600" />
      case "maternity":
        return <Baby className="w-4 h-4 text-pink-600" />
      case "paternity":
        return <Users className="w-4 h-4 text-indigo-600" />
      case "study":
        return <GraduationCap className="w-4 h-4 text-green-600" />
      case "bereavement":
        return <Shield className="w-4 h-4 text-gray-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
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

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.referenceNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = documentFilter === "all" || doc.documentType === documentFilter

    return matchesSearch && matchesFilter
  })

  if (!employee) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Employee not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{employee.name}</h1>
          <p className="text-gray-600">{employee.position} • {employee.department}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Mail className="w-4 h-4 mr-2" />
            Contact
          </Button>
          <Button>
            <FileText className="w-4 h-4 mr-2" />
            View Documents
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList>
          <TabsTrigger value="personal">Personal Information</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="leave">Leave & Time Off</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Personal and contact details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Full Name</label>
                    <p className="text-sm">{employee.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Employee ID</label>
                    <p className="text-sm">{employee.employeeId}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Email</label>
                    <p className="text-sm">{employee.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Phone</label>
                    <p className="text-sm">{employee.phone || "Not provided"}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Gender</label>
                    <p className="text-sm capitalize">{employee.gender || "Not specified"}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Date of Birth</label>
                    <p className="text-sm">
                      {employee.dateOfBirth ? format(new Date(employee.dateOfBirth), "MMM dd, yyyy") : "Not provided"}
                    </p>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">Address</label>
                  <p className="text-sm">{employee.address || "Not provided"}</p>
                </div>
              </CardContent>
            </Card>

            {/* Government Numbers */}
            <Card>
              <CardHeader>
                <CardTitle>Government Numbers</CardTitle>
                <CardDescription>Official identification numbers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">GSIS Number</label>
                    <p className="text-sm font-mono">{employee.gsisNumber || "Not provided"}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">PhilHealth Number</label>
                    <p className="text-sm font-mono">{employee.philhealthNumber || "Not provided"}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Pag-IBIG Number</label>
                    <p className="text-sm font-mono">{employee.pagibigNumber || "Not provided"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Employment Information */}
            <Card>
              <CardHeader>
                <CardTitle>Employment Information</CardTitle>
                <CardDescription>Work-related details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Position</label>
                    <p className="text-sm">{employee.position}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Department</label>
                    <p className="text-sm">{employee.department}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Hire Date</label>
                    <p className="text-sm">{format(new Date(employee.hireDate), "MMM dd, yyyy")}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Status</label>
                    <Badge className={employee.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                      {employee.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Emergency Contact</CardTitle>
                <CardDescription>Emergency contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Contact Name</label>
                    <p className="text-sm">{employee.emergencyContact || "Not provided"}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Contact Phone</label>
                    <p className="text-sm">{employee.emergencyPhone || "Not provided"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Issued Documents</CardTitle>
                  <CardDescription>Official documents and orders</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search documents..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Select value={documentFilter} onValueChange={setDocumentFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Documents</SelectItem>
                      <SelectItem value="letter_order">Letter Orders</SelectItem>
                      <SelectItem value="special_order">Special Orders</SelectItem>
                      <SelectItem value="memorandum">Memorandums</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredDocuments.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No documents found</p>
                    <p className="text-sm text-gray-400">Documents will appear here when issued</p>
                  </div>
                ) : (
                  filteredDocuments.map((doc) => (
                    <div
                      key={doc.id}
                      className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{doc.title}</h3>
                            {getDocumentTypeBadge(doc.documentType)}
                            {getDocumentStatusBadge(doc.status)}
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                            <div>
                              <span className="font-medium">Reference:</span> {doc.referenceNumber}
                            </div>
                            <div>
                              <span className="font-medium">Issue Date:</span> {format(new Date(doc.issueDate), "MMM dd, yyyy")}
                            </div>
                            <div>
                              <span className="font-medium">Issued By:</span> {doc.issuedBy}
                            </div>
                            <div>
                              <span className="font-medium">Description:</span> {doc.description}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => setSelectedDocument(doc)}
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                View
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>{doc.title}</DialogTitle>
                                <DialogDescription>Document details</DialogDescription>
                              </DialogHeader>
                              
                              <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                  {getDocumentTypeBadge(doc.documentType)}
                                  {getDocumentStatusBadge(doc.status)}
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <label className="font-medium">Reference Number:</label>
                                    <p className="text-gray-600">{doc.referenceNumber}</p>
                                  </div>
                                  <div>
                                    <label className="font-medium">Issue Date:</label>
                                    <p className="text-gray-600">{format(new Date(doc.issueDate), "MMM dd, yyyy")}</p>
                                  </div>
                                  <div>
                                    <label className="font-medium">Issued By:</label>
                                    <p className="text-gray-600">{doc.issuedBy}</p>
                                  </div>
                                  <div>
                                    <label className="font-medium">Status:</label>
                                    <p className="text-gray-600 capitalize">{doc.status}</p>
                                  </div>
                                </div>
                                
                                <div>
                                  <label className="font-medium">Description:</label>
                                  <p className="text-gray-600 mt-1">{doc.description}</p>
                                </div>
                                
                                {doc.documentUrl && (
                                  <div className="flex gap-2">
                                    <Button>
                                      <Download className="w-4 h-4 mr-2" />
                                      Download Document
                                    </Button>
                                    <Button variant="outline">
                                      <Eye className="w-4 h-4 mr-2" />
                                      View Online
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leave" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Leave Balances */}
            <Card>
              <CardHeader>
                <CardTitle>Leave Balances</CardTitle>
                <CardDescription>Current leave credits by type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(employee.leaveBalances).map(([type, balance]) => (
                    <div key={type} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {getLeaveTypeIcon(type)}
                        <div>
                          <p className="font-medium">{getLeaveTypeLabel(type)}</p>
                          <p className="text-sm text-gray-600">{balance} days remaining</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="w-16 h-2 bg-gray-200 rounded-full">
                          <div 
                            className="h-2 bg-blue-600 rounded-full"
                            style={{ width: `${Math.min((balance / 30) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Compensatory Time Off */}
            <Card>
              <CardHeader>
                <CardTitle>Compensatory Time Off</CardTitle>
                <CardDescription>Accumulated compensatory time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-blue-600">
                    {employee.compensatoryTimeOff || 0}
                  </div>
                  <p className="text-gray-600">hours available</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

