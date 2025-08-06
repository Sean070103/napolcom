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
  Send
} from "lucide-react"
import { dataStore } from "@/lib/data-store"
import { format } from "date-fns"
import { MemorandumList } from "./memorandum-list"
import { TaskManagement } from "./task-management"

interface CommunicationDashboardProps {
  currentEmployeeId?: string
  departmentName?: string
}

export function CommunicationDashboard({ currentEmployeeId, departmentName }: CommunicationDashboardProps) {
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
      !memo.readBy.includes(currentEmployeeId) && memo.status === "sent"
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
      case "completed":
        return "text-green-600"
      case "in-progress":
        return "text-blue-600"
      case "pending":
        return "text-yellow-600"
      case "overdue":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Communication Dashboard</h1>
          <p className="text-gray-600">Manage memorandums and tasks for NAPOLCOM</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Mail className="w-4 h-4 mr-2" />
            Quick Memo
          </Button>
          <Button>
            <CheckSquare className="w-4 h-4 mr-2" />
            New Task
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Memorandums</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{memorandumStats.total}</div>
            <p className="text-xs text-muted-foreground">
              {memorandumStats.unread} unread
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{taskStats.total}</div>
            <p className="text-xs text-muted-foreground">
              {taskStats.pending} pending, {taskStats.inProgress} in progress
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Urgent Items</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{memorandumStats.urgent + taskStats.overdue}</div>
            <p className="text-xs text-muted-foreground">
              {memorandumStats.urgent} urgent memos, {taskStats.overdue} overdue tasks
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{memorandumStats.recent}</div>
            <p className="text-xs text-muted-foreground">
              {memorandumStats.recent} items this week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="memorandums">Memorandums</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Memorandums */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Memorandums</CardTitle>
                    <CardDescription>Latest communications</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentMemorandums.length === 0 ? (
                    <div className="text-center py-8">
                      <Mail className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500 text-sm">No recent memorandums</p>
                    </div>
                  ) : (
                    recentMemorandums.map((memo) => (
                      <div key={memo.id} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <Mail className="w-4 h-4 text-blue-600" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-sm truncate">{memo.title}</h4>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${getPriorityColor(memo.priority)}`}
                            >
                              {memo.priority}
                            </Badge>
                          </div>
                          <p className="text-gray-600 text-xs line-clamp-2 mb-2">
                            {memo.content}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>{memo.senderName}</span>
                            <span>{format(new Date(memo.createdAt), "MMM dd")}</span>
                            <span>{memo.recipientNames.length} recipients</span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recent Tasks */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Tasks</CardTitle>
                    <CardDescription>Latest assignments</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTasks.length === 0 ? (
                    <div className="text-center py-8">
                      <CheckSquare className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500 text-sm">No recent tasks</p>
                    </div>
                  ) : (
                    recentTasks.map((task) => (
                      <div key={task.id} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckSquare className="w-4 h-4 text-green-600" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-sm truncate">{task.title}</h4>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${getPriorityColor(task.priority)}`}
                            >
                              {task.priority}
                            </Badge>
                          </div>
                          <p className="text-gray-600 text-xs line-clamp-2 mb-2">
                            {task.description}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className={getStatusColor(task.status)}>{task.status}</span>
                            <span>{task.progress}% complete</span>
                            <span>Due {format(new Date(task.dueDate), "MMM dd")}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-20 flex-col">
                  <Mail className="w-6 h-6 mb-2" />
                  <span className="text-sm">Send Memorandum</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <CheckSquare className="w-6 h-6 mb-2" />
                  <span className="text-sm">Create Task</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Users className="w-6 h-6 mb-2" />
                  <span className="text-sm">Team Overview</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <TrendingUp className="w-6 h-6 mb-2" />
                  <span className="text-sm">View Reports</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="memorandums">
          <MemorandumList 
            currentEmployeeId={currentEmployeeId}
            departmentName={departmentName}
          />
        </TabsContent>

        <TabsContent value="tasks">
          <TaskManagement 
            currentEmployeeId={currentEmployeeId}
            departmentName={departmentName}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
} 