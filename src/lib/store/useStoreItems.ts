import { useCallback } from 'react';
import { ranks } from '@/data/ranks';
import { kits } from '@/data/kits';
import { keys } from '@/data/keys';
import { tokens } from '@/data/tokens';

export function useStoreItems() {
  const getItems = useCallback((type: 'ranks' | 'kits' | 'keys' | 'tokens') => {
    switch (type) {
      case 'ranks':
        return ranks;
      case 'kits':
        return kits;
      case 'keys':
        return keys;
      case 'tokens':
        return tokens;
      default:
        return [];
    }
  }, []);

  return { getItems };
}