let cityInput = document.getElementById(`city_input`),
  searchBtn = document.getElementById(`searchBtn`),
  api_key = `7a9710d291ac85e8a567d021e1b2b446`,
  currentWeatherCard = document.querySelectorAll(`.weather-left.card`)[0];
function getWeatherDetails(name, lat, lon, country, state) {
  let FORECAST_API_URL = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&appid=${api_key}`,
    WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`,
    days = [
      `sunday`,
      `monday`,
      `tuesday`,
      `wednesday`,
      `thursday`,
      `friday`,
      `saturday`,
    ],
    months = [
      `Jan`,
      `Feb`,
      `Mar`,
      `Apr`,
      `May`,
      `Jun`,
      `Jul`,
      `Aug`,
      `Sep`,
      `Oct`,
      `Nov`,
      `Dec`,
    ];

  fetch(WEATHER_API_URL)
    .then((res) => res.json())
    .then((data) => {
      let date = new Date();
      currentWeatherCard.innerHTML = `
            <div class="current-weather">;
          <div class="details">
        <p>NOW</p>
        <h2>${(data.main.temp - 273.15).toFixed(2)}&deg;C</h2>
        <p>${data.weather[0].description}</p>
        </div>
          <div class="weather-icons">
        <img src="https://openweathermap.org/img/wn/ ${
          data.weather[0].icon
        } 10d@2x.png"  alt="">
          </div>
        </div>
        <hr>
        <div class="card-footer">
          <p><i class="fa fa-light fa fa-calendar" ></i>${
            days[date.getDay()]
          }, ${date.getDate()},${
        months[date.getMonth()]
      } ${date.getFullYear()}</p>
          <p><i class="fa fa-solid fa fa-location-arrow"></i>${name},${country}</p>  
        </div>
         `;
    })
    .catch(() => {
      alert(`failed to fetch  current weather`);
    });
}

function getCityCoordinates() {
  let cityName = cityInput.value.trim();
  cityInput.value = ``;
  if (!cityName) return;
  let GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${api_key}`;
  fetch(GEOCODING_API_URL)
    .then((res) => res.json())
    .then((data) => {
      let { name, lat, lon, country, state } = data[0];
      getWeatherDetails(name, lat, lon, country, state);
    })
    .catch(() => {
      alert(`failed to fetch coordinates of ${cityName}`);
    });
}

searchBtn.addEventListener(`click `, getCityCoordinates);
