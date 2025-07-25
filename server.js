const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
const PORT = process.env.PORT || 3000;

// 🔐 RĘCZNA OBSŁUGA CORS — DZIAŁA Z RAILWAY
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://outfitmenderfull.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

// 🧪 Testowa trasa
app.get("/", (req, res) => {
  res.send("✅ Backend OutfitMender działa!");
});

// 💳 Tworzenie sesji płatności Stripe
app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Wygeneruj outfit AI",
              description: "Stylizacja na podstawie ubrań podanych przez użytkownika",
            },
            unit_amount: 500, // 5.00 USD
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "https://outfitmenderfull.vercel.app/success.html",
      cancel_url: "https://outfitmenderfull.vercel.app/cancel.html",
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("❌ Błąd Stripe:", error.message);
    res.status(500).json({ error: "Nie udało się utworzyć sesji płatności" });
  }
});

// ▶️ Uruchomienie serwera
app.listen(PORT, () => {
  console.log(`🚀 Serwer działa na porcie ${PORT}`);
});
