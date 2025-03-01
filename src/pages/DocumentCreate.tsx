
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/header';
import { X, Plus, Image } from 'lucide-react';
import { toast } from 'sonner';

// Mock data for demo purposes
const MOCK_COMPANIES = [
  { id: '1', name: 'ПБ ГЛАСС' },
  { id: '2', name: 'М1' },
  { id: '3', name: 'Трегубов Денис Валерьевич' },
  { id: '4', name: 'Масленников Василий Михайлович' }
];

const MOCK_BRANDS = [
  { id: '1', name: 'dom-na-dachu.ru', companyId: '1' },
  { id: '2', name: 'Бренд 2', companyId: '2' },
  { id: '3', name: 'Бренд 3', companyId: '3' }
];

const MOCK_BANK_ACCOUNTS = [
  { id: '1', name: 'Счет Сбербанк', companyId: '1' },
  { id: '2', name: 'Счет Тинькофф', companyId: '2' },
  { id: '3', name: 'Счет ВТБ', companyId: '3' }
];

const DocumentCreate: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'client' | 'company' | 'products' | 'delivery'>('client');
  const [docType, setDocType] = useState<string>('Продажа');
  
  // Client form
  const [orderNumber, setOrderNumber] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');
  const [clientParentName, setClientParentName] = useState<string>('');
  const [clientAddress, setClientAddress] = useState<string>('');
  const [validityDays, setValidityDays] = useState<number>(1);
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [deliveryAddress, setDeliveryAddress] = useState<string>('');
  const [passportSeries, setPassportSeries] = useState<string>('');
  const [passportNumber, setPassportNumber] = useState<string>('');
  const [passportIssued, setPassportIssued] = useState<string>('');
  const [passportDate, setPassportDate] = useState<string>('');
  
  // Company form
  const [selectedCompany, setSelectedCompany] = useState<string>('');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedBankAccount, setSelectedBankAccount] = useState<string>('');
  
  // Products form
  const [products, setProducts] = useState<Array<{
    id: string;
    name: string;
    unit: string;
    price: number;
    quantity: number;
    totalPrice: number;
    hasImage: boolean;
  }>>([]);
  const [productName, setProductName] = useState<string>('');
  const [productUnit, setProductUnit] = useState<string>('');
  const [productPrice, setProductPrice] = useState<number>(0);
  const [productQuantity, setProductQuantity] = useState<number>(1);
  const [productHasImage, setProductHasImage] = useState<boolean>(false);
  
  // Delivery form
  const [includeDelivery, setIncludeDelivery] = useState<boolean>(false);
  const [deliveryDays, setDeliveryDays] = useState<number>(1);
  const [deliveryName, setDeliveryName] = useState<string>('');
  const [deliveryPrice, setDeliveryPrice] = useState<number>(0);
  const [deliveryQuantity, setDeliveryQuantity] = useState<number>(1);
  
  const filteredBrands = MOCK_BRANDS.filter(brand => !selectedCompany || brand.companyId === selectedCompany);
  const filteredBankAccounts = MOCK_BANK_ACCOUNTS.filter(account => !selectedCompany || account.companyId === selectedCompany);
  
  const handleAddProduct = () => {
    if (!productName || !productUnit) {
      toast.error('Заполните все поля товара');
      return;
    }
    
    setProducts([
      ...products, 
      {
        id: Date.now().toString(),
        name: productName,
        unit: productUnit,
        price: productPrice,
        quantity: productQuantity,
        totalPrice: productPrice * productQuantity,
        hasImage: productHasImage
      }
    ]);
    
    // Reset form
    setProductName('');
    setProductUnit('');
    setProductPrice(0);
    setProductQuantity(1);
    setProductHasImage(false);
  };
  
  const handleRemoveProduct = (id: string) => {
    setProducts(products.filter(product => product.id !== id));
  };
  
  const handleSubmit = () => {
    // Validate required fields
    if (!orderNumber || !clientName || !selectedCompany || !selectedBrand || !selectedBankAccount) {
      toast.error('Заполните все обязательные поля');
      return;
    }
    
    if (products.length === 0) {
      toast.error('Добавьте хотя бы один товар');
      return;
    }
    
    // Here you would submit the form data to your backend
    console.log({
      docType,
      orderNumber,
      clientName,
      clientParentName,
      clientAddress,
      validityDays,
      email,
      phone,
      deliveryAddress,
      passportSeries,
      passportNumber,
      passportIssued,
      passportDate,
      companyId: selectedCompany,
      brandId: selectedBrand,
      bankAccountId: selectedBankAccount,
      products,
      delivery: {
        enabled: includeDelivery,
        daysCount: deliveryDays,
        name: deliveryName,
        price: deliveryPrice,
        quantity: deliveryQuantity,
        totalPrice: deliveryPrice * deliveryQuantity
      }
    });
    
    toast.success('Документ успешно создан');
    navigate('/dashboard');
  };
  
  const handleClose = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto p-4 max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold">Заполните форму</h1>
          <button 
            onClick={handleClose}
            className="btn-secondary"
          >
            Закрыть
          </button>
        </div>
        
        <div className="bg-secondary rounded-lg p-4 mb-6">
          <div className="form-group">
            <label htmlFor="docType" className="form-label">Тип документа</label>
            <select
              id="docType"
              value={docType}
              onChange={(e) => setDocType(e.target.value)}
              className="bg-input"
            >
              <option value="Продажа">Продажа</option>
              <option value="Счет">Счет</option>
              <option value="Договор">Договор</option>
            </select>
          </div>
        </div>
        
        <div className="bg-secondary rounded-lg overflow-hidden mb-6">
          <div className="flex border-b border-border">
            <button
              className={`py-3 px-6 text-sm font-medium ${activeTab === 'client' ? 'tab-active' : 'tab-inactive'}`}
              onClick={() => setActiveTab('client')}
            >
              Клиент
            </button>
            <button
              className={`py-3 px-6 text-sm font-medium ${activeTab === 'company' ? 'tab-active' : 'tab-inactive'}`}
              onClick={() => setActiveTab('company')}
            >
              Фирма
            </button>
            <button
              className={`py-3 px-6 text-sm font-medium ${activeTab === 'products' ? 'tab-active' : 'tab-inactive'}`}
              onClick={() => setActiveTab('products')}
            >
              Товары
            </button>
            <button
              className={`py-3 px-6 text-sm font-medium ${activeTab === 'delivery' ? 'tab-active' : 'tab-inactive'}`}
              onClick={() => setActiveTab('delivery')}
            >
              Доставка
            </button>
          </div>
          
          <div className="p-4">
            {/* Client Tab */}
            {activeTab === 'client' && (
              <div className="space-y-4 animate-fade-in">
                <div className="form-group">
                  <label htmlFor="orderNumber" className="form-label">Ордер *</label>
                  <input
                    id="orderNumber"
                    type="text"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    placeholder="Ордер *"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="clientName" className="form-label">ФИО клиента (именительный) *</label>
                  <input
                    id="clientName"
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="ФИО клиента (именительный) *"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="clientParentName" className="form-label">ФИО клиента (родительный) *</label>
                  <input
                    id="clientParentName"
                    type="text"
                    value={clientParentName}
                    onChange={(e) => setClientParentName(e.target.value)}
                    placeholder="ФИО клиента (родительный) *"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="clientAddress" className="form-label">Адрес заказчика</label>
                  <input
                    id="clientAddress"
                    type="text"
                    value={clientAddress}
                    onChange={(e) => setClientAddress(e.target.value)}
                    placeholder="Адрес заказчика"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="validityDays" className="form-label">Счет действителен в течении (в днях)</label>
                  <input
                    id="validityDays"
                    type="number"
                    min="1"
                    value={validityDays}
                    onChange={(e) => setValidityDays(parseInt(e.target.value))}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">Телефон</label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Телефон"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="deliveryAddress" className="form-label">Адрес доставки</label>
                  <input
                    id="deliveryAddress"
                    type="text"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Адрес доставки"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="passportSeries" className="form-label">Серия паспорта</label>
                  <input
                    id="passportSeries"
                    type="text"
                    value={passportSeries}
                    onChange={(e) => setPassportSeries(e.target.value)}
                    placeholder="Серия паспорта"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="passportNumber" className="form-label">Номер паспорта</label>
                  <input
                    id="passportNumber"
                    type="text"
                    value={passportNumber}
                    onChange={(e) => setPassportNumber(e.target.value)}
                    placeholder="Номер паспорта"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="passportIssued" className="form-label">Паспорт выдан</label>
                  <input
                    id="passportIssued"
                    type="text"
                    value={passportIssued}
                    onChange={(e) => setPassportIssued(e.target.value)}
                    placeholder="Паспорт выдан"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="passportDate" className="form-label">Дата выдачи паспорта</label>
                  <input
                    id="passportDate"
                    type="date"
                    value={passportDate}
                    onChange={(e) => setPassportDate(e.target.value)}
                  />
                </div>
              </div>
            )}
            
            {/* Company Tab */}
            {activeTab === 'company' && (
              <div className="space-y-4 animate-fade-in">
                <div className="form-group">
                  <label htmlFor="company" className="form-label">Выберите фирму *</label>
                  <select
                    id="company"
                    value={selectedCompany}
                    onChange={(e) => {
                      setSelectedCompany(e.target.value);
                      setSelectedBrand('');
                      setSelectedBankAccount('');
                    }}
                    className="bg-input"
                    required
                  >
                    <option value="">Выберите фирму</option>
                    {MOCK_COMPANIES.map(company => (
                      <option key={company.id} value={company.id}>
                        {company.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="brand" className="form-label">Выберите бренд *</label>
                  <select
                    id="brand"
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="bg-input"
                    disabled={!selectedCompany}
                    required
                  >
                    <option value="">Выберите бренд</option>
                    {filteredBrands.map(brand => (
                      <option key={brand.id} value={brand.id}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="bankAccount" className="form-label">Выберите банковский счет *</label>
                  <select
                    id="bankAccount"
                    value={selectedBankAccount}
                    onChange={(e) => setSelectedBankAccount(e.target.value)}
                    className="bg-input"
                    disabled={!selectedCompany}
                    required
                  >
                    <option value="">Выберите банк</option>
                    {filteredBankAccounts.map(account => (
                      <option key={account.id} value={account.id}>
                        {account.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
            
            {/* Products Tab */}
            {activeTab === 'products' && (
              <div className="animate-fade-in">
                <div className="space-y-4 mb-6">
                  <div className="form-group">
                    <label htmlFor="productName" className="form-label">Наименование</label>
                    <input
                      id="productName"
                      type="text"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="productUnit" className="form-label">Единицы измерения</label>
                    <input
                      id="productUnit"
                      type="text"
                      value={productUnit}
                      onChange={(e) => setProductUnit(e.target.value)}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="productPrice" className="form-label">Цена</label>
                    <input
                      id="productPrice"
                      type="number"
                      min="0"
                      value={productPrice}
                      onChange={(e) => setProductPrice(parseFloat(e.target.value))}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="productQuantity" className="form-label">Количество</label>
                    <input
                      id="productQuantity"
                      type="number"
                      min="1"
                      value={productQuantity}
                      onChange={(e) => setProductQuantity(parseInt(e.target.value))}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="productTotalPrice" className="form-label">Общая цена</label>
                    <input
                      id="productTotalPrice"
                      type="number"
                      value={productPrice * productQuantity}
                      readOnly
                    />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="productHasImage"
                      checked={productHasImage}
                      onChange={(e) => setProductHasImage(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <label htmlFor="productHasImage" className="text-sm">
                      Есть изображение
                    </label>
                  </div>
                </div>
                
                <button 
                  className="bg-primary text-primary-foreground px-4 py-2 rounded flex items-center gap-2 text-sm"
                  onClick={handleAddProduct}
                >
                  <Plus size={16} />
                  <span>Добавить товар</span>
                </button>
                
                {products.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-3">Добавленные товары</h3>
                    <ul className="divide-y divide-border">
                      {products.map(product => (
                        <li key={product.id} className="py-3 flex justify-between items-center">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{product.name}</span>
                              {product.hasImage && <Image size={16} className="text-muted-foreground" />}
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {product.quantity} {product.unit} × {product.price} = {product.totalPrice}
                            </span>
                          </div>
                          <button
                            onClick={() => handleRemoveProduct(product.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <X size={18} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
            
            {/* Delivery Tab */}
            {activeTab === 'delivery' && (
              <div className="animate-fade-in">
                <div className="form-group flex items-center gap-2 mb-6">
                  <input
                    type="checkbox"
                    id="includeDelivery"
                    checked={includeDelivery}
                    onChange={(e) => setIncludeDelivery(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <label htmlFor="includeDelivery" className="text-base">
                    Добавить доставку?
                  </label>
                </div>
                
                {includeDelivery && (
                  <div className="space-y-4">
                    <div className="form-group">
                      <label htmlFor="deliveryDays" className="form-label">Срок в днях</label>
                      <input
                        id="deliveryDays"
                        type="number"
                        min="1"
                        value={deliveryDays}
                        onChange={(e) => setDeliveryDays(parseInt(e.target.value))}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="deliveryName" className="form-label">Наименование</label>
                      <input
                        id="deliveryName"
                        type="text"
                        value={deliveryName}
                        onChange={(e) => setDeliveryName(e.target.value)}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="deliveryPrice" className="form-label">Стоимость</label>
                      <input
                        id="deliveryPrice"
                        type="number"
                        min="0"
                        value={deliveryPrice}
                        onChange={(e) => setDeliveryPrice(parseFloat(e.target.value))}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="deliveryQuantity" className="form-label">Кол-во</label>
                      <input
                        id="deliveryQuantity"
                        type="number"
                        min="1"
                        value={deliveryQuantity}
                        onChange={(e) => setDeliveryQuantity(parseInt(e.target.value))}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="deliveryTotalPrice" className="form-label">Общая стоимость</label>
                      <input
                        id="deliveryTotalPrice"
                        type="number"
                        value={deliveryPrice * deliveryQuantity}
                        readOnly
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-primary text-primary-foreground py-4 px-6 rounded-lg">
          <button 
            className="w-full text-center font-medium text-base"
            onClick={handleSubmit}
          >
            Сформировать
          </button>
        </div>
      </main>
    </div>
  );
};

export default DocumentCreate;
