import { CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

interface PaymentMethodProps {
  selected: 'card' | 'paypal' | 'mercadopago' | null;
  onSelect: (method: 'card' | 'paypal' | 'mercadopago') => void;
}

export function PaymentMethods({ selected, onSelect }: PaymentMethodProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onSelect('card')}
        className={`p-3 rounded-lg border transition-all flex flex-col items-center gap-2 ${
          selected === 'card'
            ? 'border-beige-400 bg-beige-400/10'
            : 'border-beige-800/30 hover:border-beige-400/50'
        }`}
      >
        <CreditCard className="w-5 h-5 text-beige-400" />
        <span className="text-xs text-beige-100">
          Tarjeta
        </span>
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onSelect('paypal')}
        className={`p-3 rounded-lg border transition-all flex flex-col items-center gap-2 ${
          selected === 'paypal'
            ? 'border-beige-400 bg-beige-400/10'
            : 'border-beige-800/30 hover:border-beige-400/50'
        }`}
      >
        <img
          src="/images/payments/paypal.svg"
          alt="PayPal"
          className="h-8 w-auto filter brightness-0 invert"
        />
        <span className="text-xs text-beige-100">
          PayPal
        </span>
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onSelect('mercadopago')}
        className={`p-3 rounded-lg border transition-all flex flex-col items-center gap-2 ${
          selected === 'mercadopago'
            ? 'border-beige-400 bg-beige-400/10'
            : 'border-beige-800/30 hover:border-beige-400/50'
        }`}
      >
        <img
          src="/images/payments/mercadopago.svg"
          alt="Mercado Pago"
          className="h-12 w-auto"
        />
        <span className="text-xs text-beige-100">
          Mercado Pago
        </span>
      </motion.button>
    </div>
  );
}