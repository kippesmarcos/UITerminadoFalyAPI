import { Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import type { CartItem as CartItemType } from '@/types/cart';
import { PriceDisplay } from '@/components/price/PriceDisplay';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { removeItem, updateQuantity } = useCart();

  const handleIncreaseQuantity = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeItem(item.id);
    }
  };

  const getItemTypeLabel = (type: string) => {
    switch (type) {
      case 'token':
        return 'Tokens';
      case 'key':
        return 'Keys';
      case 'kit':
        return 'Kit';
      case 'rank':
        return 'Rank';
      default:
        return type;
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{
        layout: { duration: 0.3 },
        opacity: { duration: 0.2 }
      }}
      className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 bg-beige-900/30 rounded-lg p-3"
    >
      <div 
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center bg-black/30 border border-[#3B3B3B] flex-shrink-0"
      >
        {typeof item.icon === 'string' && item.icon.startsWith('data:image') ? (
          <div
            className="w-6 h-6 sm:w-8 sm:h-8 text-white"
            dangerouslySetInnerHTML={{ __html: decodeURIComponent(item.icon.split(',')[1]) }}
          />
        ) : (
          <img 
            src={item.icon} 
            alt={item.name} 
            className="w-6 h-6 sm:w-8 sm:h-8 object-contain filter brightness-0 invert"
          />
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 
          className="font-medium text-sm sm:text-base truncate"
          style={{ color: item.color }}
        >
          {item.name}
        </h3>
        <div className="flex items-center gap-2 text-xs">
          <span 
            className="px-1.5 py-0.5 rounded-full"
            style={{ 
              backgroundColor: `${item.color}20`,
              color: item.color 
            }}
          >
            {getItemTypeLabel(item.type)}
          </span>
          {item.type !== 'key' && item.type !== 'token' && (
            <span className="text-beige-400">
              {item.durationType === 'monthly' ? 'Mensual' : 'Permanente'}
            </span>
          )}
        </div>
      </div>

      <motion.div 
        layout
        className="w-full sm:w-auto flex items-center justify-between sm:flex-col sm:items-end gap-2"
      >
        <motion.div layout className="text-right">
          <PriceDisplay usdPrice={item.price * item.quantity} />
        </motion.div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={handleDecreaseQuantity}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <motion.span 
            layout
            key={item.quantity}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="text-beige-300 text-xs min-w-[16px] text-center"
          >
            {item.quantity}
          </motion.span>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={handleIncreaseQuantity}
          >
            <Plus className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-red-400 hover:text-red-300"
            onClick={() => removeItem(item.id)}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}