// Define your API endpoint and API key
const apiKey = '17ad41f53999999aeabff2f676cf09f8';
const apiEndpoint = 'https://api.openweathermap.org/data/2.5/weather';

var weatherData = {}
// Function to fetch weather data for a city
async function fetchWeatherData(city) {
  // Construct the API URL with the city name and API key
  const apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}`;

  // Make the API request using the fetch function
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

function printResults(resultObj) {
    console.log(resultObj);
    var resultCard = document.createElement('div');
    resultCard.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');
  
    var resultBody = document.createElement('div');
    resultBody.classList.add('card-body');
    resultCard.append(resultBody);
  
    var titleEl = document.createElement('h3');
    titleEl.textContent = resultObj.title;
  
    var bodyContentEl = document.createElement('p');
    bodyContentEl.innerHTML =
      '<strong>Date:</strong> ' + resultObj.currentweather + '<br/>';
      if (resultObj.currentweather) {
        bodyContentEl.innerHTML +=
          '<strong>Subjects:</strong> ' + resultObj.subject.join(', ') + '<br/>';
      } else {
        bodyContentEl.innerHTML +=
          '<strong>Subjects:</strong> No subject for this entry.';
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
    const maxHistoryItems = 5;
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
    // Update the search history and fetch weather data
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
