// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeather API key
  
    const form = document.getElementById('city-form');
    const cityInput = document.getElementById('city-input');
    const currentWeatherContainer = document.getElementById('current-weather');
    const forecastContainer = document.getElementById('forecast');
  
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const city = cityInput.value.trim();
      if (city !== '') {
        getWeatherData(city);
        cityInput.value = '';
      }
    });
  
    async function getWeatherData(city) {
      try {
        // Fetch current weather data
        const currentResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
        );
        const currentData = await currentResponse.json();
  
        // Fetch 5-day forecast data
        const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
        );
        const forecastData = await forecastResponse.json();
  
        // Display current weather and forecast on the page
        displayCurrentWeather(currentData);
        displayForecast(forecastData);
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to fetch weather data. Please try again later.');
      }
    }
  
    function displayCurrentWeather(data) {
      // Extract relevant data from the API response
      const city = data.name;
      const date = new Date(data.dt * 1000).toLocaleDateString();
      const temperature = data.main.temp;
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;
      const iconCode = data.weather[0].icon;
  
      // Create HTML elements to display the current weather
      const weatherHTML = `
        <h2>Current Weather in ${city}</h2>
        <p>Date: ${date}</p>
        <p>Temperature: ${temperature} &#8451;</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
        <img src="http://openweathermap.org/img/w/${iconCode}.png" alt="Weather Icon">
      `;
      currentWeatherContainer.innerHTML = weatherHTML;
    }
  
    function displayForecast(data) {
      // Extract relevant data from the API response
      const forecast = data.list;
  
      // Create HTML elements to display the 5-day forecast
      let forecastHTML = '<h2>5-Day Forecast</h2>';
      for (let i = 0; i < forecast.length; i++) {
        const date = new Date(forecast[i].dt * 1000).toLocaleDateString();
        const temperature = forecast[i].main.temp;
        const humidity = forecast[i].main.humidity;
        const windSpeed = forecast[i].wind.speed;
        const iconCode = forecast[i].weather[0].icon;
  
        forecastHTML += `
          <div class="forecast-day">
            <p>Date: ${date}</p>
            <p>Temperature: ${temperature} &#8451;</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind Speed: ${windSpeed} m/s</p>
            <img src="http://openweathermap.org/img/w/${iconCode}.png" alt="Weather Icon">
          </div>
        `;
      }
      forecastContainer.innerHTML = forecastHTML;
    }
  });
  