import { useState, useEffect } from 'react'

import weatherService from './../services/weatherService' 

const Weather = ({ country }) => {
  const [weather, setWeather] = useState([])

  const icon_url = "https://openweathermap.org/img/wn/"

  useEffect(() => {
    weatherService
      .getWeather(country)
      .then( newWeather => {
        console.log(newWeather)
        setWeather(newWeather)
      })
  }, [])

  return (
    <div>
      <h2>Weather in {country.capital}</h2>

      <div>temperature {weather?.main?.temp} Celcius</div>

      {weather.weather
        ? <img src={`${icon_url}${weather.weather[0].icon}@4x.png`} alt={weather.weather.description} />
        : <></>
      }

      <div>wind {weather?.wind?.speed} m/s</div>
    </div>
  )
}

export default Weather