import { LoginForm } from "@/components/auth/login-form"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <span className="text-white font-bold text-xl">NPC</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">NAPOLCOM</h1>
          <p className="text-gray-600">Attendance & Leave Management System</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
