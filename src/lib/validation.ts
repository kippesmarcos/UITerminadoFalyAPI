import { z } from 'zod';
import type { FormData } from '@/types/checkout';

// Card validation patterns
const cardPatterns = {
  visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
  mastercard: /^5[1-5][0-9]{14}$|^2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7(?:[01][0-9]|20))[0-9]{12}$/,
  amex: /^3[47][0-9]{13}$/
};

const expiryDateRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
const cvvRegex = /^[0-9]{3,4}$/;

export const paymentSchema = z.object({
  email: z.string().email('Email inválido'),
  cardNumber: z.string()
    .min(13, 'Número de tarjeta inválido')
    .max(19, 'Número de tarjeta inválido')
    .refine((val) => {
      const cleaned = val.replace(/\D/g, '');
      return (
        cardPatterns.visa.test(cleaned) ||
        cardPatterns.mastercard.test(cleaned) ||
        cardPatterns.amex.test(cleaned)
      );
    }, 'Por favor ingresa un número de tarjeta válido (Visa, Mastercard o American Express)')
    .transform(val => val.replace(/\s+/g, '')),
  expiryDate: z.string()
    .regex(expiryDateRegex, 'Formato inválido (MM/YY)')
    .refine((val) => {
      const [month, year] = val.split('/').map(Number);
      const now = new Date();
      const currentYear = now.getFullYear() % 100;
      const currentMonth = now.getMonth() + 1;

      // Allow cards that expire this month
      if (year < currentYear || (year === currentYear && month < currentMonth)) {
        return false;
      }
      
      // Don't allow dates more than 10 years in the future
      if (year > currentYear + 10) {
        return false;
      }

      return true;
    }, 'La fecha de expiración no es válida'),
  cvv: z.string()
    .regex(cvvRegex, 'CVV inválido')
    .refine((val) => {
      const cardNumber = val.replace(/\D/g, '');
      const isAmex = cardNumber.startsWith('34') || cardNumber.startsWith('37');
      return isAmex ? val.length === 4 : val.length === 3;
    }, 'CVV debe tener 3 dígitos (4 para American Express)'),
  name: z.string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre es demasiado largo')
    .regex(/^[a-zA-ZÀ-ÿ\s']+$/, 'El nombre solo puede contener letras y espacios')
});

export const validateForm = (formData: FormData) => {
  try {
    paymentSchema.parse(formData);
    return {};
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.errors.reduce((acc, err) => ({
        ...acc,
        [err.path[0]]: err.message
      }), {});
    }
    return { general: 'Error de validación' };
  }
};

export const formatCardNumber = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  
  // Format based on card type
  if (digits.startsWith('34') || digits.startsWith('37')) {
    // American Express format: xxxx xxxxxx xxxxx
    return digits.replace(/(\d{4})(\d{6})(\d{5})/, '$1 $2 $3');
  } else {
    // Other cards format: xxxx xxxx xxxx xxxx
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
  }
};

export const formatExpiryDate = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  if (digits.length >= 2) {
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
  }
  return digits;
};

export const getCardType = (number: string): string => {
  const cleaned = number.replace(/\D/g, '');
  if (cardPatterns.visa.test(cleaned)) return 'visa';
  if (cardPatterns.mastercard.test(cleaned)) return 'mastercard';
  if (cardPatterns.amex.test(cleaned)) return 'amex';
  return 'unknown';
};