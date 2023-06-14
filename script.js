const apiKey = "3ebf8de07e02a5a99e9a479fe2f000d4";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weather = document.querySelector(".weather");
const error = document.querySelector(".error");
const weatherDesc = document.querySelector(".weather-description");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    error.style.display = "block";
    weather.style.display = "none";
  } else {
    var data = await response.json();

    console.log(data);

    weatherDesc.innerHTML = data.weather[0].description.toUpperCase();
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "<sup>o</sup>c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/mist.png";
    }

    weather.style.display = "block";
    error.style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  if (searchBox.value == "") {
    error.style.display = "block";
    weather.style.display = "none";
  } else {
    checkWeather(searchBox.value);
  }
});

searchBox.addEventListener("keypress", (e) => {
  if (searchBox.value == "" && e.key == "Enter") {
    error.style.display = "block";
    weather.style.display = "none";
  } else if (e.key == "Enter") {
    checkWeather(searchBox.value);
  }
});

// checkWeather();
