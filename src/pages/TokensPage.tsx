import { useState } from 'react';
import { Header } from '@/components/Header';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { tokens } from '@/data/tokens';
import { useCart } from '@/context/CartContext';
import { SnowParticles } from '@/components/SnowParticles';
import { TokensHeader } from '@/components/tokens/TokensHeader';
import { SpecialOfferBanner } from '@/components/tokens/SpecialOfferBanner';
import { MinecraftProductCard } from '@/components/minecraft/MinecraftProductCard';
import { motion } from 'framer-motion';

export function TokensPage() {
  const { addItem } = useCart();

  const handleAddToCart = (token: typeof tokens[0]) => {
    addItem({
      id: `${token.id}-${token.prices[0].amount}`,
      name: `${token.name} x${token.prices[0].amount}`,
      price: token.prices[0].price,
      type: 'token',
      durationType: 'permanent',
      icon: token.icon,
      color: token.color,
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
        <div className="max-w-6xl mx-auto px-4">
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Volver al inicio
          </Link>

          <TokensHeader />
          <SpecialOfferBanner />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tokens.map((token) => (
              <MinecraftProductCard
                key={token.id}
                name={token.name}
                description={token.description}
                price={token.prices[0].price}
                icon={token.icon}
                color={token.color}
                features={[
                  `${token.prices[0].amount} tokens`,
                  `Precio original: $${token.prices[0].originalPrice}`,
                  'Uso inmediato en el servidor'
                ]}
                onAddToCart={() => handleAddToCart(token)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}