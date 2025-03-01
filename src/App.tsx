
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Toaster } from './components/ui/toaster';

// Страницы
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AccountantDashboard from './pages/AccountantDashboard';
import DocumentCreate from './pages/DocumentCreate';
import CompanyManagement from './pages/CompanyManagement';
import NotFound from './pages/NotFound';

// Компонент для проверки авторизации
const ProtectedRoute: React.FC<{
  children: React.ReactNode;
  allowedRoles?: string[];
}> = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    if (user.role === 'accountant') {
      return <Navigate to="/accountant-dashboard" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            
            <Route path="/dashboard" element={
              <ProtectedRoute allowedRoles={['manager', 'admin']}>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/accountant-dashboard" element={
              <ProtectedRoute allowedRoles={['accountant', 'admin']}>
                <AccountantDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/document/create" element={
              <ProtectedRoute allowedRoles={['manager', 'admin']}>
                <DocumentCreate />
              </ProtectedRoute>
            } />
            
            <Route path="/company-management" element={
              <ProtectedRoute allowedRoles={['accountant', 'admin']}>
                <CompanyManagement />
              </ProtectedRoute>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
