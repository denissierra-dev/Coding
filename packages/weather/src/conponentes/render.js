export function createAppStructure() {
    return `
      <div class="container">
            <div class="titulo">
              <h1>Weather App</h1>
            </div>
            <div>
                <form id="weather-form">
                    <input 
                      type="text" 
                      id="weather-input" 
                      placeholder="Ingrese su ciudad (Ejemplo: Madrid)" 
                      required
                    >
                    <button type="submit">Buscar Clima</button>
                </form>
            </div>
            <div id="loading" class="loading"></div>
            <div id="weather-container" class="weather-container"></div>
            <div id="forecast-container" class="forecast-container"></div>
            <div id="error" class="error"></div>
      </div>
    `;
}

export function setLoading(state) {
    const loadingElement = document.getElementById('loading');
    loadingElement.style.display = state ? 'block' : 'none';
    loadingElement.innerHTML = state ? '<p>Cargando...</p>' : '';
}

export function renderError(message) {
  const errorDiv = document.getElementById('error');
  const weatherContainer = document.getElementById('weather-container');
  const forecastContainer = document.getElementById('forecast-container');

  errorDiv.innerHTML = `<p class="error">${message}</p>`;
  errorDiv.style.display = 'block';
  weatherContainer.innerHTML = '';
  forecastContainer.innerHTML = '';
}

export function renderWeather(data) {
    const weatherContainer = document.getElementById('weather-container');
    const errorDiv = document.getElementById('error');
    
    // Limpiar error anterior
    errorDiv.innerHTML = '';
    errorDiv.style.display = 'none';
    
    weatherContainer.innerHTML = `
        <h2>${data.city}, ${data.country}</h2>
        <img src="https://openweathermap.org/img/wn/${data.icon}@2x.png" alt="${data.description}">
        <p class="temp">${data.temp}°</p>
        <p class="description">${data.description}</p>
        <p>💧 Humedad: ${data.humidity}%</p>
        <p>💨 Viento: ${data.windSpeed} m/s</p>
        <p>🌡️ Sensación térmica: ${data.feelsLike}°</p>
    `;
}

export function renderForecast(forecast) {
  const forecastContainer = document.getElementById('forecast-container');
  console.log(forecast);
  const forecastHTML = forecast.map(day => `
    <div class="forecast-card">
      <p class="day">${day.day}</p>
      <img src="https://openweathermap.org/img/wn/${day.icon}@2x.png" alt="weather icon">
      <p class="temp">${day.temp}°</p>
    </div>
  `).join('');
  
  forecastContainer.innerHTML = `
    <h3>Pronóstico 5 días</h3>
    <div class="forecast-list">
      ${forecastHTML}
    </div>
  `;
}