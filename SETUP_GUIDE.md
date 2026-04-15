# 🚀 SETUP INSTRUCTIONS - Supabase Integration

## Quick Setup (5 minutes)

### 1️⃣ Install Dependencies

```bash
npm install --legacy-peer-deps
```

### 2️⃣ Verify Environment File

The `.env.local` file is already configured with Supabase credentials:

```
✅ REACT_APP_SUPABASE_URL
✅ REACT_APP_SUPABASE_ANON_KEY
```

### 3️⃣ Start the Admin Panel

```bash
npm start
```

The app will open at **http://localhost:3000**

---

## 📱 First Login

### Create Admin Account in Supabase

1. Go to: [Supabase Dashboard](https://app.supabase.com)
2. Navigate to: **Authentication → Users**
3. Click: **Add User**
4. Enter:
   - **Email**: your-email@example.com
   - **Password**: create-a-strong-password
   - Check: "Auto send email..." (optional)
5. Click: **Save**

### Login to Admin Panel

1. Use your email
2. Use your password
3. Click: **Sign In**

---

## ✨ What's Working Now

### ✅ Real Data Features

- **User Management**: See all real users from your database
- **User Search**: Search live user profiles
- **User Suspension**: Suspend/unsuspend users instantly
- **User Deletion**: Delete users from database
- **Dashboard Stats**: Live user count and statistics
- **Authentication**: Secure Supabase login

### 📊 Dashboard Shows

- Total users from database
- Active users count
- Suspended accounts
- Student count

### 🔍 User Management Includes

- Full user list from Supabase `profiles` table
- Real-time search across user names and student numbers
- One-click user suspension
- Delete user accounts
- Detailed user profile modal

---

## 🔄 Mobile App Sync

Both apps use the **same Supabase database**, so:

✅ User changes appear **instantly** in mobile app  
✅ Suspended users are blocked **immediately**  
✅ Deleted accounts are removed **everywhere**  
✅ All data is **centralized and real-time**

---

## 📁 What Changed

### Files Updated

```
✅ package.json              - Added @supabase/supabase-js
✅ src/App.js               - Integrated Supabase auth
✅ src/pages/Login.js       - Supabase sign-in
✅ src/pages/Dashboard.js   - Real user stats
✅ src/pages/UserManagement.js - Real user data
✅ .env.local               - API credentials (new)
```

### Files Created

```
✅ src/utils/supabaseClient.js     - Supabase helper functions
✅ SUPABASE_INTEGRATION.md         - Full integration guide
```

---

## 🧪 Testing the Integration

### Test 1: Check User List

1. Login to admin panel
2. Go to **User Management**
3. Should see real users from `profiles` table
4. **Expected**: List loads without errors

### Test 2: Search Users

1. In User Management
2. Type in search box (name or student number)
3. Users filter in real-time
4. **Expected**: Search updates instantly

### Test 3: Suspend a User

1. Find a user in list
2. Click **Ban icon** (suspension button)
3. Go to Supabase Dashboard
4. Check `profiles` table for that user
5. **Expected**: `role` changed to `suspended`

### Test 4: Mobile App Sync

1. Suspend a user in admin panel
2. Open mobile app
3. That user should be blocked
4. **Expected**: Real-time sync works

---

## 🎯 Next: Add More Features

### To integrate Posts (Moderation)

You need to create a `posts` table in Supabase:

```sql
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  flagged BOOLEAN DEFAULT false,
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Extend supabaseClient.js

```javascript
export const getPosts = async () => {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
};
```

### Update ContentModeration.js

```javascript
import { getPosts } from "../utils/supabaseClient";

useEffect(() => {
  const loadPosts = async () => {
    const posts = await getPosts();
    setPosts(posts);
  };
  loadPosts();
}, []);
```

---

## 🔐 Security Best Practices

### Current Setup

- ✅ Using Supabase anonymous key (safe for client-side)
- ✅ RLS policies enabled on `profiles` table
- ✅ Auth tokens managed securely

### Production Checklist

- [ ] Enable Row Level Security (RLS) on all tables
- [ ] Create admin role verification policies
- [ ] Implement rate limiting
- [ ] Add audit logging
- [ ] Set up backups
- [ ] Enable two-factor authentication
- [ ] Regular security audits

---

## 📊 Database Schema

### Current Table: profiles

```
id (UUID)           - User unique ID
full_name (TEXT)    - User's name
student_number (TEXT) - Student ID
initials (TEXT)     - User's initials
faculty (TEXT)      - Faculty/Department
year (INT)          - Academic year
semester (INT)      - Semester
gender (TEXT)       - User's gender
graduation_age (TEXT) - Expected graduation
bio (TEXT)          - User bio
interests (TEXT[])  - User interests
role (TEXT)         - 'student' or 'suspended'
created_at (TIMESTAMP) - Account creation date
```

---

## 🆘 Troubleshooting

### Login not working?

```
Check:
1. Email exists in Supabase Auth
2. Password is correct
3. Check browser console for errors
4. Verify .env.local loaded (restart npm start)
```

### Users not showing?

```
Check:
1. profiles table exists in Supabase
2. Table has data (check Supabase dashboard)
3. RLS policies allow SELECT (should be enabled)
4. Network tab shows successful queries
```

### Can't suspend users?

```
Check:
1. User exists in profiles table
2. RLS policies allow UPDATE
3. Check Supabase logs for errors
4. Verify admin has permissions
```

---

## 📞 Support Resources

- **Supabase Docs**: https://supabase.com/docs
- **Supabase Dashboard**: https://app.supabase.com
- **React Docs**: https://react.dev
- **Client Code**: `src/utils/supabaseClient.js`

---

## ✅ Checklist

- [ ] Dependencies installed (`npm install --legacy-peer-deps`)
- [ ] `.env.local` file exists with credentials
- [ ] `npm start` runs without errors
- [ ] Login page loads
- [ ] Created admin account in Supabase
- [ ] Successfully logged in
- [ ] User list shows real users
- [ ] Search functionality works
- [ ] Can suspend users
- [ ] Changes sync to mobile app

---

## 🎉 Ready to Go!

Once all checklist items are done, you have a **fully functional admin panel connected to your live database**!

Run:

```bash
npm start
```

And start managing your Campus Connect platform! 🚀

---

**Version**: 1.0  
**Date**: April 15, 2026  
**Status**: ✅ Live and Connected
