const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors({
  origin: "https://outfitmenderfull.vercel.app"
}));
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // klucz ukryty w Railway
const cors = require("cors");

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

const YOUR_DOMAIN = "https://outfitmenderfull.vercel.app"; // twój frontend

app.post("/create-checkout-session", async (req, res) => {
  const { formData } = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "pln",
          product_data: {
            name: "Wygeneruj stylizację AI",
            description: `Ubrania: ${formData.join(", ")}`,
          },
          unit_amount: 500, // 5.00 PLN
        },
        quantity: 1,
      },
    ],
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });

  res.json({ id: session.id });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server działa na porcie ${PORT}`));
