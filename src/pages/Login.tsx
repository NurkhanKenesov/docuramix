
import React, { useEffect } from 'react';
import { AuthForm } from '@/components/ui/auth-form';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'accountant') {
        navigate('/accountant-dashboard');
      } else {
        navigate('/dashboard');
      }
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <AuthForm />
    </div>
  );
};

export default Login;
