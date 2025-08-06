import { v4 as uuidv4 } from 'uuid'

export interface Employee {
  id: string
  name: string
  email: string
  department: string
  position: string
  employeeId: string
  hireDate: string
  status: 'active' | 'inactive'
  phone?: string
  address?: string
  emergencyContact?: string
  emergencyPhone?: string
  leaveBalances: {
    vacation: number
    sick: number
    emergency: number
    maternity: number
    paternity: number
    study: number
    bereavement: number
  }
  createdAt?: string
  updatedAt?: string
}

export interface AttendanceRecord {
  id: string
  employeeId: string
  date: string
  timeIn: string | null
  timeOut: string | null
  status: 'present' | 'absent' | 'late' | 'half-day' | 'on-leave'
  location: string
  overtime: number
  remarks: string
  createdAt: string
  updatedAt: string
}

export interface LeaveRequest {
  id: string
  employeeId: string
  leaveType: 'vacation' | 'sick' | 'emergency' | 'maternity' | 'paternity' | 'study' | 'bereavement'
  startDate: string
  endDate: string
  days: number
  reason: string
  status: 'pending' | 'approved' | 'rejected'
  approvedBy?: string
  approvedAt?: string
  comments?: string
  createdAt: string
  updatedAt: string
}

export interface Department {
  id: string
  name: string
  head: string
  totalEmployees: number
}

export interface Memorandum {
  id: string
  title: string
  content: string
  senderId: string
  senderName: string
  senderDepartment: string
  recipients: string[] // employee IDs
  recipientNames: string[] // for display
  priority: 'low' | 'medium' | 'high' | 'urgent'
  category: 'general' | 'policy' | 'announcement' | 'directive' | 'information'
  status: 'draft' | 'sent' | 'read' | 'archived'
  attachments?: string[]
  readBy: string[] // employee IDs who have read it
  expiresAt?: string
  createdAt: string
  updatedAt: string
}

export interface Task {
  id: string
  title: string
  description: string
  assignedBy: string
  assignedByName: string
  assignedTo: string[] // employee IDs
  assignedToNames: string[] // for display
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'pending' | 'in-progress' | 'completed' | 'overdue' | 'cancelled'
  dueDate: string
  completedAt?: string
  completedBy?: string
  progress: number // 0-100
  tags: string[]
  attachments?: string[]
  comments: TaskComment[]
  createdAt: string
  updatedAt: string
}

export interface TaskComment {
  id: string
  taskId: string
  employeeId: string
  employeeName: string
  content: string
  createdAt: string
}

