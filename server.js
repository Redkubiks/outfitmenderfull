// server.js
const express = require('express');
const app = express();
const stripe = require('stripe')('pk_live_51RoSdjANS8lXxUzprO906uESZWdKjxujKIHE7yr4u8K23MJKvmn4RgArM0jJZjmwQqDC46i32ZlOjFqNM9Qcr5jZ00uKN7ZdcR"'); // <- tu wpisz swój klucz secret
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
	      success_url: `${https://outfitmenderfull.vercel.app/}/success.html`,
	      cancel_url: `${https://outfitmenderfull.vercel.app/}/cancel.html`,
    });
    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Serwer działa na https://outfitmenderfull.vercel.app');
});
