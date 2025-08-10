# Public Registration System

## Overview

The NAPOLCOM System now supports public account registration while maintaining secure role-based access control for administrative functions.

## Features

### Public Account Registration
- **Self-Service Registration**: Users can create their own accounts at `/register`
- **Default Role**: All public registrations are automatically assigned the "User" role
- **Validation**: Comprehensive form validation including:
  - Email format validation
  - Username format validation (alphanumeric + underscore only)
  - Password strength requirements
  - Duplicate email/username checking
  - Password confirmation matching

### Admin Account Creation
- **Role-Based Restrictions**: 
  - Super Admin: Can create Super Admin, Admin, and User accounts
  - Admin: Can only create User accounts
  - User: Cannot create any accounts
- **Access Control**: Only Admin and Super Admin can access the Account Creation feature
- **Audit Logging**: All account creations are logged with creator information

## Security Rules

### Public Registration
- ✅ All self-registrations default to "User" role
- ✅ No role selection available for public registration
- ✅ Strong password requirements enforced
- ✅ Email and username uniqueness validation
- ✅ Input sanitization and validation

### Admin Account Creation
- ✅ Super Admin can create any role (Super Admin, Admin, User)
- ✅ Admin can only create User accounts
- ✅ Role validation enforced at data layer
- ✅ Creation logs track who created what account

## User Interface

### Registration Page (`/register`)
- Clean, user-friendly registration form
- Real-time validation feedback
- Password strength indicators
- Success/error messaging
- Link to login page

### Login Page (`/login`)
- Updated to include registration link
- Maintains existing demo credentials section
- Seamless navigation between login and registration

### Admin Panel
- Account Creation tab with role-based restrictions
- User Management with proper permissions
- Creation logs for audit trail

## Technical Implementation

### Data Store Methods
- `registerUser()`: Public registration method
- `addUser()`: Admin account creation with role validation
- `canCreateUser()`: Role permission checking
- `validatePassword()`: Password strength validation

### Authentication Flow
1. Public users register at `/register`
2. Account created with "User" role
3. Users can immediately log in at `/login`
4. Admin users can create additional accounts via Admin Panel

## Usage Examples

### Public Registration
1. Navigate to `/register`
2. Fill in required fields:
   - Full Name
   - Email Address
   - Username
   - Password
   - Confirm Password
3. Submit form
4. Account created with "User" role
5. Redirected to login page

### Admin Account Creation
1. Login as Admin or Super Admin
2. Navigate to Admin Panel
3. Use Account Creation tab
4. Select appropriate role based on permissions
5. Fill in user details
6. Account created with selected role

## Security Considerations

- **Password Hashing**: Passwords are hashed before storage (bcrypt in production)
- **Role Validation**: Server-side validation prevents unauthorized role creation
- **Input Sanitization**: All inputs are validated and sanitized
- **Audit Logging**: All account creations are logged for security
- **Session Management**: Proper authentication context management

## Future Enhancements

- Email verification for public registrations
- CAPTCHA integration for spam prevention
- Two-factor authentication for admin accounts
- Account approval workflow for public registrations
- Enhanced audit logging with IP addresses and timestamps