// Mock Data
const mockEmployees: Employee[] = [
  {
    id: uuidv4(),
    name: "Maria Santos",
    email: "maria.santos@napolcom.gov.ph",
    department: "Human Resources",
    position: "HR Manager",
    employeeId: "EMP001",
    hireDate: "2020-03-15",
    status: "active",
    phone: "+63 912 345 6789",
    address: "123 Main Street, Quezon City, Metro Manila",
    emergencyContact: "Jose Santos",
    emergencyPhone: "+63 923 456 7890",
    leaveBalances: {
      vacation: 12,
      sick: 8,
      emergency: 3,
      maternity: 0,
      paternity: 0,
      study: 5,
      bereavement: 3,
    },
    createdAt: "2020-03-15T00:00:00.000Z",
    updatedAt: "2024-01-15T00:00:00.000Z",
  },
  {
    id: uuidv4(),
    name: "Juan Dela Cruz",
    email: "juan.delacruz@napolcom.gov.ph",
    department: "Finance",
    position: "Senior Accountant",
    employeeId: "EMP002",
    hireDate: "2019-07-22",
    status: "active",
    phone: "+63 934 567 8901",
    address: "456 Oak Avenue, Makati City, Metro Manila",
    emergencyContact: "Maria Dela Cruz",
    emergencyPhone: "+63 945 678 9012",
    leaveBalances: {
      vacation: 15,
      sick: 10,
      emergency: 5,
      maternity: 0,
      paternity: 0,
      study: 3,
      bereavement: 3,
    },
    createdAt: "2019-07-22T00:00:00.000Z",
    updatedAt: "2024-01-15T00:00:00.000Z",
  },
  {
    id: uuidv4(),
    name: "Ana Reyes",
    email: "ana.reyes@napolcom.gov.ph",
    department: "IT Department",
    position: "System Administrator",
    employeeId: "EMP003",
    hireDate: "2021-01-10",
    status: "active",
    phone: "+63 956 789 0123",
    address: "789 Pine Street, Taguig City, Metro Manila",
    emergencyContact: "Carlos Reyes",
    emergencyPhone: "+63 967 890 1234",
    leaveBalances: {
      vacation: 18,
      sick: 12,
      emergency: 4,
      maternity: 0,
      paternity: 0,
      study: 7,
      bereavement: 3,
    },
    createdAt: "2021-01-10T00:00:00.000Z",
    updatedAt: "2024-01-15T00:00:00.000Z",
  },
  {
    id: uuidv4(),
    name: "Pedro Martinez",
    email: "pedro.martinez@napolcom.gov.ph",
    department: "Operations",
    position: "Operations Manager",
    employeeId: "EMP004",
    hireDate: "2018-11-05",
    status: "active",
    phone: "+63 978 901 2345",
    address: "321 Elm Street, Pasig City, Metro Manila",
    emergencyContact: "Isabella Martinez",
    emergencyPhone: "+63 989 012 3456",
    leaveBalances: {
      vacation: 20,
      sick: 15,
      emergency: 6,
      maternity: 0,
      paternity: 0,
      study: 4,
      bereavement: 3,
    },
    createdAt: "2018-11-05T00:00:00.000Z",
    updatedAt: "2024-01-15T00:00:00.000Z",
  },
  {
    id: uuidv4(),
    name: "Carmen Lopez",
    email: "carmen.lopez@napolcom.gov.ph",
    department: "Legal",
    position: "Legal Officer",
    employeeId: "EMP005",
    hireDate: "2022-06-18",
    status: "active",
    phone: "+63 990 123 4567",
    address: "654 Maple Drive, Mandaluyong City, Metro Manila",
    emergencyContact: "Roberto Lopez",
    emergencyPhone: "+63 901 234 5678",
    leaveBalances: {
      vacation: 10,
      sick: 7,
      emergency: 2,
      maternity: 0,
      paternity: 0,
      study: 6,
      bereavement: 3,
    },
    createdAt: "2022-06-18T00:00:00.000Z",
    updatedAt: "2024-01-15T00:00:00.000Z",
  },
]

const mockAttendanceRecords: AttendanceRecord[] = [
  {
    id: uuidv4(),
    employeeId: "EMP001",
    date: "2024-01-15",
    timeIn: "08:00",
    timeOut: "17:00",
    status: "present",
    location: "Main Office",
    overtime: 0,
    remarks: "",
    createdAt: "2024-01-15T08:00:00Z",
    updatedAt: "2024-01-15T17:00:00Z",
  },
  {
    id: uuidv4(),
    employeeId: "EMP002",
    date: "2024-01-15",
    timeIn: "08:15",
    timeOut: "17:30",
    status: "late",
    location: "Main Office",
    overtime: 0.5,
    remarks: "Traffic delay",
    createdAt: "2024-01-15T08:15:00Z",
    updatedAt: "2024-01-15T17:30:00Z",
  },
  {
    id: uuidv4(),
    employeeId: "EMP003",
    date: "2024-01-15",
    timeIn: "08:00",
    timeOut: null,
    status: "present",
    location: "Main Office",
    overtime: 0,
    remarks: "",
    createdAt: "2024-01-15T08:00:00Z",
    updatedAt: "2024-01-15T08:00:00Z",
  },
  {
    id: uuidv4(),
    employeeId: "EMP004",
    date: "2024-01-15",
    timeIn: null,
    timeOut: null,
    status: "absent",
    location: "",
    overtime: 0,
    remarks: "No show",
    createdAt: "2024-01-15T09:00:00Z",
    updatedAt: "2024-01-15T09:00:00Z",
  },
]

