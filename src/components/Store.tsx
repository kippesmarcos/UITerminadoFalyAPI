import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { StaffSection } from './StaffSection';
import { Container } from './ui/container';

export function Store() {
  return (
    <>
      <div id="store" className="bg-black text-beige-100 py-16">
        <Container>
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative bg-[#1D1D1D]/80 backdrop-blur-sm rounded-lg p-8 mb-16 border border-[#3B3B3B]"
            >
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <ShieldCheck className="w-6 h-6 text-beige-400" />
                    <h3 className="text-2xl font-minecraft text-beige-100">PAGOS SEGUROS</h3>
                  </div>
                  <p className="font-minecraft text-beige-300">ACEPTAMOS MERCADO PAGO PARA TU COMODIDAD</p>
                </div>
                
                <div className="flex justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-[#1D1D1D] rounded-lg p-6 transition-all border-2 border-white/20 hover:border-white/40"
                  >
                    <img 
                      src="/images/payments/mercadopago.svg" 
                      alt="Mercado Pago"
                      className="h-12 w-auto"
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </div>
      <StaffSection />
    </>
  );
}