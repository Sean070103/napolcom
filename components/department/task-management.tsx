"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { 
  Search, 
  Plus, 
  Calendar, 
  Clock, 
  User, 
  Users, 
  FileText, 
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal
} from "lucide-react"
import { dataStore } from "@/lib/data-store"
import { format, isAfter, isBefore } from "date-fns"

interface TaskManagementProps {
  currentEmployeeId?: string
  departmentName?: string
}

export function TaskManagement({ currentEmployeeId, departmentName }: TaskManagementProps) {
  const [tasks, setTasks] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [selectedTask, setSelectedTask] = useState<any>(null)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium" as const,
    dueDate: "",
    assignedTo: [] as string[],
    assignedToNames: [] as string[],
    tags: [] as string[],
  })

  useEffect(() => {
    loadTasks()
  }, [currentEmployeeId, departmentName])

  const loadTasks = () => {
    let taskList = dataStore.getTasks()
    
    if (currentEmployeeId) {
      taskList = dataStore.getTasks(undefined, currentEmployeeId)
    }
    
    setTasks(taskList)
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <Badge className="bg-red-100 text-red-800">Urgent</Badge>
      case "high":
        return <Badge className="bg-orange-100 text-orange-800">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-800">Low</Badge>
      default:
        return <Badge variant="secondary">{priority}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      case "in-progress":
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "overdue":
        return <Badge className="bg-red-100 text-red-800">Overdue</Badge>
      case "cancelled":
        return <Badge className="bg-gray-100 text-gray-600">Cancelled</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const isOverdue = (dueDate: string) => {
    return isBefore(new Date(dueDate), new Date())
  }

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || task.status === statusFilter
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const handleCreateTask = () => {
    if (!newTask.title || !newTask.description || newTask.assignedTo.length === 0) {
      return
    }

    const employees = dataStore.getEmployees()
    const currentEmployee = employees.find(emp => emp.employeeId === currentEmployeeId)

    if (!currentEmployee) return

    const task = dataStore.addTask({
      title: newTask.title,
      description: newTask.description,
      assignedBy: currentEmployee.employeeId,
      assignedByName: currentEmployee.name,
      assignedTo: newTask.assignedTo,
      assignedToNames: newTask.assignedToNames,
      priority: newTask.priority,
      status: "pending",
      dueDate: newTask.dueDate,
      progress: 0,
      tags: newTask.tags,
      comments: [],
    })

    setNewTask({
      title: "",
      description: "",
      priority: "medium",
      dueDate: "",
      assignedTo: [],
      assignedToNames: [],
      tags: [],
    })
    setIsCreateOpen(false)
    loadTasks()
  }

  const handleUpdateTaskStatus = (taskId: string, newStatus: string) => {
    dataStore.updateTask(taskId, { status: newStatus })
    loadTasks()
  }

  const handleUpdateProgress = (taskId: string, progress: number) => {
    dataStore.updateTaskProgress(taskId, progress)
    loadTasks()
  }

  const handleAddComment = (taskId: string) => {
    if (!newComment.trim() || !currentEmployeeId) return

    const employees = dataStore.getEmployees()
    const currentEmployee = employees.find(emp => emp.employeeId === currentEmployeeId)

    if (!currentEmployee) return

    dataStore.addTaskComment(taskId, {
      taskId,
      employeeId: currentEmployee.employeeId,
      employeeName: currentEmployee.name,
      content: newComment,
    })

    setNewComment("")
    loadTasks()
  }

  const groupedTasks = {
    pending: filteredTasks.filter(task => task.status === "pending"),
    "in-progress": filteredTasks.filter(task => task.status === "in-progress"),
    completed: filteredTasks.filter(task => task.status === "completed"),
    overdue: filteredTasks.filter(task => isOverdue(task.dueDate) && task.status !== "completed"),
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Task Management</CardTitle>
            <CardDescription>Track and manage tasks across the organization</CardDescription>
          </div>
          <Button onClick={() => setIsCreateOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Task
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Pending */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">Pending</h3>
              <Badge variant="secondary">{groupedTasks.pending.length}</Badge>
            </div>
            <div className="space-y-3">
              {groupedTasks.pending.map((task) => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onStatusChange={handleUpdateTaskStatus}
                  onProgressChange={handleUpdateProgress}
                  onView={() => setSelectedTask(task)}
                />
              ))}
            </div>
          </div>

          {/* In Progress */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">In Progress</h3>
              <Badge variant="secondary">{groupedTasks["in-progress"].length}</Badge>
            </div>
            <div className="space-y-3">
              {groupedTasks["in-progress"].map((task) => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onStatusChange={handleUpdateTaskStatus}
                  onProgressChange={handleUpdateProgress}
                  onView={() => setSelectedTask(task)}
                />
              ))}
            </div>
          </div>

          {/* Completed */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">Completed</h3>
              <Badge variant="secondary">{groupedTasks.completed.length}</Badge>
            </div>
            <div className="space-y-3">
              {groupedTasks.completed.map((task) => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onStatusChange={handleUpdateTaskStatus}
                  onProgressChange={handleUpdateProgress}
                  onView={() => setSelectedTask(task)}
                />
              ))}
            </div>
          </div>

          {/* Overdue */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">Overdue</h3>
              <Badge variant="secondary">{groupedTasks.overdue.length}</Badge>
            </div>
            <div className="space-y-3">
              {groupedTasks.overdue.map((task) => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onStatusChange={handleUpdateTaskStatus}
                  onProgressChange={handleUpdateProgress}
                  onView={() => setSelectedTask(task)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Task Detail Dialog */}
        {selectedTask && (
          <Dialog open={!!selectedTask} onOpenChange={() => setSelectedTask(null)}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{selectedTask.title}</DialogTitle>
                <DialogDescription>Task details and progress</DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  {getPriorityBadge(selectedTask.priority)}
                  {getStatusBadge(selectedTask.status)}
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <label className="font-medium">Assigned by:</label>
                    <p className="text-gray-600">{selectedTask.assignedByName}</p>
                  </div>
                  <div>
                    <label className="font-medium">Due date:</label>
                    <p className="text-gray-600">{format(new Date(selectedTask.dueDate), "MMM dd, yyyy")}</p>
                  </div>
                  <div className="col-span-2">
                    <label className="font-medium">Assigned to:</label>
                    <p className="text-gray-600">{selectedTask.assignedToNames.join(", ")}</p>
                  </div>
                </div>
                
                <div>
                  <label className="font-medium">Description:</label>
                  <p className="text-gray-700 mt-1">{selectedTask.description}</p>
                </div>
                
                <div>
                  <label className="font-medium">Progress:</label>
                  <div className="mt-2 space-y-2">
                    <Progress value={selectedTask.progress} className="w-full" />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{selectedTask.progress}% complete</span>
                      <span>{selectedTask.progress}/100</span>
                    </div>
                  </div>
                </div>
                
                {selectedTask.tags.length > 0 && (
                  <div>
                    <label className="font-medium">Tags:</label>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {selectedTask.tags.map((tag: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Comments */}
                <div>
                  <label className="font-medium">Comments:</label>
                  <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
                    {selectedTask.comments.map((comment: any) => (
                      <div key={comment.id} className="p-2 bg-gray-50 rounded-md">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-medium">{comment.employeeName}</span>
                          <span className="text-gray-500">
                            {format(new Date(comment.createdAt), "MMM dd, h:mm a")}
                          </span>
                        </div>
                        <p className="text-gray-700 mt-1">{comment.content}</p>
                      </div>
                    ))}
                  </div>
                  
                  {currentEmployeeId && (
                    <div className="mt-3 flex gap-2">
                      <Input
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            handleAddComment(selectedTask.id)
                          }
                        }}
                      />
                      <Button size="sm" onClick={() => handleAddComment(selectedTask.id)}>
                        Add
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Create Task Dialog */}
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
              <DialogDescription>Assign a new task to team members</DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  placeholder="Enter task title"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  placeholder="Enter task description"
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Priority</label>
                  <Select 
                    value={newTask.priority} 
                    onValueChange={(value) => setNewTask({...newTask, priority: value as any})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Due Date</label>
                  <Input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Assign to</label>
                <Select 
                  onValueChange={(value) => {
                    const employees = dataStore.getEmployees()
                    const employee = employees.find(emp => emp.employeeId === value)
                    if (employee && !newTask.assignedTo.includes(value)) {
                      setNewTask({
                        ...newTask,
                        assignedTo: [...newTask.assignedTo, value],
                        assignedToNames: [...newTask.assignedToNames, employee.name]
                      })
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select team members" />
                  </SelectTrigger>
                  <SelectContent>
                    {dataStore.getEmployees().map((emp) => (
                      <SelectItem key={emp.employeeId} value={emp.employeeId}>
                        {emp.name} ({emp.department})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {newTask.assignedToNames.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {newTask.assignedToNames.map((name, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {name}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateTask}>
                <Plus className="w-4 h-4 mr-2" />
                Create Task
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}

// Task Card Component
function TaskCard({ task, onStatusChange, onProgressChange, onView }: {
  task: any
  onStatusChange: (taskId: string, status: string) => void
  onProgressChange: (taskId: string, progress: number) => void
  onView: () => void
}) {
  const isOverdue = isAfter(new Date(), new Date(task.dueDate))

  return (
    <div className="border rounded-lg p-3 bg-white hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-sm line-clamp-2">{task.title}</h4>
        <div className="flex items-center gap-1">
          {getPriorityBadge(task.priority)}
          {isOverdue && task.status !== "completed" && (
            <AlertCircle className="w-4 h-4 text-red-500" />
          )}
        </div>
      </div>
      
      <p className="text-gray-600 text-xs mb-3 line-clamp-2">{task.description}</p>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Progress</span>
          <span>{task.progress}%</span>
        </div>
        <Progress value={task.progress} className="w-full h-2" />
      </div>
      
      <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          <span>{format(new Date(task.dueDate), "MMM dd")}</span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="w-3 h-3" />
          <span>{task.assignedToNames.length}</span>
        </div>
        {task.comments.length > 0 && (
          <div className="flex items-center gap-1">
            <MessageSquare className="w-3 h-3" />
            <span>{task.comments.length}</span>
          </div>
        )}
      </div>
      
      <div className="flex gap-1 mt-3">
        <Button variant="ghost" size="sm" onClick={onView} className="flex-1">
          <Eye className="w-3 h-3 mr-1" />
          View
        </Button>
        {task.status === "pending" && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onStatusChange(task.id, "in-progress")}
            className="flex-1"
          >
            Start
          </Button>
        )}
        {task.status === "in-progress" && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onProgressChange(task.id, 100)}
            className="flex-1"
          >
            Complete
          </Button>
        )}
      </div>
    </div>
  )
}

function getPriorityBadge(priority: string) {
  switch (priority) {
    case "urgent":
      return <Badge className="bg-red-100 text-red-800 text-xs">Urgent</Badge>
    case "high":
      return <Badge className="bg-orange-100 text-orange-800 text-xs">High</Badge>
    case "medium":
      return <Badge className="bg-yellow-100 text-yellow-800 text-xs">Medium</Badge>
    case "low":
      return <Badge className="bg-green-100 text-green-800 text-xs">Low</Badge>
    default:
      return <Badge variant="secondary" className="text-xs">{priority}</Badge>
  }
} 