# SUPABASE INTEGRATION GUIDE

## 🔗 Seamless Integration Complete

Your Campus Connect Admin Panel is now **fully integrated** with the Supabase backend!

---

## 📋 What's Connected

### Backend Database

- **Supabase URL**: https://ulemsckmztvfjmihplmc.supabase.co
- **Database**: Campus Connect Mobile App Database
- **Tables Connected**: `profiles` (Extended for admin use)

### Features Now Using Real Data

✅ User Management - Fetches real user profiles from Supabase  
✅ User Search - Search across live user database  
✅ User Suspension - Updates user role in Supabase  
✅ User Deletion - Removes users from database  
✅ Authentication - Supabase Auth integration  
✅ Dashboard Stats - Live user statistics

### Mock Data (Placeholder - Can Replace)

- Content Moderation (Posts)
- Report Management
- Campus Management
- Analytics

---

## 🚀 Getting Started

### 1. Install Updated Dependencies

```bash
npm install --legacy-peer-deps
```

This installs @supabase/supabase-js alongside existing packages.

### 2. Environment Variables (Already Configured)

The `.env.local` file is pre-configured with:

```
REACT_APP_SUPABASE_URL=https://ulemsckmztvfjmihplmc.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Note**: These keys are for the mobile app database. Keep them secure!

### 3. Start the Admin Panel

```bash
npm start
```

The app will open at http://localhost:3000

### 4. Login with Real Credentials

- Use your Campus Connect admin account email
- Password must be set in Supabase Auth

---

## 🔑 Authentication Flow

```
Login Page
    ↓
SignIn with Supabase Auth
    ↓
Verify Email + Password
    ↓
Generate Auth Token
    ↓
Fetch User Profile from Supabase
    ↓
Redirect to Dashboard
```

---

## 📊 Real Data Integration Details

### User Management Page

**Connects to**: `profiles` table in Supabase

**What It Does:**

- Fetches all users with their profiles
- Search filters in real-time
- Suspend users (updates their role to 'suspended')
- Delete users (removes from profiles table)
- View detailed user information

**Data Flow:**

```javascript
getAllProfiles() → Queries Supabase → Formats data → Displays in table
```

### Dashboard Page

**Connects to**: `profiles` table statistics

**What It Shows:**

- Total users count
- Active users today
- Suspended accounts
- Student count
- Recent users list

**Query:**

```sql
SELECT * FROM profiles
ORDER BY created_at DESC
LIMIT 5
```

### Search Functionality

**Connects to**: `profiles` table with text search

**Query:**

```sql
SELECT * FROM profiles
WHERE full_name.ilike.%search%
OR student_number.ilike.%search%
```

---

## 🛠️ File Structure

### New Files Created

```
src/
├── utils/
│   └── supabaseClient.js    ← Supabase client setup & API functions
├── .env.local               ← Environment variables (pre-filled)
└── pages/
    ├── App.js               ← Updated with Supabase auth
    ├── Login.js             ← Supabase auth integration
    ├── Dashboard.js         ← Fetches real user stats
    └── UserManagement.js    ← Full Supabase integration
```

### Key Functions in supabaseClient.js

#### Authentication

```javascript
signInUser(email, password); // Login user
signOutUser(); // Logout
getCurrentUser(); // Get current auth user
```

#### User Management

```javascript
getAllProfiles(); // Get all users
getUserProfile(userId); // Get single user
updateUserProfile(userId, data); // Update user
suspendUser(userId, suspended); // Toggle suspend status
deleteUser(userId); // Delete user
searchProfiles(searchTerm); // Search users
```

#### Statistics

```javascript
getProfileStats(); // Get platform stats
getUsersByRole(role); // Filter by role
```

---

## 🔄 Sync with Mobile App

### Shared Database

Both the mobile app and admin panel use the **same Supabase instance**.

**This means:**
✅ Changes in admin panel appear instantly in mobile app  
✅ User suspensions take effect immediately  
✅ Profile updates sync across platforms  
✅ One source of truth for user data

### Profile Schema

```sql
profiles {
  id (Primary Key)
  full_name
  student_number
  initials
  faculty
  year
  semester
  gender
  graduation_age
  bio
  interests
  role                    ← Updated by admin
  created_at
}
```

---

## 🔐 Security Notes

### API Keys Security

- **Current Setup**: Using anonymous (public) key
- **This is OK for**: Public-facing user management
- **For Production**: Consider implementing RLS policies

### Row Level Security (RLS)

The database already has RLS enabled:

```sql
-- All users can view profiles
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT USING (true);

