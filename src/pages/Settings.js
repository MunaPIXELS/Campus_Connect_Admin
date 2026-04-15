import React, { useState } from 'react';
import { Save, AlertCircle } from 'lucide-react';
import { mockSystemSettings } from '../utils/mockData';

function Settings() {
  const [settings, setSettings] = useState(mockSystemSettings);
  const [saved, setSaved] = useState(false);

  const handleChange = (field, value) => {
    setSettings({ ...settings, [field]: value });
    setSaved(false);
  };

  const handleToggle = (field) => {
    setSettings({ ...settings, [field]: !settings[field] });
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <div className="page-header">
        <h1>System Settings</h1>
        <p>Configure platform-wide settings and policies.</p>
      </div>

      {saved && (
        <div style={{ backgroundColor: '#e8f5e9', border: '1px solid #2e7d32', padding: '15px', borderRadius: '4px', marginBottom: '20px', color: '#2e7d32' }}>
          ✓ Settings saved successfully!
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
        {/* General Settings */}
        <div className="data-table">
          <div className="table-header">
            <h2>General Settings</h2>
          </div>
          <div style={{ padding: '20px' }}>
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label>Platform Name</label>
              <input
                type="text"
                value={settings.platformName}
                onChange={(e) => handleChange('platformName', e.target.value)}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label>Admin Email</label>
              <input
                type="email"
                value={settings.adminEmail}
                onChange={(e) => handleChange('adminEmail', e.target.value)}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label>Max Post Length</label>
              <input
                type="number"
                value={settings.maxPostLength}
                onChange={(e) => handleChange('maxPostLength', parseInt(e.target.value))}
              />
            </div>

            <div className="form-group">
              <label>Session Timeout (minutes)</label>
              <input
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => handleChange('sessionTimeout', parseInt(e.target.value))}
              />
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="data-table">
          <div className="table-header">
            <h2>Security & Privacy</h2>
          </div>
          <div style={{ padding: '20px' }}>
            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
              <input
                type="checkbox"
                id="twoFactor"
                checked={settings.twoFactorAuthRequired}
                onChange={() => handleToggle('twoFactorAuthRequired')}
                style={{ width: '20px', height: '20px', cursor: 'pointer' }}
              />
              <label htmlFor="twoFactor" style={{ margin: 0, cursor: 'pointer' }}>
                Require Two-Factor Authentication
              </label>
            </div>

            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
              <input
                type="checkbox"
                id="maintenance"
                checked={settings.maintenanceMode}
                onChange={() => handleToggle('maintenanceMode')}
                style={{ width: '20px', height: '20px', cursor: 'pointer' }}
              />
              <label htmlFor="maintenance" style={{ margin: 0, cursor: 'pointer' }}>
                Maintenance Mode
              </label>
            </div>

            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
              <input
                type="checkbox"
                id="emailNotif"
                checked={settings.emailNotificationsEnabled}
                onChange={() => handleToggle('emailNotificationsEnabled')}
                style={{ width: '20px', height: '20px', cursor: 'pointer' }}
              />
              <label htmlFor="emailNotif" style={{ margin: 0, cursor: 'pointer' }}>
                Email Notifications Enabled
              </label>
            </div>

            {settings.maintenanceMode && (
              <div style={{ backgroundColor: '#fff3e0', border: '1px solid #e65100', padding: '10px', borderRadius: '4px', color: '#e65100', fontSize: '13px' }}>
                <AlertCircle size={16} style={{ marginRight: '5px', display: 'inline' }} />
                Maintenance mode is enabled. Users cannot access the platform.
              </div>
            )}
          </div>
        </div>

        {/* Moderation Settings */}
        <div className="data-table">
          <div className="table-header">
            <h2>Content Moderation</h2>
          </div>
          <div style={{ padding: '20px' }}>
            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
              <input
                type="checkbox"
                id="postApproval"
                checked={settings.postApprovalRequired}
                onChange={() => handleToggle('postApprovalRequired')}
                style={{ width: '20px', height: '20px', cursor: 'pointer' }}
              />
              <label htmlFor="postApproval" style={{ margin: 0, cursor: 'pointer' }}>
                Require Post Approval Before Publishing
              </label>
            </div>

            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
              <input
                type="checkbox"
                id="autoFlag"
                checked={settings.autoFlagKeywords}
                onChange={() => handleToggle('autoFlagKeywords')}
                style={{ width: '20px', height: '20px', cursor: 'pointer' }}
              />
              <label htmlFor="autoFlag" style={{ margin: 0, cursor: 'pointer' }}>
                Auto Flag Posts with Suspicious Keywords
              </label>
            </div>

            <div style={{ backgroundColor: '#e3f2fd', padding: '10px', borderRadius: '4px', color: '#1976d2', fontSize: '13px' }}>
              Current moderation mode: {settings.postApprovalRequired ? 'Strict' : 'Relaxed'}
            </div>
          </div>
        </div>

        {/* Account Management */}
        <div className="data-table">
          <div className="table-header">
            <h2>Account Management</h2>
          </div>
          <div style={{ padding: '20px' }}>
            <div style={{ marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #f0f0f0' }}>
              <div style={{ color: '#666', fontSize: '13px' }}>Active Administrators</div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '5px' }}>3</div>
            </div>
            <div style={{ marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #f0f0f0' }}>
              <div style={{ color: '#666', fontSize: '13px' }}>Moderators</div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '5px' }}>7</div>
            </div>
            <div>
              <button className="btn btn-primary" style={{ marginBottom: '10px', marginRight: '10px' }}>
                Manage Admins
              </button>
              <button className="btn btn-secondary">
                Manage Roles
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Settings */}
      <div className="data-table" style={{ marginTop: '30px' }}>
        <div className="table-header">
          <h2>Advanced Settings</h2>
        </div>
        <div style={{ padding: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', fontSize: '13px' }}>
                Rate Limit (requests/minute)
              </label>
              <input type="number" defaultValue="60" style={{ width: '100%' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', fontSize: '13px' }}>
                Max Upload Size (MB)
              </label>
              <input type="number" defaultValue="50" style={{ width: '100%' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', fontSize: '13px' }}>
                Cache Duration (hours)
              </label>
              <input type="number" defaultValue="24" style={{ width: '100%' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', fontSize: '13px' }}>
                Backup Frequency (hours)
              </label>
              <input type="number" defaultValue="6" style={{ width: '100%' }} />
            </div>
          </div>

          <div style={{ backgroundColor: '#f0f0f0', padding: '15px', borderRadius: '4px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <AlertCircle size={16} />
              <strong>System Status</strong>
            </div>
            <table style={{ width: '100%', fontSize: '13px' }}>
              <tbody>
                <tr>
                  <td style={{ padding: '5px 0' }}><strong>Database:</strong></td>
                  <td style={{ padding: '5px 0', color: '#2e7d32' }}>● Connected</td>
                </tr>
                <tr>
                  <td style={{ padding: '5px 0' }}><strong>Cache:</strong></td>
                  <td style={{ padding: '5px 0', color: '#2e7d32' }}>● Operational</td>
                </tr>
                <tr>
                  <td style={{ padding: '5px 0' }}><strong>API:</strong></td>
                  <td style={{ padding: '5px 0', color: '#2e7d32' }}>● Running</td>
                </tr>
                <tr>
                  <td style={{ padding: '5px 0' }}><strong>Last Backup:</strong></td>
                  <td style={{ padding: '5px 0' }}>2 hours ago</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '30px', display: 'flex', gap: '10px' }}>
        <button className="btn btn-primary" onClick={handleSave}>
          <Save size={16} style={{ marginRight: '5px', display: 'inline' }} />
          Save All Settings
        </button>
        <button className="btn btn-secondary">
          Reset to Defaults
        </button>
      </div>
    </div>
  );
}

export default Settings;
