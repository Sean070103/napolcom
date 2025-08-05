import { DepartmentReports } from "@/components/department/department-reports"

export default function DepartmentReportsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Department Reports</h1>
          <p className="text-gray-600">Team-specific analytics and performance reports</p>
        </div>
      </div>

      {/* Department Reports Section */}
      <DepartmentReports departmentName="Your Department" />
    </div>
  )
} 