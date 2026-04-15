import React, { useState, useEffect } from 'react';
import { Search, Eye, Ban, Trash2 } from 'lucide-react';
import { getAllProfiles, suspendUser, deleteUser, searchProfiles } from '../utils/supabaseClient';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await getAllProfiles();
      if (result.success) {
        const formattedUsers = result.data.map((profile, index) => ({
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
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (term) => {
    setSearchTerm(term);
    if (term.length > 0) {
      const result = await searchProfiles(term);
      if (result.success) {
        const formattedUsers = result.data.map((profile) => ({
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
    } else {
      loadUsers();
    }
  };

  const handleSuspendUser = async (userId) => {
    try {
      const user = users.find(u => u.id === userId);
      const newStatus = user.status === 'suspended' ? 'active' : 'suspended';
      
      const result = await suspendUser(userId, newStatus === 'suspended');
      if (result.success) {
        setUsers(users.map(u =>
          u.id === userId ? { ...u, status: newStatus } : u
        ));
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to update user status');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      try {
        const result = await deleteUser(userId);
        if (result.success) {
          setUsers(users.filter(u => u.id !== userId));
          setShowModal(false);
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError('Failed to delete user');
      }
    }
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div>
        <div className="page-header">
          <h1>User Management</h1>
          <p>Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1>User Management</h1>
        <p>Manage platform users, view profiles, and enforce account policies.</p>
      </div>

      {error && (
        <div style={{ backgroundColor: '#ffebee', border: '1px solid #e74c3c', padding: '15px', borderRadius: '4px', marginBottom: '20px', color: '#c62828' }}>
          {error}
        </div>
      )}

      <div className="data-table">
        <div className="table-header">
          <h2>All Users ({filteredUsers.length})</h2>
          <div className="search-box">
            <Search size={18} style={{ color: '#999' }} />
            <input
              type="text"
              className="search-input"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Campus</th>
              <th>Joined</th>
              <th>Activity</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td><strong>{user.name}</strong></td>
                <td>{user.email}</td>
                <td>{user.campus}</td>
                <td>{user.joinDate}</td>
                <td>{user.posts} posts • {user.followers} followers</td>
                <td>
                  <span className={`status-badge ${user.status}`}>
                    {user.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => handleViewUser(user)}
                      title="View Details"
                    >
                      <Eye size={14} />
                    </button>
                    <button
                      className={`btn btn-sm ${user.status === 'suspended' ? 'btn-success' : 'btn-danger'}`}
                      onClick={() => handleSuspendUser(user.id)}
                      title={user.status === 'suspended' ? 'Unsuspend' : 'Suspend'}
                    >
                      <Ban size={14} />
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteUser(user.id)}
                      title="Delete User"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && selectedUser && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>User Profile</h2>
              <button
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div style={{ marginBottom: '20px' }}>
                <div style={{ marginBottom: '15px' }}>
                  <strong>Name:</strong> {selectedUser.name}
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <strong>Email:</strong> {selectedUser.email}
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <strong>Campus:</strong> {selectedUser.campus}
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <strong>Joined:</strong> {selectedUser.joinDate}
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <strong>Status:</strong> <span className={`status-badge ${selectedUser.status}`}>
                    {selectedUser.status}
                  </span>
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <strong>Posts:</strong> {selectedUser.posts}
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <strong>Followers:</strong> {selectedUser.followers}
                </div>
              </div>

              <div style={{ backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '4px', marginTop: '20px' }}>
                <h3 style={{ marginBottom: '10px' }}>Account Actions</h3>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    className={`btn btn-sm ${selectedUser.status === 'suspended' ? 'btn-success' : 'btn-danger'}`}
                    onClick={() => {
                      handleSuspendUser(selectedUser.id);
                      setShowModal(false);
                    }}
                  >
                    {selectedUser.status === 'suspended' ? 'Unsuspend User' : 'Suspend User'}
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                      handleDeleteUser(selectedUser.id);
                    }}
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserManagement;
