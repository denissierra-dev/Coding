import './style.css'
import { createAppStructure, renderWeather, renderForecast, renderError, setLoading } from './conponentes/render.js'
import { fetchCurrentWeather, fetchForecast } from './api/fetchWeather.js'

document.querySelector('#app').innerHTML = createAppStructure();

const form = document.getElementById('weather-form')
const input = document.getElementById('weather-input')

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const city = input.value.trim();
    if (city === '') {
        renderError('Por favor, ingrese una ciudad válida.');
        return;
    };
    try {
        setLoading(true);

        const [currentWeather, forecast] = await Promise.all([
            fetchCurrentWeather(city),
            fetchForecast(city)
        ]);
        console.log("Current Weather:", forecast);
            
        renderWeather(currentWeather);
        renderForecast(forecast);
    } catch (error) {
        console.error(error);
        renderError('Error al obtener los datos del clima. Por favor, inténtelo de nuevo más tarde.');
    } finally {
        setLoading(false);
    }
})