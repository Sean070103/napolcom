# User and Admin Separation System

## Overview

The NAPOLCOM system now features completely separated user and admin interfaces, providing distinct experiences and functionality based on user roles. This separation ensures that users only see relevant features and data for their role.

## Role-Based Dashboard Routing

### Automatic Redirection
- **Main Dashboard (`/dashboard`)**: Automatically redirects users to their role-specific dashboard
- **User Dashboard (`/user-dashboard`)**: For regular users (role: 'user')
- **Admin Dashboard (`/admin-dashboard`)**: For administrators and super administrators (roles: 'admin', 'super_admin')

### Routing Logic
```typescript
// In app/dashboard/page.tsx
useEffect(() => {
  if (user) {
    if (user.role === 'user') {
      router.push('/user-dashboard')
    } else if (user.role === 'admin' || user.role === 'super_admin') {
      router.push('/admin-dashboard')
    }
  }
}, [user, router])
```

## User Dashboard Features

### Location: `/user-dashboard`

#### 1. Personal Workspace
- **My Profile** (`/user/profile`): View and edit personal information
- **Notifications** (`/user/notifications`): System notifications and alerts
- **My Attendance** (`/user/attendance`): Clock in/out and view attendance records
- **Leave Requests** (`/user/leave`): Request leave and track leave credits

#### 2. Department Access
- **Employee Directory**: View department employees
- **Communication**: Access memorandums and tasks
- **Memorandums**: View department memorandums
- **Task Management**: View assigned tasks

#### 3. Quick Actions
- Request Leave
- View Memorandums
- Contact Colleagues
- Check Attendance

#### 4. User Statistics
- Days Present (this month)
- Leave Credits (remaining)
- My Tasks (pending)
- Notifications (unread)

#### 5. Recent Activity
- Clock in/out records
- New memorandums received
- Task assignments
- Leave request approvals

## Admin Dashboard Features

### Location: `/admin-dashboard`

#### 1. User Management
- **Create Accounts**: Add new user accounts
- **Manage Users**: View, edit, and delete user accounts
- **Role Management**: Manage user roles and permissions
- **User Activity**: Monitor user activity logs

#### 2. System Administration
- **System Settings**: Configure system parameters
- **Analytics & Reports**: View system analytics
- **System Logs**: Monitor system activity
- **Security Settings**: Manage security configurations

#### 3. Department Oversight
- **Employee Directory**: Manage all employees
- **Communication**: Oversee department communications
- **Memorandums**: Manage memorandum distribution
- **Task Management**: Oversee task assignments

#### 4. System Statistics
- **Total Users**: Active account count
- **Active Sessions**: Currently online users
- **Pending Approvals**: Items requiring action
- **System Alerts**: Issues requiring attention

#### 5. Recent Administrative Activity
- New user account creations
- System backup completions
- Leave request approvals
- Memorandum publications
- System maintenance schedules

#### 6. Quick Actions
- Create User
- View Reports
- System Settings
- Security

## Key Differences

### Visual Design
- **User Dashboard**: Blue theme, focused on personal productivity
- **Admin Dashboard**: Red theme, focused on system management

### Header Branding
- **User Dashboard**: "User Portal"
- **Admin Dashboard**: "Administrative Portal"

### Navigation
- **User Dashboard**: Personal and department-focused navigation
- **Admin Dashboard**: System management and oversight navigation

### Statistics
- **User Dashboard**: Personal statistics (attendance, leave, tasks)
- **Admin Dashboard**: System-wide statistics (users, sessions, approvals)

## Protected Routes

### User-Only Pages
```typescript
<ProtectedRoute requiredRoles={['user']}>
  <UserContent />
</ProtectedRoute>
```

### Admin-Only Pages
```typescript
<ProtectedRoute requiredRoles={['admin', 'super_admin']}>
  <AdminContent />
</ProtectedRoute>
```

## User-Specific Pages

### 1. User Profile (`/user/profile`)
- Edit personal information
- Account security settings
- Account summary
- Quick actions

### 2. Notifications (`/user/notifications`)
- View system notifications
- Mark as read/unread
- Filter by status
- Notification settings

### 3. Attendance (`/user/attendance`)
- Real-time clock in/out
- Attendance statistics
- Weekly attendance records
- Current time display

### 4. Leave Management (`/user/leave`)
- Leave credits overview
- Submit leave requests
- Track request status
- Leave history

## Security Features

### Role-Based Access Control
- Users can only access user-specific features
- Admins can access both admin and user features
- Super admins have full system access

### Protected Navigation
- Users are automatically redirected to appropriate dashboards
- Unauthorized access attempts are blocked
- Session management for security

### Data Isolation
- Users see only their personal data
- Admins can view all user data
- System-wide data only visible to admins

## Benefits of Separation

### 1. Improved User Experience
- Cleaner, focused interfaces
- Relevant features only
- Reduced cognitive load

### 2. Enhanced Security
- Role-based access control
- Data isolation
- Reduced attack surface

### 3. Better Performance
- Smaller component trees
- Faster loading times
- Optimized queries

### 4. Easier Maintenance
- Separate code paths
- Clear responsibility boundaries
- Simplified testing

## Technical Implementation

### File Structure
```
app/
├── dashboard/          # Main redirect page
├── user-dashboard/     # User dashboard
├── admin-dashboard/    # Admin dashboard
├── user/              # User-specific pages
│   ├── profile/
│   ├── notifications/
│   ├── attendance/
│   └── leave/
└── admin/             # Admin pages
    └── page.tsx       # Admin panel
```

### Component Architecture
- Separate dashboard components
- Role-specific layouts
- Shared components where appropriate
- Protected route wrapper

### State Management
- User context for authentication
- Role-based data filtering
- Separate state for user/admin features

## Future Enhancements

### 1. Advanced User Features
- Personal calendar integration
- Customizable dashboard widgets
- Personal task management

### 2. Enhanced Admin Features
- Advanced analytics dashboard
- Bulk user operations
- System monitoring tools

### 3. Role Refinements
- Department-specific roles
- Custom permission sets
- Hierarchical role management

## Testing the Separation

### User Login Flow
1. Login as a user account
2. Automatically redirected to `/user-dashboard`
3. Access user-specific features
4. Cannot access admin features

### Admin Login Flow
1. Login as an admin account
2. Automatically redirected to `/admin-dashboard`
3. Access admin features
4. Can also access department features

### Security Testing
- Try accessing admin pages as user (should be blocked)
- Try accessing user pages as admin (should work)
- Verify role-based component rendering
- Test protected route functionality

