// Mock Data for Admin Panel

export const mockUsers = [
  { id: 1, name: 'John Smith', email: 'john@university.edu', campus: 'Main Campus', joinDate: '2024-01-15', status: 'active', posts: 42, followers: 156 },
  { id: 2, name: 'Sarah Johnson', email: 'sarah@university.edu', campus: 'Tech Building', joinDate: '2024-02-10', status: 'active', posts: 28, followers: 89 },
  { id: 3, name: 'Mike Davis', email: 'mike@university.edu', campus: 'Main Campus', joinDate: '2024-01-20', status: 'inactive', posts: 15, followers: 45 },
  { id: 4, name: 'Emily Wilson', email: 'emily@university.edu', campus: 'West Wing', joinDate: '2024-03-05', status: 'active', posts: 67, followers: 234 },
  { id: 5, name: 'Alex Martinez', email: 'alex@university.edu', campus: 'South Campus', joinDate: '2024-02-15', status: 'suspended', posts: 12, followers: 34 },
  { id: 6, name: 'Jessica Brown', email: 'jessica@university.edu', campus: 'Main Campus', joinDate: '2024-03-10', status: 'active', posts: 89, followers: 412 },
];

export const mockPosts = [
  { id: 1, author: 'John Smith', content: 'Just finished my engineering project!', timestamp: '2024-04-10 14:30', likes: 45, comments: 12, status: 'approved', flagged: false },
  { id: 2, author: 'Sarah Johnson', content: 'Anyone want to study together tonight?', timestamp: '2024-04-10 13:15', likes: 23, comments: 8, status: 'approved', flagged: false },
  { id: 3, author: 'Mike Davis', content: 'Inappropriate content here...', timestamp: '2024-04-10 12:00', likes: 5, comments: 2, status: 'flagged', flagged: true },
  { id: 4, author: 'Emily Wilson', content: 'Campus event tomorrow at 5pm!', timestamp: '2024-04-09 16:45', likes: 156, comments: 34, status: 'approved', flagged: false },
  { id: 5, author: 'Alex Martinez', content: 'Spam content...', timestamp: '2024-04-09 11:20', likes: 0, comments: 0, status: 'removed', flagged: true },
];

export const mockReports = [
  { id: 1, reportedUser: 'Mike Davis', reason: 'Inappropriate content', reporter: 'John Smith', timestamp: '2024-04-10 12:30', status: 'pending', priority: 'high' },
  { id: 2, reportedUser: 'Alex Martinez', reason: 'Spam', reporter: 'Sarah Johnson', timestamp: '2024-04-10 13:00', status: 'resolved', priority: 'medium' },
  { id: 3, reportedUser: 'Unknown User', reason: 'Harassment', reporter: 'Emily Wilson', timestamp: '2024-04-10 10:15', status: 'pending', priority: 'high' },
  { id: 4, reportedUser: 'Jessica Brown', reason: 'Misinformation', reporter: 'System', timestamp: '2024-04-09 15:45', status: 'dismissed', priority: 'low' },
  { id: 5, reportedUser: 'John Smith', reason: 'Suspicious activity', reporter: 'System', timestamp: '2024-04-09 14:20', status: 'resolved', priority: 'medium' },
];

export const mockCampuses = [
  { id: 1, name: 'Main Campus', location: 'Downtown', activeUsers: 245, organizations: 18, createdDate: '2023-01-15' },
  { id: 2, name: 'Tech Building', location: 'North Street', activeUsers: 156, organizations: 12, createdDate: '2023-02-20' },
  { id: 3, name: 'West Wing', location: 'West Side', activeUsers: 89, organizations: 7, createdDate: '2023-03-10' },
  { id: 4, name: 'South Campus', location: 'South End', activeUsers: 67, organizations: 5, createdDate: '2023-04-05' },
  { id: 5, name: 'East Innovation Hub', location: 'East District', activeUsers: 123, organizations: 9, createdDate: '2023-05-12' },
];

export const mockAnalytics = {
  totalUsers: 1240,
  activeUsers: 856,
  totalPosts: 5892,
  totalReports: 234,
  flaggedContent: 42,
  suspendedAccounts: 18,
  dailyActiveUsers: [
    { date: 'Apr 1', users: 620 },
    { date: 'Apr 2', users: 680 },
    { date: 'Apr 3', users: 710 },
    { date: 'Apr 4', users: 650 },
    { date: 'Apr 5', users: 750 },
    { date: 'Apr 6', users: 820 },
    { date: 'Apr 7', users: 880 },
    { date: 'Apr 8', users: 840 },
    { date: 'Apr 9', users: 910 },
    { date: 'Apr 10', users: 856 },
  ],
  postsByCategory: {
    'General': 2340,
    'Study Groups': 1245,
    'Events': 856,
    'Jobs': 652,
    'Other': 799,
  }
};

export const mockSystemSettings = {
  platformName: 'Campus Connect',
  adminEmail: 'admin@campusconnect.com',
  maintenanceMode: false,
  maxPostLength: 500,
  postApprovalRequired: false,
  autoFlagKeywords: true,
  emailNotificationsEnabled: true,
  twoFactorAuthRequired: true,
  sessionTimeout: 30,
};
