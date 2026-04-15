import React, { useState } from 'react';
import { Search, Check, X, Eye, AlertCircle } from 'lucide-react';
import { mockReports } from '../utils/mockData';

function ReportManagement() {
  const [reports, setReports] = useState(mockReports);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filteredReports = reports.filter(report => {
    const matchesStatus = filterStatus === 'all' || report.status === filterStatus;
    const matchesSearch = report.reportedUser.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reason.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleResolveReport = (reportId, action) => {
    const updatedReports = reports.map(r =>
      r.id === reportId ? { ...r, status: action } : r
    );
    setReports(updatedReports);
  };

  const handleViewReport = (report) => {
    setSelectedReport(report);
    setShowModal(true);
  };

  const stats = {
    pending: reports.filter(r => r.status === 'pending').length,
    resolved: reports.filter(r => r.status === 'resolved').length,
    dismissed: reports.filter(r => r.status === 'dismissed').length,
    total: reports.length,
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#c62828';
      case 'medium':
        return '#e65100';
      case 'low':
        return '#2e7d32';
      default:
        return '#666';
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Report Management</h1>
        <p>Review user reports, investigate violations, and take appropriate actions.</p>
      </div>

      <div className="stats-grid" style={{ marginBottom: '30px' }}>
        <div className="stat-card">
          <div className="stat-icon reports">
            <AlertCircle size={32} />
          </div>
          <div className="stat-content">
            <h3>Total Reports</h3>
            <p>{stats.total}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon posts" style={{ backgroundColor: '#fff3e0', color: '#e65100' }}>!</div>
          <div className="stat-content">
            <h3>Pending</h3>
            <p>{stats.pending}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon users" style={{ backgroundColor: '#e8f5e9', color: '#2e7d32' }}>✓</div>
          <div className="stat-content">
            <h3>Resolved</h3>
            <p>{stats.resolved}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon campuses" style={{ backgroundColor: '#fafafa', color: '#666' }}>−</div>
          <div className="stat-content">
            <h3>Dismissed</h3>
            <p>{stats.dismissed}</p>
          </div>
        </div>
      </div>

      <div className="data-table">
        <div className="table-header">
          <div>
            <h2>User Reports</h2>
            <div style={{ marginTop: '10px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                className={`btn btn-sm ${filterStatus === 'all' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setFilterStatus('all')}
              >
                All ({stats.total})
              </button>
              <button
                className={`btn btn-sm ${filterStatus === 'pending' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setFilterStatus('pending')}
              >
                Pending ({stats.pending})
              </button>
              <button
                className={`btn btn-sm ${filterStatus === 'resolved' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setFilterStatus('resolved')}
              >
                Resolved ({stats.resolved})
              </button>
              <button
                className={`btn btn-sm ${filterStatus === 'dismissed' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setFilterStatus('dismissed')}
              >
                Dismissed ({stats.dismissed})
              </button>
            </div>
          </div>
          <div className="search-box">
            <Search size={18} style={{ color: '#999' }} />
            <input
              type="text"
              className="search-input"
              placeholder="Search by user or reason..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((report) => (
              <tr key={report.id} style={{
                backgroundColor: report.priority === 'high' ? '#fff8f7' : 'transparent'
              }}>
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
                    backgroundColor: report.priority === 'high' ? '#ffebee' : report.priority === 'medium' ? '#fff3e0' : '#e8f5e9',
                    color: getPriorityColor(report.priority),
                  }}>
                    {report.priority}
                  </span>
                </td>
                <td>
                  <span className={`status-badge ${report.status}`}>
                    {report.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => handleViewReport(report)}
                      title="View Details"
                    >
                      <Eye size={14} />
                    </button>
                    {report.status !== 'resolved' && (
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleResolveReport(report.id, 'resolved')}
                        title="Resolve"
                      >
                        <Check size={14} />
                      </button>
                    )}
                    {report.status !== 'dismissed' && (
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => handleResolveReport(report.id, 'dismissed')}
                        title="Dismiss"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && selectedReport && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Report Details</h2>
              <button
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div style={{ marginBottom: '20px', backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '4px' }}>
                <p style={{ marginBottom: '10px' }}>
                  <strong>Reported User:</strong><br/>{selectedReport.reportedUser}
                </p>
                <p style={{ marginBottom: '10px' }}>
                  <strong>Reason:</strong><br/>{selectedReport.reason}
                </p>
                <p style={{ marginBottom: '10px' }}>
                  <strong>Reporter:</strong><br/>{selectedReport.reporter}
                </p>
                <p style={{ marginBottom: '10px' }}>
                  <strong>Date:</strong><br/>{selectedReport.timestamp}
                </p>
                <p style={{ marginBottom: '10px' }}>
                  <strong>Priority:</strong><br/>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: '600',
                    backgroundColor: selectedReport.priority === 'high' ? '#ffebee' : selectedReport.priority === 'medium' ? '#fff3e0' : '#e8f5e9',
                    color: getPriorityColor(selectedReport.priority),
                  }}>
                    {selectedReport.priority}
                  </span>
                </p>
                <p>
                  <strong>Status:</strong><br/>
                  <span className={`status-badge ${selectedReport.status}`}>
                    {selectedReport.status}
                  </span>
                </p>
              </div>

              {selectedReport.priority === 'high' && (
                <div style={{ backgroundColor: '#ffebee', padding: '15px', borderRadius: '4px', marginBottom: '20px', borderLeft: '4px solid #c62828' }}>
                  <strong style={{ color: '#c62828' }}>🚨 High Priority Report</strong>
                  <p style={{ marginTop: '5px', fontSize: '13px' }}>This report requires immediate attention and investigation.</p>
                </div>
              )}

              <div style={{ backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '4px' }}>
                <h3 style={{ marginBottom: '10px' }}>Actions</h3>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {selectedReport.status !== 'resolved' && (
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => {
                        handleResolveReport(selectedReport.id, 'resolved');
                        setShowModal(false);
                      }}
                    >
                      Mark as Resolved
                    </button>
                  )}
                  {selectedReport.status !== 'dismissed' && (
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        handleResolveReport(selectedReport.id, 'dismissed');
                        setShowModal(false);
                      }}
                    >
                      Dismiss Report
                    </button>
                  )}
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                      // In a real app, this would suspend the user
                      alert('User account would be suspended');
                      setShowModal(false);
                    }}
                  >
                    Suspend User
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

export default ReportManagement;
