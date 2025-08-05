import { ReportsSection } from "@/components/admin/reports-section"

export default function AdminReportsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Comprehensive reports and data analytics</p>
        </div>
      </div>

      {/* Reports Section */}
      <ReportsSection />
    </div>
  )
} 