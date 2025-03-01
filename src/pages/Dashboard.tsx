
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/header';
import { Search, Plus, File, Clock, FileText } from 'lucide-react';
import { Modal } from '@/components/ui/modal';
import { Document, DocumentVersion } from '@/types';
import { format } from 'date-fns';

// Mock data for demo purposes
const MOCK_DOCUMENTS: Document[] = [
  {
    id: '1',
    type: 'sale',
    orderNumber: 'ORD-001',
    clientName: 'Иванов Иван',
    clientParentName: 'Иванович',
    clientAddress: 'г. Москва, ул. Примерная, д. 1',
    validityDays: 5,
    email: 'ivanov@example.com',
    phone: '+7 (999) 123-45-67',
    deliveryAddress: 'г. Москва, ул. Примерная, д. 1',
    passportSeries: '1234',
    passportNumber: '567890',
    passportIssued: 'ОВД г. Москвы',
    passportDate: new Date('2015-01-01'),
    companyId: '1',
    brandId: '1',
    bankAccountId: '1',
    products: [
      {
        id: '1',
        name: 'Товар 1',
        unit: 'шт',
        price: 1000,
        quantity: 2,
        totalPrice: 2000
      }
    ],
    delivery: {
      enabled: true,
      daysCount: 3,
      name: 'Доставка курьером',
      price: 500,
      quantity: 1,
      totalPrice: 500
    },
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-02'),
    createdBy: 'manager',
    versions: [
      {
        id: 'v1',
        versionNumber: 1,
        createdAt: new Date('2023-01-01'),
        createdBy: 'manager'
      },
      {
        id: 'v2',
        versionNumber: 2,
        createdAt: new Date('2023-01-02'),
        createdBy: 'manager'
      }
    ]
  },
  {
    id: '2',
    type: 'invoice',
    orderNumber: 'ORD-002',
    clientName: 'Петров Петр',
    clientParentName: 'Петрович',
    clientAddress: 'г. Санкт-Петербург, ул. Тестовая, д. 2',
    validityDays: 7,
    email: 'petrov@example.com',
    phone: '+7 (999) 765-43-21',
    deliveryAddress: 'г. Санкт-Петербург, ул. Тестовая, д. 2',
    passportSeries: '5678',
    passportNumber: '123456',
    passportIssued: 'ОВД г. Санкт-Петербурга',
    passportDate: new Date('2016-02-02'),
    companyId: '2',
    brandId: '2',
    bankAccountId: '2',
    products: [
      {
        id: '2',
        name: 'Товар 2',
        unit: 'шт',
        price: 2000,
        quantity: 1,
        totalPrice: 2000
      }
    ],
    delivery: {
      enabled: false,
      daysCount: 0,
      name: '',
      price: 0,
      quantity: 0,
      totalPrice: 0
    },
    createdAt: new Date('2023-02-01'),
    updatedAt: new Date('2023-02-01'),
    createdBy: 'manager',
    versions: [
      {
        id: 'v3',
        versionNumber: 1,
        createdAt: new Date('2023-02-01'),
        createdBy: 'manager'
      }
    ]
  }
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [selectedVersion, setSelectedVersion] = useState<DocumentVersion | null>(null);
  const [isVersionModalOpen, setIsVersionModalOpen] = useState(false);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [generateDate, setGenerateDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  
  // Filter documents based on search query
  const filteredDocuments = MOCK_DOCUMENTS.filter(doc => 
    doc.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.clientName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleDocumentClick = (document: Document) => {
    setSelectedDocument(document);
    setIsVersionModalOpen(true);
  };
  
  const handleVersionClick = (version: DocumentVersion) => {
    setSelectedVersion(version);
    setIsVersionModalOpen(false);
    setIsGenerateModalOpen(true);
  };
  
  const handleGenerateDocument = () => {
    // Here you would normally call an API to generate the document
    console.log('Generating document:', selectedDocument?.id, 'version:', selectedVersion?.id, 'date:', generateDate);
    setIsGenerateModalOpen(false);
    setSelectedVersion(null);
    // Show toast message
    toast.success('Документ сгенерирован успешно!');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6 max-w-5xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Документы</h1>
          <button 
            onClick={() => navigate('/create-document')}
            className="btn-secondary flex items-center gap-2"
          >
            <Plus size={18} />
            <span>Создать документ</span>
          </button>
        </div>
        
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Поиск документов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
        </div>
        
        <div className="bg-secondary rounded-lg overflow-hidden">
          {filteredDocuments.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <FileText className="mx-auto mb-2" size={32} />
              <p>Документы не найдены</p>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {filteredDocuments.map((doc) => (
                <li 
                  key={doc.id} 
                  className="p-4 hover:bg-muted cursor-pointer transition-colors flex justify-between items-center"
                  onClick={() => handleDocumentClick(doc)}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <File size={16} className="text-primary" />
                      <span className="font-medium">{doc.orderNumber}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{doc.clientName}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock size={14} />
                    <span>{format(new Date(doc.updatedAt), 'dd.MM.yyyy')}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      
      {/* Version Selection Modal */}
      {selectedDocument && (
        <Modal
          isOpen={isVersionModalOpen}
          onClose={() => setIsVersionModalOpen(false)}
          title={`Версии документа ${selectedDocument.orderNumber}`}
        >
          <ul className="divide-y divide-border">
            {selectedDocument.versions.map((version) => (
              <li 
                key={version.id} 
                className="py-3 px-2 hover:bg-muted cursor-pointer transition-colors"
                onClick={() => handleVersionClick(version)}
              >
                <div className="flex justify-between items-center">
                  <span>Версия {version.versionNumber}</span>
                  <span className="text-sm text-muted-foreground">
                    {format(new Date(version.createdAt), 'dd.MM.yyyy')}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </Modal>
      )}
      
      {/* Generate Document Modal */}
      {selectedVersion && (
        <Modal
          isOpen={isGenerateModalOpen}
          onClose={() => setIsGenerateModalOpen(false)}
          title="Сгенерировать документ"
        >
          <div className="space-y-4">
            <div className="form-group">
              <label htmlFor="generateDate" className="form-label">Дата документа</label>
              <input
                type="date"
                id="generateDate"
                value={generateDate}
                onChange={(e) => setGenerateDate(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="btn-secondary"
                onClick={() => setIsGenerateModalOpen(false)}
              >
                Отмена
              </button>
              <button
                className="btn-primary"
                onClick={handleGenerateDocument}
              >
                Сгенерировать
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Dashboard;
