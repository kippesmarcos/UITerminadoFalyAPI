import { z } from 'zod';

const exchangeRateSchema = z.object({
  blue: z.object({
    value_avg: z.number(),
    value_sell: z.number(),
    value_buy: z.number(),
  }),
});

export type ExchangeRate = z.infer<typeof exchangeRateSchema>;

export async function getDollarBlueRate(): Promise<number> {
  try {
    const response = await fetch('https://api.bluelytics.com.ar/v2/latest');
    const data = await response.json();
    
    const validatedData = exchangeRateSchema.parse(data);
    return validatedData.blue.value_sell;
  } catch (error) {
    console.error('Error fetching dollar blue rate:', error);
    throw new Error('Failed to fetch current dollar rate');
  }
}