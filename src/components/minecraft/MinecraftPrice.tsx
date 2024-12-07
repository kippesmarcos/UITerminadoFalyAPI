import { ShoppingCart } from 'lucide-react';
import { MinecraftButton } from './MinecraftButton';
import { useDualPrice } from '@/lib/currency';

interface MinecraftPriceProps {
  price: number;
  durationType?: 'permanent' | 'monthly';
  onAddToCart: () => void;
}

export function MinecraftPrice({ price, durationType, onAddToCart }: MinecraftPriceProps) {
  const { usd, ars } = useDualPrice(price);

  return (
    <div className="minecraft-btn p-4">
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-400 font-minecraft">PRECIO</span>
        <div className="text-right">
          <div className="text-2xl font-minecraft text-yellow-500">
            {ars}
          </div>
          <div className="text-sm text-gray-400 font-minecraft">
            {usd}
            {durationType === 'monthly' && <span className="ml-1">/mes</span>}
          </div>
        </div>
      </div>

      <MinecraftButton fullWidth onClick={onAddToCart}>
        <ShoppingCart className="w-4 h-4" />
        AGREGAR AL CARRITO
      </MinecraftButton>
    </div>
  );
}