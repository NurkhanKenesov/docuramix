
import React, { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Search, Plus, Trash, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { Modal } from '@/components/ui/modal';
import { Company, Brand, BankAccount } from '@/types';

// Mock data
const MOCK_COMPANIES: Company[] = [
  { 
    id: '1', 
    name: 'ПБ ГЛАСС', 
    type: 'ООО', 
    inn: '1234567890', 
    kpp: '123456789', 
    ogrn: '1234567890123', 
    address: 'г. Москва, ул. Примерная, д. 1' 
  },
  { 
    id: '2', 
    name: 'М1', 
    type: 'ИП', 
    inn: '9876543210', 
    kpp: '', 
    ogrn: '9876543210123', 
    address: 'г. Санкт-Петербург, ул. Тестовая, д. 2' 
  },
  { 
    id: '3', 
    name: 'Трегубов Денис Валерьевич', 
    type: 'ИП', 
    inn: '1122334455', 
    kpp: '', 
    ogrn: '1122334455123', 
    address: 'г. Екатеринбург, ул. Образцовая, д. 3' 
  },
  { 
    id: '4', 
    name: 'Масленников Василий Михайлович', 
    type: 'ИП', 
    inn: '5566778899', 
    kpp: '', 
    ogrn: '5566778899123', 
    address: 'г. Казань, ул. Пробная, д. 4' 
  }
];

const MOCK_BRANDS: Brand[] = [
  { id: '1', name: 'dom-na-dachu.ru', companyId: '1' },
  { id: '2', name: 'Бренд 2', companyId: '2' }
];

const MOCK_BANK_ACCOUNTS: BankAccount[] = [
  { 
    id: '1', 
    name: 'Счет Сбербанк', 
    accountNumber: '40702810123456789012', 
    bankName: 'ПАО Сбербанк', 
    bik: '044525225', 
    correspondentAccount: '30101810400000000225', 
    companyId: '1' 
  },
  { 
    id: '2', 
    name: 'Счет Тинькофф', 
    accountNumber: '40802810200000123456', 
    bankName: 'АО «Тинькофф Банк»', 
    bik: '044525974', 
    correspondentAccount: '30101810145250000974', 
    companyId: '2' 
  }
];

enum ManagementView {
  COMPANIES = 'companies',
  ADD_COMPANY = 'add-company',
  BRANDS = 'brands',
  BANK_ACCOUNTS = 'bank-accounts'
}

const AccountantDashboard: React.FC = () => {
  const [view, setView] = useState<ManagementView>(ManagementView.COMPANIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ id: string; type: string } | null>(null);
  
  // Company form state
  const [companyName, setCompanyName] = useState('');
  const [companyType, setCompanyType] = useState('ООО');
  const [companyInn, setCompanyInn] = useState('');
  const [companyKpp, setCompanyKpp] = useState('');
  const [companyOgrn, setCompanyOgrn] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [companyChiefAccountant, setCompanyChiefAccountant] = useState('');
  const [companyStampImage, setCompanyStampImage] = useState<File | null>(null);
  const [companyDirectorSignature, setCompanyDirectorSignature] = useState<File | null>(null);
  const [companyAccountantSignature, setCompanyAccountantSignature] = useState<File | null>(null);
  
  // Brand form state
  const [brandName, setBrandName] = useState('');
  
  // Bank account form state
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bankBankName, setBankBankName] = useState('');
  const [bankBik, setBankBik] = useState('');
  const [correspondentAccount, setCorrespondentAccount] = useState('');
  
  // Filtered data
  const filteredCompanies = MOCK_COMPANIES.filter(company => 
    company.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredBrands = MOCK_BRANDS.filter(brand => 
    selectedCompany && brand.companyId === selectedCompany.id
  );
  
  const filteredBankAccounts = MOCK_BANK_ACCOUNTS.filter(account => 
    selectedCompany && account.companyId === selectedCompany.id
  );
  
  const handleAddCompany = () => {
    // Validation
    if (!companyName || !companyType || !companyInn || !companyOgrn || !companyAddress) {
      toast.error('Заполните все обязательные поля');
      return;
    }
    
    // Here you would normally call an API to add the company
    console.log('Adding company:', {
      name: companyName,
      type: companyType,
      inn: companyInn,
      kpp: companyKpp,
      ogrn: companyOgrn,
      address: companyAddress,
      chiefAccountant: companyChiefAccountant,
      stampImage: companyStampImage,
      directorSignature: companyDirectorSignature,
      accountantSignature: companyAccountantSignature
    });
    
    toast.success('Организация успешно добавлена');
    setView(ManagementView.COMPANIES);
    
    // Reset form
    setCompanyName('');
    setCompanyType('ООО');
    setCompanyInn('');
    setCompanyKpp('');
    setCompanyOgrn('');
    setCompanyAddress('');
    setCompanyChiefAccountant('');
    setCompanyStampImage(null);
    setCompanyDirectorSignature(null);
    setCompanyAccountantSignature(null);
  };
  
  const handleAddBrand = () => {
    if (!brandName || !selectedCompany) {
      toast.error('Заполните название бренда');
      return;
    }
    
    // Here you would normally call an API to add the brand
    console.log('Adding brand:', {
      name: brandName,
      companyId: selectedCompany.id
    });
    
    toast.success('Бренд успешно добавлен');
    setBrandName('');
  };
  
  const handleAddBankAccount = () => {
    if (!bankName || !accountNumber || !bankBankName || !bankBik || !correspondentAccount || !selectedCompany) {
      toast.error('Заполните все поля банковского счета');
      return;
    }
    
    // Here you would normally call an API to add the bank account
    console.log('Adding bank account:', {
      name: bankName,
      accountNumber,
      bankName: bankBankName,
      bik: bankBik,
      correspondentAccount,
      companyId: selectedCompany.id
    });
    
    toast.success('Банковский счет успешно добавлен');
    
    // Reset form
    setBankName('');
    setAccountNumber('');
    setBankBankName('');
    setBankBik('');
    setCorrespondentAccount('');
  };
  
  const handleDeleteClick = (id: string, type: string) => {
    setItemToDelete({ id, type });
    setIsDeleteModalOpen(true);
  };
  
  const handleDeleteConfirm = () => {
    if (!itemToDelete) return;
    
    // Here you would normally call an API to delete the item
    console.log('Deleting:', itemToDelete);
    
    toast.success(`${itemToDelete.type} успешно удален`);
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };
  
  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6 max-w-5xl">
        {view === ManagementView.COMPANIES && (
          <div className="animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
              <h1 className="text-2xl font-semibold">Бухгалтер</h1>
              <div className="flex flex-col sm:flex-row gap-2">
                <button 
                  onClick={() => setView(ManagementView.ADD_COMPANY)}
                  className="bg-primary text-primary-foreground px-4 py-2 rounded text-sm sm:text-base"
                >
                  Добавить организацию
                </button>
                <button 
                  className="bg-secondary text-secondary-foreground px-4 py-2 rounded text-sm sm:text-base"
                >
                  Все документы
                </button>
              </div>
            </div>
            
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Поиск..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            </div>
            
            <h2 className="text-xl font-medium mb-4">Список всех организаций</h2>
            
            <ul className="space-y-3">
              {filteredCompanies.map(company => (
                <li 
                  key={company.id} 
                  className="bg-secondary rounded-lg p-4 flex justify-between items-center"
                >
                  <span className="font-medium">{company.name}</span>
                  <button
                    onClick={() => handleDeleteClick(company.id, 'организация')}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash size={18} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {view === ManagementView.ADD_COMPANY && (
          <div className="animate-fade-in">
            <div className="flex items-center gap-2 mb-6">
              <button 
                onClick={() => setView(ManagementView.COMPANIES)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <h1 className="text-xl font-semibold">Введите информацию</h1>
            </div>
            
            <div className="space-y-4 mb-6">
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
              
              <div className="form-group">
                <label htmlFor="companyChiefAccountant" className="form-label">Глав. бухгалтер</label>
                <input
                  id="companyChiefAccountant"
                  type="text"
                  value={companyChiefAccountant}
                  onChange={(e) => setCompanyChiefAccountant(e.target.value)}
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Печать организации</label>
                <div className="border border-border rounded-lg p-4 flex justify-center">
                  <div className="w-24 h-24 bg-secondary border border-dashed border-accent flex items-center justify-center cursor-pointer overflow-hidden">
                    {companyStampImage ? (
                      <img 
                        src={URL.createObjectURL(companyStampImage)} 
                        alt="Печать" 
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageUpload(e, setCompanyStampImage)}
                        />
                        <Plus className="text-muted-foreground" />
                      </label>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Подпись ген. директора</label>
                <div className="border border-border rounded-lg p-4 flex justify-center">
                  <div className="w-24 h-24 bg-secondary border border-dashed border-accent flex items-center justify-center cursor-pointer overflow-hidden">
                    {companyDirectorSignature ? (
                      <img 
                        src={URL.createObjectURL(companyDirectorSignature)} 
                        alt="Подпись директора" 
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageUpload(e, setCompanyDirectorSignature)}
                        />
                        <Plus className="text-muted-foreground" />
                      </label>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Подпись бухгалтера</label>
                <div className="border border-border rounded-lg p-4 flex justify-center">
                  <div className="w-24 h-24 bg-secondary border border-dashed border-accent flex items-center justify-center cursor-pointer overflow-hidden">
                    {companyAccountantSignature ? (
                      <img 
                        src={URL.createObjectURL(companyAccountantSignature)} 
                        alt="Подпись бухгалтера" 
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageUpload(e, setCompanyAccountantSignature)}
                        />
                        <Plus className="text-muted-foreground" />
                      </label>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <button 
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium"
              onClick={handleAddCompany}
            >
              Добавить
            </button>
          </div>
        )}
        
        {view === ManagementView.BRANDS && selectedCompany && (
          <div className="animate-fade-in">
            <div className="flex items-center gap-2 mb-6">
              <button 
                onClick={() => {
                  setView(ManagementView.COMPANIES);
                  setSelectedCompany(null);
                }}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <h1 className="text-xl font-semibold">Бренды</h1>
            </div>
            
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
                className="bg-primary text-primary-foreground px-4 py-2 rounded text-sm"
                onClick={handleAddBrand}
              >
                Добавить бренд
              </button>
            </div>
            
            <ul className="space-y-3">
              {filteredBrands.map(brand => (
                <li 
                  key={brand.id} 
                  className="bg-secondary rounded-lg p-4 flex justify-between items-center"
                >
                  <span className="font-medium">{brand.name}</span>
                  <button
                    onClick={() => handleDeleteClick(brand.id, 'бренд')}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash size={18} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {view === ManagementView.BANK_ACCOUNTS && selectedCompany && (
          <div className="animate-fade-in">
            <div className="flex items-center gap-2 mb-6">
              <button 
                onClick={() => {
                  setView(ManagementView.COMPANIES);
                  setSelectedCompany(null);
                }}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <h1 className="text-xl font-semibold">Банковские счета</h1>
            </div>
            
            <h2 className="text-lg font-medium mb-4">Список счетов организации</h2>
            
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
                className="bg-primary text-primary-foreground px-4 py-2 rounded text-sm"
                onClick={handleAddBankAccount}
              >
                Добавить счет
              </button>
            </div>
            
            <ul className="space-y-3">
              {filteredBankAccounts.map(account => (
                <li 
                  key={account.id} 
                  className="bg-secondary rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <span className="font-medium">{account.name}</span>
                    <p className="text-sm text-muted-foreground">{account.accountNumber}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteClick(account.id, 'счет')}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash size={18} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
      
      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Подтверждение удаления"
        size="sm"
      >
        <div className="space-y-4">
          <p>Вы уверены, что хотите удалить этот элемент?</p>
          <div className="flex justify-end gap-2">
            <button
              className="btn-secondary"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Отмена
            </button>
            <button
              className="btn-danger"
              onClick={handleDeleteConfirm}
            >
              Удалить
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AccountantDashboard;
