import React,{useState, useEffect} from 'react';
import axios from 'axios'
import Display from './components/Display'

const App = () => {
  const[countries,setCountries] = useState([])
  const[searchFor,setSearchFor] = useState("") 
  const[show,setShow]= useState(false)
  const[indexShow,setindexShow] = useState(0)

  const hook = () => {
    axios.get('https://restcountries.eu/rest/v2/all')
        .then(response => {
          setCountries(response.data)
        })
  }

  useEffect(hook,[])

  const handleInput = (event) => {
    setSearchFor(event.target.value.toLowerCase())
    setShow(false)  
  }

  const handleClick = (event) => {
    setindexShow(event.target.id)
    setShow(!show)
  }

  const countriesToDisplay = countries.filter((country) => country.name.toLowerCase().indexOf(searchFor)>-1)

  return(
    <div>
      find countries <input onChange={handleInput}/><br/>
      <Display countries={countriesToDisplay} indexShow={indexShow} 
          handleClick={(event) => handleClick(event)} show={show} />
    </div>
  )
}

export default App;
