let timeElement = document.querySelector("#current-time");
let nowTime = new Date();
let hours = nowTime.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = nowTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

timeElement.innerHTML = `${hours}:${minutes}`;

let dateElement = document.querySelector("#current-date");
let nowDate = new Date();
let day = nowDate.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

dateElement.innerHTML = `${days[day]}`;

function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;

  celciusTemperature = response.data.main.temp;

  document.querySelector("#temperature").innerHTML = Math.round(celciusTemperature);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.list[3];
  
  forecastElement.innerHTML = `
    <span class="all">
    <i class="far fa-moon"></i>
    <strong> ${Math.round(forecast.main.temp_min)}°C</strong>
    </span>
  `;
} 

function search(city) {
  let apiKey = "33c546775229a1fee66d0c638aa516ca";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  search(city);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celciusTemperature * 9 / 5) + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);   
}

function convertToCelcius(event) {
event.preventDefault();
let temperatureElement = document.querySelector("#temperature");
temperatureElement.innerHTML = Math.round(celciusTemperature);
}

let celciusTemperature = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", convertToCelcius);

search("New York");