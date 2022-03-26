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

  let description = response.data.weather[0].description;
  let currentDescription = document.querySelector("#forcast");
  currentDescription.innerHTML = `Outlook: ${description}`;

  let roundCurrentTemp = Math.round(response.data.main.temp);
  let h4 = document.querySelector("#current-temp");
  h4.innerHTML = `${roundCurrentTemp}°C`;

  let location = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `Today in ${location} it is time to hit the beach!`;
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
