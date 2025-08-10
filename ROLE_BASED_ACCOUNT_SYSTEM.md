# Role-Based Account Creation System

## Overview

The Role-Based Account Creation System is a comprehensive user management solution for NAPOLCOM that implements secure, role-based access control with detailed logging and audit trails. This system ensures that only authorized personnel can create and manage user accounts while maintaining strict security protocols.

## Features

### 1. User Roles & Permissions

#### Super Admin
- **Full System Access**: Can create, edit, and delete Admin and User accounts
- **System Management**: Can manage system-wide settings and configurations
- **Complete Control**: Has full access to all modules and data
- **Account Deletion**: Can delete any user account (except their own)
- **Role Management**: Can assign any role to new users

#### Admin
- **User Management**: Can create and manage User accounts
- **Employee Data**: Can manage employee data but cannot change Super Admin settings
- **Limited Role Assignment**: Can only create user accounts (not admin or super admin)
- **No Deletion Rights**: Cannot delete user accounts

#### User
- **Profile Management**: Can view and update their own profile
- **Module Access**: Can view permitted modules but cannot manage other accounts
- **Read-Only Access**: Limited to viewing and updating personal information

### 2. Account Creation Workflow

#### Access Control
- Only Admins and Super Admins can create accounts
- Role-based validation prevents unauthorized account creation
- Automatic logging of all account creation activities

#### Form Fields
- **Full Name**: Required, minimum 2 characters
- **Email Address**: Required, unique, validated format
- **Username**: Required, unique, alphanumeric with underscores only
- **Password**: Required, strong password validation
- **Role Selection**: Dropdown with role descriptions
- **Profile Photo URL**: Optional profile picture

#### Validation Rules
- **Email**: Must be unique and valid format
- **Username**: Must be unique, 3+ characters, alphanumeric + underscores
- **Password**: Minimum 8 characters, uppercase, lowercase, number, special character
- **Role**: Must be within creator's permission level

#### Post-Creation Actions
- Automatic account creation logging
- Success confirmation with username
- Option to create another account
- Email notification (simulated in demo)

### 3. Database Structure

#### Users Table
```typescript
interface User {
  id: string
  fullName: string
  email: string
  username: string
  passwordHash: string
  role: 'super_admin' | 'admin' | 'user'
  profilePhoto?: string
  isActive: boolean
  lastLoginAt?: string
  createdAt: string
  updatedAt: string
  createdBy?: string // ID of the user who created this account
}
```

#### Account Creation Logs Table
```typescript
interface AccountCreationLog {
  id: string
  createdUserId: string
  createdUserName: string
  createdByUserId: string
  createdByUserName: string
  role: 'super_admin' | 'admin' | 'user'
  createdAt: string
}
```

### 4. UI/UX Features

#### Account Creation Page
- **Role-based Access**: Only permitted roles can access
- **Dynamic Role Dropdown**: Shows only available roles for current user
- **Role Descriptions**: Hover tooltips explain each role's permissions
- **Real-time Validation**: Immediate feedback on form errors
- **Password Strength**: Visual indicators for password requirements
- **Success Messages**: Clear confirmation after account creation

#### User Management Interface
- **Search & Filter**: Find users by name, email, role, or status
- **User Details**: Comprehensive user information display
- **Edit Capabilities**: Update user information and roles
- **Delete Functionality**: Super admin can delete accounts
- **Status Management**: Activate/deactivate user accounts

#### Admin Dashboard
- **Overview Statistics**: User counts, role distribution, recent activity
- **Permission Display**: Shows current user's capabilities
- **Activity Logs**: Recent account creation history
- **System Settings**: Advanced configuration (Super Admin only)

### 5. Security Features

#### Password Security
- **Hashing**: Passwords stored using bcrypt/argon2 (simulated)
- **Strong Validation**: Enforces complex password requirements
- **Never Plain Text**: Passwords never stored in plain text

#### Role-Based Authorization
- **Middleware Protection**: Every action validated against user role
- **Permission Checks**: Server-side validation of all operations
- **Access Control**: UI elements hidden based on permissions

#### Audit Logging
- **Account Creation Logs**: Complete audit trail of all account creations
- **User Tracking**: Records who created each account
- **Timestamp Logging**: Detailed timestamps for all activities
- **Role Logging**: Tracks role assignments and changes

#### Data Protection
- **Input Validation**: Comprehensive client and server-side validation
- **SQL Injection Prevention**: Parameterized queries (simulated)
- **XSS Protection**: Sanitized input handling
- **CSRF Protection**: Token-based request validation (simulated)

## Technical Implementation

### Components

#### 1. AccountCreation (`components/auth/account-creation.tsx`)
- **Purpose**: Main account creation interface
- **Features**: Form validation, role selection, password strength
- **Security**: Role-based access control, input validation
- **UI**: Tabs for creation and logs, responsive design

#### 2. UserManagement (`components/auth/user-management.tsx`)
- **Purpose**: User account management and administration
- **Features**: Search, filter, edit, delete users
- **Security**: Permission-based actions, audit logging
- **UI**: Table view, modals, status indicators

