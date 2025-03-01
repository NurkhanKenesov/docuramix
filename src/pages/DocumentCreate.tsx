
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Company, Brand, Product, BankAccount } from '@/types';
import { toast } from '@/hooks/use-toast';

// Мок данных
const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'ООО Первая Компания',
    inn: '7712345678',
    address: 'г. Москва, ул. Примерная, д. 1',
    director: 'Иванов И.И.',
    accountant: 'Петрова П.П.'
  },
  {
    id: '2',
    name: 'ЗАО Вторая Компания',
    inn: '7812345678',
    address: 'г. Санкт-Петербург, пр. Образцовый, д. 2',
    director: 'Сидоров С.С.',
    accountant: 'Кузнецова К.К.'
  }
];

const mockBrands: Brand[] = [
  { id: '1', name: 'Бренд Альфа', companyId: '1' },
  { id: '2', name: 'Бренд Бета', companyId: '1' },
  { id: '3', name: 'Бренд Гамма', companyId: '2' }
];

const mockBankAccounts: BankAccount[] = [
  {
    id: '1',
    companyId: '1',
    accountNumber: '40702810100000001234',
    bankName: 'Банк "Пример"',
    bik: '044525123',
    correspondentAccount: '30101810100000000123'
  },
  {
    id: '2',
    companyId: '2',
    accountNumber: '40702810200000002345',
    bankName: 'Банк "Образец"',
    bik: '044525234',
    correspondentAccount: '30101810200000000234'
  }
];

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Товар 1',
    sku: 'SKU001',
    price: 1000,
    description: 'Описание товара 1',
    brandId: '1'
  },
  {
    id: '2',
    name: 'Товар 2',
    sku: 'SKU002',
    price: 2000,
    description: 'Описание товара 2',
    brandId: '1'
  },
  {
    id: '3',
    name: 'Товар 3',
    sku: 'SKU003',
    price: 3000,
    description: 'Описание товара 3',
    brandId: '2'
  }
];

