import { useExchangeRate } from '@/hooks/useExchangeRate';

export function formatUSD(amount: number): string {
  return `USD ${amount.toFixed(2)}`;
}

export function formatARS(amount: number, rate: number): string {
  return `ARS ${(amount * rate).toLocaleString('es-AR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}

export function convertUSDtoARS(usdAmount: number, rate: number): number {
  return usdAmount * rate;
}

export interface DualPrice {
  usd: string;
  ars: string | null;
}

export function useDualPrice(usdAmount: number): DualPrice {
  const { rate } = useExchangeRate();

  return {
    usd: formatUSD(usdAmount),
    ars: rate ? formatARS(usdAmount, rate) : null
  };
}