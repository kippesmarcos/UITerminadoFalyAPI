import { motion } from 'framer-motion';
import { X, Zap } from 'lucide-react';

interface MinecraftFeaturesModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  icon: string;
  color: string;
  features: string[];
}

export function MinecraftFeaturesModal({
  isOpen,
  onClose,
  name,
  icon,
  color,
  features
}: MinecraftFeaturesModalProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-3"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-md mx-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Border layers */}
        <div className="absolute inset-0 bg-[#3B3B3B] rounded-lg transform scale-[1.02]" />
        <div className="absolute inset-0 bg-[#262626] rounded-lg transform scale-[1.01]" />
        
        {/* Main content */}
        <div className="relative bg-[#1D1D1D] rounded-lg overflow-hidden border-2 border-[#3B3B3B]">
          {/* Header */}
          <div className="p-3 sm:p-4 border-b border-[#3B3B3B] bg-black/30">
            <button
              onClick={onClose}
              className="absolute right-2 top-2 p-1.5 text-white/80 hover:text-white transition-colors"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center bg-black/30 border border-[#3B3B3B]">
                {typeof icon === 'string' && icon.startsWith('data:image') ? (
                  <div
                    className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                    dangerouslySetInnerHTML={{ __html: decodeURIComponent(icon.split(',')[1]) }}
                  />
                ) : (
                  <img 
                    src={icon} 
                    alt={name} 
                    className="w-6 h-6 sm:w-8 sm:h-8 object-contain filter brightness-0 invert"
                  />
                )}
              </div>
              <h3 className="font-minecraft text-base sm:text-lg" style={{ color }}>
                {name}
              </h3>
            </div>
          </div>

          {/* Features list */}
          <div className="p-3 sm:p-4">
            <h4 className="text-sm sm:text-base font-minecraft text-white mb-3">Características</h4>
            <div className="space-y-2">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-2 bg-black/30 p-2 sm:p-3 rounded-lg border border-[#3B3B3B]"
                >
                  <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 flex-shrink-0" />
                  <span className="text-white text-xs sm:text-sm font-minecraft">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}