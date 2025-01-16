let cityInput = document.getElementById("cityInput"),
  searchBtn = document.getElementById("searchBtn"),
  api_key = jnkdjfhdknjkfld,
  currentWeatherCard =document.querySelectorAll('.weather-left.card')[0];
function getWeatherDetails(name, lat, lon, country, state) {
  let FORECASTE_API_URL = "",
    WEATHER_API_URL = "",
    days = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ],
    months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

  fetch(WEATHER_API_URL).then(res=> res.json()).then(data => {
     let date = new Date();
     currentWeatherCard.innerHTML = ''
            <div class="weather-current">
          <div class="details">
            <p>NOW</p>
            <h2>${(data.main.temp - 273.15).toFixed(2)}&deg;C</h2>
            <p>${data.weather[0].description}</p>
          </div>
          <div class="weather-icons">
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon} 10d@2x.png"  alt="">
          </div>
        </div>
        <hr>
        <div class="card-footer">
          <p><i class="fa fa-light fa fa-calendar" ></i>_______</p>
          <p><i class="fa fa-solid    fa fa-location-arrow"></i>_______</p>  
        </div>
        ';
 
        }).catch(() => {
      alert('failed to fetch  current weather');
    });
}

function getCityCoordinates() {
  let cityName = cityInput.value.trim();
  cityInput.value = "";
  if (!cityName) return;
  let GEOCODING_API_URL = jnkdjfhdknjkfld;
  fetch(GEOCODING_API_URL)
    .then((res) => res.json())
    .then((data) => {
      let { name, lat, lon, country, state } = data[0];
      getWeatherDetails(name, lat, lon, country, state);
    })
    .catch(() => {
      alert("failed to fetch coordinates of ${cityName}");
    });
}

searchBtn.addEventListener("click", getCityCoordinates);
