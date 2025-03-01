
import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, AuthContextType, UserRole } from '@/types';
import { toast } from 'sonner';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo purposes
const MOCK_USERS = [
  { id: '1', username: 'manager', password: 'password', role: 'manager' as UserRole },
  { id: '2', username: 'accountant', password: 'password', role: 'accountant' as UserRole },
  { id: '3', username: 'admin', password: 'admin', role: 'admin' as UserRole }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    // Simulate API call
    setLoading(true);
    
    try {
      // For demo purposes, authenticate against mock users
      const foundUser = MOCK_USERS.find(u => u.username === username && u.password === password);
      
      if (foundUser) {
        const { password, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        toast.success('Успешная авторизация');
        return;
      }
      
      throw new Error('Неверный логин или пароль');
    } catch (error) {
      toast.error((error as Error).message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.success('Вы вышли из системы');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
