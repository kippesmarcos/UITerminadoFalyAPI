import express from 'express';
import cors from 'cors';
import { MercadoPagoConfig, Preference } from 'mercadopago';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Configura MercadoPago con la clave privada (ACCESS TOKEN)
const client = new MercadoPagoConfig({ 
  accessToken: 'APP_USR-4981339200660192-120304-f7e28b9d609558123f79bb7301c798db-2135256600' 
});

app.post('/api/create-preference', async (req, res) => {
  try {
    const { items, payer, back_urls, auto_return } = req.body;

    // Validación básica
    if (!items?.length || !payer) {
      return res.status(400).json({ 
        error: 'Invalid request: missing required fields' 
      });
    }

    // Validar que los precios sean números válidos
    const validItems = items.map(item => ({
      ...item,
      unit_price: Number(item.unit_price)
    }));

    const preference = new Preference(client);
    const result = await preference.create({
      body: {
        items: validItems,
        payer,
        back_urls,
        auto_return,
        statement_descriptor: "Faly",
        payment_methods: {
          excluded_payment_types: [
            { id: "ticket" }
          ],
          installments: 12
        }
      }
    });

    if (!result?.id) {
      throw new Error('Failed to create preference: No ID received');
    }

    res.json({ id: result.id });
  } catch (error) {
    console.error('Error creating preference:', error);
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to create preference'
    });
  }
});

const PORT = process.env.PORT || 3000;

// Manejo de errores global
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}).on('error', (err) => {
  console.error('Failed to start server:', err);
});