export interface FormData {
  email: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  name: string;
}

export interface FormErrors {
  email?: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  name?: string;
}