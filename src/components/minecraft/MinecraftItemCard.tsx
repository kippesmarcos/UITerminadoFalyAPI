import { motion } from 'framer-motion';
import { Zap, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { MinecraftFeaturesModal } from './MinecraftFeaturesModal';

interface MinecraftItemCardProps {
  name: string;
  description?: string;
  price: number | { permanent: number; monthly: number };
  icon: string;
  color: string;
  features: string[];
  durationType?: 'permanent' | 'monthly';
  onClick: () => void;
}

export function MinecraftItemCard({
  name,
  description,
  price,
  icon,
  color,
  features,
  durationType,
  onClick
}: MinecraftItemCardProps) {
  const [showFeatures, setShowFeatures] = useState(false);
  const displayPrice = typeof price === 'number' ? price : price[durationType || 'permanent'];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-[#1D2B1D]/90 rounded-lg overflow-hidden border-2 border-[#2A3A2A] backdrop-blur-sm"
      >
        <div className="p-4 border-b border-[#2A3A2A]">
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded flex items-center justify-center"
              style={{ backgroundColor: `${color}20` }}
            >
              {typeof icon === 'string' && icon.startsWith('data:image') ? (
                <div
                  className="w-8 h-8 text-white"
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
            <div>
              <h3 className="font-minecraft text-lg" style={{ color }}>
                {name}
              </h3>
              {description && (
                <p className="text-sm text-[#A8B9A8] font-minecraft">{description}</p>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4">
          <button 
            onClick={() => setShowFeatures(true)}
            className="w-full p-4 bg-[#2A3A2A]/80 hover:bg-[#3A4A3A]/80 rounded transition-colors"
          >
            <h4 className="font-minecraft text-[#A8B9A8] text-sm mb-3">CARACTERÍSTICAS</h4>
            <ul className="space-y-2">
              {features.slice(0, 2).map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                  <span className="text-white text-sm font-minecraft">{feature}</span>
                </li>
              ))}
              {features.length > 2 && (
                <li className="text-center text-[#A8B9A8] text-sm mt-2">
                  Ver más características...
                </li>
              )}
            </ul>
          </button>

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
              className="w-full py-3 bg-[#2A3A2A]/80 hover:bg-[#3A4A3A]/80 text-white font-minecraft rounded flex items-center justify-center gap-2 transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
              AGREGAR AL CARRITO
            </button>
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