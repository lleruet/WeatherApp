let now = new Date();

let today = document.querySelector("h2");
let year = now.getFullYear();
let hour = now.getHours();
let mins = now.getMinutes();

let months = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

let dayNumber = now.getDate();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

today.innerHTML = `${hour}:${mins}, ${day} ${dayNumber}, ${month}, ${year}`;

function currentTemp(response) {
  let humidity = response.data.main.humidity;
  let currentHumidity = document.querySelector("#humid");
  currentHumidity.innerHTML = `Humidity: ${humidity}%`;

  let wind = response.data.wind.speed;
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = `Wind speed: ${wind}km/h`;

  if (response.data.weather[0].description === "clear sky") {
    let description = response.data.weather[0].description;
    let currentDescription = document.querySelector("#forcast");
    currentDescription.innerHTML = `Outlook: ☀ ${description}`;
  } else if (
    response.data.weather[0].description === "broken clouds" ||
    "overcast" ||
    "overcast clouds" ||
    "few clouds" ||
    "scattered clouds"
  ) {
    let description = response.data.weather[0].description;
    let currentDescription = document.querySelector("#forcast");
    currentDescription.innerHTML = `Outlook: 🌥 ${description}`;
  } else if (
    response.data.weather[0].description === "light rain" ||
    "rain" ||
    "mist" ||
    "thunder storms" ||
    "light intensity drizzle"
  ) {
    let description = response.data.weather[0].description;
    let currentDescription = document.querySelector("#forcast");
    currentDescription.innerHTML = `Outlook: 🌧 ${description}`;
  } else if (
    response.data.weather[0].description === "light snow" ||
    "snow" ||
    "heavy snow"
  ) {
    let description = response.data.weather[0].description;
    let currentDescription = document.querySelector("#forcast");
    currentDescription.innerHTML = `Outlook: ❄ ${description}`;
  }

  let roundCurrentTemp = Math.round(response.data.main.temp);
  let h4 = document.querySelector("#current-temp");
  h4.innerHTML = `${roundCurrentTemp}°C/${farenheitToday}`;

  if (response.data.weather[0].description === "clear sky") {
    let location = response.data.name;
    let h1 = document.querySelector("h1");
    document.body.style.backgroundImage = "url('Images/clear skies.jpg')";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
    h1.innerHTML = `Get outdoors and stay sun safe today in ${location}!`;
  } else if (
    response.data.weather[0].description === "broken clouds" ||
    "overcast" ||
    "overcast clouds" ||
    "few clouds"
  ) {
    let location = response.data.name;
    let h1 = document.querySelector("h1");
    document.body.style.backgroundImage = "url('Images/overcast.jpg')";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
    h1.innerHTML = `What a perfect day in ${location} for a movie marathon!`;
  } else if (
    response.data.weather[0].description === "light rain" ||
    "rain" ||
    "mist" ||
    "thunder storms" ||
    "light intensity drizzle"
  ) {
    let location = response.data.name;
    let h1 = document.querySelector("h1");
    document.body.style.backgroundImage = "url('Images/storm.jpg')";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
    h1.innerHTML = `Snuggle up with a book or go dancing in the rain in ${location} today!`;
  } else if (
    response.data.weather[0].description === "light snow" ||
    "snow" ||
    "heavy snow"
  ) {
    let location = response.data.name;
    let h1 = document.querySelector("h1");
    document.body.style.backgroundImage = "url('Images/snow.jpg')";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
    h1.innerHTML = `Snow men and sledding it'll be a winter wonderland in ${location}!`;
  }
  getForecast(response.data.coord);
  displayForcast();
}

function getForecast(coordinates) {
  console.log(coordinates);
  let units = "&units=metric";
  let apiKey = "d02001f5620297c6aecba2d545033953";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForcast);
}

function displayMessage(event) {
  event.preventDefault();

  let cityName = document.querySelector("#city-name");
  let units = "&units=metric";
  let apiKey = "d02001f5620297c6aecba2d545033953";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=`;

  axios
    .get(`${apiUrl}${cityName.value}&appid=${apiKey}${units}`)
    .then(currentTemp);
}

let citySearch = document.querySelector("#find-city-weather");
citySearch.addEventListener("submit", displayMessage);

function currentLocationTemp() {
  function getPosition(position) {
    let units = "&units=metric";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "d02001f5620297c6aecba2d545033953";
    let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";

    axios
      .get(`${apiUrl}lat=${lat}&lon=${lon}&appid=${apiKey}${units}`)
      .then(currentTemp);
  }
  navigator.geolocation.getCurrentPosition(getPosition);
}

let currentCityButton = document.querySelector("#current-city");
currentCityButton.addEventListener("click", currentLocationTemp);

function displayForcast(response) {
  let forecast = document.querySelector("#five-day-forecast");

  let fullForecast = `<div class="row">`;

  let daysForecast = response.data.daily;
  daysForecast.forEach(function (forecastDay) {
    fullForecast =
      fullForecast +
      `<div class="col">
                ${forecastDay.weather[0].icon}
                <div>${formatForecastDay(forecastDay.dt)}</div>
                ${forecastDay.temp.min}°-<strong>${
        forecastDay.temp.max
      }°</strong>
              </div>`;
  });
  fullForecast = fullForecast + `</div>`;
  forecast.innerHTML = fullForecast;
}

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function convert(event) {
  event.preventDefault();
  let fahrenheitTemperature = Math.round((roundCurrentTemp * 9) / 5 + 32);
  let h4 = document.querySelector("h4");
  h4.innerHTML = `${fahrenheitTemperature}F`;
}

let farenheitToday = document.querySelector("#farenheit");
farenheitToday.addEventListener = ("click", convert);
