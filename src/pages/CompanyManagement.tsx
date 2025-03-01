
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Company, Brand, BankAccount } from '@/types';
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

const CompanyManagement: React.FC = () => {
  const { user, logout } = useAuth();
  const [companies, setCompanies] = useState<Company[]>(mockCompanies);
  const [brands, setBrands] = useState<Brand[]>(mockBrands);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>(mockBankAccounts);
  
  const [activeTab, setActiveTab] = useState<'companies' | 'brands' | 'accounts'>('companies');
  
  // Состояния для форм
  const [newCompany, setNewCompany] = useState<Omit<Company, 'id'>>({
    name: '',
    inn: '',
    address: '',
    director: '',
    accountant: ''
  });
  
  const [newBrand, setNewBrand] = useState<Omit<Brand, 'id'>>({
    name: '',
    companyId: ''
  });
  
  const [newBankAccount, setNewBankAccount] = useState<Omit<BankAccount, 'id'>>({
    companyId: '',
    accountNumber: '',
    bankName: '',
    bik: '',
    correspondentAccount: ''
  });

  // Обработчики форм
  const handleCompanySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany.name || !newCompany.inn) {
      toast({
        title: "Ошибка",
        description: "Заполните обязательные поля",
        variant: "destructive",
      });
      return;
    }
    
    const id = Date.now().toString();
    setCompanies([...companies, { ...newCompany, id }]);
    setNewCompany({
      name: '',
      inn: '',
      address: '',
      director: '',
      accountant: ''
    });
    toast({
      title: "Компания добавлена",
      variant: "default",
    });
  };
  
  const handleBrandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBrand.name || !newBrand.companyId) {
      toast({
        title: "Ошибка",
        description: "Заполните обязательные поля",
        variant: "destructive",
      });
      return;
    }
    
    const id = Date.now().toString();
    setBrands([...brands, { ...newBrand, id }]);
    setNewBrand({
      name: '',
      companyId: ''
    });
    toast({
      title: "Бренд добавлен",
      variant: "default",
    });
  };
  
  const handleBankAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBankAccount.accountNumber || !newBankAccount.companyId) {
      toast({
        title: "Ошибка",
        description: "Заполните обязательные поля",
        variant: "destructive",
      });
      return;
    }
    
    const id = Date.now().toString();
    setBankAccounts([...bankAccounts, { ...newBankAccount, id }]);
    setNewBankAccount({
      companyId: '',
      accountNumber: '',
      bankName: '',
      bik: '',
      correspondentAccount: ''
    });
    toast({
      title: "Банковский счёт добавлен",
      variant: "default",
    });
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
          <h2 className="text-2xl font-bold">Управление компаниями</h2>
        </div>

        <div className="mb-6">
          <div className="border-b border-border">
            <nav className="-mb-px flex">
              <button
                className={`py-2 px-4 border-b-2 ${activeTab === 'companies' ? 'tab-active' : 'tab-inactive'}`}
                onClick={() => setActiveTab('companies')}
              >
                Компании
              </button>
              <button
                className={`py-2 px-4 border-b-2 ${activeTab === 'brands' ? 'tab-active' : 'tab-inactive'}`}
                onClick={() => setActiveTab('brands')}
              >
                Бренды
              </button>
              <button
                className={`py-2 px-4 border-b-2 ${activeTab === 'accounts' ? 'tab-active' : 'tab-inactive'}`}
                onClick={() => setActiveTab('accounts')}
              >
                Банковские счета
              </button>
            </nav>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Формы для создания */}
          <div className="bg-card shadow rounded-lg p-6">
            {activeTab === 'companies' && (
              <>
                <h3 className="text-lg font-medium mb-4">Добавить компанию</h3>
                <form onSubmit={handleCompanySubmit} className="space-y-4">
                  <div className="form-group">
                    <label htmlFor="company-name" className="form-label">Название компании *</label>
                    <input
                      id="company-name"
                      type="text"
                      value={newCompany.name}
                      onChange={(e) => setNewCompany({...newCompany, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="company-inn" className="form-label">ИНН *</label>
                    <input
                      id="company-inn"
                      type="text"
                      value={newCompany.inn}
                      onChange={(e) => setNewCompany({...newCompany, inn: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="company-address" className="form-label">Адрес</label>
                    <input
                      id="company-address"
                      type="text"
                      value={newCompany.address}
                      onChange={(e) => setNewCompany({...newCompany, address: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="company-director" className="form-label">Директор</label>
                    <input
                      id="company-director"
                      type="text"
                      value={newCompany.director}
                      onChange={(e) => setNewCompany({...newCompany, director: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="company-accountant" className="form-label">Главный бухгалтер</label>
                    <input
                      id="company-accountant"
                      type="text"
                      value={newCompany.accountant}
                      onChange={(e) => setNewCompany({...newCompany, accountant: e.target.value})}
                    />
                  </div>
                  <button type="submit" className="btn-primary">Добавить компанию</button>
                </form>
              </>
            )}
            
            {activeTab === 'brands' && (
              <>
                <h3 className="text-lg font-medium mb-4">Добавить бренд</h3>
                <form onSubmit={handleBrandSubmit} className="space-y-4">
                  <div className="form-group">
                    <label htmlFor="brand-name" className="form-label">Название бренда *</label>
                    <input
                      id="brand-name"
                      type="text"
                      value={newBrand.name}
                      onChange={(e) => setNewBrand({...newBrand, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="brand-company" className="form-label">Компания *</label>
                    <select
                      id="brand-company"
                      value={newBrand.companyId}
                      onChange={(e) => setNewBrand({...newBrand, companyId: e.target.value})}
                      required
                    >
                      <option value="">Выберите компанию</option>
                      {companies.map(company => (
                        <option key={company.id} value={company.id}>{company.name}</option>
                      ))}
                    </select>
                  </div>
                  <button type="submit" className="btn-primary">Добавить бренд</button>
                </form>
              </>
            )}
            
            {activeTab === 'accounts' && (
              <>
                <h3 className="text-lg font-medium mb-4">Добавить банковский счет</h3>
                <form onSubmit={handleBankAccountSubmit} className="space-y-4">
                  <div className="form-group">
                    <label htmlFor="account-company" className="form-label">Компания *</label>
                    <select
                      id="account-company"
                      value={newBankAccount.companyId}
                      onChange={(e) => setNewBankAccount({...newBankAccount, companyId: e.target.value})}
                      required
                    >
                      <option value="">Выберите компанию</option>
                      {companies.map(company => (
                        <option key={company.id} value={company.id}>{company.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="account-number" className="form-label">Номер счета *</label>
                    <input
                      id="account-number"
                      type="text"
                      value={newBankAccount.accountNumber}
                      onChange={(e) => setNewBankAccount({...newBankAccount, accountNumber: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="bank-name" className="form-label">Название банка</label>
                    <input
                      id="bank-name"
                      type="text"
                      value={newBankAccount.bankName}
                      onChange={(e) => setNewBankAccount({...newBankAccount, bankName: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="bik" className="form-label">БИК</label>
                    <input
                      id="bik"
                      type="text"
                      value={newBankAccount.bik}
                      onChange={(e) => setNewBankAccount({...newBankAccount, bik: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="correspondent-account" className="form-label">Корр. счет</label>
                    <input
                      id="correspondent-account"
                      type="text"
                      value={newBankAccount.correspondentAccount}
                      onChange={(e) => setNewBankAccount({...newBankAccount, correspondentAccount: e.target.value})}
                    />
                  </div>
                  <button type="submit" className="btn-primary">Добавить счет</button>
                </form>
              </>
            )}
          </div>

          {/* Списки */}
          <div>
            {activeTab === 'companies' && (
              <div className="bg-card shadow rounded-lg p-6">
                <h3 className="text-lg font-medium mb-4">Список компаний</h3>
                {companies.length > 0 ? (
                  <div className="space-y-3">
                    {companies.map(company => (
                      <div key={company.id} className="p-3 bg-secondary rounded">
                        <h4 className="font-medium">{company.name}</h4>
                        <p className="text-sm text-muted-foreground">ИНН: {company.inn}</p>
                        {company.address && <p className="text-sm text-muted-foreground">{company.address}</p>}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Нет добавленных компаний</p>
                )}
              </div>
            )}
            
            {activeTab === 'brands' && (
              <div className="bg-card shadow rounded-lg p-6">
                <h3 className="text-lg font-medium mb-4">Список брендов</h3>
                {brands.length > 0 ? (
                  <div className="space-y-3">
                    {brands.map(brand => {
                      const company = companies.find(c => c.id === brand.companyId);
                      return (
                        <div key={brand.id} className="p-3 bg-secondary rounded">
                          <h4 className="font-medium">{brand.name}</h4>
                          {company && <p className="text-sm text-muted-foreground">Компания: {company.name}</p>}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Нет добавленных брендов</p>
                )}
              </div>
            )}
            
            {activeTab === 'accounts' && (
              <div className="bg-card shadow rounded-lg p-6">
                <h3 className="text-lg font-medium mb-4">Список банковских счетов</h3>
                {bankAccounts.length > 0 ? (
                  <div className="space-y-3">
                    {bankAccounts.map(account => {
                      const company = companies.find(c => c.id === account.companyId);
                      return (
                        <div key={account.id} className="p-3 bg-secondary rounded">
                          <h4 className="font-medium">Счет: {account.accountNumber}</h4>
                          {company && <p className="text-sm text-muted-foreground">Компания: {company.name}</p>}
                          {account.bankName && <p className="text-sm text-muted-foreground">Банк: {account.bankName}</p>}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Нет добавленных банковских счетов</p>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CompanyManagement;
