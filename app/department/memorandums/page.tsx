import { MemorandumList } from "@/components/department/memorandum-list"

export default function MemorandumsPage() {
  // In a real app, you would get these from authentication context
  const currentEmployeeId = "EMP001" // Maria Santos
  const departmentName = "Human Resources"

  return (
    <div className="container mx-auto py-6">
      <MemorandumList 
        currentEmployeeId={currentEmployeeId}
        departmentName={departmentName}
      />
    </div>
  )
} 