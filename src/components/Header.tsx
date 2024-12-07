import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CartSheet } from './cart/CartSheet';
import { UserMenu } from './UserMenu';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';

export function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY || currentScrollY < 20) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        lastScrollY > 20 ? 'backdrop-blur-md py-2 sm:py-4' : 'py-4 sm:py-6'
      } transform ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        <nav className="flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 sm:gap-3"
          >
            <Link to="/">
              <img src="/images/logo.jpg" alt="Logo" className="h-8 sm:h-12" />
            </Link>
            <span className="text-beige-100 font-minecraft text-base sm:text-xl hidden sm:block">Faly</span>
          </motion.div>

          <div className="flex items-center gap-2 sm:gap-4">
            <CartSheet />
            {!user ? (
              <Link 
                to="/login"
                className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg transition text-sm sm:text-base hidden sm:block"
              >
                Iniciar sesión
              </Link>
            ) : (
              <UserMenu />
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}