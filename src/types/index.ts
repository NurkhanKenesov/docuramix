
export type UserRole = 'manager' | 'accountant' | 'admin';

export interface User {
  id: string;
  username: string;
  role: UserRole;
}

export interface Company {
  id: string;
  name: string;
  type: string;
  inn: string;
  kpp: string;
  ogrn: string;
  address: string;
  chiefAccountant?: string;
  stampImageUrl?: string;
  directorSignatureUrl?: string;
  accountantSignatureUrl?: string;
}

export interface Brand {
  id: string;
  name: string;
  companyId: string;
}

export interface BankAccount {
  id: string;
  name: string;
  accountNumber: string;
  bankName: string;
  bik: string;
  correspondentAccount: string;
  companyId: string;
}

export interface Product {
  id: string;
  name: string;
  unit: string;
  price: number;
  quantity: number;
  totalPrice: number;
  imageUrl?: string;
}

export interface DeliveryInfo {
  enabled: boolean;
  daysCount: number;
  name: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

export interface DocumentVersion {
  id: string;
  versionNumber: number;
  createdAt: Date;
  createdBy: string;
}

export interface Document {
  id: string;
  type: 'sale' | 'invoice' | 'contract' | 'other';
  orderNumber: string;
  clientName: string;
  clientParentName: string;
  clientAddress: string;
  validityDays: number;
  email: string;
  phone: string;
  deliveryAddress: string;
  passportSeries: string;
  passportNumber: string;
  passportIssued: string;
  passportDate: Date;
  companyId: string;
  brandId: string;
  bankAccountId: string;
  products: Product[];
  delivery: DeliveryInfo;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  versions: DocumentVersion[];
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}