#### 3. AdminDashboard (`components/auth/admin-dashboard.tsx`)
- **Purpose**: Comprehensive admin interface
- **Features**: Statistics, overview, integrated management
- **Security**: Role-based tab access, permission display
- **UI**: Dashboard layout, charts, activity feeds

### Data Store Integration

#### User Management Methods
```typescript
// Core user operations
getUsers(): User[]
getUserById(id: string): User | undefined
getUserByEmail(email: string): User | undefined
getUserByUsername(username: string): User | undefined
addUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>, createdByUserId?: string): User
updateUser(id: string, updates: Partial<User>): User | null
deleteUser(id: string): boolean

// Account creation logging
getAccountCreationLogs(): AccountCreationLog[]
getAccountCreationLogsByCreator(createdByUserId: string): AccountCreationLog[]

// Role-based validation
canCreateUser(creatorRole: string, targetRole: string): boolean
getAvailableRolesForCreator(creatorRole: string): string[]
validatePassword(password: string): { isValid: boolean; errors: string[] }
```

### Pages

#### Admin Page (`app/admin/page.tsx`)
- **Route**: `/admin`
- **Purpose**: Main admin interface
- **Access**: Role-based access control
- **Features**: Integrated dashboard with all admin functions

## Usage Examples

### Creating a User Account (Admin)
1. Navigate to `/admin`
2. Click "Create Account" tab
3. Fill in user details:
   - Full Name: "John Smith"
   - Email: "john.smith@napolcom.gov.ph"
   - Username: "jsmith"
   - Password: "SecurePass123!"
   - Role: "User"
4. Click "Create Account"
5. Account is created and logged

### Managing Users (Super Admin)
1. Navigate to `/admin`
2. Click "Manage Users" tab
3. Search for specific user
4. Click edit button to modify user details
5. Update role, status, or information
6. Save changes

### Viewing Account Creation Logs
1. Navigate to `/admin`
2. Click "Create Account" tab
3. Click "Creation Logs" sub-tab
4. View recent account creation history
5. See who created which accounts and when

## Security Considerations

### Password Requirements
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character

### Role Hierarchy
```
Super Admin > Admin > User
```

### Permission Matrix
| Action | Super Admin | Admin | User |
|--------|-------------|-------|------|
| Create Super Admin | ✅ | ❌ | ❌ |
| Create Admin | ✅ | ❌ | ❌ |
| Create User | ✅ | ✅ | ❌ |
| Edit Any User | ✅ | ✅ | ❌ |
| Delete User | ✅ | ❌ | ❌ |
| View Logs | ✅ | Limited | ❌ |

### Audit Trail
- All account creations logged
- Creator information tracked
- Timestamp and role recorded
- Complete audit history maintained

## Error Handling

### Validation Errors
- Real-time form validation
- Clear error messages
- Field-specific error display
- Password strength indicators

### Permission Errors
- Access denied messages
- Role-based UI hiding
- Graceful degradation
- Security-focused error handling

### System Errors
- User-friendly error messages
- Fallback mechanisms
- Error logging
- Recovery options

## Performance Optimizations

### Database Queries
- Efficient user lookups
- Indexed searches
- Pagination support
- Cached role permissions

### UI Performance
- Lazy loading of components
- Debounced search
- Optimized re-renders
- Responsive design

## Future Enhancements

### Planned Features
- **Email Integration**: Real email notifications
- **Two-Factor Authentication**: Enhanced security
- **Bulk Operations**: Mass user management
- **Advanced Logging**: Detailed audit trails
- **API Integration**: RESTful endpoints
- **Real-time Updates**: WebSocket notifications

### Security Improvements
- **JWT Tokens**: Stateless authentication
- **Rate Limiting**: Prevent abuse
- **IP Whitelisting**: Network security
- **Session Management**: Secure sessions
- **Encryption**: End-to-end data protection

## Technical Stack

- **Frontend**: React/Next.js with TypeScript
- **UI Components**: Shadcn/ui with Tailwind CSS
- **State Management**: React hooks and context
- **Data Store**: In-memory singleton (mock backend)
- **Validation**: Custom validation functions
- **Icons**: Lucide React
- **Date Handling**: Native JavaScript Date API

## Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Access Admin Panel**
   - Navigate to `http://localhost:3000/admin`
   - Use demo super admin account for testing

## Demo Data

The system includes mock data for testing:
- **Super Admin**: John Doe (john.doe@napolcom.gov.ph)
- **Admin**: Jane Smith (jane.smith@napolcom.gov.ph)
- **User**: Bob User (bob.user@napolcom.gov.ph)

## Contributing

When contributing to this system:
1. Follow the existing code structure
2. Maintain role-based security
3. Add comprehensive validation
4. Include proper error handling
5. Update documentation
6. Test all permission levels

## Support

For technical support or questions about the Role-Based Account Creation System, please refer to the system documentation or contact the development team.

