import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import { useAuth } from './hooks/useAuth';

import Layout from './components/layout/Layout';
import HolographicGrid from './components/three/HolographicGrid';
import FloatingSymbols from './components/three/FloatingSymbols';
// CustomCursor removed for performance

import HomePage from './pages/HomePage';
import CodesPage from './pages/CodesPage';
import ChatPage from './pages/ChatPage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import AdminPage from './pages/AdminPage';

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    // Loading spinner
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-neon-red text-xl glow-text">Loading...</div>
      </div>
    );
  }
  
  return user ? children : <Navigate to="/auth" />;
};


const App: React.FC = () => {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <div className="bg-background text-foreground min-h-screen">
            <HolographicGrid />
            <FloatingSymbols />
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/codes" element={<CodesPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/admin" element={
                  <ProtectedRoute>
                    <AdminPage />
                  </ProtectedRoute>
                } />
                {/* Chat removed */}
                <Route path="/profile/:userId" element={<ProfilePage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
              </Routes>
            </Layout>
          </div>
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
};

export default App;