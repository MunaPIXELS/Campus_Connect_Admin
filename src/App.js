import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import ContentModeration from './pages/ContentModeration';
import Analytics from './pages/Analytics';
import CampusManagement from './pages/CampusManagement';
import ReportManagement from './pages/ReportManagement';
import Settings from './pages/Settings';
import Login from './pages/Login';
import { supabase, signOutUser } from './utils/supabaseClient';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (user && !error) {
          setIsAuthenticated(true);
          setAdminUser({
            id: user.id,
            email: user.email,
            name: user.email.split('@')[0],
            role: 'admin',
          });
        } else {
          setIsAuthenticated(false);
          setAdminUser(null);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Subscribe to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setIsAuthenticated(true);
          setAdminUser({
            id: session.user.id,
            email: session.user.email,
            name: session.user.email.split('@')[0],
            role: 'admin',
          });
        } else {
          setIsAuthenticated(false);
          setAdminUser(null);
        }
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await signOutUser();
    setIsAuthenticated(false);
    setAdminUser(null);
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        fontSize: '18px',
      }}>
        Loading Campus Connect Admin...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login onLogin={(data) => {}} />;
  }

  return (
    <Router>
      <div className="App">
        <Sidebar adminUser={adminUser} onLogout={handleLogout} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/moderation" element={<ContentModeration />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/campuses" element={<CampusManagement />} />
            <Route path="/reports" element={<ReportManagement />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;


