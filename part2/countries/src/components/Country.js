import React,{useState,useEffect} from 'react'
import Weather from './Weather'
import axios from 'axios'

const ParagraphLanguage = ({language}) => {
  return <li>{language.name}</li>
}

const Country = ({country}) =>{
    
    const api_key_weather = process.env.REACT_APP_API_KEY
    const[weather,setWeather] = useState([])

    const hook = () => {
        axios.get(`http://api.weatherstack.com/current?access_key=${api_key_weather}&query=${country.capital}`)
            .then(response => {
                if(response.data.sucess !== false){
                    setWeather(response.data)
                }
            })
    }
    
    useEffect(hook,[])  

    const languages = country.languages.map((language,index)=>{
        return <ParagraphLanguage key={index} language={language}/>
    })

    return(
        <div>
        <h2>{country.name}</h2>
        capital {country.capital}<br/>  
        population {country.population}<br/>
        <h3>Languages</h3>
        <ul>{languages}</ul>
        <img src={country.flag} width="200" alt="flag"/>
        <h3>Weather in {country.capital}</h3>
        <Weather weather={weather}/>
        </div>
    )
}

export default Country