const WeatherInfo = ({ weatherInfo }) => {
    if(weatherInfo == null) return null
    return(
        <div>
            <p>Temperature: { weatherInfo.main.temp }</p>
            <img src={`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`}></img>
            <p>Wind speed: { weatherInfo.wind.speed }</p>
        </div>
    )
}

export default WeatherInfo