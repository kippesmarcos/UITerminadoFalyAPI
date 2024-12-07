import { memo } from 'react';
import { motion } from 'framer-motion';
import { MinecraftProductCard } from '../minecraft/MinecraftProductCard';

interface StoreGridProps {
  items: any[];
  onItemClick: (item: any) => void;
  durationType?: 'permanent' | 'monthly';
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.2 } }
};

export const StoreGrid = memo(function StoreGrid({ 
  items, 
  onItemClick,
  durationType 
}: StoreGridProps) {
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {items.map((storeItem) => (
        <motion.div key={storeItem.id} variants={item}>
          <MinecraftProductCard
            name={storeItem.name}
            description={storeItem.description}
            price={storeItem.price}
            icon={storeItem.icon}
            color={storeItem.color}
            features={storeItem.features}
            durationType={durationType}
            onAddToCart={() => onItemClick(storeItem)}
          />
        </motion.div>
      ))}
    </motion.div>
  );
});