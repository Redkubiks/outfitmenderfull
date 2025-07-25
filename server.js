const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
const PORT = process.env.PORT || 3000;

// POZWALAMY NA DOSTĘP FRONTENDOWI Z VERCELA
app.use(cors({
  origin: "https://outfitmenderfull.vercel.app"
}));

app.use(express.json());

// Główna trasa
app.get("/", (req, res) => {
  res.send("Outfit Mender backend działa! 🚀");
});

// Endpoint tworzący sesję Stripe
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
              description: "Usługa automatycznego tworzenia outfitu na podstawie wskazanych elementów",
            },
            unit_amount: 500, // czyli $5.00
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
    console.error("Błąd tworzenia sesji:", error);
    res.status(500).json({ error: "Wystąpił problem przy tworzeniu sesji Stripe" });
  }
});

// Start serwera
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
