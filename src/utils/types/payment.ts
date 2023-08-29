export interface SaleData {
  requestId: string;
  cardNumber: number;
  acquirerId: string;
  amount: number;
}

export interface VoidData {
  acquirerId: string;
  requestId?: string;
  transactionId?: string;
}

export interface ReverseData {
  acquirerId: string;
  requestId?: string;
  transactionId?: string;
}

export interface SettlementData {
  acquirerId: string;
  totalAmount: number;
  totalTransaction: number;
}

export interface Transaction {
  transactionId: string;
  requestId: string;
  amount: number;
}

export interface BatchUploadData {
  acquirerId: string;
  transactions: Transaction[];
}

export interface RefundData {
  acquirerId: string;
  requestId?: string;
  transactionId?: string;
}

export interface InquiryData {
  acquirerId: string;
  requestId?: string;
  transactionId?: string;
}
