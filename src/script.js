let now = new Date();

let today = document.querySelector("h2");
let year = now.getFullYear();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let mins = now.getMinutes();
if (mins < 10) {
  mins = `0${mins}`;
}
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

today.innerHTML = `${hour}:${mins}, ${day}, ${month} ${dayNumber}, ${year}`;

function currentTemp(response) {
  let humidity = response.data.main.humidity;
  let currentHumidity = document.querySelector("#humid");
  currentHumidity.innerHTML = `Humidity: ${humidity}%`;

  let wind = response.data.wind.speed;
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = `Wind speed: ${Math.round(wind)}km/h`;

  let currentIcon = document.querySelector("#icon");
  currentIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  currentIcon.setAttribute("alt", response.data.weather[0].description);

  let roundCurrentTemp = Math.round(response.data.main.temp);
  let h4 = document.querySelector("#current-temp");
  h4.innerHTML = `${roundCurrentTemp}°C`;

  let description = response.data.weather[0].description;
  let currentDescription = document.querySelector("#forcast");
  currentDescription.innerHTML = `Outlook: ${description}`;

  if (response.data.weather[0].main === "Clear") {
    let location = response.data.name;
    let h1 = document.querySelector("h1");
    document.body.style.backgroundImage = "url('Images/clear skies.jpg')";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
    h1.innerHTML = `Get outdoors and stay sun safe today in ${location}!`;
  } else if (
    response.data.weather[0].main === "Rain" ||
    response.data.weather[0].main === "Drizzle"
  ) {
    let location = response.data.name;
    let h1 = document.querySelector("h1");
    document.body.style.backgroundImage = "url('Images/rain.jpg')";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
    h1.innerHTML = `Snuggle up with a book or go dancing in the rain in ${location}!`;
  } else if (response.data.weather[0].main === "Thunderstorm") {
    let location = response.data.name;
    let h1 = document.querySelector("h1");
    document.body.style.backgroundImage = "url('Images/storm.jpg')";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
    h1.innerHTML = `Thunderbolts of lightening very, very, frightening today in ${location}!`;
  } else if (response.data.weather[0].main === "Clouds") {
    let location = response.data.name;
    let h1 = document.querySelector("h1");
    document.body.style.backgroundImage = "url('Images/overcast.jpg')";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
    h1.innerHTML = `What a perfect day in ${location} for a movie marathon!`;
  } else if (response.data.weather[0].main === "Snow") {
    let location = response.data.name;
    let h1 = document.querySelector("h1");
    document.body.style.backgroundImage = "url('Images/snow.jpg')";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
    h1.innerHTML = `Snow men and sledding, it will be a winter wonderland in ${location} today!`;
  } else if (
    response.data.weather[0].main === "Mist" ||
    response.data.weather[0].main === "Dust" ||
    response.data.weather[0].main === "Haze" ||
    response.data.weather[0].main === "Fog"
  ) {
    let location = response.data.name;
    let h1 = document.querySelector("h1");
    document.body.style.backgroundImage = "url('Images/mist.jpg')";
    h1.innerHTML = `Stay safe on the roads to day in ${location}!`;
  }

  getForecast(response.data.coord);
}
function displayForcast(answer) {
  let forecast = document.querySelector("#five-day-forecast");
  let fullForecast = `<div class="row">`;
  let daysForecast = answer.data.daily;
  daysForecast.forEach(function (forecastDay, index) {
    if (index < 4) {
      fullForecast =
        fullForecast +
        `<div class="col">
                <img src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt="" class="weatherIcon" id="icon"
                Width ="40"/>

                <div>${formatForecastDay(forecastDay.dt)}</div>
                ${Math.round(forecastDay.temp.min)}°-<strong>${Math.round(
          forecastDay.temp.max
        )}°</strong>
              </div>`;
    }
  });
  fullForecast = fullForecast + `</div>`;
  forecast.innerHTML = fullForecast;
}

function getForecast(coordinates) {
  let units = "&units=metric";
  let apiKey = "d02001f5620297c6aecba2d545033953";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}${units}`;
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

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
