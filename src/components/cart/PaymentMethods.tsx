import { CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

export function PaymentMethods() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <CreditCard className="w-5 h-5 text-beige-400" />
        <h3 className="font-minecraft text-beige-300">
          MÉTODO DE PAGO ACEPTADO
        </h3>
      </div>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="rounded-lg p-6 flex items-center justify-center transition-all border-2 border-white/20 hover:border-white/40"
      >
        <img
          src="/images/payments/mercadopago.svg"
          alt="Mercado Pago"
          className="h-12 w-auto"
        />
      </motion.div>
    </div>
  );
}