import React from 'react'

const Weather = ({weather}) =>{
    
    if(weather.current === undefined){
        return <div>Fetching weather, please wait..</div>
    }
    return(
        <div>
            <b>temperature:</b> {weather.current.temperature} Celsius<br/>
            <img src={weather.current.weather_icons[0]} width="100" alt="flag"/><br/>
            <b>wind:</b> {weather.current.wind_speed} mph direction {weather.current.wind_dir}
        </div>
    )
}

export default Weather