import React, { useState } from 'react';
import { Search, Check, X, Eye, FileText } from 'lucide-react';
import { mockPosts } from '../utils/mockData';

function ContentModeration() {
  const [posts, setPosts] = useState(mockPosts);
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedPost, setSelectedPost] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filteredPosts = posts.filter(post => {
    if (filterStatus === 'all') return true;
    return post.status === filterStatus;
  });

  const handleApprovePost = (postId) => {
    const updatedPosts = posts.map(p =>
      p.id === postId ? { ...p, status: 'approved', flagged: false } : p
    );
    setPosts(updatedPosts);
  };

  const handleRemovePost = (postId) => {
    const updatedPosts = posts.map(p =>
      p.id === postId ? { ...p, status: 'removed' } : p
    );
    setPosts(updatedPosts);
  };

  const handleViewPost = (post) => {
    setSelectedPost(post);
    setShowModal(true);
  };

  const stats = {
    approved: posts.filter(p => p.status === 'approved').length,
    flagged: posts.filter(p => p.status === 'flagged').length,
    removed: posts.filter(p => p.status === 'removed').length,
    total: posts.length,
  };

  return (
    <div>
      <div className="page-header">
        <h1>Content Moderation</h1>
        <p>Review and moderate user-generated posts. Approve, flag, or remove content.</p>
      </div>

      <div className="stats-grid" style={{ marginBottom: '30px' }}>
        <div className="stat-card">
          <div className="stat-icon posts">
            <FileText size={32} />
          </div>
          <div className="stat-content">
            <h3>Total Posts</h3>
            <p>{stats.total}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon users" style={{ backgroundColor: '#e8f5e9', color: '#2e7d32' }}>✓</div>
          <div className="stat-content">
            <h3>Approved</h3>
            <p>{stats.approved}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon posts" style={{ backgroundColor: '#fff3e0', color: '#e65100' }}>!</div>
          <div className="stat-content">
            <h3>Flagged</h3>
            <p>{stats.flagged}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon reports" style={{ backgroundColor: '#ffebee', color: '#c62828' }}>✕</div>
          <div className="stat-content">
            <h3>Removed</h3>
            <p>{stats.removed}</p>
          </div>
        </div>
      </div>

      <div className="data-table">
        <div className="table-header">
          <div>
            <h2>Posts to Review</h2>
            <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
              <button
                className={`btn btn-sm ${filterStatus === 'all' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setFilterStatus('all')}
              >
                All ({stats.total})
              </button>
              <button
                className={`btn btn-sm ${filterStatus === 'flagged' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setFilterStatus('flagged')}
              >
                Flagged ({stats.flagged})
              </button>
              <button
                className={`btn btn-sm ${filterStatus === 'approved' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setFilterStatus('approved')}
              >
                Approved ({stats.approved})
              </button>
            </div>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Author</th>
              <th>Content</th>
              <th>Timestamp</th>
              <th>Engagement</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.map((post) => (
              <tr key={post.id} style={{ backgroundColor: post.flagged ? '#fff8f7' : 'transparent' }}>
                <td><strong>{post.author}</strong></td>
                <td>{post.content}</td>
                <td>{post.timestamp}</td>
                <td>❤️ {post.likes} 💬 {post.comments}</td>
                <td>
                  <span className={`status-badge ${post.status}`}>
                    {post.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => handleViewPost(post)}
                      title="View Details"
                    >
                      <Eye size={14} />
                    </button>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleApprovePost(post.id)}
                      title="Approve"
                    >
                      <Check size={14} />
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRemovePost(post.id)}
                      title="Remove"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && selectedPost && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Post Details</h2>
              <button
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div style={{ marginBottom: '20px', backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '4px' }}>
                <p><strong>Author:</strong> {selectedPost.author}</p>
                <p><strong>Content:</strong> {selectedPost.content}</p>
                <p><strong>Posted:</strong> {selectedPost.timestamp}</p>
                <p><strong>Likes:</strong> {selectedPost.likes}</p>
                <p><strong>Comments:</strong> {selectedPost.comments}</p>
                <p><strong>Status:</strong> <span className={`status-badge ${selectedPost.status}`}>{selectedPost.status}</span></p>
              </div>

              {selectedPost.flagged && (
                <div style={{ backgroundColor: '#fff3e0', padding: '15px', borderRadius: '4px', marginBottom: '20px', borderLeft: '4px solid #e65100' }}>
                  <strong style={{ color: '#e65100' }}>⚠️ Content Flagged</strong>
                  <p style={{ marginTop: '5px', fontSize: '13px' }}>This post has been reported by users. Review carefully before publishing.</p>
                </div>
              )}

              <div style={{ backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '4px' }}>
                <h3 style={{ marginBottom: '10px' }}>Moderation Actions</h3>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => {
                      handleApprovePost(selectedPost.id);
                      setShowModal(false);
                    }}
                  >
                    Approve Post
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                      handleRemovePost(selectedPost.id);
                      setShowModal(false);
                    }}
                  >
                    Remove Post
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

export default ContentModeration;
