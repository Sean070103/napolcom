import { TeamAttendanceTable } from "@/components/department/team-attendance-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Eye, Calendar } from "lucide-react"
import { dataStore } from "@/lib/data-store"
import { format } from "date-fns"

export default function DepartmentAttendancePage() {
  const today = format(new Date(), "yyyy-MM-dd")
  const stats = dataStore.getAttendanceStats(today)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Team Attendance</h1>
          <p className="text-gray-600">Monitor your team's attendance and performance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button>
            <Eye className="w-4 h-4 mr-2" />
            Live Monitor
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Size</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEmployees}</div>
            <p className="text-xs text-muted-foreground">Team members</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Present Today</CardTitle>
            <div className="h-4 w-4 text-green-600">✓</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.present}</div>
            <p className="text-xs text-muted-foreground">
              {stats.attendanceRate.toFixed(1)}% attendance rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Absent Today</CardTitle>
            <div className="h-4 w-4 text-red-600">✗</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.absent}</div>
            <p className="text-xs text-muted-foreground">Including sick leaves</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Late Today</CardTitle>
            <div className="h-4 w-4 text-orange-600">⏰</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.late}</div>
            <p className="text-xs text-muted-foreground">Tardiness incidents</p>
          </CardContent>
        </Card>
      </div>

      {/* Team Attendance Table */}
      <TeamAttendanceTable selectedDate={today} departmentName="Your Department" />
    </div>
  )
} 