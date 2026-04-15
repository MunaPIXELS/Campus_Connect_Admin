import React from 'react';
import { TrendingUp, Users, FileText } from 'lucide-react';
import { mockAnalytics } from '../utils/mockData';

function Analytics() {
  return (
    <div>
      <div className="page-header">
        <h1>Analytics & Reports</h1>
        <p>Platform usage statistics, trends, and detailed analytics.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon users">
            <Users size={32} />
          </div>
          <div className="stat-content">
            <h3>Active Users (Today)</h3>
            <p>{mockAnalytics.activeUsers}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon posts">
            <FileText size={32} />
          </div>
          <div className="stat-content">
            <h3>Posts</h3>
            <p>{mockAnalytics.totalPosts}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon campuses" style={{ backgroundColor: '#fff3e0', color: '#e65100' }}>
            <TrendingUp size={32} />
          </div>
          <div className="stat-content">
            <h3>Flagged Content</h3>
            <p>{mockAnalytics.flaggedContent}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon reports">
            <Users size={32} />
          </div>
          <div className="stat-content">
            <h3>Suspended Accounts</h3>
            <p>{mockAnalytics.suspendedAccounts}</p>
          </div>
        </div>
      </div>

      <div className="data-table">
        <div className="table-header">
          <h2>Daily Active Users (Last 10 Days)</h2>
        </div>

        <div style={{ padding: '30px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '15px', height: '200px' }}>
            {mockAnalytics.dailyActiveUsers.map((data, index) => {
              const maxUsers = Math.max(...mockAnalytics.dailyActiveUsers.map(d => d.users));
              const height = (data.users / maxUsers) * 100;
              return (
                <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div
                    style={{
                      width: '100%',
                      height: `${height}%`,
                      backgroundColor: '#667eea',
                      borderRadius: '4px 4px 0 0',
                      position: 'relative',
                    }}
                    title={`${data.users} users`}
                  />
                  <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
                    {data.date}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '30px' }}>
        <div className="data-table">
          <div className="table-header">
            <h2>Posts by Category</h2>
          </div>
          <div style={{ padding: '20px' }}>
            {Object.entries(mockAnalytics.postsByCategory).map(([category, count]) => {
              const total = Object.values(mockAnalytics.postsByCategory).reduce((a, b) => a + b, 0);
              const percentage = ((count / total) * 100).toFixed(1);
              return (
                <div key={category} style={{ marginBottom: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span><strong>{category}</strong></span>
                    <span>{count} ({percentage}%)</span>
                  </div>
                  <div style={{ backgroundColor: '#f0f0f0', borderRadius: '4px', height: '8px', overflow: 'hidden' }}>
                    <div
                      style={{
                        backgroundColor: '#667eea',
                        height: '100%',
                        width: `${percentage}%`,
                        borderRadius: '4px',
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="data-table">
          <div className="table-header">
            <h2>Key Metrics</h2>
          </div>
          <div style={{ padding: '20px' }}>
            <div style={{ marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #f0f0f0' }}>
              <div style={{ color: '#666', fontSize: '13px' }}>Total Users</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '5px' }}>
                {mockAnalytics.totalUsers}
              </div>
            </div>
            <div style={{ marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #f0f0f0' }}>
              <div style={{ color: '#666', fontSize: '13px' }}>Active Rate</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '5px' }}>
                {((mockAnalytics.activeUsers / mockAnalytics.totalUsers) * 100).toFixed(1)}%
              </div>
            </div>
            <div style={{ marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #f0f0f0' }}>
              <div style={{ color: '#666', fontSize: '13px' }}>Avg Posts per User</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '5px' }}>
                {(mockAnalytics.totalPosts / mockAnalytics.totalUsers).toFixed(1)}
              </div>
            </div>
            <div>
              <div style={{ color: '#666', fontSize: '13px' }}>Content Moderation Rate</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '5px' }}>
                {((mockAnalytics.flaggedContent / mockAnalytics.totalPosts) * 100).toFixed(2)}%
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="data-table" style={{ marginTop: '30px' }}>
        <div className="table-header">
          <h2>Report Summary</h2>
        </div>
        <div style={{ padding: '20px' }}>
          <table style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Metric</th>
                <th>Count</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Total Reports</td>
                <td><strong>{mockAnalytics.totalReports}</strong></td>
                <td>100%</td>
              </tr>
              <tr>
                <td>Flagged Content</td>
                <td><strong>{mockAnalytics.flaggedContent}</strong></td>
                <td>{((mockAnalytics.flaggedContent / mockAnalytics.totalReports) * 100).toFixed(1)}%</td>
              </tr>
              <tr>
                <td>Suspended Accounts</td>
                <td><strong>{mockAnalytics.suspendedAccounts}</strong></td>
                <td>{((mockAnalytics.suspendedAccounts / mockAnalytics.totalReports) * 100).toFixed(1)}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
