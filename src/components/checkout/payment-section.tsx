import { motion } from 'framer-motion';
import { CreditCard } from 'lucide-react';
import { MercadoPagoButton } from './MercadoPagoButton';
import { useExchangeRate } from '@/hooks/useExchangeRate';

interface PaymentSectionProps {
  onSubmit?: (e: React.FormEvent) => void;
  isProcessing: boolean;
  setIsProcessing: (value: boolean) => void;
  total: number;
}

export function PaymentSection({
  isProcessing,
  setIsProcessing,
  total
}: PaymentSectionProps) {
  const { rate, isLoading } = useExchangeRate();
  const arsTotal = rate ? total * rate : null;

  return (
    <div>
      <h2 className="text-xl font-semibold text-beige-100 mb-4">Método de pago</h2>
      <div className="bg-beige-900/30 rounded-lg p-6 border border-[#3B3B3B]">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-beige-900/30 rounded-lg p-6 flex items-center justify-center transition-all border border-[#3B3B3B] hover:border-[#4B4B4B] mb-6"
        >
          <img
            src="/images/payments/mercadopago.svg"
            alt="Mercado Pago"
            className="h-12 w-auto"
          />
        </motion.div>

        <div className="text-center">
          <div className="mb-6">
            {isLoading ? (
              <div className="animate-pulse">
                <div className="h-8 bg-beige-900/50 rounded mb-2"></div>
                <div className="h-5 bg-beige-900/50 rounded w-3/4 mx-auto"></div>
              </div>
            ) : (
              <>
                <p className="text-beige-100 text-2xl font-bold mb-1">
                  {arsTotal ? `ARS $${arsTotal.toLocaleString('es-AR', { minimumFractionDigits: 2 })}` : 'Cargando...'}
                </p>
                <p className="text-beige-400 text-sm">
                  USD ${total.toFixed(2)}
                </p>
              </>
            )}
          </div>
          <div className="flex justify-center">
            <div className="w-full">
              <MercadoPagoButton 
                isProcessing={isProcessing}
                setIsProcessing={setIsProcessing}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}