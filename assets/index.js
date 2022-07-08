var apiKey = 'b3de0c1d89e9ffc61ed2d5da69a35c8f';
var urlRoot = 'https://api.openweathermap.org';

var searchButton = document.querySelector('#search-button');
var today = document.querySelector('#city-name');
var forecast = document.querySelector('#forecast');
var searchHistory = document.querySelector('#searched-cities');
var search = document.querySelector('#userInput');

var recentSearches = [];
let coordUrl = '';



function fetchWeatherData(search) {
  console.log(`searching... ${search}`)
    //plugs in the city searched for and the apiKey into the url
    let newUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + search + '&appid=' + apiKey;
    fetch(newUrl)
      .then(function (response) {
        recentSearches.push(search);
        localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
        return response.json();
      })
      .then(function (data) {
        // renderWeather(data);
        var lat = data[0].lat;
        var lon = data[0].lon;
        //plugs in latitude and longitude
        // getWeather(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`);
        getWeather(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${apiKey}&units=imperial`)
        //TODO how do I just do 5!
        //cnt=5 should limit results?
        getForecast(`https://api.openweathermap.org/data/2.5/forecast?&lat=${lat}&lon=${lon}&cnt=5&appid=${apiKey}&units=imperial`)
      })
}

function getWeather(url) {
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      renderWeather(data);
    })
}

function getForecast(url) {
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      renderForecast(data);
    })
}


var todayTemp = document.querySelector('#td-temp');
var todayHumidity = document.querySelector('#td-humidity');
var todayWind = document.querySelector('#td-wind');
var todayUvi = document.querySelector('#td-uvi');
var todayInfo;
function renderWeather(url) {
    todayInfo = url;
    console.log(todayInfo);
    var uvi = todayInfo.current.uvi;
    // debugger;
    // console.log(weatherInfo);
    today.innerHTML = `${todayInfo.name}`
    todayTemp.innerHTML = `Current temp: ${todayInfo.current.temp}`
    todayHumidity.innerHTML = `Humidity: ${todayInfo.current.humidity}`
    todayWind.innerHTML = `Wind strength: ${todayInfo.current.wind_speed}`;
    todayUvi.innerHTML = `UVI: ${todayInfo.current.uvi}`;

    if(uvi < 3) {
      todayUvi.setAttribute('class', 'bg-success');
    } else if (uvi < 7) {
      todayUvi.setClass('class', 'bg-warning')
    } else {
      todayUvi.setClass('class', 'bg-danger');
    }
    
    // return weatherInfo.main;
  // today.innerHTML = search;
  // today.append(dailyForecast);
}
var weatherInfo;
function renderForecast(url) {
  var weatherInfo = url;
  console.log(weatherInfo);
  // debugger;
  for (i=0; i < 5; i++) {
    var weatherCard = document.createElement('div');

    var currentTemp = document.createElement('div');
    var typeOfWeather = document.createElement('div');
    var windSpeed = document.createElement('div');
    var humidity = document.createElement('div');
    var uvIndex = 


    weatherCard.setAttribute('class', 'weather-card');
    
    currentTemp.innerHTML = 'Temperature: ' + weatherInfo.list[i].main.temp;
    typeOfWeather.innerHTML = 'Weather: ' + weatherInfo.list[i].weather[0].main;
    windSpeed.innerHTML = 'Wind Speed: ' +  weatherInfo.list[i].wind.speed;
    weatherCard.append(currentTemp, typeOfWeather, windSpeed, humidity)
    forecast.appendChild(weatherCard);
    
  }
}

searchButton.addEventListener("click", function(e) {
  //prevents the screen from refreshing every time
  e.preventDefault();
  var searchData = search.value;
  fetchWeatherData(searchData);
  renderHistory(searchData);
  // console.log(searchData);
  //clear the searchbar after submitting
  search.value = '';
  
})

var storedSearches = [];

function renderHistory(e) {
  storedSearches = localStorage.getItem("recentSearches") ? localStorage.getItem("recentSearches").split(";") : []
  
   // console.log(storedSearches)
    for (let i=0; i <= storedSearches.length; i++) {
      // console.log(i);
      cityButton = document.createElement("button");
      cityButton.classList.add("search-button");
      cityButton.textContent = e;
      // console.log(city);
    
    searchHistory.appendChild(cityButton);
    
  }
}

