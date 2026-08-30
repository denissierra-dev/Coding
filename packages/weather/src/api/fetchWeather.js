import { API_KEY, API_URL, FORECAST_URL } from '../utils/constants.js'
import { getFiveDayForecast } from '../utils/dates.js'

export async function fetchCurrentWeather(city) {
    const url = `${API_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=es`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Ciudad no encontrada');
            }
            throw new Error('Error al obtener el clima');
        }
        const data = await response.json();
        return {
            city: data.name,
            country: data.sys.country,
            temp: Math.round(data.main.temp),
            feelsLike: Math.round(data.main.feels_like),
            description: data.weather[0].description,
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            icon: data.weather[0].icon
        }
    } catch (error) {
        console.error('Error:', error.message);
        throw error;  // ← RE-LANZAR para manejarlo en main.js
    }
}

export async function fetchForecast(city) {
    const url = `${FORECAST_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=es`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Ciudad no encontrada');
            }
            throw new Error('Error al obtener el pronóstico');
        }
        const data = await response.json();
        return getFiveDayForecast(data);
    }catch (error){
        console.error('Error:', error.message);
        throw error; 
    }
}