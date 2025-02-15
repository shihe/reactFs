import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'
const weatherBaseUrl='http://api.weatherapi.com/v1/current.json'
const api_key = import.meta.env.VITE_WEATHER_API_KEY

const getAll = () => {
  const request = axios.get(`${baseUrl}/all`)
  return request.then(response => response.data)
}

const getWeather = (capital) => {
  const request = axios.get(`${weatherBaseUrl}?key=${api_key}&q=${capital}`)
  return request.then(response => response.data)
}

export default { getAll, getWeather }