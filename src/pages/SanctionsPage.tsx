import { useState } from 'react';
import { Header } from '@/components/Header';
import { motion } from 'framer-motion';
import { ShieldOff, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { sanctions } from '@/data/sanctions';
import { useCart } from '@/context/CartContext';
import { SnowParticles } from '@/components/SnowParticles';
import { MinecraftProductCard } from '@/components/minecraft/MinecraftProductCard';

export function SanctionsPage() {
  const { addItem } = useCart();

  const handleAddToCart = (sanction: typeof sanctions[0]) => {
    addItem({
      id: sanction.id,
      name: sanction.name,
      price: sanction.price,
      type: 'sanction',
      durationType: 'permanent',
      icon: sanction.icon,
      color: sanction.color,
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
              <ShieldOff className="w-8 h-8 text-white" />
              <h1 className="text-4xl font-bold text-white">Sanciones</h1>
            </div>
            <p className="text-white/80">Remueve tus sanciones del servidor</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sanctions.map((sanction) => (
              <MinecraftProductCard
                key={sanction.id}
                name={sanction.name}
                description={sanction.description}
                price={sanction.price}
                icon={sanction.icon}
                color={sanction.color}
                features={sanction.features}
                onAddToCart={() => handleAddToCart(sanction)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}