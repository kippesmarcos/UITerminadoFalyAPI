import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Crown, Sword, Key, Coins, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './button';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/ranks', label: 'RANKS', icon: Crown, color: '#FFD700' },
  { href: '/kits', label: 'KITS', icon: Sword, color: '#FF6B6B' },
  { href: '/keys', label: 'KEYS', icon: Key, color: '#4ECDC4' },
  { href: '/tokens', label: 'TOKENS', icon: Coins, color: '#45B7D1' },
];

export function NavMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) setIsOpen(false);
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <div className="relative z-50">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "relative transition-colors",
          isOpen ? "bg-white/10" : "hover:bg-white/10"
        )}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isOpen ? "close" : "menu"}
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? (
              <X className="h-5 w-5 text-beige-100" />
            ) : (
              <Menu className="h-5 w-5 text-beige-300" />
            )}
          </motion.div>
        </AnimatePresence>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, x: 300, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 300, scale: 0.95 }}
              transition={{ 
                type: "spring",
                stiffness: 350,
                damping: 30
              }}
              className="fixed inset-y-0 right-0 w-80 z-50"
            >
              {/* Border layers */}
              <div className="absolute inset-0 bg-[#3B3B3B] rounded-l-lg transform scale-[1.02]" />
              <div className="absolute inset-0 bg-[#262626] rounded-l-lg transform scale-[1.01]" />
              
              <div className="relative h-full bg-[#1D1D1D] flex flex-col rounded-l-lg border-l-2 border-[#3B3B3B]">
                <motion.div 
                  className="p-4 border-b-2 border-[#3B3B3B] bg-black/30"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h2 className="text-xl font-minecraft text-beige-100 text-center">
                    MENÚ
                  </h2>
                </motion.div>

                <div className="flex-1 overflow-y-auto py-4 space-y-2">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    >
                      <Link
                        to={item.href}
                        onClick={() => setIsOpen(false)}
                        className="group flex items-center justify-between mx-4 px-4 py-3 rounded-lg hover:bg-white/5 transition-all relative overflow-hidden"
                      >
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-10 h-10 flex items-center justify-center rounded-lg transition-colors"
                            style={{ backgroundColor: `${item.color}10` }}
                          >
                            <item.icon 
                              className="w-5 h-5 transition-transform group-hover:scale-110 duration-300" 
                              style={{ color: item.color }}
                            />
                          </div>
                          <span className="font-minecraft text-beige-300 group-hover:text-beige-100 transition-colors">
                            {item.label}
                          </span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-beige-400 group-hover:text-beige-100 transition-all transform group-hover:translate-x-1" />
                        
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r"
                          style={{ backgroundColor: `${item.color}05` }}
                          initial={{ x: '-100%' }}
                          whileHover={{ x: 0 }}
                          transition={{ type: "tween" }}
                        />
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <motion.div 
                  className="p-4 border-t-2 border-[#3B3B3B] bg-black/30"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-full py-3 bg-white/5 hover:bg-white/10 text-beige-100 rounded-lg transition-colors font-minecraft text-sm"
                  >
                    CERRAR
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}