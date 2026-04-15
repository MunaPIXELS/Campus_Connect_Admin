# Campus Connect Admin Panel

A comprehensive internal administration platform for managing the Campus Connect mobile application. This webapp provides campus staff and administrators with powerful tools to manage users, moderate content, analyze platform metrics, and configure system settings.

## 🚀 Features

### 1. **Dashboard**

- Real-time platform statistics overview
- Quick access to recent users, posts, and pending reports
- Key performance indicators and activity summaries
- Visual representation of platform health

### 2. **User Management**

- View all registered users with detailed profiles
- Search and filter users by name, email, or campus
- View user activity metrics (posts, followers, join date)
- Suspend or unsuspend user accounts
- Delete user accounts (with confirmation)
- Access comprehensive user profiles with action buttons

### 3. **Content Moderation**

- Review all user-generated posts
- Approve flagged or questionable content
- Remove inappropriate posts immediately
- Visual indicators for flagged content
- Filter posts by status (approved, flagged, removed)
- Detailed post view with flagging information
- Engagement metrics (likes, comments)

### 4. **Report Management**

- Track and manage user-submitted reports
- Prioritize reports by severity (high, medium, low)
- Filter reports by status (pending, resolved, dismissed)
- Search functionality for quick access
- Detailed report investigation view
- Take actions like suspending reported users
- Automatic system reporting for suspicious activity

### 5. **Campus Management**

- Create, view, and manage campus/location information
- Track active users per campus
- Monitor organization count per campus
- Edit campus details
- Delete campuses (with confirmation)
- View campus creation history

### 6. **Analytics & Reports**

- Platform-wide usage statistics
- Daily active user trends (last 10 days)
- Posts by category breakdown
- Key metrics (active rate, avg posts per user, etc.)
- Moderation metrics and flagging rates
- Visual charts and graphs for data analysis

### 7. **System Settings**

- Configure platform-wide settings
- General settings (platform name, admin email, max post length)
- Security settings (2FA requirement, maintenance mode)
- Moderation policies (post approval, auto-flagging)
- Account management (admin and moderator roles)
- Advanced settings (rate limits, cache, backups)
- System status monitoring

### 8. **Authentication**

- Secure login system for employees
- Session management
- Admin profile display
- Safe logout functionality

## 🔐 Security Features

- **Role-Based Access**: Different permission levels
- **Two-Factor Authentication**: Optional enhanced security
- **Session Timeout**: Automatic logout after inactivity
- **Admin Audit**: Track all administrative actions
- **Data Privacy**: Secure handling of user information

## 📊 Key Admin Capabilities (Beyond Mobile App)

### Internal-Only Features

✓ Direct user account management and suspension  
✓ Complete post visibility and moderation control  
✓ No appeals process - instant content removal  
✓ Real-time reporting and analytics  
✓ System configuration and maintenance mode  
✓ Advanced user filtering and search  
✓ Bulk actions on content and users  
✓ Complete audit trails and activity logs

### Unique Admin Tools

- Override user settings without notification
- Test new features with admin toggles
- Emergency platform shutdown capability
- Content emergency removal tools
- User data export and analysis
- Custom email campaigns to users
- Platform behavior fine-tuning

## 🛠️ Tech Stack

- **Frontend**: React 19.2.5
- **Routing**: React Router v6
- **UI Components**: Lucide React (icons)
- **Styling**: CSS3 with modern features
- **HTTP Client**: Axios
- **State Management**: React Hooks

## 📦 Installation

### Prerequisites

- Node.js 14+
- npm or yarn

### Setup Instructions

```bash
# Clone the repository
git clone <repository-url>
cd campusconnectadmin

# Install dependencies with legacy peer deps support
npm install --legacy-peer-deps

# Start development server
npm start

# Build for production
npm build

# Run tests
npm test
```

## 🚀 Getting Started

1. **Start the development server:**

   ```bash
   npm start
   ```

