
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  if (!user) return null;
  
  const roleTitle = user.role === 'manager' ? 'Менеджер' : user.role === 'accountant' ? 'Бухгалтер' : 'Админ';

  return (
    <header className="bg-secondary h-14 flex items-center justify-between px-4 shadow-md">
      <div className="text-lg font-medium">{roleTitle}</div>
      <button 
        onClick={handleLogout} 
        className="bg-destructive text-destructive-foreground px-4 py-1.5 rounded hover:opacity-90 transition-colors"
      >
        Выйти
      </button>
    </header>
  );
};
