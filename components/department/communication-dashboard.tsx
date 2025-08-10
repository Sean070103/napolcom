"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Mail, 
  CheckSquare, 
  Users, 
  TrendingUp, 
  AlertCircle, 
  Clock,
  FileText,
  MessageSquare,
  Plus,
  Eye,
  Send,
  Activity
} from "lucide-react"
import { dataStore } from "@/lib/data-store"
import { format } from "date-fns"
import { MemorandumList } from "./memorandum-list"
import { TaskManagement } from "./task-management"

interface CommunicationDashboardProps {
  currentEmployeeId?: string
  departmentName?: string
  userRole?: 'user' | 'admin' | 'super_admin'
}

export function CommunicationDashboard({ currentEmployeeId, departmentName, userRole }: CommunicationDashboardProps) {
  const [memorandumStats, setMemorandumStats] = useState({
    total: 0,
    unread: 0,
    urgent: 0,
    recent: 0,
  })
  const [taskStats, setTaskStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
    overdue: 0,
  })
  const [recentMemorandums, setRecentMemorandums] = useState<any[]>([])
  const [recentTasks, setRecentTasks] = useState<any[]>([])

  const isAdmin = userRole === 'admin' || userRole === 'super_admin'

  useEffect(() => {
    loadStats()
  }, [currentEmployeeId, departmentName])

  const loadStats = () => {
    // Load memorandum stats
    let memorandums = dataStore.getMemorandums()
    if (currentEmployeeId) {
      memorandums = dataStore.getMemorandums(undefined, currentEmployeeId)
    }

    const unread = memorandums.filter(memo => 
      !memo.readBy.includes(currentEmployeeId || "") && memo.status === "sent"
    ).length

    const urgent = memorandums.filter(memo => 
      memo.priority === "urgent" && memo.status === "sent"
    ).length

    const recent = memorandums.filter(memo => {
      const memoDate = new Date(memo.createdAt)
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return memoDate >= weekAgo
    }).length

    setMemorandumStats({
      total: memorandums.length,
      unread,
      urgent,
      recent,
    })

    setRecentMemorandums(memorandums.slice(0, 5))

    // Load task stats
    const taskStats = dataStore.getTaskStats()
    setTaskStats(taskStats)

    let tasks = dataStore.getTasks()
    if (currentEmployeeId) {
      tasks = dataStore.getTasks(undefined, currentEmployeeId)
    }
    setRecentTasks(tasks.slice(0, 5))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "text-red-600"
      case "high":
        return "text-orange-600"
      case "medium":
        return "text-yellow-600"
      case "low":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sent":
        return "text-green-600"
      case "draft":
        return "text-yellow-600"
      case "pending":
        return "text-orange-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Communication Hub</h1>
            <p className="text-gray-600 mt-1">Manage memorandums, tasks, and department communications.</p>
          </div>
          <div className="h-12 w-12 bg-primary rounded-full flex items-center justify-center">
            <MessageSquare className="h-6 w-6 text-primary-foreground" />
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Memorandums</p>
                <p className="text-2xl font-bold text-gray-900">{memorandumStats.total}</p>
                <p className="text-xs text-blue-600">{memorandumStats.unread} unread</p>
              </div>
              <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Tasks</p>
                <p className="text-2xl font-bold text-gray-900">{taskStats.total}</p>
                <p className="text-xs text-green-600">{taskStats.completed} completed</p>
              </div>
              <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckSquare className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Urgent Items</p>
                <p className="text-2xl font-bold text-gray-900">{memorandumStats.urgent}</p>
                <p className="text-xs text-red-600">Require attention</p>
              </div>
              <div className="h-10 w-10 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Recent Activity</p>
                <p className="text-2xl font-bold text-gray-900">{memorandumStats.recent}</p>
                <p className="text-xs text-purple-600">This week</p>
              </div>
              <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Activity className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5 text-blue-600" />
            <span>Communication Management</span>
          </CardTitle>
          <CardDescription>
            Create, manage, and track memorandums and tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="memorandums" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="memorandums" className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Memorandums</span>
                {memorandumStats.unread > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {memorandumStats.unread}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="tasks" className="flex items-center space-x-2">
                <CheckSquare className="h-4 w-4" />
                <span>Tasks</span>
                {taskStats.pending > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {taskStats.pending}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="memorandums" className="mt-6">
              <MemorandumList currentEmployeeId={currentEmployeeId} departmentName={departmentName} userRole={userRole} />
            </TabsContent>
            
            <TabsContent value="tasks" className="mt-6">
              <TaskManagement currentEmployeeId={currentEmployeeId} departmentName={departmentName} userRole={userRole} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Memorandums */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <span>Recent Memorandums</span>
            </CardTitle>
            <CardDescription>
              Latest memorandums and communications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMemorandums.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No memorandums</h3>
                  <p className="text-gray-600">No recent memorandums to display.</p>
                </div>
              ) : (
                recentMemorandums.map((memo) => (
                  <div key={memo.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{memo.subject}</p>
                      <p className="text-sm text-gray-600">From: {memo.sender}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {memo.priority}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {format(new Date(memo.createdAt), "MMM dd, yyyy")}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Tasks */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckSquare className="h-5 w-5 text-green-600" />
              <span>Recent Tasks</span>
            </CardTitle>
            <CardDescription>
              Latest task assignments and updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTasks.length === 0 ? (
                <div className="text-center py-8">
                  <CheckSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks</h3>
                  <p className="text-gray-600">No recent tasks to display.</p>
                </div>
              ) : (
                recentTasks.map((task) => (
                  <div key={task.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckSquare className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{task.title}</p>
                      <p className="text-sm text-gray-600">Assigned to: {task.assignedTo}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {task.status}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          Due: {format(new Date(task.dueDate), "MMM dd, yyyy")}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 