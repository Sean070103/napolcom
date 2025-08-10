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
import { 
  Search, 
  Filter, 
  Plus, 
  Mail, 
  Clock, 
  User, 
  Users, 
  FileText, 
  AlertCircle,
  CheckCircle,
  Eye,
  Send,
  Shield
} from "lucide-react"
import { dataStore } from "@/lib/data-store"
import { format } from "date-fns"

interface MemorandumListProps {
  currentEmployeeId?: string
  departmentName?: string
  userRole?: 'user' | 'admin' | 'super_admin'
}

export function MemorandumList({ currentEmployeeId, departmentName, userRole }: MemorandumListProps) {
  const [memorandums, setMemorandums] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [selectedMemorandum, setSelectedMemorandum] = useState<any>(null)
  const [isComposeOpen, setIsComposeOpen] = useState(false)
  const [newMemorandum, setNewMemorandum] = useState({
    title: "",
    content: "",
    priority: "medium" as const,
    category: "general" as const,
    recipients: [] as string[],
    recipientNames: [] as string[],
  })

  const isAdmin = userRole === 'admin' || userRole === 'super_admin'

  useEffect(() => {
    loadMemorandums()
  }, [currentEmployeeId, departmentName])

  const loadMemorandums = () => {
    let memos = dataStore.getMemorandums()
    
    if (currentEmployeeId) {
      memos = dataStore.getMemorandums(undefined, currentEmployeeId)
    }
    
    setMemorandums(memos)
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

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "policy":
        return <Badge className="bg-blue-100 text-blue-800">Policy</Badge>
      case "announcement":
        return <Badge className="bg-purple-100 text-purple-800">Announcement</Badge>
      case "directive":
        return <Badge className="bg-indigo-100 text-indigo-800">Directive</Badge>
      case "information":
        return <Badge className="bg-gray-100 text-gray-800">Information</Badge>
      default:
        return <Badge variant="secondary">{category}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "sent":
        return <Badge className="bg-green-100 text-green-800">Sent</Badge>
      case "draft":
        return <Badge className="bg-gray-100 text-gray-800">Draft</Badge>
      case "read":
        return <Badge className="bg-blue-100 text-blue-800">Read</Badge>
      case "archived":
        return <Badge className="bg-gray-100 text-gray-600">Archived</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const filteredMemorandums = memorandums.filter(memo => {
    const matchesSearch = memo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         memo.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || memo.status === statusFilter
    const matchesPriority = priorityFilter === "all" || memo.priority === priorityFilter
    const matchesCategory = categoryFilter === "all" || memo.category === categoryFilter

    return matchesSearch && matchesStatus && matchesPriority && matchesCategory
  })

  const handleSendMemorandum = () => {
    if (!newMemorandum.title || !newMemorandum.content || newMemorandum.recipients.length === 0) {
      return
    }

    const employees = dataStore.getEmployees()
    const currentEmployee = employees.find(emp => emp.employeeId === currentEmployeeId)

    if (!currentEmployee) return

    const memorandum = dataStore.addMemorandum({
      title: newMemorandum.title,
      content: newMemorandum.content,
      senderId: currentEmployee.employeeId,
      senderName: currentEmployee.name,
      senderDepartment: currentEmployee.department,
      recipients: newMemorandum.recipients,
      recipientNames: newMemorandum.recipientNames,
      priority: newMemorandum.priority,
      category: newMemorandum.category,
      status: "sent",
      readBy: [],
    })

    setNewMemorandum({
      title: "",
      content: "",
      priority: "medium",
      category: "general",
      recipients: [],
      recipientNames: [],
    })
    setIsComposeOpen(false)
    loadMemorandums()
  }

  const handleMarkAsRead = (memorandumId: string) => {
    if (currentEmployeeId) {
      dataStore.markMemorandumAsRead(memorandumId, currentEmployeeId)
      loadMemorandums()
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Memorandums</CardTitle>
            <CardDescription>View and manage official communications</CardDescription>
          </div>
          {isAdmin && (
            <Button onClick={() => setIsComposeOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Compose
            </Button>
          )}
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
                  placeholder="Search memorandums..."
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
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="read">Read</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
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
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="policy">Policy</SelectItem>
                <SelectItem value="announcement">Announcement</SelectItem>
                <SelectItem value="directive">Directive</SelectItem>
                <SelectItem value="information">Information</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Memorandum List */}
        <div className="space-y-4">
          {filteredMemorandums.length === 0 && (
            <div className="text-center py-8">
              <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No memorandums found</p>
              <p className="text-sm text-gray-400">Memorandums will appear here</p>
            </div>
          )}
          
          {filteredMemorandums.map((memo) => (
            <div
              key={memo.id}
              className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg">{memo.title}</h3>
                    {getPriorityBadge(memo.priority)}
                    {getCategoryBadge(memo.category)}
                    {getStatusBadge(memo.status)}
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {memo.content}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{memo.senderName}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{memo.recipientNames.length} recipients</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{format(new Date(memo.createdAt), "MMM dd, yyyy")}</span>
                    </div>
                    {memo.attachments && memo.attachments.length > 0 && (
                      <div className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        <span>{memo.attachments.length} attachments</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          setSelectedMemorandum(memo)
                          if (currentEmployeeId) {
                            handleMarkAsRead(memo.id)
                          }
                        }}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{memo.title}</DialogTitle>
                        <DialogDescription>Memorandum details</DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          {getPriorityBadge(memo.priority)}
                          {getCategoryBadge(memo.category)}
                          {getStatusBadge(memo.status)}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <label className="font-medium">From:</label>
                            <p className="text-gray-600">{memo.senderName} ({memo.senderDepartment})</p>
                          </div>
                          <div>
                            <label className="font-medium">Date:</label>
                            <p className="text-gray-600">{format(new Date(memo.createdAt), "MMM dd, yyyy 'at' h:mm a")}</p>
                          </div>
                          <div className="col-span-2">
                            <label className="font-medium">To:</label>
                            <p className="text-gray-600">{memo.recipientNames.join(", ")}</p>
                          </div>
                        </div>
                        
                        <div>
                          <label className="font-medium">Content:</label>
                          <div className="mt-2 p-3 bg-gray-50 rounded-md">
                            <p className="text-gray-700 whitespace-pre-wrap">{memo.content}</p>
                          </div>
                        </div>
                        
                        {memo.attachments && memo.attachments.length > 0 && (
                          <div>
                            <label className="font-medium">Attachments:</label>
                            <div className="mt-2 space-y-1">
                              {memo.attachments.map((attachment: string, index: number) => (
                                <div key={index} className="flex items-center gap-2 text-sm text-blue-600">
                                  <FileText className="w-4 h-4" />
                                  <span>{attachment}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Compose Dialog */}
        {isAdmin && (
          <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Compose Memorandum</DialogTitle>
                <DialogDescription>Create a new memorandum</DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    value={newMemorandum.title}
                    onChange={(e) => setNewMemorandum({...newMemorandum, title: e.target.value})}
                    placeholder="Enter memorandum title"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Priority</label>
                    <Select 
                      value={newMemorandum.priority} 
                      onValueChange={(value) => setNewMemorandum({...newMemorandum, priority: value as any})}
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
                    <label className="text-sm font-medium">Category</label>
                    <Select 
                      value={newMemorandum.category} 
                      onValueChange={(value) => setNewMemorandum({...newMemorandum, category: value as any})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="policy">Policy</SelectItem>
                        <SelectItem value="announcement">Announcement</SelectItem>
                        <SelectItem value="directive">Directive</SelectItem>
                        <SelectItem value="information">Information</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Recipients</label>
                  <Select 
                    onValueChange={(value) => {
                      const employees = dataStore.getEmployees()
                      const employee = employees.find(emp => emp.employeeId === value)
                      if (employee && !newMemorandum.recipients.includes(value)) {
                        setNewMemorandum({
                          ...newMemorandum,
                          recipients: [...newMemorandum.recipients, value],
                          recipientNames: [...newMemorandum.recipientNames, employee.name]
                        })
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select recipients" />
                    </SelectTrigger>
                    <SelectContent>
                      {dataStore.getEmployees().filter(emp => 
                        !newMemorandum.recipients.includes(emp.employeeId)
                      ).map((emp) => (
                        <SelectItem key={emp.employeeId} value={emp.employeeId}>
                          {emp.name} ({emp.department})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {newMemorandum.recipientNames.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {newMemorandum.recipientNames.map((name, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary" 
                          className="text-xs cursor-pointer hover:bg-gray-300"
                          onClick={() => {
                            setNewMemorandum({
                              ...newMemorandum,
                              recipients: newMemorandum.recipients.filter((_, i) => i !== index),
                              recipientNames: newMemorandum.recipientNames.filter((_, i) => i !== index)
                            })
                          }}
                        >
                          {name} ×
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="text-sm font-medium">Content</label>
                  <Textarea
                    value={newMemorandum.content}
                    onChange={(e) => setNewMemorandum({...newMemorandum, content: e.target.value})}
                    placeholder="Enter memorandum content..."
                    rows={6}
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsComposeOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSendMemorandum}>
                  <Send className="w-4 h-4 mr-2" />
                  Send Memorandum
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  )
} 