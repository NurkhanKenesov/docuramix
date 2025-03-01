
export type UserRole = 'manager' | 'accountant' | 'admin';

export interface User {
  id: string;
  username: string;
  role: UserRole;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface Company {
  id: string;
  name: string;
  inn: string;
  address: string;
  director: string;
  accountant: string;
}

export interface Brand {
  id: string;
  name: string;
  companyId: string;
}

export interface BankAccount {
  id: string;
  companyId: string;
  accountNumber: string;
  bankName: string;
  bik: string;
  correspondentAccount: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  description: string;
  image?: string;
  brandId: string;
}

export interface DeliveryInfo {
  address: string;
  contactPerson: string;
  phone: string;
  email: string;
}

export interface DocumentVersion {
  id: string;
  documentId: string;
  version: number;
  createdAt: string;
  createdBy: string;
  data: any;
}

export interface Document {
  id: string;
  title: string;
  type: 'invoice' | 'contract' | 'act' | 'other';
  companyId: string;
  brandId: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  status: 'draft' | 'active' | 'archived';
  products: Product[];
  deliveryInfo?: DeliveryInfo;
  bankAccountId?: string;
  customDate?: string;
  currentVersionId: string;
  versions: DocumentVersion[];
}
