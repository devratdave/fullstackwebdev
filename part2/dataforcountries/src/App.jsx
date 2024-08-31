import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import Information from "./components/Information"
import WeatherInfo from "./components/WeatherInfo"

const api_key = import.meta.env.VITE_SOME_KEY

function App() {
  const [ countries, setCountries ] = useState([])
  const [ searchResult, setSearchResult ] = useState([])
  const [ weatherInfo, setWeatherInfo ] = useState(null)

  const buttonOnClick = (countryName, lat, lon) => {
    const country = countries.filter((count)=>count.name.common == countryName)
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`
    const weather = axios.get(weatherUrl)
    weather.then(response=>setWeatherInfo(response.data))
    setSearchResult(country)
  }

  useEffect(()=>{
    const response = axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    response.then(res=>setCountries(res.data))
  }, [])


  const onSearch = (e) => {
    const result = countries.filter((country)=>country.name.common.toLowerCase().includes(e.target.value.toLowerCase())) 
    setSearchResult([...result])
  }

  return (
    <div>
      <div>
        Find Countries: <input onChange={(e)=>onSearch(e)} placeholder='Country Name...'/>
      </div>
      <br />
      <Information arr={searchResult} buttonOnClick={buttonOnClick}/>
      <WeatherInfo weatherInfo={weatherInfo} />
    </div>
  )
}

export default App
