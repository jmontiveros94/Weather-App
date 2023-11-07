// Define your API endpoint and API key
const apiKey = '17ad41f53999999aeabff2f676cf09f8';
const apiEndpoint = 'https://api.openweathermap.org/data/2.5/weather';
const resultObj = {
  title: 'Weather Report',
  currentweather: {
    temperature: 25, // Temperature in Celsius
    humidity: 50,   // Humidity percentage
    windSpeed: 10   // Wind speed in m/s
  },
  forecast: ['Sunny', 'Clear skies']
};

var weatherData = {}
// Function to fetch weather data for a city
async function fetchWeatherData(city) {
  // API URL with the city name and API key
  const apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}`;

  // Makes the API request using the fetch function
  weatherData = await fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      // Handle the weather data here
      console.log('Weather Data:', data);
      return data
    })
    .then()
    .catch((error) => {
      // Handle errors, such as network issues or invalid input
      console.error('Error:', error);
    });
    console.log(weatherData)
}

function updateUI(data) {
  const cityElement = document.getElementById('city');
  const temperatureElement = document.getElementById('temperature');
  const windSpeedElement = document.getElementById('wind');
  const humidityElement = document.getElementById('humidity');

  // Update the elements with the weather data
  cityElement.textContent = `City: ${data.name}`;
  temperatureElement.textContent = `Temperature: ${data.main.temp}°F`;
  windSpeedElement.textContent = `Wind: ${data.wind.speed} m/s`;
  humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
}


function printResults(resultObj) {
    console.log(resultObj);
    var resultCard = document.createElement('div');
  
    var resultBody = document.createElement('div');
    resultBody.classList.add('card-body');
    resultCard.append(resultBody);
  
    var titleEl = document.createElement('h3');
    titleEl.textContent = resultObj.title;
  
    var bodyContentEl = document.createElement('div');
    temperature.innerHTML =
      '<strong>Date:</strong> ' + resultObj.currentweather + '<br/>';
      if (resultObj.temperature) {
        temperature.innerHTML +=
          '<strong>Subjects:</strong> ' + resultObj.temperature.join(', ') + '<br/>';
      } else {
        bodyContentEl.innerHTML +=
          '<strong>Subjects:</strong> Try another city. ';
      }
    
      if (resultObj.forecast) {
        bodyContentEl.innerHTML +=
          '<strong>Description:</strong> ' + resultObj.forecast[0];
      } else {
        bodyContentEl.innerHTML +=
          '<strong>Description:</strong>  No description for this entry.';
      }
    
      resultBody.append(titleEl, bodyContentEl);
    
      resultContentEl.append(resultCard);
    }

    function searchApi(query, format) {
      var locQueryUrl = 'https://www.openweathermap.org/search/?fo=json';
    
      if (format) {
        locQueryUrl = 'https://www.openweathermap.org/search' + format + '/?fo=json';
      }
    
      locQueryUrl = locQueryUrl + '&q=' + query;
    
      fetch(locQueryUrl)
        .then(function (response) {
          if (!response.ok) {
            throw response.json();
          }
    
          return response.json();
        })
        .then(function (locRes) {
          // write query to page so user knows what they are viewing
          resultTextEl.textContent = locRes.search.query;
    
          console.log(locRes);
    
          if (!locRes.results.length) {
            console.log('No results found!');
            resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
          } else {
            resultContentEl.textContent = '';
            for (var i = 0; i < locRes.results.length; i++) {
              printResults(locRes.results[i]);
            }
          }
        })
        .catch(function (error) {
          console.error(error);
        });
      }
// Function to update the search history
function updateSearchHistory(city) {
    // Get the existing search history from local storage (if any)
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
  
    // Check if the city is already in the search history
    if (!searchHistory.includes(city)) {
      // If it's not in the history, add it to the beginning
      searchHistory.unshift(city);
    } else {
      // If it's in the history, move it to the beginning (to show most recent searches first)
      searchHistory = searchHistory.filter(item => item !== city);
      searchHistory.unshift(city);
    }
  
    // Limit the search history to a certain number of items (e.g., 5)
    const maxHistoryItems = 8;
    searchHistory = searchHistory.slice(0, maxHistoryItems);
  
    // Save the updated search history back to local storage
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  
    // Updates the search history list in the HTML
    const searchHistoryList = document.getElementById('search-history-list');
    searchHistoryList.innerHTML = '';
    searchHistory.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item;
      searchHistoryList.appendChild(li);
    });
  }
  
  

// Function to handle the search button click
function handleSearch() {
  const cityInput = document.getElementById('city-input');
  const cityName = cityInput.value;
  if (cityName.trim() !== '') {
    // Updates the search history and fetches the weather data
    updateSearchHistory(cityName);
    fetchWeatherData(cityName);
    // Clear the input field
    cityInput.value = '';
  }
}

// Add event listener to the search button
const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', handleSearch);

// Allow pressing Enter key to trigger the search
const cityInput = document.getElementById('city-input');
cityInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    handleSearch();
  }
});
