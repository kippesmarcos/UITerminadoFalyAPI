import { useState } from 'react';
import { Wallet } from '@mercadopago/sdk-react';
import { createPreference } from '@/lib/mercadopago';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { Button } from '../ui/button';
import { CreditCard } from 'lucide-react';
import { toast } from 'sonner';
import { useExchangeRate } from '@/hooks/useExchangeRate';

interface MercadoPagoButtonProps {
  isProcessing: boolean;
  setIsProcessing: (value: boolean) => void;
}

export function MercadoPagoButton({ isProcessing, setIsProcessing }: MercadoPagoButtonProps) {
  const [preferenceId, setPreferenceId] = useState<string>('');
  const { user } = useAuth();
  const { cart } = useCart();
  const { rate } = useExchangeRate();

  const handlePayment = async () => {
    if (!user) {
      toast.error('Debes iniciar sesión para realizar el pago');
      return;
    }
    
    if (cart.items.length === 0) {
      toast.error('El carrito está vacío');
      return;
    }

    if (!rate) {
      toast.error('Error al obtener la tasa de cambio. Por favor, intenta nuevamente.');
      return;
    }
    
    setIsProcessing(true);
    try {
      const items = cart.items.map(item => ({
        id: item.id,
        title: item.name,
        quantity: item.quantity,
        unit_price: Number((item.price * rate).toFixed(2)),
        currency_id: 'ARS',
        description: `${item.type.toUpperCase()} - ${
          item.durationType === 'monthly' ? 'Mensual' : 'Permanente'
        } - ${item.name} ${
          item.type === 'token' ? `(${item.quantity} tokens)` : ''
        }`,
        category_id: item.type,
        picture_url: item.icon.startsWith('data:image') ? undefined : item.icon
      }));

      const preferenceId = await createPreference({
        items,
        payer: {
          name: user,
          email: `${user}@faly.com`
        },
        metadata: {
          buyer_username: user,
          items: cart.items.map(item => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            type: item.type
          }))
        }
      });

      setPreferenceId(preferenceId);
    } catch (error) {
      console.error('Error al iniciar el pago:', error);
      toast.error('No se pudo iniciar el pago. Por favor, intenta nuevamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full">
      {preferenceId ? (
        <Wallet 
          initialization={{ preferenceId }}
          customization={{ 
            texts: { valueProp: 'smart_option' },
            visual: {
              buttonBackground: 'black',
              borderRadius: '8px',
              buttonHeight: '48px'
            }
          }}
        />
      ) : (
        <Button
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full h-12 bg-[#009EE3] hover:bg-[#008CCC] text-white font-medium transition-colors flex items-center justify-center gap-2 text-base"
        >
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Procesando...
            </span>
          ) : (
            <>
              <CreditCard className="w-5 h-5" />
              Pagar con Mercado Pago
            </>
          )}
        </Button>
      )}
    </div>
  );
}