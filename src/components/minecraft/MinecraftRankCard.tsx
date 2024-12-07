import { motion } from 'framer-motion';
import { Zap, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MinecraftRankCardProps {
  name: string;
  icon: string;
  color: string;
  features: string[];
  price: number | { permanent: number; monthly: number };
  durationType?: 'permanent' | 'monthly';
  onClick: () => void;
}

export function MinecraftRankCard({
  name,
  icon,
  color,
  features,
  price,
  durationType = 'permanent',
  onClick
}: MinecraftRankCardProps) {
  const displayPrice = typeof price === 'number' ? price : price[durationType];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      <div className="absolute inset-0 bg-[#3B3B3B] rounded-lg transform scale-[1.02]" />
      <div className="absolute inset-0 bg-[#262626] rounded-lg transform scale-[1.01]" />
      
      <div className="relative bg-[#1D1D1D] rounded-lg overflow-hidden border-2 border-[#3B3B3B]">
        {/* Header */}
        <div className="p-4 border-b border-[#3B3B3B] bg-black/30">
          <div className="flex items-center gap-3">
            <div 
              className={cn(
                "w-12 h-12 rounded-lg flex items-center justify-center",
                "bg-black/30 border border-[#3B3B3B]"
              )}
            >
              {typeof icon === 'string' && icon.startsWith('data:image') ? (
                <div
                  className="w-8 h-8"
                  style={{ color }}
                  dangerouslySetInnerHTML={{ __html: decodeURIComponent(icon.split(',')[1]) }}
                />
              ) : (
                <img 
                  src={icon} 
                  alt={name} 
                  className="w-8 h-8 object-contain"
                />
              )}
            </div>
            <h3 className="font-minecraft text-lg" style={{ color }}>
              {name}
            </h3>
          </div>
        </div>

        {/* Features */}
        <div className="p-4 space-y-4">
          <div className="bg-black/30 rounded-lg p-3 border border-[#3B3B3B]">
            <h4 className="font-minecraft text-[#A8B9A8] text-sm mb-3">CARACTERÍSTICAS</h4>
            <ul className="space-y-2">
              {features.slice(0, 3).map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                  <span className="text-white text-sm font-minecraft">{feature}</span>
                </li>
              ))}
              {features.length > 3 && (
                <li className="text-center text-[#A8B9A8] text-sm mt-2 font-minecraft">
                  VER MÁS CARACTERÍSTICAS...
                </li>
              )}
            </ul>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[#A8B9A8] font-minecraft">PRECIO</span>
              <span className="text-xl font-minecraft text-yellow-500">
                ${displayPrice}
                {durationType === 'monthly' && (
                  <span className="text-sm text-[#A8B9A8] ml-1">/mes</span>
                )}
              </span>
            </div>

            <button
              onClick={onClick}
              className="w-full py-3 bg-black/30 hover:bg-black/50 text-white font-minecraft rounded-lg flex items-center justify-center gap-2 transition-colors border border-[#3B3B3B]"
            >
              <ShoppingCart className="w-4 h-4" />
              AGREGAR AL CARRITO
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}