
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-6">Страница не найдена</h2>
        <p className="text-muted-foreground mb-8">
          Извините, страница, которую вы ищете, не существует или была перемещена.
        </p>
        <Link to="/" className="btn-primary inline-block max-w-fit px-6">
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
