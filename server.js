const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
const PORT = process.env.PORT || 3000;

// 🔓 POZWALAMY NA POŁĄCZENIA Z FRONTU NA VERCEL
app.use(cors({
  origin: "https://outfitmenderfull.vercel.app"
}));
app.options("*", cors()); // ← to obsługuje preflight dla POST

app.use(express.json());

// 🧪 Prosty test GET
app.get("/", (req, res) => {
  res.send("✅ Outfit Mender backend działa!");
});

// 💳 Stripe: utworzenie sesji płatności
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
              description: "Stylizacja AI na podstawie wybranych ubrań",
            },
            unit_amount: 500, // $5.00
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
    console.error("❌ Błąd tworzenia sesji:", error);
    res.status(500).json({ error: "Wystąpił problem przy tworzeniu sesji Stripe" });
  }
});

// ▶️ Uruchom serwer
app.listen(PORT, () => {
  console.log(`🚀 Server działa na porcie ${PORT}`);
});
