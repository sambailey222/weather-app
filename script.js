const key = "";
let units = "metric";
let locale = "london"

// function getWeatherData(location) {
//   let weatherData = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}`, {
//     mode: 'cors'
//   })
//     .then((response) => response.json()) //return resolved response as json
//     .then((data) => data);
// };

const userInput = document.getElementById("search");
const submitBtn = document.getElementById("submit");

submitBtn.addEventListener("click", () => {
  locale = userInput.value;
  getWeatherData(locale);
});

userInput.addEventListener("keyup", function(event) {
    console.log(event.code);
    if (event.code === "Enter") {
    event.preventDefault();
    submitBtn.click();
    }
});

async function getWeatherData(location) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&appid=${key}`, {
    mode: 'cors'
  })
  const weatherData = await response.json();//return resolved response as json
  console.log(weatherData);
  const weatherDataObject = processData(weatherData);
  console.log(weatherDataObject);
  displayData(weatherDataObject);
  return weatherDataObject;
};

// console.log(getWeatherData("london"));

getWeatherData(locale);

// console.log(getWeatherData("london")); // this returns undefined because it doesnt wait for the promise
// getWeatherData("berlin");

//  async function createDataObject() {
//   const data = await getWeatherData("london");
//   const temp = await data.main.temp;
//   return temp;
// }

// createDataObject();

function processData(weatherData) {
  let weatherObject = {
    name: weatherData.name,
    temp: weatherData.main.temp,
    feels_like: weatherData.main.feels_like,
    description: weatherData.weather[0].description,
    icon: weatherData.weather[0].icon,
    word: weatherData.weather[0].main,
    wind: weatherData.wind.speed,
    humidity: weatherData.main.humidity
  };
  // console.log(weatherObject);
  return weatherObject;
}

const placeName = document.getElementById("placeName");
const icon = document.getElementById("icon");
const weatherType = document.getElementById("weather-type");
const temp = document.getElementById("temp");
const feelsLike = document.getElementById("feels-like");
const wind = document.getElementById("wind");

function displayData(weatherDataObject) {
  placeName.innerHTML = weatherDataObject.name;
  icon.src = `https://openweathermap.org/img/wn/${weatherDataObject.icon}@2x.png`;
  weatherType.innerHTML = weatherDataObject.word;
  temp.innerHTML = `${weatherDataObject.temp} &#176 C`;
  feelsLike.innerHTML = `${weatherDataObject.feels_like} &#176 C`;
  wind.innerHTML = `${displayWindUnits(weatherDataObject)} mph`;
}

function displayWindUnits(weatherDataObject) {
  let windUnits = "";
  if (units === "metric") {
    windUnits = `${Math.round(weatherDataObject.wind * 2.237)}`
  } else {
    windUnits = Math.round(weatherDataObject.wind);
  }
  return windUnits;
}

const unitsBtn = document.getElementById("changeUnits");
unitsBtn.addEventListener("click", () => changeUnits());

function changeUnits() {
  if (units === "metric") {
    units = "imperial"
  } else {
    units = "metric"
  }
  getWeatherData(locale);
}

