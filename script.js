// FAQ – rozwijane pytania

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');

  question.addEventListener('click', () => {
    // zamknij pozostałe pytania
    faqItems.forEach(i => {
      if (i !== item) {
        i.classList.remove('open');
      }
    });

    // otwórz / zamknij kliknięte
    item.classList.toggle('open');
  });
});


// POGODA //
const apiKey = "a4da4c1ec9fd116585f113a4f0c99772";
const city = "Paris";

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pl&appid=${apiKey}`)
  .then(res => res.json())
  .then(data => {
    document.getElementById("weather-temp").textContent =
      Math.round(data.main.temp) + " °C";

    document.getElementById("weather-desc").textContent =
      data.weather[0].description;

    document.getElementById("weather-icon").src =
      `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    const sunrise = new Date(data.sys.sunrise * 1000);
    const sunset = new Date(data.sys.sunset * 1000);

    document.getElementById("sunrise").textContent =
      sunrise.toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit" });

    document.getElementById("sunset").textContent =
      sunset.toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit" });

    document.getElementById("wind").textContent = data.wind.speed;
    document.getElementById("humidity").textContent = data.main.humidity;
    document.getElementById("pressure").textContent = data.main.pressure;
    document.getElementById("visibility").textContent =
      data.visibility / 1000;
  })
  .catch(() => {
    document.getElementById("weather-desc").textContent =
      "Nie udało się pobrać danych pogodowych";
  });







  // ANIMACJA RESTAURACJI PRZY SCROLLU
const reveals = document.querySelectorAll('.reveal');

function revealOnScroll() {
  const windowHeight = window.innerHeight;

  reveals.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 100) {
      el.classList.add('active');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();






function calculateTrip() {

  // ŚREDNIE  (PLN)
  const flightPrices = {
    warszawa: 480,
    krakow: 450,
    wroclaw: 500,
    gdansk: 520
  };

  const hotelPrices = {
    3: 380,  // za noc
    4: 620,
    5: 980
  };

  const transferPrices = {
    none: 0,
    shared: 90,
    private: 190
  };

  const city = document.getElementById("city").value;
  const people = Number(document.getElementById("people").value);
  const nights = Number(document.getElementById("nights").value);
  const hotel = document.getElementById("hotel").value;
  const transfer = document.getElementById("transfer").value;

  const flightCost = flightPrices[city] * people;
  const hotelCost = hotelPrices[hotel] * nights;
  const transferCost = transferPrices[transfer];

  const total = flightCost + hotelCost + transferCost;

  document.getElementById("price").textContent =
    total.toLocaleString("pl-PL") + " zł";

  document.getElementById("breakdown").innerHTML = `
    ✈️ Loty (2 strony): ${flightCost} zł<br>
    🏨 Hotel (${nights} nocy): ${hotelCost} zł<br>
    🚕 Transfer: ${transferCost} zł
  `;

  setCurrentDate();
}

function setCurrentDate() {
  const now = new Date();
  const formatted = now.toLocaleDateString("pl-PL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });

  document.getElementById("calc-date").textContent =
    `Ceny aktualne na dzień: ${formatted}`;
}


// ZWIJANIE / ROZWIJANIE KALKULATORA
const calcToggle = document.getElementById("calcToggle");
const calcWrapper = document.getElementById("calcWrapper");

calcToggle.addEventListener("click", () => {
  calcWrapper.classList.toggle("open");
});




// WALUTA
// WALUTA – DROPDOWN
const currencyToggle = document.getElementById("currencyToggle");
const currencyPanel = document.getElementById("currencyPanel");

currencyToggle.addEventListener("click", () => {
  currencyPanel.classList.toggle("open");
});





// KURS EUR → PLN
const EUR_RATE = 4.32;

const eurInput = document.getElementById("eurInput");
const plnOutput = document.getElementById("plnOutput");
const eurRate = document.getElementById("eurRate");

eurRate.textContent = EUR_RATE.toFixed(2);

function updateCurrency() {
  const eur = Number(eurInput.value);
  plnOutput.textContent = (eur * EUR_RATE).toFixed(2) + " zł";
}

eurInput.addEventListener("input", updateCurrency);
updateCurrency();