const mockLeaveRequests: LeaveRequest[] = [
  {
    id: uuidv4(),
    employeeId: "EMP001",
    leaveType: "vacation",
    startDate: "2024-02-01",
    endDate: "2024-02-05",
    days: 5,
    reason: "Family vacation",
    status: "pending",
    createdAt: "2024-01-10T10:00:00Z",
    updatedAt: "2024-01-10T10:00:00Z",
  },
  {
    id: uuidv4(),
    employeeId: "EMP002",
    leaveType: "sick",
    startDate: "2024-01-16",
    endDate: "2024-01-17",
    days: 2,
    reason: "Medical appointment",
    status: "approved",
    approvedBy: "admin@napolcom.gov.ph",
    approvedAt: "2024-01-12T14:30:00Z",
    comments: "Approved with medical certificate",
    createdAt: "2024-01-12T09:00:00Z",
    updatedAt: "2024-01-12T14:30:00Z",
  },
  {
    id: uuidv4(),
    employeeId: "EMP003",
    leaveType: "emergency",
    startDate: "2024-01-18",
    endDate: "2024-01-18",
    days: 1,
    reason: "Family emergency",
    status: "approved",
    approvedBy: "admin@napolcom.gov.ph",
    approvedAt: "2024-01-17T16:00:00Z",
    comments: "Emergency approved",
    createdAt: "2024-01-17T15:30:00Z",
    updatedAt: "2024-01-17T16:00:00Z",
  },
]

const mockDepartments: Department[] = [
  {
    id: "dept001",
    name: "Human Resources",
    head: "Maria Santos",
    totalEmployees: 8,
  },
  {
    id: "dept002",
    name: "Finance",
    head: "Juan Dela Cruz",
    totalEmployees: 12,
  },
  {
    id: "dept003",
    name: "IT Department",
    head: "Ana Reyes",
    totalEmployees: 15,
  },
  {
    id: "dept004",
    name: "Operations",
    head: "Pedro Martinez",
    totalEmployees: 20,
  },
  {
    id: "dept005",
    name: "Legal",
    head: "Carmen Lopez",
    totalEmployees: 6,
  },
]

const mockMemorandums: Memorandum[] = [
  {
    id: uuidv4(),
    title: "Updated COVID-19 Safety Protocols",
    content: "All employees are required to follow the updated safety protocols including mandatory mask wearing in common areas and regular sanitization of workstations. Please review the attached guidelines and ensure compliance.",
    senderId: "EMP001",
    senderName: "Maria Santos",
    senderDepartment: "Human Resources",
    recipients: ["EMP001", "EMP002", "EMP003", "EMP004", "EMP005"],
    recipientNames: ["Maria Santos", "Juan Dela Cruz", "Ana Reyes", "Pedro Martinez", "Carmen Lopez"],
    priority: "high",
    category: "policy",
    status: "sent",
    attachments: ["covid_protocols_2024.pdf"],
    readBy: ["EMP001", "EMP002"],
    createdAt: "2024-01-15T09:00:00Z",
    updatedAt: "2024-01-15T09:00:00Z",
  },
  {
    id: uuidv4(),
    title: "Monthly Department Meeting Schedule",
    content: "Please be informed that the monthly department heads meeting will be held every first Monday of the month at 2:00 PM in the Conference Room A. All department heads are required to attend.",
    senderId: "EMP004",
    senderName: "Pedro Martinez",
    senderDepartment: "Operations",
    recipients: ["EMP001", "EMP002", "EMP003", "EMP005"],
    recipientNames: ["Maria Santos", "Juan Dela Cruz", "Ana Reyes", "Carmen Lopez"],
    priority: "medium",
    category: "announcement",
    status: "sent",
    readBy: ["EMP001", "EMP003"],
    createdAt: "2024-01-14T14:30:00Z",
    updatedAt: "2024-01-14T14:30:00Z",
  },
  {
    id: uuidv4(),
    title: "IT System Maintenance Notice",
    content: "Scheduled maintenance will be performed on our internal systems this Saturday from 10:00 PM to 2:00 AM. During this time, some services may be temporarily unavailable. We apologize for any inconvenience.",
    senderId: "EMP003",
    senderName: "Ana Reyes",
    senderDepartment: "IT Department",
    recipients: ["EMP001", "EMP002", "EMP003", "EMP004", "EMP005"],
    recipientNames: ["Maria Santos", "Juan Dela Cruz", "Ana Reyes", "Pedro Martinez", "Carmen Lopez"],
    priority: "medium",
    category: "information",
    status: "sent",
    readBy: ["EMP001", "EMP002", "EMP003"],
    createdAt: "2024-01-13T11:00:00Z",
    updatedAt: "2024-01-13T11:00:00Z",
  },
]

