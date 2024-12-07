import { motion } from 'framer-motion';
import { useExchangeRate } from '@/hooks/useExchangeRate';
import { Loader2 } from 'lucide-react';

interface PriceDisplayProps {
  usdPrice: number;
  className?: string;
}

export function PriceDisplay({ usdPrice, className = "" }: PriceDisplayProps) {
  const { rate, isLoading, error } = useExchangeRate();

  if (isLoading) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Loader2 className="w-4 h-4 animate-spin text-beige-400" />
        <span className="text-beige-400">Cargando precio...</span>
      </div>
    );
  }

  if (error || !rate) {
    return (
      <div className="text-red-400 text-sm">
        Error al cargar el precio
      </div>
    );
  }

  const arsPrice = usdPrice * rate;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={className}
    >
      <div className="text-xl font-bold text-beige-100">
        ARS ${arsPrice.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
      </div>
      <div className="text-sm text-beige-400">
        USD ${usdPrice.toFixed(2)}
      </div>
    </motion.div>
  );
}