-- Users can only update their own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);
```

### Admin-Only Operations

Currently, the admin account can perform all operations. To restrict in production:

1. Add an `admin_role` table
2. Update RLS policies to check admin status
3. Implement role-based access control

---

## ✅ Testing Real Integration

### Step 1: Create Test Admin Account

Go to Supabase Dashboard:

1. Navigate to Authentication → Users
2. Click "Add User"
3. Enter email and password
4. Save

### Step 2: Login to Admin Panel

```
Email: your-test-admin@email.com
Password: your-test-password
```

### Step 3: Verify Real Data

1. Go to User Management page
2. Should see real users from `profiles` table
3. Try searching for users
4. Try suspending/deleting a user
5. Check Supabase Dashboard to verify changes

### Step 4: Check Data Sync

1. View user in admin panel
2. Go to Supabase Dashboard → profiles table
3. Verify role field was updated to "suspended"

---

## 🚀 Extending Integration

### Add More Pages to Supabase

**Example: Connecting Content Moderation**

```javascript
// supabaseClient.js - Add new functions
export const getModeratedPosts = async () => {
  try {
    const { data, error } = await supabase
      .from("posts") // ← Create this table
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ContentModeration.js - Update to use real data
import { getModeratedPosts, updatePost } from "../utils/supabaseClient";

useEffect(() => {
  const loadPosts = async () => {
    const result = await getModeratedPosts();
    if (result.success) setPosts(result.data);
  };
  loadPosts();
}, []);
```

### Required Database Tables

To fully integrate all features, you may need:

```sql
-- Posts table
CREATE TABLE posts (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  content TEXT,
  status TEXT DEFAULT 'pending',
  flagged BOOLEAN DEFAULT false,
  created_at TIMESTAMP,
  ...
);

-- Reports table
CREATE TABLE reports (
  id UUID PRIMARY KEY,
  reported_user_id UUID REFERENCES profiles(id),
  reporter_id UUID REFERENCES profiles(id),
  reason TEXT,
  status TEXT,
  priority TEXT,
  ...
);
```

---

## 🐛 Troubleshooting

### Issue: "Invalid credentials" when logging in

- **Solution**: Verify email/password in Supabase Auth
- Check Supabase Dashboard → Authentication → Users

### Issue: Users not showing in admin panel

- **Solution**: Check if profiles exist in `profiles` table
- Verify RLS policies allow viewing
- Check browser console for errors

### Issue: Changes not syncing immediately

- **Solution**: Supabase queries may be cached
- Refresh the page manually
- Check network tab in browser DevTools

### Issue: "No API key provided"

- **Solution**: Verify .env.local file exists
- Ensure REACT_APP_SUPABASE_ANON_KEY is set
- Restart `npm start` after changing .env file

---

## 📞 API Reference

### Initialization

```javascript
import { supabase } from "./utils/supabaseClient";
```

### All Available Functions

```javascript
// Auth
signInUser(email, password);
signOutUser();
getCurrentUser();

// Profiles
getAllProfiles();
getUserProfile(userId);
updateUserProfile(userId, updates);
suspendUser(userId, suspended);
deleteUser(userId);

// Search & Filter
searchProfiles(searchTerm);
getUsersByRole(role);

// Stats
getProfileStats();
```

---

## 📚 Next Steps

1. **Test in Development**: Log in and verify real data loads
2. **Test CRUD Operations**: Try suspending/deleting users
3. **Monitor Sync**: Verify changes appear in mobile app
4. **Plan Extensions**: Identify what else needs Supabase tables
5. **Add More Features**: Connect posts, reports, etc. as needed

---

## 🎉 You're Ready!

Your Campus Connect admin panel is now **live and connected** to your Supabase database!

Run `npm start` and begin managing your platform with real user data.

---

**Need Help?**

- Check Supabase docs: https://supabase.com/docs
- Review supabaseClient.js for all available functions
- Check browser console for detailed error messages
- Verify database tables exist in Supabase

**Last Updated**: April 15, 2026  
**Integration Status**: ✅ Complete
