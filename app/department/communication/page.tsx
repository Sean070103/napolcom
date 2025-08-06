import { CommunicationDashboard } from "@/components/department/communication-dashboard"

export default function CommunicationPage() {
  // In a real app, you would get these from authentication context
  const currentEmployeeId = "EMP001" // Maria Santos
  const departmentName = "Human Resources"

  return (
    <div className="container mx-auto py-6">
      <CommunicationDashboard 
        currentEmployeeId={currentEmployeeId}
        departmentName={departmentName}
      />
    </div>
  )
} 