const mockTasks: Task[] = [
  {
    id: uuidv4(),
    title: "Review Q4 Financial Reports",
    description: "Complete review of all Q4 financial reports and prepare summary for the board meeting next week. Ensure all data is accurate and properly formatted.",
    assignedBy: "EMP002",
    assignedByName: "Juan Dela Cruz",
    assignedTo: ["EMP002"],
    assignedToNames: ["Juan Dela Cruz"],
    priority: "high",
    status: "in-progress",
    dueDate: "2024-01-25",
    progress: 65,
    tags: ["finance", "reports", "quarterly"],
    comments: [
      {
        id: uuidv4(),
        taskId: "task001",
        employeeId: "EMP002",
        employeeName: "Juan Dela Cruz",
        content: "Started reviewing the reports. Will complete by Friday.",
        createdAt: "2024-01-15T10:00:00Z",
      },
    ],
    createdAt: "2024-01-10T09:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: uuidv4(),
    title: "Update Employee Handbook",
    description: "Review and update the employee handbook with new policies and procedures. Include recent changes to leave policies and remote work guidelines.",
    assignedBy: "EMP001",
    assignedByName: "Maria Santos",
    assignedTo: ["EMP001"],
    assignedToNames: ["Maria Santos"],
    priority: "medium",
    status: "pending",
    dueDate: "2024-02-15",
    progress: 0,
    tags: ["hr", "documentation", "policies"],
    comments: [],
    createdAt: "2024-01-12T14:00:00Z",
    updatedAt: "2024-01-12T14:00:00Z",
  },
  {
    id: uuidv4(),
    title: "Network Security Audit",
    description: "Conduct comprehensive security audit of all network systems and identify potential vulnerabilities. Prepare detailed report with recommendations.",
    assignedBy: "EMP003",
    assignedByName: "Ana Reyes",
    assignedTo: ["EMP003"],
    assignedToNames: ["Ana Reyes"],
    priority: "urgent",
    status: "completed",
    dueDate: "2024-01-20",
    progress: 100,
    completedAt: "2024-01-18T16:30:00Z",
    completedBy: "EMP003",
    tags: ["it", "security", "audit"],
    comments: [
      {
        id: uuidv4(),
        taskId: "task003",
        employeeId: "EMP003",
        employeeName: "Ana Reyes",
        content: "Security audit completed. Report has been submitted to management.",
        createdAt: "2024-01-18T16:30:00Z",
      },
    ],
    createdAt: "2024-01-05T08:00:00Z",
    updatedAt: "2024-01-18T16:30:00Z",
  },
]

// Data Store Class
class DataStore {
  private employees: Employee[] = mockEmployees
  private attendanceRecords: AttendanceRecord[] = mockAttendanceRecords
  private leaveRequests: LeaveRequest[] = mockLeaveRequests
  private departments: Department[] = mockDepartments
  private memorandums: Memorandum[] = mockMemorandums
  private tasks: Task[] = mockTasks

  // Employee Methods
  getEmployees(): Employee[] {
    return this.employees
  }

  getEmployeeById(id: string): Employee | undefined {
    return this.employees.find(emp => emp.id === id)
  }

