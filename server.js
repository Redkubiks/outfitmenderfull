// server.js
const express = require('express');
const app = express();
const stripe = require('stripe')('TU_WSTAW_TWÓJ_SECRET_KEY'); // <- tu wpisz swój klucz secret
const cors = require('cors');

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'pln',
          product_data: {
            name: 'OutfitMender - wygenerowanie stylowego outfitu',
            description: 'Usługa AI generująca outfit na podstawie ubrań',
          },
          unit_amount: 500,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'http://localhost:3000/success.html',
      cancel_url: 'http://localhost:3000/cancel.html',
    });
    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Serwer działa na http://localhost:3000');
});
