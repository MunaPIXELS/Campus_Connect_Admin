import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { mockCampuses } from '../utils/mockData';

function CampusManagement() {
  const [campuses, setCampuses] = useState(mockCampuses);
  const [showModal, setShowModal] = useState(false);
  const [selectedCampus, setSelectedCampus] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    activeUsers: 0,
    organizations: 0,
  });

  const handleViewCampus = (campus) => {
    setSelectedCampus(campus);
    setFormData(campus);
    setShowModal(true);
  };

  const handleAddCampus = () => {
    setSelectedCampus(null);
    setFormData({
      name: '',
      location: '',
      activeUsers: 0,
      organizations: 0,
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCampus) {
      // Update existing
      setCampuses(campuses.map(c =>
        c.id === selectedCampus.id ? { ...c, ...formData } : c
      ));
    } else {
      // Add new
      setCampuses([...campuses, {
        id: Math.max(...campuses.map(c => c.id), 0) + 1,
        ...formData,
        createdDate: new Date().toISOString().split('T')[0],
      }]);
    }
    setShowModal(false);
  };

  const handleDeleteCampus = (campusId) => {
    if (window.confirm('Are you sure you want to delete this campus?')) {
      setCampuses(campuses.filter(c => c.id !== campusId));
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Campus Management</h1>
        <p>Manage campuses, organizations, and monitor campus-specific activity.</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button className="btn btn-primary" onClick={handleAddCampus}>
          <Plus size={16} style={{ marginRight: '5px', display: 'inline' }} />
          Add New Campus
        </button>
      </div>

      <div className="data-table">
        <div className="table-header">
          <h2>Campuses ({campuses.length})</h2>
        </div>

        <table>
          <thead>
            <tr>
              <th>Campus Name</th>
              <th>Location</th>
              <th>Active Users</th>
              <th>Organizations</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {campuses.map((campus) => (
              <tr key={campus.id}>
                <td><strong>{campus.name}</strong></td>
                <td>{campus.location}</td>
                <td><strong>{campus.activeUsers}</strong></td>
                <td>{campus.organizations}</td>
                <td>{campus.createdDate}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => handleViewCampus(campus)}
                      title="View/Edit"
                    >
                      <Eye size={14} />
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteCampus(campus.id)}
                      title="Delete"
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

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedCampus ? 'Edit Campus' : 'Add New Campus'}</h2>
              <button
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group" style={{ marginBottom: '15px' }}>
                  <label htmlFor="name">Campus Name</label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '15px' }}>
                  <label htmlFor="location">Location</label>
                  <input
                    id="location"
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '15px' }}>
                  <label htmlFor="activeUsers">Active Users</label>
                  <input
                    id="activeUsers"
                    type="number"
                    value={formData.activeUsers}
                    onChange={(e) => setFormData({ ...formData, activeUsers: parseInt(e.target.value) })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="organizations">Organizations</label>
                  <input
                    id="organizations"
                    type="number"
                    value={formData.organizations}
                    onChange={(e) => setFormData({ ...formData, organizations: parseInt(e.target.value) })}
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {selectedCampus ? 'Update Campus' : 'Create Campus'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CampusManagement;
