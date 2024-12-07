import { useState } from 'react';
import { Header } from '../components/Header';
import { motion } from 'framer-motion';
import { Zap, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { keys } from '../data/keys';
import { useCart } from '../context/CartContext';
import { SnowParticles } from '@/components/SnowParticles';
import { MinecraftProductCard } from '@/components/minecraft/MinecraftProductCard';

export function KeysPage() {
  const { addItem } = useCart();

  const handleAddToCart = (key: typeof keys[0]) => {
    addItem({
      id: key.id,
      name: key.name,
      price: key.price,
      type: 'key',
      durationType: 'permanent',
      icon: key.icon,
      color: key.color,
      quantity: 1
    });
  };

  return (
    <div className="min-h-screen">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="fixed inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url('/images/background/minecraft-castle.jpg')`
        }}
      />
      
      <div className="fixed inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />

      <SnowParticles />
      <Header />

      <div className="relative z-20 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Volver al inicio
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Zap className="w-8 h-8 text-white" />
              <h1 className="text-4xl font-bold text-white">Perk Keys</h1>
            </div>
            <p className="text-white/80">Activa beneficios y poderes temporales</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keys.map((key) => (
              <MinecraftProductCard
                key={key.id}
                name={key.name}
                description={key.description}
                price={key.price}
                icon={key.icon}
                color={key.color}
                features={key.features}
                onAddToCart={() => handleAddToCart(key)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}