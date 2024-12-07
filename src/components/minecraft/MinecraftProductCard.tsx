import { motion } from 'framer-motion';
import { Zap, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { MinecraftFeaturesModal } from './MinecraftFeaturesModal';
import { cn } from '@/lib/utils';
import { useDualPrice } from '@/lib/currency';

interface MinecraftProductCardProps {
  name: string;
  description?: string;
  price: number | { permanent: number; monthly: number };
  icon: string;
  color: string;
  features: string[];
  durationType?: 'permanent' | 'monthly';
  onAddToCart: () => void;
}

export function MinecraftProductCard({
  name,
  description,
  price,
  icon,
  color,
  features,
  durationType,
  onAddToCart
}: MinecraftProductCardProps) {
  const [showFeatures, setShowFeatures] = useState(false);
  const displayPrice = typeof price === 'number' ? price : price[durationType || 'permanent'];
  const { usd, ars } = useDualPrice(displayPrice);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-[#3B3B3B] rounded-lg transform scale-[1.02]" />
        <div className="absolute inset-0 bg-[#262626] rounded-lg transform scale-[1.01]" />
        
        <div className="relative bg-[#1D1D1D] rounded-lg overflow-hidden border-2 border-[#3B3B3B]">
          <div className="p-2 sm:p-3 border-b border-[#3B3B3B] bg-black/30">
            <div className="flex items-center gap-2">
              <div 
                className={cn(
                  "w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center",
                  "bg-black/30 border border-[#3B3B3B]"
                )}
              >
                {typeof icon === 'string' && icon.startsWith('data:image') ? (
                  <div
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    dangerouslySetInnerHTML={{ __html: decodeURIComponent(icon.split(',')[1]) }}
                  />
                ) : (
                  <img 
                    src={icon} 
                    alt={name} 
                    className="w-5 h-5 sm:w-6 sm:h-6 object-contain filter brightness-0 invert"
                  />
                )}
              </div>
              <div>
                <h3 className="font-minecraft text-sm sm:text-base" style={{ color }}>
                  {name}
                </h3>
                {description && (
                  <p className="text-xs text-[#A8B9A8] line-clamp-1">{description}</p>
                )}
              </div>
            </div>
          </div>

          <div className="p-2 sm:p-3 space-y-2 sm:space-y-3">
            <button 
              onClick={() => setShowFeatures(true)}
              className="w-full bg-black/30 hover:bg-black/40 rounded-lg p-2 transition-colors border border-[#3B3B3B]"
            >
              <h4 className="font-minecraft text-[#A8B9A8] text-xs mb-2">CARACTERÍSTICAS</h4>
              <ul className="space-y-1.5">
                {features.slice(0, 2).map((feature, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <Zap className="w-3 h-3 text-yellow-500 flex-shrink-0" />
                    <span className="text-white text-xs font-minecraft text-left line-clamp-1">{feature}</span>
                  </li>
                ))}
                {features.length > 2 && (
                  <li className="text-center text-[#A8B9A8] text-xs mt-1 font-minecraft">
                    VER MÁS...
                  </li>
                )}
              </ul>
            </button>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[#A8B9A8] text-xs font-minecraft">PRECIO</span>
                <div className="text-right">
                  <div className="text-base sm:text-lg font-minecraft text-yellow-500">
                    {ars}
                  </div>
                  <div className="text-xs text-[#A8B9A8]">
                    {usd}
                    {durationType === 'monthly' && <span className="ml-1">/mes</span>}
                  </div>
                </div>
              </div>

              <button
                onClick={onAddToCart}
                className="w-full py-2 bg-black/30 hover:bg-black/50 text-white font-minecraft rounded-lg flex items-center justify-center gap-2 transition-colors border border-[#3B3B3B] text-xs"
              >
                <ShoppingCart className="w-3 h-3" />
                AGREGAR AL CARRITO
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <MinecraftFeaturesModal
        isOpen={showFeatures}
        onClose={() => setShowFeatures(false)}
        name={name}
        icon={icon}
        color={color}
        features={features}
      />
    </>
  );
}