import axios from 'axios'
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?'
const api = import.meta.env.VITE_OMW_KEY

const getWeather = ( country ) => {
  console.log(country.latlng)

  const request = axios.get(
    `${baseUrl}lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${api}&units=metric`
  )

  return request.then(response => response.data)
}

export default { getWeather }