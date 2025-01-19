document.getElementById("searchBtn").addEventListener("click", getWeather);
document
  .getElementById("locationBtn")
  .addEventListener("click", getLocationWeather);

function getWeather() {
  const city = document.getElementById("city_input").value;
  if (city) {
    fetchWeatherData(city);
  } else {
    alert("Please enter a city!");
  }
}

function getLocationWeather() {
  navigator.geolocation.getCurrentPosition(function (position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    fetchWeatherDataByLocation(lat, lon);
  });
}

function fetchWeatherData(city) {
  const apiKey = "7a9710d291ac85e8a567d021e1b2b446"; // Get an API key from OpenWeatherMap
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => updateWeatherData(data))
    .catch((error) => console.error("Error fetching weather data:", error));
}

function fetchWeatherDataByLocation(lat, lon) {
  const apiKey = "7a9710d291ac85e8a567d021e1b2b446"; // Get an API key from OpenWeatherMap
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => updateWeatherData(data))
    .catch((error) => console.error("Error fetching weather data:", error));
}

function updateWeatherData(data) {
  // Update the current weather
  document.querySelector(
    ".current-weather h2"
  ).textContent = `${data.main.temp}°C`;
  document.querySelector(".current-weather p").textContent =
    data.weather[0].description;

  // Update hourly forecast, 5-day forecast, air quality, etc.
  // You would need to update these based on the data returned by the API
}
