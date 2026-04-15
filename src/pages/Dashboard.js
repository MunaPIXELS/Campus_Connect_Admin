import React, { useState, useEffect } from 'react';
import { Users, FileText, AlertCircle, Building2 } from 'lucide-react';
import { getProfileStats, getAllProfiles } from '../utils/supabaseClient';
import { mockPosts, mockReports } from '../utils/mockData';

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const statsResult = await getProfileStats();
      const usersResult = await getAllProfiles();

      if (statsResult.success) {
        setStats(statsResult.data);
      }

      if (usersResult.success) {
        const formattedUsers = usersResult.data.slice(0, 5).map((profile) => ({
          id: profile.id,
          name: profile.full_name || 'Unknown',
          email: 'user@institution.edu',
          campus: profile.faculty || 'Main Campus',
          joinDate: new Date(profile.created_at).toLocaleDateString(),
          status: profile.role === 'suspended' ? 'suspended' : 'active',
          posts: Math.floor(Math.random() * 100),
          followers: Math.floor(Math.random() * 500),
        }));
        setUsers(formattedUsers);
      }
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <div className="page-header">
          <h1>Dashboard</h1>
          <p>Loading platform overview...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Welcome back! Here's your platform overview.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon users">
            <Users size={32} />
          </div>
          <div className="stat-content">
            <h3>Total Users</h3>
            <p>{stats?.totalUsers || 0}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon posts">
            <FileText size={32} />
          </div>
          <div className="stat-content">
            <h3>Active Today</h3>
            <p>{stats?.activeToday || 0}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon reports">
            <AlertCircle size={32} />
          </div>
          <div className="stat-content">
            <h3>Suspended</h3>
            <p>{stats?.suspended || 0}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon campuses">
            <Building2 size={32} />
          </div>
          <div className="stat-content">
            <h3>Students</h3>
            <p>{stats?.students || 0}</p>
          </div>
        </div>
      </div>

      <div className="data-table">
        <div className="table-header">
          <h2>Recent Users</h2>
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Campus</th>
              <th>Joined</th>
              <th>Posts</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td><strong>{user.name}</strong></td>
                <td>{user.email}</td>
                <td>{user.campus}</td>
                <td>{user.joinDate}</td>
                <td>{user.posts}</td>
                <td>
                  <span className={`status-badge ${user.status}`}>
                    {user.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="data-table">
        <div className="table-header">
          <h2>Recent Posts</h2>
        </div>
        <table>
          <thead>
            <tr>
              <th>Author</th>
              <th>Content</th>
              <th>Timestamp</th>
              <th>Status</th>
              <th>Interaction</th>
            </tr>
          </thead>
          <tbody>
            {mockPosts.slice(0, 5).map((post) => (
              <tr key={post.id}>
                <td><strong>{post.author}</strong></td>
                <td>{post.content.substring(0, 40)}...</td>
                <td>{post.timestamp}</td>
                <td>
                  <span className={`status-badge ${post.status}`}>
                    {post.status}
                  </span>
                </td>
                <td>❤️ {post.likes} 💬 {post.comments}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="data-table">
        <div className="table-header">
          <h2>Pending Reports</h2>
        </div>
        <table>
          <thead>
            <tr>
              <th>Reported User</th>
              <th>Reason</th>
              <th>Reporter</th>
              <th>Date</th>
              <th>Priority</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {mockReports.filter(r => r.status === 'pending').map((report) => (
              <tr key={report.id}>
                <td><strong>{report.reportedUser}</strong></td>
                <td>{report.reason}</td>
                <td>{report.reporter}</td>
                <td>{report.timestamp}</td>
                <td>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: '600',
                    backgroundColor: report.priority === 'high' ? '#ffebee' : '#fff3e0',
                    color: report.priority === 'high' ? '#c62828' : '#e65100'
                  }}>
                    {report.priority}
                  </span>
                </td>
                <td>
                  <span className="status-badge" style={{ backgroundColor: '#fff3e0', color: '#e65100' }}>
                    pending
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