2. **Access the application:**
   Open [http://localhost:3000](http://localhost:3000) in your browser

3. **Login with demo credentials:**
   - Email: `admin@campusconnect.com`
   - Password: `demo123`
   - Or use the "Demo Login" button

4. **Explore the features:**
   Navigate through the sidebar to access different admin tools

## 📱 Navigation Structure

```
Admin Panel
├── Dashboard (Overview & Quick Stats)
├── User Management (User accounts & profiles)
├── Content Moderation (Post review & approval)
├── Reports & Flags (User complaints & reviews)
├── Campus Management (Campus administration)
├── Analytics (Platform statistics & trends)
└── Settings (System configuration)
```

## 🎨 UI Components & Design

- **Modern Dashboard**: Purple gradient theme with intuitive layout
- **Responsive Design**: Works on desktop and tablet
- **Interactive Tables**: Sortable, filterable, searchable
- **Modal Dialogs**: For detailed views and actions
- **Status Badges**: Clear visual status indicators
- **Action Buttons**: Quick access to common operations

## 📊 Mock Data

The application comes with comprehensive mock data including:

- 6 sample users with varying statuses
- 5 sample posts in different moderation states
- 5 user reports with different priorities
- 5 campuses with user and organization counts
- 10 days of daily active user analytics
- Platform statistics and metrics

## 🔧 Key Routes

| Route         | Component         | Purpose                      |
| ------------- | ----------------- | ---------------------------- |
| `/`           | Dashboard         | Main overview page           |
| `/users`      | UserManagement    | User account management      |
| `/moderation` | ContentModeration | Content review & approval    |
| `/reports`    | ReportManagement  | Report tracking & resolution |
| `/campuses`   | CampusManagement  | Campus administration        |
| `/analytics`  | Analytics         | Platform statistics          |
| `/settings`   | Settings          | System configuration         |

## 🎯 Development Features

### State Management

- Uses React Hooks (useState, useContext)
- Local state for form handling
- Mock data updates for demo functionality

### Routing

- React Router v6 with nested routes support
- Active route highlighting in sidebar
- Protected route structure (can be extended)

### Styling

- CSS-in-JS approaches
- Responsive grid layouts
- Mobile-friendly design

## 📈 Scalability & Future Enhancements

### Potential Additions

1. **Backend Integration**
   - API endpoints for all CRUD operations
   - Real-time data updates via WebSockets
   - Database persistence

2. **Advanced Analytics**
   - Custom date range filtering
   - Export reports to PDF/Excel
   - Advanced visualization options

3. **Automation**
   - Scheduled moderation tasks
   - Automated report processing
   - Alert notifications

4. **User Management**
   - Bulk user operations
   - User import/export
   - Custom user fields

5. **Security Enhancements**
   - OAuth 2.0 integration
   - Encrypted communications
   - Role-based access control (RBAC)
   - Audit logging system

## 🐛 Troubleshooting

### Common Issues

**Dependency Conflicts**

```bash
npm install --legacy-peer-deps
```

**Port Already in Use**

```bash
PORT=3001 npm start
```

**Cache Issues**

```bash
rm -rf node_modules
npm cache clean --force
npm install --legacy-peer-deps
```

## 📝 Usage Examples

### Moderate a Post

1. Navigate to "Content Moderation"
2. Review flagged posts
3. Click "View Details" for more context
4. Choose to approve or remove

### Manage Users

1. Go to "User Management"
2. Search for user by name or email
3. View user profile details
4. Suspend/unsuspend or delete account

### Check Analytics

1. Visit "Analytics & Reports"
2. View daily active user trends
3. Check category breakdown
4. Monitor moderation metrics

### Configure Settings

1. Access "Settings"
2. Update general configuration
3. Toggle security features
4. Save changes

## 📚 API Integration (Future)

When connecting to a backend, endpoints would follow this pattern:

```javascript
// User endpoints
GET /api/admin/users
GET /api/admin/users/:id
PUT /api/admin/users/:id
DELETE /api/admin/users/:id
POST /api/admin/users/:id/suspend

// Post endpoints
GET /api/admin/posts
GET /api/admin/posts/:id
DELETE /api/admin/posts/:id
PUT /api/admin/posts/:id/approve

// Report endpoints
GET /api/admin/reports
PUT /api/admin/reports/:id/resolve

// Analytics endpoints
GET /api/admin/analytics
GET /api/admin/analytics/daily-active-users
```

## 📄 License

This project is proprietary software for Campus Connect internal administration.

## 👥 Support

For issues, feature requests, or questions, contact the development team.

---

**Version**: 1.0.0  
**Last Updated**: April 2026  
**Status**: Production Ready
