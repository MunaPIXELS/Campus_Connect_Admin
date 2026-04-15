import React, { useState } from 'react';
import { Building2 } from 'lucide-react';
import { signInUser } from '../utils/supabaseClient';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Please enter both email and password');
      setLoading(false);
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    try {
      const result = await signInUser(email, password);
      
      if (result.success) {
        setEmail('');
        setPassword('');
        // Auth state change will be handled by App.js
      } else {
        setError(result.error || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemo = async () => {
    setEmail('admin@campusconnect.com');
    setPassword('admin123456');
    setError('');
    setLoading(true);

    try {
      const result = await signInUser('admin@campusconnect.com', 'admin123456');
      
      if (!result.success) {
        setError('Demo account not available. Please use your own credentials.');
      }
    } catch (err) {
      setError('Demo login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <Building2 size={32} style={{ color: '#667eea' }} />
          <h1>Campus Connect</h1>
        </div>
        <p>Administrative Portal</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="your.email@institution.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '12px', color: '#666' }}>
            or
          </div>

          <button
            type="button"
            className="login-btn"
            style={{ background: '#764ba2' }}
            onClick={handleDemo}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Demo Login'}
          </button>
        </form>

        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '4px', fontSize: '12px', color: '#666' }}>
          <strong>Note:</strong><br/>
          Use your Campus Connect admin credentials to sign in. Contact your administrator if you need access.
        </div>
      </div>
    </div>
  );
}

export default Login;
