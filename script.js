const key = "";
let units = "metric";
let locale = "london"

const userInput = document.getElementById("search");
const submitBtn = document.getElementById("submit");

// perform search based on user inputted location
submitBtn.addEventListener("click", () => {
  errorMsg.style.visibility = "hidden";
  locale = userInput.value;
  getWeatherData(locale);
});

// allow search to work by pressing enter key
userInput.addEventListener("keyup", function(event) {
    if (event.code === "Enter") {
    event.preventDefault();
    submitBtn.click();
    }
});

const errorMsg = document.getElementById("error");


async function getWeatherData(location) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&appid=${key}`, {
      mode: 'cors'
    })
    const weatherData = await response.json();//return resolved response as json
    // form an object from just the data points we want
    const weatherDataObject = processData(weatherData);
    displayData(weatherDataObject);
    return weatherDataObject;
  } catch (error) {
    // if search fails, alert user
    errorMsg.style.visibility = "visible";
  }
};

// perform an initial search on startup
getWeatherData(locale);

// build data object for later display
function processData(weatherData) {
  let weatherObject = {
    name: weatherData.name,
    temp: weatherData.main.temp,
    country: weatherData.sys.country,
    feels_like: weatherData.main.feels_like,
    description: weatherData.weather[0].description,
    icon: weatherData.weather[0].icon,
    word: weatherData.weather[0].main,
    wind: weatherData.wind.speed,
    humidity: weatherData.main.humidity
  };
  return weatherObject;
}

// grab the parts of the DOM where data will be displayed
const placeName = document.getElementById("placeName");
const icon = document.getElementById("icon");
const weatherType = document.getElementById("weather-type");
const temp = document.getElementById("temp");
const feelsLike = document.getElementById("feels-like");
const wind = document.getElementById("wind");
const humidity = document.getElementById("humidity");

function displayData(weatherDataObject) {
  // change unit displayed based on user selection
  let displayUnit = "C"
  if (units === "imperial") {
    displayUnit = "F";
  } else {
    displayUnit = "C";
  }
  // update DOM with weather data from our object
  placeName.innerHTML = `${weatherDataObject.name}, ${weatherDataObject.country}`;
  icon.src = `https://openweathermap.org/img/wn/${weatherDataObject.icon}@2x.png`;
  weatherType.innerHTML = weatherDataObject.word;
  temp.innerHTML = `${weatherDataObject.temp} &#176 ${displayUnit}`;
  feelsLike.innerHTML = `${weatherDataObject.feels_like} &#176 ${displayUnit}`;
  humidity.innerHTML = `${weatherDataObject.humidity}%`;
  wind.innerHTML = `${displayWindUnits(weatherDataObject)} mph`;
}

// show wind in mph regardless of units (as we do in UK)
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
// change units used in API call
function changeUnits() {
  if (units === "metric") {
    units = "imperial"
  } else {
    units = "metric"
  }
  getWeatherData(locale);
}

