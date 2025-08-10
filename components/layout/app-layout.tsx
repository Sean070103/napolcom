"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Users, 
  FileText, 
  Calendar, 
  Settings, 
  LogOut, 
  User,
  Building,
  ClipboardList,
  Shield,
  BarChart3,
  Activity,
  UserPlus,
  AlertTriangle,
  CheckCircle,
  Clock,
  Bell,
  Home,
  ChevronLeft,
  ChevronRight,
  Menu,
  Search,
  MessageSquare,
  CheckSquare
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface AppLayoutProps {
  children: React.ReactNode
  userRole?: 'user' | 'admin' | 'super_admin'
}

export function AppLayout({ children, userRole }: AppLayoutProps) {
  const { user, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'super_admin':
        return 'Super Admin'
      case 'admin':
        return 'Administrator'
      default:
        return 'User'
    }
  }

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'super_admin':
        return 'destructive'
      case 'admin':
        return 'default'
      default:
        return 'secondary'
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'super_admin':
        return 'text-red-600'
      case 'admin':
        return 'text-blue-600'
      default:
        return 'text-green-600'
    }
  }

  // Navigation items based on user role
  const getNavigationItems = () => {
    if (userRole === 'user') {
      return [
        {
          key: "dashboard",
          title: "Dashboard",
          href: "/user-dashboard",
          icon: Home,
          color: "text-blue-600"
        },
        {
          key: "profile",
          title: "My Profile",
          href: "/user/profile",
          icon: User,
          color: "text-purple-600"
        },
        {
          key: "notifications",
          title: "Notifications",
          href: "/user/notifications",
          icon: Bell,
          color: "text-orange-600"
        },
        {
          key: "attendance",
          title: "Attendance",
          href: "/user/attendance",
          icon: Clock,
          color: "text-green-600"
        },
        {
          key: "leave",
          title: "Leave Requests",
          href: "/user/leave",
          icon: Calendar,
          color: "text-indigo-600"
        },
        {
          key: "communication",
          title: "Communication Hub",
          href: "/department/communication",
          icon: MessageSquare,
          color: "text-blue-600"
        },
        {
          key: "memorandums",
          title: "View Memorandums",
          href: "/department/memorandums",
          icon: FileText,
          color: "text-orange-600"
        },
        {
          key: "tasks",
          title: "View Tasks",
          href: "/department/tasks",
          icon: ClipboardList,
          color: "text-teal-600"
        },
        {
          key: "employees",
          title: "Employee Directory",
          href: "/department/employees",
          icon: Users,
          color: "text-indigo-600"
        }
      ]
    } else {
      return [
        {
          key: "dashboard",
          title: "Dashboard",
          href: "/admin-dashboard",
          icon: Home,
          color: "text-blue-600"
        },
        {
          key: "user-management",
          title: "User Management",
          href: "/admin",
          icon: Users,
          color: "text-purple-600"
        },
        {
          key: "account-creation",
          title: "Account Creation",
          href: "/admin/account-creation",
          icon: UserPlus,
          color: "text-green-600"
        },
        {
          key: "employee-management",
          title: "Employee Management",
          href: "/admin/employees",
          icon: Users,
          color: "text-indigo-600"
        },
        {
          key: "attendance-monitoring",
          title: "Attendance Monitoring",
          href: "/admin/attendance",
          icon: Clock,
          color: "text-green-600"
        },
        {
          key: "leave-management",
          title: "Leave Management",
          href: "/admin/leaves",
          icon: Calendar,
          color: "text-orange-600"
        },
        {
          key: "reports-analytics",
          title: "Reports & Analytics",
          href: "/admin/reports",
          icon: BarChart3,
          color: "text-purple-600"
        },
        {
          key: "communication-hub",
          title: "Communication Hub",
          href: "/department/communication",
          icon: MessageSquare,
          color: "text-blue-600"
        },
        {
          key: "memorandums",
          title: "Manage Memorandums",
          href: "/department/memorandums",
          icon: FileText,
          color: "text-orange-600"
        },
        {
          key: "tasks",
          title: "Manage Tasks",
          href: "/department/tasks",
          icon: ClipboardList,
          color: "text-teal-600"
        },
        {
          key: "employee-directory",
          title: "Employee Directory",
          href: "/department/employees",
          icon: Users,
          color: "text-indigo-600"
        },
        {
          key: "department-reports",
          title: "Department Reports",
          href: "/department/reports",
          icon: BarChart3,
          color: "text-purple-600"
        },
        {
          key: "leave-approvals",
          title: "Leave Approvals",
          href: "/department/leaves",
          icon: CheckSquare,
          color: "text-green-600"
        },
        {
          key: "attendance-monitor",
          title: "Attendance Monitor",
          href: "/department/attendance",
          icon: Clock,
          color: "text-blue-600"
        }
      ]
    }
  }

  const navigationItems = getNavigationItems()

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className={`sidebar flex flex-col transition-all duration-300 ease-in-out ${
        sidebarCollapsed ? 'w-16' : 'w-64'
      }`}>
        {/* Logo and Toggle */}
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <Building className="h-5 w-5 text-white" />
            </div>
            {!sidebarCollapsed && (
              <div>
                <h1 className="text-lg font-semibold text-sidebar-foreground">NAPOLCOM</h1>
                <p className="text-xs text-sidebar-foreground/70">System Portal</p>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="h-8 w-8 p-0"
          >
            {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Search */}
        {!sidebarCollapsed && (
          <div className="p-4 border-b border-sidebar-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-sidebar-foreground/50" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-sidebar-accent border border-sidebar-border rounded-md focus:outline-none focus:ring-2 focus:ring-sidebar-ring"
              />
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link key={item.key} href={item.href}>
                <div className={`sidebar-item flex items-center space-x-3 px-3 py-2 cursor-pointer ${
                  isActive ? 'active' : ''
                }`}>
                  <Icon className={`h-5 w-5 ${isActive ? 'text-sidebar-primary-foreground' : item.color}`} />
                  {!sidebarCollapsed && (
                    <span className={`text-sm font-medium ${
                      isActive ? 'text-sidebar-primary-foreground' : 'text-sidebar-foreground'
                    }`}>
                      {item.title}
                    </span>
                  )}
                </div>
              </Link>
            )
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-sidebar-primary rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-sidebar-primary-foreground" />
            </div>
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  {user?.fullName}
                </p>
                <Badge variant="outline" className="text-xs">
                  {getRoleDisplayName(user?.role || 'user')}
                </Badge>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="h-8 w-8 p-0"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-semibold text-card-foreground">
                {navigationItems.find(item => item.href === pathname)?.title || 'Dashboard'}
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <Badge variant="secondary" className="text-xs">3</Badge>
              </div>
              <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-primary-foreground" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
