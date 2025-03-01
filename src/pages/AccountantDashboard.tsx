
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Logo from '@/components/Logo';

const AccountantDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Logo />
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground">
              {user?.username} ({user?.role})
            </span>
            <button 
              onClick={logout} 
              className="btn-secondary"
            >
              Выйти
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Панель бухгалтера</h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div 
              className="bg-card rounded-lg shadow p-6 cursor-pointer hover:shadow-md transition-all"
              onClick={() => navigate('/company-management')}
            >
              <h3 className="text-xl font-medium mb-3">Управление компаниями</h3>
              <p className="text-muted-foreground">
                Добавление и редактирование компаний, брендов и банковских счетов.
              </p>
            </div>
            
            <div 
              className="bg-card rounded-lg shadow p-6 cursor-pointer hover:shadow-md transition-all"
            >
              <h3 className="text-xl font-medium mb-3">Управление товарами</h3>
              <p className="text-muted-foreground">
                Добавление и редактирование товаров, управление изображениями.
              </p>
            </div>
            
            <div 
              className="bg-card rounded-lg shadow p-6 cursor-pointer hover:shadow-md transition-all"
            >
              <h3 className="text-xl font-medium mb-3">Статистика</h3>
              <p className="text-muted-foreground">
                Просмотр статистики по документам и товарам.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccountantDashboard;
