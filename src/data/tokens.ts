export const tokens = [
  {
    id: 'base-token',
    name: 'Base Token',
    description: 'Token básico para el servidor',
    prices: [
      { amount: 1, price: 6.50, originalPrice: 10 }
    ],
    icon: '/images/tokens/base.svg',
    color: '#ff9d00'
  },
  {
    id: 'falltrap-token',
    name: 'Falltrap Token',
    description: 'Token especial para trampas de caída',
    prices: [
      { amount: 1, price: 6.50, originalPrice: 15 },
    ],
    icon: '/images/tokens/falltrap.svg',
    color: '#00ff9d'
  }
];