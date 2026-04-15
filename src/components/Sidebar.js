import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Shield,
  BarChart3,
  Building2,
  AlertCircle,
  Settings,
  LogOut
} from 'lucide-react';

function Sidebar({ adminUser, onLogout }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Building2 size={24} />
        <h1>Campus Admin</h1>
      </div>

      <div className="sidebar-content">
        <ul className="sidebar-nav">
          <li>
            <Link to="/" className={isActive('/')}>
              <LayoutDashboard size={20} />
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/users" className={isActive('/users')}>
              <Users size={20} />
              User Management
            </Link>
          </li>
          <li>
            <Link to="/moderation" className={isActive('/moderation')}>
              <Shield size={20} />
              Content Moderation
            </Link>
          </li>
          <li>
            <Link to="/reports" className={isActive('/reports')}>
              <AlertCircle size={20} />
              Reports & Flags
            </Link>
          </li>
          <li>
            <Link to="/campuses" className={isActive('/campuses')}>
              <Building2 size={20} />
              Campuses
            </Link>
          </li>
          <li>
            <Link to="/analytics" className={isActive('/analytics')}>
              <BarChart3 size={20} />
              Analytics
            </Link>
          </li>
          <li>
            <Link to="/settings" className={isActive('/settings')}>
              <Settings size={20} />
              Settings
            </Link>
          </li>
        </ul>
      </div>

      <div className="sidebar-footer">
        <div className="admin-profile">
          <div className="admin-avatar">
            {adminUser?.name?.charAt(0).toUpperCase() || 'A'}
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: '13px' }}>
              {adminUser?.name || 'Admin'}
            </div>
            <div style={{ fontSize: '12px', opacity: 0.8 }}>
              {adminUser?.role || 'Administrator'}
            </div>
          </div>
        </div>
        <button className="logout-btn" onClick={onLogout}>
          <LogOut size={16} style={{ marginRight: '5px', display: 'inline' }} />
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