const DocumentCreate: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // Состояния для вкладок
  const [activeTab, setActiveTab] = useState<'general' | 'company' | 'products' | 'delivery'>('general');
  
  // Состояния для формы
  const [documentType, setDocumentType] = useState<'invoice' | 'contract' | 'act' | 'other'>('invoice');
  const [documentTitle, setDocumentTitle] = useState('');
  const [selectedCompanyId, setSelectedCompanyId] = useState('');
  const [selectedBrandId, setSelectedBrandId] = useState('');
  const [selectedBankAccountId, setSelectedBankAccountId] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<Array<Product & { quantity: number }>>([]);
  
  // Состояние для информации о доставке
  const [deliveryInfo, setDeliveryInfo] = useState({
    address: '',
    contactPerson: '',
    phone: '',
    email: ''
  });
  
  // Фильтрованные списки
  const filteredBrands = mockBrands.filter(brand => 
    !selectedCompanyId || brand.companyId === selectedCompanyId
  );
  
  const filteredBankAccounts = mockBankAccounts.filter(account => 
    !selectedCompanyId || account.companyId === selectedCompanyId
  );
  
  const filteredProducts = mockProducts.filter(product => 
    !selectedBrandId || product.brandId === selectedBrandId
  );
  
  // Обработчики
  const handleCompanyChange = (companyId: string) => {
    setSelectedCompanyId(companyId);
    setSelectedBrandId('');
    setSelectedBankAccountId('');
  };
  
  const handleAddProduct = (product: Product) => {
    // Проверка, есть ли уже товар в списке
    const existingProduct = selectedProducts.find(p => p.id === product.id);
    
    if (existingProduct) {
      setSelectedProducts(selectedProducts.map(p => 
        p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
      ));
    } else {
      setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
    }
  };
  
  const handleRemoveProduct = (productId: string) => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== productId));
  };
  
  const handleQuantityChange = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveProduct(productId);
      return;
    }
    
    setSelectedProducts(selectedProducts.map(p => 
      p.id === productId ? { ...p, quantity } : p
    ));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Валидация формы
    if (!documentTitle) {
      toast({
        title: "Ошибка",
        description: "Укажите название документа",
        variant: "destructive",
      });
      return;
    }
    
    if (!selectedCompanyId) {
      toast({
        title: "Ошибка",
        description: "Выберите компанию",
        variant: "destructive",
      });
      return;
    }
    
    if (!selectedBrandId) {
      toast({
        title: "Ошибка",
        description: "Выберите бренд",
        variant: "destructive",
      });
      return;
    }
    
    if (selectedProducts.length === 0) {
      toast({
        title: "Ошибка",
        description: "Добавьте хотя бы один товар",
        variant: "destructive",
      });
      return;
    }
    
    // Здесь была бы логика сохранения документа

    toast({
      title: "Документ создан",
      description: `Документ "${documentTitle}" успешно создан`,
      variant: "default",
    });
    
    // Перенаправляем на страницу списка документов
    navigate('/dashboard');
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
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Создание документа</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <div className="border-b border-border">
              <nav className="-mb-px flex space-x-8">
                <button
                  type="button"
                  className={`py-2 px-1 border-b-2 ${activeTab === 'general' ? 'tab-active' : 'tab-inactive'}`}
                  onClick={() => setActiveTab('general')}
                >
                  Общая информация
                </button>
                <button
                  type="button"
                  className={`py-2 px-1 border-b-2 ${activeTab === 'company' ? 'tab-active' : 'tab-inactive'}`}
                  onClick={() => setActiveTab('company')}
                >
                  Фирма
                </button>
                <button
                  type="button"
                  className={`py-2 px-1 border-b-2 ${activeTab === 'products' ? 'tab-active' : 'tab-inactive'}`}
                  onClick={() => setActiveTab('products')}
                >
                  Товары
                </button>
                <button
                  type="button"
                  className={`py-2 px-1 border-b-2 ${activeTab === 'delivery' ? 'tab-active' : 'tab-inactive'}`}
                  onClick={() => setActiveTab('delivery')}
                >
                  Доставка
                </button>
              </nav>
            </div>
          </div>

          <div className="bg-card shadow rounded-lg p-6 mb-6">
            {/* Вкладка "Общая информация" */}
            {activeTab === 'general' && (
              <div className="space-y-4">
                <div className="form-group">
                  <label htmlFor="document-title" className="form-label">Название документа *</label>
                  <input
                    id="document-title"
                    type="text"
                    value={documentTitle}
                    onChange={(e) => setDocumentTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="document-type" className="form-label">Тип документа *</label>
                  <select
                    id="document-type"
                    value={documentType}
                    onChange={(e) => setDocumentType(e.target.value as any)}
                    required
                  >
                    <option value="invoice">Счет-фактура</option>
                    <option value="contract">Договор</option>
                    <option value="act">Акт</option>
                    <option value="other">Другое</option>
                  </select>
                </div>
              </div>
            )}

            {/* Вкладка "Фирма" */}
            {activeTab === 'company' && (
              <div className="space-y-4">
                <div className="form-group">
                  <label htmlFor="company" className="form-label">Компания *</label>
                  <select
                    id="company"
                    value={selectedCompanyId}
                    onChange={(e) => handleCompanyChange(e.target.value)}
                    required
                  >
                    <option value="">Выберите компанию</option>
                    {mockCompanies.map(company => (
                      <option key={company.id} value={company.id}>{company.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="brand" className="form-label">Бренд *</label>
                  <select
                    id="brand"
                    value={selectedBrandId}
                    onChange={(e) => setSelectedBrandId(e.target.value)}
                    disabled={!selectedCompanyId}
                    required
                  >
                    <option value="">Выберите бренд</option>
                    {filteredBrands.map(brand => (
                      <option key={brand.id} value={brand.id}>{brand.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="bank-account" className="form-label">Банковский счет</label>
                  <select
                    id="bank-account"
                    value={selectedBankAccountId}
                    onChange={(e) => setSelectedBankAccountId(e.target.value)}
                    disabled={!selectedCompanyId}
                  >
                    <option value="">Выберите банковский счет</option>
                    {filteredBankAccounts.map(account => (
                      <option key={account.id} value={account.id}>
                        {account.accountNumber} ({account.bankName})
                      </option>
                    ))}
                  </select>
                </div>
                
                {selectedCompanyId && (
                  <div className="mt-6 p-4 bg-secondary rounded">
                    <h3 className="font-medium mb-2">Информация о компании</h3>
                    {(() => {
                      const company = mockCompanies.find(c => c.id === selectedCompanyId);
                      return company ? (
                        <div className="space-y-1 text-sm">
                          <p><span className="text-muted-foreground">Название:</span> {company.name}</p>
                          <p><span className="text-muted-foreground">ИНН:</span> {company.inn}</p>
                          <p><span className="text-muted-foreground">Адрес:</span> {company.address}</p>
                          <p><span className="text-muted-foreground">Директор:</span> {company.director}</p>
                          <p><span className="text-muted-foreground">Главный бухгалтер:</span> {company.accountant}</p>
                        </div>
                      ) : null;
                    })()}
                  </div>
                )}
              </div>
            )}

            {/* Вкладка "Товары" */}
            {activeTab === 'products' && (
              <div>
                <div className="mb-6">
                  <h3 className="font-medium mb-4">Доступные товары</h3>
                  
                  {selectedBrandId ? (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {filteredProducts.map(product => (
                        <div 
                          key={product.id} 
                          className="bg-secondary p-4 rounded cursor-pointer hover:bg-accent transition-colors"
                          onClick={() => handleAddProduct(product)}
                        >
                          <h4 className="font-medium">{product.name}</h4>
                          <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
                          <p className="text-sm font-medium mt-2">{product.price.toLocaleString()} ₽</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-secondary rounded p-4 text-center">
                      <p className="text-muted-foreground">Пожалуйста, выберите бренд на вкладке "Фирма"</p>
                    </div>
                  )}
                </div>
                
                <div className="mt-8">
                  <h3 className="font-medium mb-4">Выбранные товары</h3>
                  
                  {selectedProducts.length > 0 ? (
                    <div className="border border-border rounded overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-secondary">
                          <tr>
                            <th className="p-2 text-left">Товар</th>
                            <th className="p-2 text-right">Цена</th>
                            <th className="p-2 text-right">Количество</th>
                            <th className="p-2 text-right">Сумма</th>
                            <th className="p-2"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedProducts.map(product => (
                            <tr key={product.id} className="border-t border-border">
                              <td className="p-2">{product.name}</td>
                              <td className="p-2 text-right">{product.price.toLocaleString()} ₽</td>
                              <td className="p-2 text-right">
                                <input
                                  type="number"
                                  min="1"
                                  value={product.quantity}
                                  onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                                  className="w-16 text-center"
                                />
                              </td>
                              <td className="p-2 text-right">{(product.price * product.quantity).toLocaleString()} ₽</td>
                              <td className="p-2 text-right">
                                <button
                                  type="button"
                                  onClick={() => handleRemoveProduct(product.id)}
                                  className="text-destructive hover:text-destructive/80"
                                >
                                  Удалить
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot className="bg-secondary">
                          <tr>
                            <td colSpan={3} className="p-2 text-right font-medium">Итого:</td>
                            <td className="p-2 text-right font-medium">
                              {selectedProducts.reduce((sum, product) => sum + (product.price * product.quantity), 0).toLocaleString()} ₽
                            </td>
                            <td></td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  ) : (
                    <div className="bg-secondary rounded p-4 text-center">
                      <p className="text-muted-foreground">Товары не выбраны</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Вкладка "Доставка" */}
            {activeTab === 'delivery' && (
              <div className="space-y-4">
                <div className="form-group">
                  <label htmlFor="delivery-address" className="form-label">Адрес доставки</label>
                  <input
                    id="delivery-address"
                    type="text"
                    value={deliveryInfo.address}
                    onChange={(e) => setDeliveryInfo({...deliveryInfo, address: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-person" className="form-label">Контактное лицо</label>
                  <input
                    id="contact-person"
                    type="text"
                    value={deliveryInfo.contactPerson}
                    onChange={(e) => setDeliveryInfo({...deliveryInfo, contactPerson: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-phone" className="form-label">Телефон</label>
                  <input
                    id="contact-phone"
                    type="text"
                    value={deliveryInfo.phone}
                    onChange={(e) => setDeliveryInfo({...deliveryInfo, phone: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-email" className="form-label">Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    value={deliveryInfo.email}
                    onChange={(e) => setDeliveryInfo({...deliveryInfo, email: e.target.value})}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="btn-secondary"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="btn-primary max-w-fit"
            >
              Создать документ
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default DocumentCreate;
