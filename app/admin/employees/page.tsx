"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter,
  Edit,
  Trash2,
  Eye,
  Plus
} from "lucide-react"

export default function AdminEmployeesPage() {
  // Mock data for employees
  const employees = [
    {
      id: "EMP001",
      fullName: "Maria Santos",
      email: "maria.santos@napolcom.gov.ph",
      department: "Human Resources",
      position: "HR Manager",
      status: "active",
      hireDate: "2020-03-15",
      phone: "+63 912 345 6789"
    },
    {
      id: "EMP002",
      fullName: "Juan Dela Cruz",
      email: "juan.delacruz@napolcom.gov.ph",
      department: "Information Technology",
      position: "System Administrator",
      status: "active",
      hireDate: "2019-07-22",
      phone: "+63 923 456 7890"
    },
    {
      id: "EMP003",
      fullName: "Ana Reyes",
      email: "ana.reyes@napolcom.gov.ph",
      department: "Finance",
      position: "Financial Analyst",
      status: "active",
      hireDate: "2021-01-10",
      phone: "+63 934 567 8901"
    },
    {
      id: "EMP004",
      fullName: "Pedro Martinez",
      email: "pedro.martinez@napolcom.gov.ph",
      department: "Operations",
      position: "Operations Officer",
      status: "inactive",
      hireDate: "2018-11-05",
      phone: "+63 945 678 9012"
    }
  ]

  const employeeStats = {
    total: 45,
    active: 42,
    inactive: 3,
    departments: 8,
    newThisMonth: 2
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800"
      case "inactive": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <AppLayout userRole="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 border border-indigo-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Employee Management</h1>
              <p className="text-gray-600 mt-1">Manage all employees in the NAPOLCOM system</p>
            </div>
            <div className="h-12 w-12 bg-primary rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Employees</p>
                  <p className="text-2xl font-bold text-gray-900">{employeeStats.total}</p>
                  <p className="text-xs text-blue-600">{employeeStats.newThisMonth} new this month</p>
                </div>
                <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active</p>
                  <p className="text-2xl font-bold text-gray-900">{employeeStats.active}</p>
                  <p className="text-xs text-green-600">Currently employed</p>
                </div>
                <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Inactive</p>
                  <p className="text-2xl font-bold text-gray-900">{employeeStats.inactive}</p>
                  <p className="text-xs text-red-600">Requires attention</p>
                </div>
                <div className="h-10 w-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Departments</p>
                  <p className="text-2xl font-bold text-gray-900">{employeeStats.departments}</p>
                  <p className="text-xs text-purple-600">Across organization</p>
                </div>
                <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Actions */}
        <Card className="card-hover">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-indigo-600" />
                  <span>Employee Directory</span>
                </CardTitle>
                <CardDescription>
                  Search and manage employee information
                </CardDescription>
              </div>
              <Button className="bg-primary hover:bg-primary/90">
                <UserPlus className="h-4 w-4 mr-2" />
                Add Employee
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search employees by name, email, or ID..." 
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>

            {/* Employee Table */}
            <div className="space-y-4">
              {employees.map((employee) => (
                <div key={employee.id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 bg-primary rounded-full flex items-center justify-center">
                        <Users className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{employee.fullName}</h3>
                        <p className="text-sm text-gray-600">{employee.email}</p>
                        <p className="text-sm text-gray-600">ID: {employee.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(employee.status)}>
                        {employee.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Department</p>
                      <p className="text-sm text-gray-600">{employee.department}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Position</p>
                      <p className="text-sm text-gray-600">{employee.position}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Hire Date</p>
                      <p className="text-sm text-gray-600">{employee.hireDate}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-sm text-gray-500">{employee.phone}</p>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button size="sm" variant="destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
