"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Shield, User } from "lucide-react"

const mockUsers = {
  // Admin Accounts Only
  "admin@napolcom.gov.ph": { role: "admin", name: "System Administrator", department: "IT Department" },
  "hr@napolcom.gov.ph": { role: "admin", name: "HR Manager", department: "Human Resources" },
  "superadmin@napolcom.gov.ph": { role: "admin", name: "Super Administrator", department: "Administration" },
}

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loginMethod, setLoginMethod] = useState("email")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Simulate authentication
    setTimeout(() => {
      const user = mockUsers[email as keyof typeof mockUsers]
      if (user && password === "password123") {
        // Store user data in localStorage (in production, use secure session management)
        localStorage.setItem("user", JSON.stringify(user))

        // Redirect based on role
        switch (user.role) {
          case "admin":
            router.push("/admin/dashboard")
            break
          case "department_head":
            router.push("/department/dashboard")
            break
          case "employee":
            router.push("/employee/dashboard")
            break
          default:
            router.push("/employee/dashboard")
        }
      } else {
        setError("Invalid credentials. Use password123 for demo.")
      }
      setLoading(false)
    }, 1000)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Secure Login
        </CardTitle>
        <CardDescription>Access your attendance and leave management portal</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="loginMethod">Login Method</Label>
            <Select value={loginMethod} onValueChange={setLoginMethod}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email & Password</SelectItem>
                <SelectItem value="biometric">Biometric (Demo)</SelectItem>
                <SelectItem value="qr">QR Code (Demo)</SelectItem>
                <SelectItem value="rfid">RFID (Demo)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {loginMethod === "email" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </>
          )}

          {loginMethod !== "email" && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                {loginMethod === "biometric" && <User className="w-8 h-8 text-blue-600" />}
                {loginMethod === "qr" && <div className="w-8 h-8 border-2 border-blue-600" />}
                {loginMethod === "rfid" && <div className="w-8 h-8 bg-blue-600 rounded" />}
              </div>
              <p className="text-sm text-gray-600">
                {loginMethod === "biometric" && "Place your finger on the scanner"}
                {loginMethod === "qr" && "Scan your QR code"}
                {loginMethod === "rfid" && "Tap your RFID card"}
              </p>
              <Button
                type="button"
                variant="outline"
                className="mt-4 bg-transparent"
                onClick={() => setLoginMethod("email")}
              >
                Use Email Login Instead
              </Button>
            </div>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {loginMethod === "email" && (
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          )}
        </form>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-sm mb-3">Demo Admin Accounts:</h4>
          <div className="text-xs space-y-2 text-gray-600">
            <div>
              <div className="font-medium text-gray-800 mb-1">👑 Admin Access:</div>
              <div>admin@napolcom.gov.ph - System Administrator</div>
              <div>hr@napolcom.gov.ph - HR Manager</div>
              <div>superadmin@napolcom.gov.ph - Super Administrator</div>
            </div>
            <div className="font-medium text-blue-600 mt-3">Password: password123</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
