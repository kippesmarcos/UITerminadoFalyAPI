import { initMercadoPago } from '@mercadopago/sdk-react';
import { MERCADOPAGO_CONFIG } from '@/config/mercadopago';

// Ensure PUBLIC_KEY is correctly initialized
if (!MERCADOPAGO_CONFIG.PUBLIC_KEY) {
  console.error('Error: PUBLIC_KEY is not defined in MERCADOPAGO_CONFIG.');
} else {
  initMercadoPago(MERCADOPAGO_CONFIG.PUBLIC_KEY);
  console.log('MercadoPago SDK initialized with PUBLIC_KEY:', MERCADOPAGO_CONFIG.PUBLIC_KEY);
}

import { MERCADOPAGO_CONFIG, MERCADOPAGO_ACCESS_TOKEN } from '@/config/mercadopago';

interface PreferenceItem {
  id: string;
  title: string;
  quantity: number;
  unit_price: number;
  currency_id: string;
  description?: string;
  category_id?: string;
  picture_url?: string;
}

interface CreatePreferenceParams {
  items: PreferenceItem[];
  payer: {
    name: string;
    email: string;
  };
  metadata?: Record<string, any>;
}

export async function createPreference({ items, payer, metadata }: CreatePreferenceParams): Promise<string> {
  try {
    console.log('Creating preference with:', { items, payer, metadata });

    const preference = {
      items: items.map(item => ({
        ...item,
        unit_price: Math.round(item.unit_price * 100) / 100,
      })),
      payer: {
        name: payer.name || 'Unknown Buyer',
        email: payer.email || 'unknown@example.com',
      },
      back_urls: {
        success: `${window.location.origin}/purchase-success`,
        failure: `${window.location.origin}/cart`,
      },
      auto_return: 'approved',
      metadata,
      statement_descriptor: "Faly Store",
      payment_methods: {
        excluded_payment_types: [
          { id: "ticket" }
        ],
        installments: 12
      }
    };

    const response = await fetch(MERCADOPAGO_CONFIG.API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${MERCADOPAGO_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preference),
    });

    const data = await response.json();
    console.log('MercadoPago API response:', data);

    if (!response.ok) {
      throw new Error(`API Error: ${data.message || 'Unknown error'}`);
    }

    return data.id;
  } catch (error) {
    console.error('Error creating preference:', error);
    throw error;
  }
}