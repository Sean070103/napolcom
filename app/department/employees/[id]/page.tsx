import { EmployeeProfile } from "@/components/department/employee-profile"

interface EmployeePageProps {
  params: {
    id: string
  }
}

export default function EmployeePage({ params }: EmployeePageProps) {
  return (
    <div className="container mx-auto py-6">
      <EmployeeProfile employeeId={params.id} />
    </div>
  )
}

