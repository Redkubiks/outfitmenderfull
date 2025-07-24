const form = document.getElementById("outfit-form");
const input = document.getElementById("clothes-input");
const result = document.getElementById("result");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const inputValue = input.value.trim();

  if (!inputValue) {
    alert("Proszę wpisać nazwy ubrań");
    return;
  }

  // Podziel input na tablicę ubrań (oddzielonych przecinkami)
  const formData = inputValue.split(",").map(item => item.trim());

  // Wywołaj backend, by utworzyć sesję Stripe
  try {
    const sessionRes = await fetch("https://outfitmenderfull.up.railway.app/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formData }),
    });

    const session = await sessionRes.json();

    if (session.url) {
      // Przekieruj do Stripe Checkout
      window.location.href = session.url;
    } else {
      alert("Coś poszło nie tak przy tworzeniu sesji płatności.");
    }
  } catch (error) {
    console.error("Błąd podczas tworzenia sesji:", error);
    alert("Wystąpił błąd. Spróbuj ponownie później.");
  }
});
