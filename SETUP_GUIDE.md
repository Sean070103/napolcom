# NAPOLCOM System Setup Guide

## Initial Setup

The system has been configured with a single initial admin account to get you started.

### Default Admin Account

**Email:** `admin@napolcom.gov.ph`  
**Username:** `admin`  
**Password:** Any password (for demo purposes)  
**Role:** Super Administrator

### How to Login

1. Navigate to the application URL
2. You will be automatically redirected to the login page
3. Enter the credentials above
4. Click "Sign In"

### First Steps After Login

1. **Access the Admin Panel**
   - Click on the "Admin Panel" card on the dashboard
   - Or navigate to `/admin` directly

2. **Create Additional Accounts**
   - Use the "Create Account" tab in the admin panel
   - Create admin and user accounts as needed
   - All new accounts will be logged in the "Creation Logs" tab

3. **Manage Existing Accounts**
   - Use the "Manage Users" tab to view, edit, or delete user accounts
   - Only Super Administrators can delete accounts

### Account Creation Rules

- **Super Admins** can create Admin and User accounts
- **Admins** can create User accounts only
- **Users** cannot create any accounts

### Security Notes

- In a production environment, implement proper password hashing (bcrypt/argon2)
- Add email verification for new accounts
- Implement proper session management
- Add rate limiting for login attempts
- Use HTTPS in production

### System Features

- **Employee Management**: View employee profiles, documents, and leave information
- **Communication**: Send memorandums and manage tasks
- **Admin Panel**: Manage user accounts and system settings
- **Role-based Access Control**: Different permissions based on user roles

### Next Steps

1. Create additional admin accounts for your team
2. Add employee data through the department management system
3. Configure system settings as needed
4. Set up proper authentication in production

## Support

For technical support or questions about the system, contact your system administrator.

