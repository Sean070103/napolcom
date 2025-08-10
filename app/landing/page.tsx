"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Building, 
  Users, 
  Shield, 
  ArrowRight,
  Clock,
  FileText,
  Calendar,
  BarChart3
} from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  const portalOptions = [
    {
      title: "Employee Portal",
      description: "Access your personal dashboard, attendance, leave requests, and department communications",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      href: "/employee-login",
      features: [
        "Personal Dashboard",
        "Attendance Tracking",
        "Leave Management",
        "Department Access"
      ]
    },
    {
      title: "Administrative Portal",
      description: "Manage users, monitor system activity, generate reports, and oversee operations",
      icon: Shield,
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      href: "/admin-login",
      features: [
        "User Management",
        "System Analytics",
        "Security Controls",
        "Full System Access"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-3xl mb-6">
            <Building className="h-10 w-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">NAPOLCOM System Portal</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Welcome to the National Police Commission Management System. 
            Choose your portal to access the appropriate features and tools.
          </p>
        </div>

        {/* Portal Selection */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {portalOptions.map((portal, index) => {
              const Icon = portal.icon
              return (
                <Card key={index} className="card-hover shadow-xl border-2 hover:border-primary/20">
                  <CardHeader className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-4">
                      <Icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-2xl font-bold">{portal.title}</CardTitle>
                    <CardDescription className="text-base">
                      {portal.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Features */}
                    <div className="space-y-3">
                      <h3 className="font-semibold text-gray-900">Key Features:</h3>
                      <div className="grid grid-cols-1 gap-2">
                        {portal.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-2 text-sm text-gray-600">
                            <div className="h-1.5 w-1.5 bg-primary rounded-full"></div>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <Link href={portal.href} className="block">
                      <Button className="w-full h-12 text-base font-medium">
                        <span>Access {portal.title}</span>
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Alternative Options */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center space-x-4">
              <Link href="/login">
                <Button variant="outline" className="h-10">
                  <Building className="h-4 w-4 mr-2" />
                  Unified Login
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="outline" className="h-10">
                  <Users className="h-4 w-4 mr-2" />
                  Register Account
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* System Overview */}
        <div className="mt-16 max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">System Overview</h2>
            <p className="text-gray-600">Comprehensive management system for NAPOLCOM operations</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
              <Clock className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Attendance Management</h3>
              <p className="text-sm text-gray-600">Track employee attendance and time management</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
              <Calendar className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Leave Management</h3>
              <p className="text-sm text-gray-600">Process and approve leave requests</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
              <FileText className="h-8 w-8 text-orange-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Communication</h3>
              <p className="text-sm text-gray-600">Memorandums and task management</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
              <BarChart3 className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Analytics</h3>
              <p className="text-sm text-gray-600">Reports and performance insights</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500">
            © 2024 NAPOLCOM System. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}

