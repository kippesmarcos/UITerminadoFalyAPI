import { Sanction } from '@/types/sanction';

export const sanctions: Sanction[] = [
  {
    id: 'unbanned',
    name: 'Unbanned Tag',
    description: 'Remueve tu baneo del servidor',
    price: 9.99,
    icon: `data:image/svg+xml,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
        <path d="M15 9l-6 6"/>
        <path d="M9 9l6 6"/>
      </svg>
    `)}`,
    color: '#FF6B6B',
    features: [
      'Remueve el baneo inmediatamente',
      'Acceso completo al servidor',
      'Historial limpio',
      'Sin tiempo de espera'
    ]
  },
  {
    id: 'unblacklisted',
    name: 'Unblacklisted Tag',
    description: 'Remueve tu blacklist del servidor',
    price: 19.99,
    icon: `data:image/svg+xml,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="M15 9l-6 6"/>
        <path d="M9 9l6 6"/>
      </svg>
    `)}`,
    color: '#FFD700',
    features: [
      'Remueve la blacklist inmediatamente',
      'Acceso completo al servidor',
      'Historial limpio',
      'Sin tiempo de espera',
      'Incluye unban'
    ]
  }
];