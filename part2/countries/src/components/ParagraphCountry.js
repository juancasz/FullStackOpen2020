import React from 'react'

const ParagraphCountry = (props) => {
    return <>{props.country.name}<button id={props.index} onClick={props.handleClick}>show</button><br/></>
}

export default ParagraphCountry