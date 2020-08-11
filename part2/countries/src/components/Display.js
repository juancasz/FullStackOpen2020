import React from 'react'
import ParagraphCountry from './ParagraphCountry'
import Country from './Country'

const Display = (props) => {
    if(props.countries.length>10){
      return <>Too many matches, specify another filter </>
    }else if(props.countries.length>1){
      const list = props.show?
                   <Country country={props.countries[props.indexShow]} />:
                   props.countries.map((country,index) => {
                      return <ParagraphCountry key={index} index={index} country={country} handleClick={props.handleClick}/>
                   })
      return <div>{list}</div>
    }else if(props.countries.length === 1){
      return <Country country={props.countries[0]} />
    }
    return <div></div>
}

export default Display