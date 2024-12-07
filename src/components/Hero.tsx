import { ExternalLink, Crown, Sword, Key, Coins, ShieldOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const AnimatedText = lazy(() => import('./AnimatedText').then(mod => ({ default: mod.AnimatedText })));
const SnowParticles = lazy(() => import('./SnowParticles').then(mod => ({ default: mod.SnowParticles })));

const navItems = [
  { href: '/ranks', label: 'RANKS', icon: Crown, color: '#FFD700' },
  { href: '/kits', label: 'KITS', icon: Sword, color: '#FF6B6B' },
  { href: '/keys', label: 'KEYS', icon: Key, color: '#4ECDC4' },
  { href: '/tokens', label: 'TOKENS', icon: Coins, color: '#45B7D1' },
  { href: '/sanctions', label: 'SANCIONES', icon: ShieldOff, color: '#FF4A4A' },
];

export function Hero() {
  return (
    <div className="relative min-h-screen flex items-center">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url('/images/background/minecraft-castle.jpg')`,
          willChange: 'opacity'
        }}
        loading="eager"
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black z-10" />
      
      <Suspense fallback={null}>
        <SnowParticles />
      </Suspense>
      
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 pt-20">
        <h1 className="text-4xl sm:text-7xl font-bold text-white mb-4">
          <Suspense fallback={<div className="h-12" />}>
            <AnimatedText text="Somos" delay={0.1} />
            <br />
            <AnimatedText text="Faly" className="text-white" delay={0.2} />
            <br />
            <AnimatedText text="Somos" delay={0.3} />
            <br />
            <AnimatedText text="HCF" className="text-white" delay={0.4} />
          </Suspense>
        </h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          className="text-lg sm:text-xl text-white mb-8"
        >
          El mejor servidor de Minecraft HardCore Factions.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.3 }}
          className="flex flex-col gap-4"
        >
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="#"
            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition w-full md:w-auto text-sm sm:text-base"
          >
            Conectar al Servidor <ExternalLink className="w-4 h-4" />
          </motion.a>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 sm:gap-4 mt-4">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                to={item.href}
                className="relative group"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-[#3B3B3B] rounded-lg transform scale-[1.02]" />
                  <div className="absolute inset-0 bg-[#262626] rounded-lg transform scale-[1.01]" />
                  <div 
                    className="relative p-2 sm:p-4 rounded-lg border-2 flex flex-col items-center gap-2 sm:gap-3 transition-all backdrop-blur-sm"
                    style={{ 
                      borderColor: `${item.color}50`,
                      backgroundColor: `${item.color}05`
                    }}
                  >
                    <div 
                      className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{ backgroundColor: `${item.color}10` }}
                    >
                      <item.icon 
                        className="w-4 h-4 sm:w-6 sm:h-6"
                        style={{ color: item.color }}
                      />
                    </div>
                    <span className="font-minecraft text-xs sm:text-sm text-beige-100">
                      {item.label}
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="https://discord.gg/nXAN3NSQ"
            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition w-full md:w-auto text-sm sm:text-base"
          >
            Discord <ExternalLink className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}