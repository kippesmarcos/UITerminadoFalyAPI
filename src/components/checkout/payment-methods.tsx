import { motion } from 'framer-motion';

interface PaymentMethodProps {
  selected: 'mercadopago' | null;
  onSelect: (method: 'mercadopago') => void;
}

export function PaymentMethods({ selected, onSelect }: PaymentMethodProps) {
  return (
    <div className="bg-[#1D1D1D]/80 backdrop-blur-sm rounded-lg p-6 border border-[#3B3B3B]">
      <h3 className="font-minecraft text-xl text-beige-100 mb-4">MÉTODO DE PAGO</h3>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onSelect('mercadopago')}
        className={`w-full p-6 rounded-lg transition-all flex flex-col items-center gap-3 ${
          selected === 'mercadopago'
            ? 'bg-[#009EE3] brightness-110'
            : 'bg-[#009EE3] hover:brightness-110'
        }`}
      >
        <img
          src="/images/payments/mercadopago.svg"
          alt="Mercado Pago"
          className="h-12 w-auto"
        />
      </motion.button>
    </div>
  );
}