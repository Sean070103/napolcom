import { TaskManagement } from "@/components/department/task-management"

export default function TasksPage() {
  // In a real app, you would get these from authentication context
  const currentEmployeeId = "EMP001" // Maria Santos
  const departmentName = "Human Resources"

  return (
    <div className="container mx-auto py-6">
      <TaskManagement 
        currentEmployeeId={currentEmployeeId}
        departmentName={departmentName}
      />
    </div>
  )
} 