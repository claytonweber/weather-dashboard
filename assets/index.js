var apiKey = 'b3de0c1d89e9ffc61ed2d5da69a35c8f';
var urlRoot = 'https://api.openweathermap.org';

var searchButton = document.querySelector('#search-button');
var today = document.querySelector('#today');
var forecast = document.querySelector('#forecast');
var searchHistory = document.querySelector('#searched-cities');
var search = document.querySelector('#userInput');

var recentSearches = [];
let coordUrl = '';

var todayWind = document.querySelector('#td-wind');

function getWeather(search) {
  console.log(`searching... ${search}`)
    //plugs in the city searched for and the apiKey into the url
    let newUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + search + '&appid=' + apiKey;
    fetch(newUrl)
      .then(function (response) {
        recentSearches.push(search);
        localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
        renderWeather(response);
        return response.json();
      })
      .then(function (data) {
        var lat = data[0].lat;
        var lon = data[0].lon;
        //plugs in latitude and longitude
        getMoreWeather(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
      })
}

function getMoreWeather(url) {
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      renderWeather(data);
    })
}


function renderWeather(url) {
    var weatherInfo = url;
    console.log(weatherInfo.wind)
    today.innerHTML = `${weatherInfo.main.temp}`
    todayWind.innerHTML = `${weatherInfo.main}`;
    
    // return weatherInfo.main;
  // today.innerHTML = search;
  // today.append(dailyForecast);
}

searchButton.addEventListener("click", function(e) {
  //prevents the screen from refreshing every time
  e.preventDefault();
  var searchData = search.value;
  getWeather(searchData);
  //clear the searchbar after submitting
  search.value = '';
  
})


