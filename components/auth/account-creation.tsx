"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { dataStore } from "@/lib/data-store"
import { User, AccountCreationLog } from "@/lib/data-store"
import { Eye, EyeOff, UserPlus, Shield, AlertCircle, CheckCircle, Info, History, Users } from "lucide-react"

interface AccountCreationProps {
  currentUser?: User
}

export function AccountCreation({ currentUser }: AccountCreationProps) {
  const [isCreating, setIsCreating] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [activeTab, setActiveTab] = useState("create")
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    role: "user" as "super_admin" | "admin" | "user",
    profilePhoto: "",
  })

  // Validation state
  const [validationErrors, setValidationErrors] = useState<{
    fullName?: string
    email?: string
    username?: string
    password?: string
    confirmPassword?: string
    role?: string
  }>({})

  // Check if current user can create accounts
  const canCreateAccounts = currentUser && (currentUser.role === "super_admin" || currentUser.role === "admin")
  const availableRoles = currentUser ? dataStore.getAvailableRolesForCreator(currentUser.role) : []

  // Role descriptions for tooltips
  const roleDescriptions = {
    super_admin: "Full system access. Can create, edit, and delete all account types. Manages system-wide settings.",
    admin: "Can create and manage user accounts. Can manage employee data but cannot change Super Admin settings.",
    user: "Can view and update their own profile. Can view permitted modules but cannot manage other accounts."
  }

  const validateForm = () => {
    const errors: typeof validationErrors = {}

    // Full Name validation
    if (!formData.fullName.trim()) {
      errors.fullName = "Full name is required"
    } else if (formData.fullName.length < 2) {
      errors.fullName = "Full name must be at least 2 characters"
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email) {
      errors.email = "Email is required"
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address"
    } else if (dataStore.getUserByEmail(formData.email)) {
      errors.email = "Email address is already in use"
    }

    // Username validation
    if (!formData.username) {
      errors.username = "Username is required"
    } else if (formData.username.length < 3) {
      errors.username = "Username must be at least 3 characters"
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      errors.username = "Username can only contain letters, numbers, and underscores"
    } else if (dataStore.getUserByUsername(formData.username)) {
      errors.username = "Username is already taken"
    }

    // Password validation
    const passwordValidation = dataStore.validatePassword(formData.password)
    if (!formData.password) {
      errors.password = "Password is required"
    } else if (!passwordValidation.isValid) {
      errors.password = passwordValidation.errors.join(", ")
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match"
    }

    // Role validation
    if (!formData.role) {
      errors.role = "Please select a role"
    } else if (!availableRoles.includes(formData.role)) {
      errors.role = "You are not authorized to create this role"
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage("")
    setSuccessMessage("")

    if (!validateForm()) {
      return
    }

    if (!currentUser) {
      setErrorMessage("You must be logged in to create accounts")
      return
    }

    setIsCreating(true)

    try {
      // In a real application, you would hash the password here
      // For demo purposes, we'll use a placeholder hash
      const passwordHash = `$2b$10$hashed_${formData.password}_${Date.now()}`

      const newUser = dataStore.addUser({
        fullName: formData.fullName.trim(),
        email: formData.email.toLowerCase(),
        username: formData.username.toLowerCase(),
        passwordHash,
        role: formData.role,
        profilePhoto: formData.profilePhoto || undefined,
        isActive: true,
      }, currentUser.id)

      setSuccessMessage(`Account created successfully! Username: ${newUser.username}`)
      
      // Reset form
      setFormData({
        fullName: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        role: "user",
        profilePhoto: "",
      })
      
      setActiveTab("logs")
    } catch (error) {
      setErrorMessage("Failed to create account. Please try again.")
    } finally {
      setIsCreating(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear validation error when user starts typing
    if (validationErrors[field as keyof typeof validationErrors]) {
      setValidationErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const getAccountCreationLogs = () => {
    if (!currentUser) return []
    
    if (currentUser.role === "super_admin") {
      return dataStore.getAccountCreationLogs()
    } else {
      return dataStore.getAccountCreationLogsByCreator(currentUser.id)
    }
  }

  const logs = getAccountCreationLogs()

  if (!canCreateAccounts) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Access Denied
          </CardTitle>
          <CardDescription>
            You do not have permission to create user accounts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Only Super Administrators and Administrators can create user accounts.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Account Creation
          </CardTitle>
          <CardDescription>
            Create new user accounts with appropriate roles and permissions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="create" className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                Create Account
              </TabsTrigger>
              <TabsTrigger value="logs" className="flex items-center gap-2">
                <History className="h-4 w-4" />
                Creation Logs
              </TabsTrigger>
            </TabsList>

            <TabsContent value="create" className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{errorMessage}</AlertDescription>
                  </Alert>
                )}

                {successMessage && (
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>{successMessage}</AlertDescription>
                  </Alert>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      placeholder="Enter full name"
                      className={validationErrors.fullName ? "border-red-500" : ""}
                    />
                    {validationErrors.fullName && (
                      <p className="text-sm text-red-500">{validationErrors.fullName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="Enter email address"
                      className={validationErrors.email ? "border-red-500" : ""}
                    />
                    {validationErrors.email && (
                      <p className="text-sm text-red-500">{validationErrors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username *</Label>
                    <Input
                      id="username"
                      value={formData.username}
                      onChange={(e) => handleInputChange("username", e.target.value)}
                      placeholder="Enter username"
                      className={validationErrors.username ? "border-red-500" : ""}
                    />
                    {validationErrors.username && (
                      <p className="text-sm text-red-500">{validationErrors.username}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role">Role *</Label>
                    <Select
                      value={formData.role}
                      onValueChange={(value) => handleInputChange("role", value)}
                    >
                      <SelectTrigger className={validationErrors.role ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableRoles.map((role) => (
                          <SelectItem key={role} value={role}>
                            <div className="flex items-center gap-2">
                              <span className="capitalize">{role.replace("_", " ")}</span>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                                    <Info className="h-3 w-3" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>{role.replace("_", " ").toUpperCase()}</DialogTitle>
                                    <DialogDescription>
                                      {roleDescriptions[role as keyof typeof roleDescriptions]}
                                    </DialogDescription>
                                  </DialogHeader>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {validationErrors.role && (
                      <p className="text-sm text-red-500">{validationErrors.role}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        placeholder="Enter password"
                        className={validationErrors.password ? "border-red-500" : ""}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    {validationErrors.password && (
                      <p className="text-sm text-red-500">{validationErrors.password}</p>
                    )}
                    <div className="text-xs text-gray-500">
                      Password must be at least 8 characters with uppercase, lowercase, number, and special character.
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        placeholder="Confirm password"
                        className={validationErrors.confirmPassword ? "border-red-500" : ""}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    {validationErrors.confirmPassword && (
                      <p className="text-sm text-red-500">{validationErrors.confirmPassword}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="profilePhoto">Profile Photo URL (Optional)</Label>
                  <Input
                    id="profilePhoto"
                    type="url"
                    value={formData.profilePhoto}
                    onChange={(e) => handleInputChange("profilePhoto", e.target.value)}
                    placeholder="Enter profile photo URL"
                  />
                </div>

                <div className="flex gap-4">
                  <Button type="submit" disabled={isCreating} className="flex items-center gap-2">
                    <UserPlus className="h-4 w-4" />
                    {isCreating ? "Creating Account..." : "Create Account"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setFormData({
                        fullName: "",
                        email: "",
                        username: "",
                        password: "",
                        confirmPassword: "",
                        role: "user",
                        profilePhoto: "",
                      })
                      setValidationErrors({})
                      setErrorMessage("")
                      setSuccessMessage("")
                    }}
                  >
                    Reset Form
                  </Button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="logs" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <History className="h-4 w-4" />
                  <h3 className="text-lg font-semibold">Account Creation History</h3>
                </div>

                {logs.length === 0 ? (
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      No account creation logs found.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <div className="space-y-3">
                    {logs.map((log) => (
                      <Card key={log.id}>
                        <CardContent className="pt-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{log.createdUserName}</span>
                                <Badge variant="secondary" className="capitalize">
                                  {log.role.replace("_", " ")}
                                </Badge>
                              </div>
                              <div className="text-sm text-gray-500">
                                Created by {log.createdByUserName} on {new Date(log.createdAt).toLocaleDateString()}
                              </div>
                            </div>
                            <div className="text-xs text-gray-400">
                              {new Date(log.createdAt).toLocaleTimeString()}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

