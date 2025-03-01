
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Document } from '@/types';
import { toast } from '@/hooks/use-toast';

// Мок данных документов
const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'Счет-фактура №12345',
    type: 'invoice',
    companyId: '1',
    brandId: '1',
    createdAt: '2023-05-10T10:00:00Z',
    updatedAt: '2023-05-10T10:00:00Z',
    createdBy: '1',
    status: 'active',
    products: [],
    currentVersionId: '1',
    versions: [
      {
        id: '1',
        documentId: '1',
        version: 1,
        createdAt: '2023-05-10T10:00:00Z',
        createdBy: '1',
        data: {}
      }
    ]
  },
  {
    id: '2',
    title: 'Договор №567',
    type: 'contract',
    companyId: '1',
    brandId: '2',
    createdAt: '2023-05-12T14:30:00Z',
    updatedAt: '2023-05-15T09:15:00Z',
    createdBy: '1',
    status: 'active',
    products: [],
    currentVersionId: '2',
    versions: [
      {
        id: '2',
        documentId: '2',
        version: 1,
        createdAt: '2023-05-12T14:30:00Z',
        createdBy: '1',
        data: {}
      },
      {
        id: '3',
        documentId: '2',
        version: 2,
        createdAt: '2023-05-15T09:15:00Z',
        createdBy: '1',
        data: {}
      }
    ]
  }
];

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [documents] = useState<Document[]>(mockDocuments);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null);
  const [showVersionModal, setShowVersionModal] = useState(false);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [customDate, setCustomDate] = useState<string>('');

  const handleCreateDocument = () => {
    navigate('/document/create');
  };

  const handleDocumentClick = (document: Document) => {
    setSelectedDocument(document);
    setShowVersionModal(true);
  };

  const handleVersionClick = (versionId: string) => {
    setSelectedVersion(versionId);
    setShowVersionModal(false);
    setShowGenerateModal(true);
  };

  const handleGenerateDocument = () => {
    // Здесь будет логика генерации документа
    toast({
      title: "Документ успешно сгенерирован",
      description: customDate 
        ? `Документ с датой: ${customDate}` 
        : "Документ с текущей датой",
      variant: "default",
    });
    setShowGenerateModal(false);
    setSelectedVersion(null);
    setCustomDate('');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Система управления документами</h1>
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
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Документы</h2>
          <button 
            onClick={handleCreateDocument} 
            className="btn-primary max-w-fit"
          >
            Создать документ
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {documents.map((doc) => (
            <div 
              key={doc.id} 
              className="bg-card rounded-lg shadow p-4 cursor-pointer hover:shadow-md transition-all"
              onClick={() => handleDocumentClick(doc)}
            >
              <h3 className="font-medium mb-2">{doc.title}</h3>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Тип: {doc.type}</span>
                <span>{new Date(doc.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="mt-2 text-sm">
                <span className="inline-block px-2 py-1 rounded bg-secondary text-secondary-foreground">
                  {doc.status}
                </span>
                <span className="ml-2 text-muted-foreground">
                  {doc.versions.length} {doc.versions.length === 1 ? 'версия' : 'версии'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Модальное окно версий */}
        {showVersionModal && selectedDocument && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-card rounded-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-medium mb-4">Версии документа: {selectedDocument.title}</h3>
              <div className="space-y-2 mb-4">
                {selectedDocument.versions.map((version) => (
                  <div 
                    key={version.id} 
                    className="p-3 bg-secondary rounded cursor-pointer hover:bg-accent transition-colors"
                    onClick={() => handleVersionClick(version.id)}
                  >
                    <div className="flex justify-between items-center">
                      <span>Версия {version.version}</span>
                      <span className="text-sm text-muted-foreground">
                        {new Date(version.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end">
                <button 
                  onClick={() => setShowVersionModal(false)} 
                  className="btn-secondary"
                >
                  Закрыть
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Модальное окно генерации */}
        {showGenerateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-card rounded-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-medium mb-4">Генерация документа</h3>
              <div className="form-group">
                <label htmlFor="customDate" className="form-label">Дата документа (опционально)</label>
                <input 
                  type="date" 
                  id="customDate"
                  value={customDate}
                  onChange={(e) => setCustomDate(e.target.value)}
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button 
                  onClick={() => setShowGenerateModal(false)} 
                  className="btn-secondary"
                >
                  Отмена
                </button>
                <button 
                  onClick={handleGenerateDocument} 
                  className="btn-primary max-w-fit"
                >
                  Сгенерировать
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
