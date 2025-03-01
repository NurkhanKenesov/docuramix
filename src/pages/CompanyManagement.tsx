
import React, { useState } from 'react';
import { Header } from '@/components/layout/header';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import { toast } from 'sonner';

type TabType = 'info' | 'brands' | 'accounts';

const CompanyManagement: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('info');
  
  // Company form state
  const [companyName, setCompanyName] = useState('');
  const [companyType, setCompanyType] = useState('ООО');
  const [companyInn, setCompanyInn] = useState('');
  const [companyKpp, setCompanyKpp] = useState('');
  const [companyOgrn, setCompanyOgrn] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  
  // Brand form state
  const [brandName, setBrandName] = useState('');
  
  // Bank account form state
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bankBankName, setBankBankName] = useState('');
  const [bankBik, setBankBik] = useState('');
  const [correspondentAccount, setCorrespondentAccount] = useState('');
  
  const handleSaveCompany = () => {
    // Validate required fields
    if (!companyName || !companyType || !companyInn || !companyOgrn || !companyAddress) {
      toast.error('Заполните все обязательные поля');
      return;
    }
    
    // Here you would normally call an API to save the company
    console.log('Saving company:', {
      name: companyName,
      type: companyType,
      inn: companyInn,
      kpp: companyKpp,
      ogrn: companyOgrn,
      address: companyAddress
    });
    
    toast.success('Организация успешно сохранена');
  };
  
  const handleAddBrand = () => {
    if (!brandName) {
      toast.error('Введите название бренда');
      return;
    }
    
    // Here you would normally call an API to add the brand
    console.log('Adding brand:', brandName);
    toast.success('Бренд успешно добавлен');
    setBrandName('');
  };
  
  const handleAddBankAccount = () => {
    if (!bankName || !accountNumber || !bankBankName || !bankBik || !correspondentAccount) {
      toast.error('Заполните все поля банковского счета');
      return;
    }
    
    // Here you would normally call an API to add the bank account
    console.log('Adding bank account:', {
      name: bankName,
      accountNumber,
      bankName: bankBankName,
      bik: bankBik,
      correspondentAccount
    });
    
    toast.success('Банковский счет успешно добавлен');
    
    // Reset form
    setBankName('');
    setAccountNumber('');
    setBankBankName('');
    setBankBik('');
    setCorrespondentAccount('');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6 max-w-5xl">
        <div className="flex items-center gap-2 mb-6">
          <button 
            onClick={() => navigate('/accountant-dashboard')}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-semibold">Управление компанией</h1>
        </div>
        
        <div className="bg-secondary rounded-lg overflow-hidden mb-6">
          <div className="flex border-b border-border">
            <button
              className={`py-3 px-6 text-sm font-medium ${activeTab === 'info' ? 'tab-active' : 'tab-inactive'}`}
              onClick={() => setActiveTab('info')}
            >
              Обновить информацию
            </button>
            <button
              className={`py-3 px-6 text-sm font-medium ${activeTab === 'brands' ? 'tab-active' : 'tab-inactive'}`}
              onClick={() => setActiveTab('brands')}
            >
              Бренды
            </button>
            <button
              className={`py-3 px-6 text-sm font-medium ${activeTab === 'accounts' ? 'tab-active' : 'tab-inactive'}`}
              onClick={() => setActiveTab('accounts')}
            >
              Счета
            </button>
          </div>
          
          <div className="p-4">
            {/* Company Info Tab */}
            {activeTab === 'info' && (
              <div className="space-y-4 animate-fade-in">
                <div className="form-group">
                  <label htmlFor="companyName" className="form-label">Наименование организации *</label>
                  <input
                    id="companyName"
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="companyType" className="form-label">Тип организации *</label>
                  <select
                    id="companyType"
                    value={companyType}
                    onChange={(e) => setCompanyType(e.target.value)}
                    className="bg-input"
                    required
                  >
                    <option value="ООО">ООО</option>
                    <option value="ИП">ИП</option>
                    <option value="АО">АО</option>
                    <option value="ЗАО">ЗАО</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="companyInn" className="form-label">ИНН *</label>
                  <input
                    id="companyInn"
                    type="text"
                    value={companyInn}
                    onChange={(e) => setCompanyInn(e.target.value)}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="companyKpp" className="form-label">КПП</label>
                  <input
                    id="companyKpp"
                    type="text"
                    value={companyKpp}
                    onChange={(e) => setCompanyKpp(e.target.value)}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="companyOgrn" className="form-label">ОГРН *</label>
                  <input
                    id="companyOgrn"
                    type="text"
                    value={companyOgrn}
                    onChange={(e) => setCompanyOgrn(e.target.value)}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="companyAddress" className="form-label">Юридический адрес *</label>
                  <input
                    id="companyAddress"
                    type="text"
                    value={companyAddress}
                    onChange={(e) => setCompanyAddress(e.target.value)}
                    required
                  />
                </div>
                
                <button 
                  className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-medium"
                  onClick={handleSaveCompany}
                >
                  Сохранить
                </button>
              </div>
            )}
            
            {/* Brands Tab */}
            {activeTab === 'brands' && (
              <div className="animate-fade-in">
                <h2 className="text-lg font-medium mb-4">Список брендов организации</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="form-group">
                    <label htmlFor="brandName" className="form-label">Название бренда</label>
                    <input
                      id="brandName"
                      type="text"
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                    />
                  </div>
                  
                  <button 
                    className="bg-primary text-primary-foreground px-4 py-2 rounded text-sm flex items-center gap-2"
                    onClick={handleAddBrand}
                  >
                    <Plus size={16} />
                    <span>Добавить бренд</span>
                  </button>
                </div>
                
                <ul className="space-y-3">
                  <li className="bg-muted rounded-lg p-4 flex justify-between items-center">
                    <span className="font-medium">dom-na-dachu.ru</span>
                    <button className="text-muted-foreground hover:text-destructive transition-colors">
                      <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                      </svg>
                    </button>
                  </li>
                </ul>
              </div>
            )}
            
            {/* Bank Accounts Tab */}
            {activeTab === 'accounts' && (
              <div className="animate-fade-in">
                <h2 className="text-lg font-medium mb-4">Банковские счета</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="form-group">
                    <label htmlFor="bankName" className="form-label">Название счета</label>
                    <input
                      id="bankName"
                      type="text"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="accountNumber" className="form-label">Номер счета</label>
                    <input
                      id="accountNumber"
                      type="text"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="bankBankName" className="form-label">Наименование банка</label>
                    <input
                      id="bankBankName"
                      type="text"
                      value={bankBankName}
                      onChange={(e) => setBankBankName(e.target.value)}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="bankBik" className="form-label">БИК</label>
                    <input
                      id="bankBik"
                      type="text"
                      value={bankBik}
                      onChange={(e) => setBankBik(e.target.value)}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="correspondentAccount" className="form-label">Корр. счет</label>
                    <input
                      id="correspondentAccount"
                      type="text"
                      value={correspondentAccount}
                      onChange={(e) => setCorrespondentAccount(e.target.value)}
                    />
                  </div>
                  
                  <button 
                    className="bg-primary text-primary-foreground px-4 py-2 rounded text-sm flex items-center gap-2"
                    onClick={handleAddBankAccount}
                  >
                    <Plus size={16} />
                    <span>Добавить счет</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CompanyManagement;
