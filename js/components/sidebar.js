import {
  OPEN_WEATHER_API_KEY,
  ALL_SPORTS_API_KEY,
  GET_GEO_API_KEY,
} from "../../apiKeys.js";

function loadWeather() {
  const weatherInfo = document.getElementById("weather-info");
  if (!weatherInfo) return;

  function renderWeather(data) {
    const temp = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const city = data.name;
    const icon = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    weatherInfo.innerHTML = `
    <div class="d-flex align-items-center justify-content-center flex-column">
      <div class="d-flex align-items-center mb-2">
        <img src="${iconUrl}" alt="${description}" class="me-2" style="width:50px;height:50px;">
        <h2 class="mb-0">${temp}°C</h2>
      </div>
      <p class="mb-1 text-capitalize">${description}</p>
      <p class="mb-0"><small>${city}</small></p>
    </div>
    `;
  }

  function fetchWeather(lat, lon) {
    $.ajax({
      url: `https://api.openweathermap.org/data/2.5/weather`,
      data: { lat, lon, appid: OPEN_WEATHER_API_KEY, units: "metric" },
      success: renderWeather,
      error: function () {
        weatherInfo.textContent = "Failed to load weather.";
      },
    });
  }

  if (!navigator.geolocation) {
    fetchWeather(30.0444, 31.2357);
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude),
    () => fetchWeather(30.0444, 31.2357)
  );
}

function loadExchangeRates() {
  const usdEl = document.getElementById("usd-egp");
  const sarEl = document.getElementById("sar-egp");
  if (!usdEl || !sarEl) return;

  $.ajax({
    url: `https://api.getgeoapi.com/v2/currency/convert`,
    data: {
      api_key: GET_GEO_API_KEY,
      from: "USD",
      to: "EGP",
      amount: 1,
      format: "json",
    },
    success: function (usdData) {
      usdEl.textContent = usdData.rates.EGP.rate_for_amount + " EGP";

      $.ajax({
        url: `https://api.getgeoapi.com/v2/currency/convert`,
        data: {
          api_key: GET_GEO_API_KEY,
          from: "SAR",
          to: "EGP",
          amount: 1,
          format: "json",
        },
        success: function (sarData) {
          sarEl.textContent = sarData.rates.EGP.rate_for_amount + " EGP";
        },
        error: function () {
          sarEl.textContent = "Error";
        },
      });
    },
    error: function () {
      usdEl.textContent = "Error";
    },
  });

  $.ajax({
    url: `https://api.getgeoapi.com/v2/currency/list`,
    data: { api_key: GET_GEO_API_KEY },
    success: function (listData) {
      const fromSelect = document.getElementById("from-currency");
      const toSelect = document.getElementById("to-currency");
      if (!fromSelect || !toSelect) return;

      fromSelect.innerHTML = "";
      toSelect.innerHTML = "";

      const currencies = listData.currencies;
      Object.keys(currencies).forEach((code) => {
        const optionFrom = new Option(`${code} - ${currencies[code]}`, code);
        const optionTo = new Option(`${code} - ${currencies[code]}`, code);
        fromSelect.add(optionFrom);
        toSelect.add(optionTo);
      });

      fromSelect.value = "USD";
      toSelect.value = "EGP";
    },
    error: function () {
      console.error("Failed to load currency list.");
    },
  });
}

function initCurrencyForm() {
  const form = document.getElementById("calc-form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const amount = document.getElementById("amount").value;
    const fromCurrency = document.getElementById("from-currency").value;
    const toCurrency = document.getElementById("to-currency").value;
    const resultEl = document.getElementById("calc-result");

    if (!amount || !fromCurrency || !toCurrency) {
      resultEl.textContent = "⚠ Please fill all fields.";
      return;
    }

    resultEl.textContent = "⏳ Converting...";

    $.ajax({
      url: `https://api.getgeoapi.com/v2/currency/convert`,
      data: {
        api_key: GET_GEO_API_KEY,
        from: fromCurrency,
        to: toCurrency,
        amount: amount,
        format: "json",
      },
      success: function (data) {
        const rate = data.rates[toCurrency].rate_for_amount;
        resultEl.textContent = `${amount} ${fromCurrency} = ${rate} ${toCurrency}`;
      },
      error: function () {
        resultEl.textContent = "❌ Error fetching conversion.";
      },
    });
  });
}

function loadMatches() {
  const matchesList = document.getElementById("matches-list");
  if (!matchesList) return;

  $.ajax({
    url: `https://apiv2.allsportsapi.com/football/`,
    data: { met: "Livescore", APIkey: ALL_SPORTS_API_KEY, leagueId: 152 },
    success: function (data) {
      matchesList.innerHTML = "";
      if (data.result && data.result.length > 0) {
        data.result.forEach((match) => {
          const li = document.createElement("li");
          const matchDate = new Date(match.event_date);
          li.innerHTML = `
            <div class="match-card d-flex align-items-center justify-content-between">
              <div class="team text-center">
                <img src="${match.home_team_logo || ""}" alt="${
            match.event_home_team
          }" class="team-logo mb-1">
                <span class="team-name">${match.event_home_team}</span>
              </div>
              <div class="match-score text-center fw-bold">
                ${match.event_final_result || "vs"}
              </div>
              <div class="team text-center">
                <img src="${match.away_team_logo || ""}" alt="${
            match.event_away_team
          }" class="team-logo mb-1">
                <span class="team-name">${match.event_away_team}</span>
              </div>
            </div>
            <div class="text-center mt-1">
              <small class="text-muted">${matchDate.toLocaleDateString()}</small>
            </div>
          `;
          matchesList.appendChild(li);
        });
      } else {
        matchesList.innerHTML = "<li>No live matches right now.</li>";
      }
    },
    error: function () {
      matchesList.innerHTML = "<li>Failed to load matches.</li>";
    },
  });
}

export function initSidebar() {
  loadWeather();
  loadExchangeRates();
  loadMatches();
  initCurrencyForm();
}
