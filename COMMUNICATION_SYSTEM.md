# NAPOLCOM Communication System

A comprehensive communication and task management system similar to Microsoft Teams, specifically designed for NAPOLCOM (National Police Commission).

## Features

### 📧 Memorandum Management
- **Send Official Communications**: Create and send memorandums to specific employees or departments
- **Priority Levels**: Urgent, High, Medium, Low priority classifications
- **Categories**: Policy, Announcement, Directive, Information, General
- **Read Tracking**: Track who has read each memorandum
- **Attachments**: Support for file attachments
- **Search & Filter**: Advanced search and filtering capabilities

### ✅ Task Management
- **Kanban Board**: Visual task management with drag-and-drop functionality
- **Task Assignment**: Assign tasks to multiple team members
- **Progress Tracking**: Real-time progress updates with percentage completion
- **Priority System**: Urgent, High, Medium, Low priority levels
- **Due Date Management**: Set and track due dates with overdue alerts
- **Comments & Collaboration**: Add comments and collaborate on tasks
- **Status Tracking**: Pending, In Progress, Completed, Overdue, Cancelled

### 📊 Dashboard Overview
- **Statistics Cards**: Real-time metrics for memorandums and tasks
- **Recent Activity**: Latest communications and task updates
- **Quick Actions**: Fast access to common functions
- **Unread Notifications**: Track unread memorandums and urgent items

## System Architecture

### Data Models

#### Memorandum
```typescript
interface Memorandum {
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
```

#### Task
```typescript
interface Task {
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
```

## Pages & Routes

### Main Communication Dashboard
- **Route**: `/department/communication`
- **Component**: `CommunicationDashboard`
- **Features**: Overview, statistics, recent activity, quick actions

### Memorandum Management
- **Route**: `/department/memorandums`
- **Component**: `MemorandumList`
- **Features**: Create, view, filter, and manage memorandums

### Task Management
- **Route**: `/department/tasks`
- **Component**: `TaskManagement`
- **Features**: Kanban board, task creation, progress tracking

## Components

### Core Components

#### `CommunicationDashboard`
- Main dashboard with overview, statistics, and quick actions
- Tabbed interface for different sections
- Real-time statistics and recent activity feed

#### `MemorandumList`
- List view of all memorandums with filtering
- Compose new memorandum functionality
- Detailed view with read tracking
- Priority and category management

#### `TaskManagement`
- Kanban board with drag-and-drop functionality
- Task creation and assignment
- Progress tracking and status updates
- Comments and collaboration features

### Supporting Components

#### `TaskCard`
- Individual task card for Kanban board
- Progress visualization
- Quick action buttons
- Status and priority indicators

## Usage Examples

### Creating a Memorandum
1. Navigate to `/department/memorandums`
2. Click "Compose" button
3. Fill in title, content, priority, category
4. Select recipients from employee list
5. Click "Send Memorandum"

### Creating a Task
1. Navigate to `/department/tasks`
2. Click "Create Task" button
3. Fill in title, description, priority
4. Set due date and assign team members
5. Click "Create Task"

### Managing Task Progress
1. View tasks in Kanban board
2. Click "Start" to move from Pending to In Progress
3. Update progress percentage
4. Click "Complete" to mark as finished

## Key Features

### 🔐 Security & Permissions
- Role-based access control
- Department-specific views
- Employee-specific task and memorandum filtering

### 📱 Responsive Design
- Mobile-friendly interface
- Adaptive layouts for different screen sizes
- Touch-friendly interactions

### 🔄 Real-time Updates
- Live statistics updates
- Real-time progress tracking
- Instant status changes

### 📈 Analytics & Reporting
- Task completion rates
- Memorandum read rates
- Department performance metrics
- Urgent item tracking

## Integration Points

### Existing NAPOLCOM System
- Integrates with existing employee database
- Uses existing department structure
- Compatible with current authentication system

### Future Enhancements
- Email notifications
- Mobile app integration
- Advanced reporting
- Calendar integration
- File upload capabilities

## Technical Stack

- **Frontend**: Next.js 14, React, TypeScript
- **UI Components**: Shadcn/ui, Tailwind CSS
- **State Management**: React hooks, local state
- **Data Storage**: In-memory data store (can be replaced with database)
- **Date Handling**: date-fns
- **Icons**: Lucide React

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Access Communication System**
   - Navigate to `/department/communication`
   - Or access specific features:
     - `/department/memorandums` for memorandum management
     - `/department/tasks` for task management

## Mock Data

The system includes comprehensive mock data for testing:
- 5 employees across different departments
- Sample memorandums with various priorities and categories
- Sample tasks with different statuses and progress levels
- Realistic dates and content

## Contributing

When adding new features:
1. Follow the existing component structure
2. Use TypeScript interfaces for data models
3. Implement proper error handling
4. Add appropriate loading states
5. Ensure responsive design
6. Update documentation

## License

This system is designed specifically for NAPOLCOM internal use. 