  getEmployeeByEmail(email: string): Employee | undefined {
    return this.employees.find(emp => emp.email === email)
  }

  addEmployee(employee: Omit<Employee, 'id'>): Employee {
    const newEmployee: Employee = {
      ...employee,
      id: uuidv4(),
    }
    this.employees.push(newEmployee)
    return newEmployee
  }

  updateEmployee(id: string, updates: Partial<Employee>): Employee | null {
    const index = this.employees.findIndex(emp => emp.id === id)
    if (index === -1) return null
    
    this.employees[index] = { ...this.employees[index], ...updates }
    return this.employees[index]
  }

  deleteEmployee(id: string): boolean {
    const index = this.employees.findIndex(emp => emp.id === id)
    if (index === -1) return false
    
    this.employees.splice(index, 1)
    return true
  }

  // Attendance Methods
  getAttendanceRecords(date?: string): AttendanceRecord[] {
    if (date) {
      return this.attendanceRecords.filter(record => record.date === date)
    }
    return this.attendanceRecords
  }

  getAttendanceByEmployee(employeeId: string, startDate?: string, endDate?: string): AttendanceRecord[] {
    let records = this.attendanceRecords.filter(record => record.employeeId === employeeId)
    
    if (startDate && endDate) {
      records = records.filter(record => 
        record.date >= startDate && record.date <= endDate
      )
    }
    
    return records.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  addAttendanceRecord(record: Omit<AttendanceRecord, 'id' | 'createdAt' | 'updatedAt'>): AttendanceRecord {
    const newRecord: AttendanceRecord = {
      ...record,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    this.attendanceRecords.push(newRecord)
    return newRecord
  }

  updateAttendanceRecord(id: string, updates: Partial<AttendanceRecord>): AttendanceRecord | null {
    const index = this.attendanceRecords.findIndex(record => record.id === id)
    if (index === -1) return null
    
    this.attendanceRecords[index] = { 
      ...this.attendanceRecords[index], 
      ...updates,
      updatedAt: new Date().toISOString()
    }
    return this.attendanceRecords[index]
  }

  // Leave Methods
  getLeaveRequests(status?: string): LeaveRequest[] {
    if (status) {
      return this.leaveRequests.filter(request => request.status === status)
    }
    return this.leaveRequests
  }

  getLeaveRequestsByEmployee(employeeId: string): LeaveRequest[] {
    return this.leaveRequests
      .filter(request => request.employeeId === employeeId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }

  addLeaveRequest(request: Omit<LeaveRequest, 'id' | 'createdAt' | 'updatedAt'>): LeaveRequest {
    const newRequest: LeaveRequest = {
      ...request,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    this.leaveRequests.push(newRequest)
    return newRequest
  }

  updateLeaveRequest(id: string, updates: Partial<LeaveRequest>): LeaveRequest | null {
    const index = this.leaveRequests.findIndex(request => request.id === id)
    if (index === -1) return null
    
    this.leaveRequests[index] = { 
      ...this.leaveRequests[index], 
      ...updates,
      updatedAt: new Date().toISOString()
    }
    return this.leaveRequests[index]
  }

  // Department Methods
  getDepartments(): Department[] {
    return this.departments
  }

  // Statistics Methods
  getAttendanceStats(date: string) {
    const records = this.getAttendanceRecords(date)
    const totalEmployees = this.employees.filter(emp => emp.status === 'active').length
    
    return {
      totalEmployees,
      present: records.filter(r => r.status === 'present').length,
      absent: records.filter(r => r.status === 'absent').length,
      late: records.filter(r => r.status === 'late').length,
      onLeave: records.filter(r => r.status === 'on-leave').length,
      attendanceRate: totalEmployees > 0 ? (records.filter(r => r.status === 'present').length / totalEmployees) * 100 : 0,
    }
  }

  getLeaveStats() {
    const pending = this.leaveRequests.filter(r => r.status === 'pending').length
    const approved = this.leaveRequests.filter(r => r.status === 'approved').length
    const rejected = this.leaveRequests.filter(r => r.status === 'rejected').length
    
    return {
      pending,
      approved,
      rejected,
      total: this.leaveRequests.length,
    }
  }

  // Memorandum Methods
  getMemorandums(status?: string, employeeId?: string): Memorandum[] {
    let memorandums = this.memorandums

    if (status) {
      memorandums = memorandums.filter(memo => memo.status === status)
    }

    if (employeeId) {
      memorandums = memorandums.filter(memo => 
        memo.recipients.includes(employeeId) || memo.senderId === employeeId
      )
    }

    return memorandums.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }

  getMemorandumById(id: string): Memorandum | undefined {
    return this.memorandums.find(memo => memo.id === id)
  }

  addMemorandum(memorandum: Omit<Memorandum, 'id' | 'createdAt' | 'updatedAt'>): Memorandum {
    const newMemorandum: Memorandum = {
      ...memorandum,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    this.memorandums.push(newMemorandum)
    return newMemorandum
  }

  updateMemorandum(id: string, updates: Partial<Memorandum>): Memorandum | null {
    const index = this.memorandums.findIndex(memo => memo.id === id)
    if (index === -1) return null
    
    this.memorandums[index] = { 
      ...this.memorandums[index], 
      ...updates,
      updatedAt: new Date().toISOString()
    }
    return this.memorandums[index]
  }

  markMemorandumAsRead(id: string, employeeId: string): Memorandum | null {
    const memorandum = this.getMemorandumById(id)
    if (!memorandum) return null

    if (!memorandum.readBy.includes(employeeId)) {
      memorandum.readBy.push(employeeId)
      memorandum.updatedAt = new Date().toISOString()
    }

    return memorandum
  }

  // Task Methods
  getTasks(status?: string, employeeId?: string): Task[] {
    let tasks = this.tasks

    if (status) {
      tasks = tasks.filter(task => task.status === status)
    }

    if (employeeId) {
      tasks = tasks.filter(task => 
        task.assignedTo.includes(employeeId) || task.assignedBy === employeeId
      )
    }

    return tasks.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }

  getTaskById(id: string): Task | undefined {
    return this.tasks.find(task => task.id === id)
  }

  addTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Task {
    const newTask: Task = {
      ...task,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    this.tasks.push(newTask)
    return newTask
  }

  updateTask(id: string, updates: Partial<Task>): Task | null {
    const index = this.tasks.findIndex(task => task.id === id)
    if (index === -1) return null
    
    this.tasks[index] = { 
      ...this.tasks[index], 
      ...updates,
      updatedAt: new Date().toISOString()
    }
    return this.tasks[index]
  }

  addTaskComment(taskId: string, comment: Omit<TaskComment, 'id' | 'createdAt'>): TaskComment {
    const newComment: TaskComment = {
      ...comment,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    }

    const task = this.getTaskById(taskId)
    if (task) {
      task.comments.push(newComment)
      task.updatedAt = new Date().toISOString()
    }

    return newComment
  }

  updateTaskProgress(id: string, progress: number): Task | null {
    const task = this.getTaskById(id)
    if (!task) return null

    task.progress = Math.max(0, Math.min(100, progress))
    task.updatedAt = new Date().toISOString()

    if (progress >= 100) {
      task.status = 'completed'
      task.completedAt = new Date().toISOString()
    } else if (task.status === 'completed') {
      task.status = 'in-progress'
      task.completedAt = undefined
    }

    return task
  }

  getTaskStats() {
    const total = this.tasks.length
    const pending = this.tasks.filter(t => t.status === 'pending').length
    const inProgress = this.tasks.filter(t => t.status === 'in-progress').length
    const completed = this.tasks.filter(t => t.status === 'completed').length
    const overdue = this.tasks.filter(t => {
      if (t.status === 'completed') return false
      return new Date(t.dueDate) < new Date()
    }).length

    return {
      total,
      pending,
      inProgress,
      completed,
      overdue,
    }
  }
}

// Export singleton instance
export const dataStore = new DataStore() 