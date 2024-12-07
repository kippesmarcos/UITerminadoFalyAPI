import { useState, useEffect } from 'react';
import { getDollarBlueRate } from '@/lib/api/exchange-rate';

export function useExchangeRate() {
  const [rate, setRate] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRate = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const currentRate = await getDollarBlueRate();
        setRate(currentRate);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch exchange rate');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRate();
    
    // Update rate every 5 minutes
    const interval = setInterval(fetchRate, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return { rate, isLoading, error };
}