# 🚀 Quick Start Guide

## Installation & Running

Your Campus Connect Admin Panel is fully configured and ready to run!

### Step 1: Install Dependencies

Dependencies have already been installed with `npm install --legacy-peer-deps`

To reinstall if needed:

```bash
npm install --legacy-peer-deps
```

### Step 2: Start Development Server

```bash
npm start
```

This will:

- Start the development server at http://localhost:3000
- Open your browser automatically (usually)
- Enable hot-reloading (changes save automatically)

### Step 3: Login to Admin Panel

Use the **Demo Login** button or enter:

- **Email**: admin@campusconnect.com
- **Password**: demo123

## 📋 What's Included

✅ **7 Complete Admin Modules**

- Dashboard (Overview & Statistics)
- User Management (Account controls)
- Content Moderation (Post review)
- Report Management (Complaint handling)
- Campus Management (Organization admin)
- Analytics (Platform statistics)
- Settings (System configuration)

✅ **Professional UI**

- Modern purple gradient design
- Responsive layout
- Interactive tables with search/filter
- Modal dialogs for details
- Status badges and indicators

✅ **Full Mock Data**

- 6 sample users
- 5 sample posts
- 5 pending reports
- 5 campus locations
- 10 days of analytics data

✅ **Documentation**

- README_ADMIN_PANEL.md → Feature documentation
- DEVELOPER_GUIDE.md → Development reference

## 🎯 Explore Features

After logging in, try:

1. **Dashboard** - See overview stats
2. **Users** - Search and manage users, suspend accounts
3. **Moderation** - Review and approve/reject posts
4. **Reports** - Handle user complaints
5. **Campuses** - Create and manage campus locations
6. **Analytics** - View platform usage trends
7. **Settings** - Configure system options

## 🔧 Available Commands

```bash
npm start       # Start development server
npm build      # Create production build
npm test       # Run tests
npm eject      # Eject configuration (irreversible)
```

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   └── Sidebar.js
├── pages/              # Page components (6 main + login)
├── utils/              # Mock data
├── App.js              # Main app with routing
├── App.css             # Global styles
└── index.js            # React entry point
```

## 🔑 Key Features

### Admin-Only Powers ⚡

- **Direct user suspension** - No appeals process
- **Instant post removal** - Content disappears immediately
- **User override** - Bypass normal restrictions
- **Full data access** - View all user information
- **System maintenance** - Maintenance mode toggle
- **Configuration control** - Adjust all settings
- **Real-time analytics** - Live usage statistics
- **Staff permissions** - Complete admin control hierarchy

### Internal Access Features 🔐

- Advanced user filtering and search
- Bulk content operations
- Complete audit capabilities
- System health monitoring
- Emergency protocols
- Policy enforcement tools
- User communication system

## 🎓 Next Steps

### For Development

1. Review `DEVELOPER_GUIDE.md` for code structure
2. Examine component files to understand patterns
3. Check `mockData.js` to modify sample data
4. Customize styling in `App.css`

### For Deployment

1. Run `npm build` to create production build
2. Deploy `build/` folder to hosting
3. Connect to real API when backend is ready
4. Set up environment variables
5. Configure authentication with your system

### For Integration

1. Replace mock data with real API calls
2. Add axios interceptors for auth tokens
3. Update routing based on user permissions
4. Connect to your backend database
5. Implement real-time updates

## 🐛 Troubleshooting

**Port 3000 already in use?**

```bash
PORT=3001 npm start
```

**Dependencies not installing?**

```bash
npm install --legacy-peer-deps
```

**Hot reload not working?**

- Check browser console for errors
- Restart `npm start`
- Clear browser cache (Ctrl+Shift+Del)

**Build errors?**

```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
npm start
```

## 📞 Support

For detailed documentation:

- **Features** → See `README_ADMIN_PANEL.md`
- **Development** → See `DEVELOPER_GUIDE.md`
- **Code** → Check inline comments in component files

## 🎉 You're All Set!

Your admin panel is ready to go. Run `npm start` to begin exploring!

---

**Version**: 1.0.0  
**Status**: Ready for Development  
**Last Updated**: April 2026
