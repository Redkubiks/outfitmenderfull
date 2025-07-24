// script.js

// Wstaw swój klucz publiczny Stripe tutaj:
const stripe = Stripe("TU_WSTAW_TWÓJ_STRIPE_PUBLISHABLE_KEY");

const form = document.getElementById("outfit-form");
const result = document.getElementById("result");
const languageSelect = document.getElementById("language-select");

let currentLang = "pl";

const translations = {
  pl: {
    clothes: "Wpisz nazwy ubrań, oddzielone przecinkami:",
    occasion: "Wybierz okazję:",
    style: "Wybierz styl:",
    button: "Kup i wygeneruj outfit",
  },
  en: {
    clothes: "Enter clothing names, separated by commas:",
    occasion: "Select occasion:",
    style: "Select style:",
    button: "Buy and generate outfit",
  },
};

languageSelect.addEventListener("change", () => {
  currentLang = languageSelect.value;
  updateLanguage();
});

function updateLanguage() {
  const t = translations[currentLang];
  document.getElementById("label-clothes").innerText = t.clothes;
  document.getElementById("label-occasion").innerText = t.occasion;
  document.getElementById("label-style").innerText = t.style;
  document.getElementById("pay-button").innerText = t.button;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  result.innerText = "";

  try {
    const sessionRes = await fetch("/create-c
