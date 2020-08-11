import React from 'react'

const Name = (props) => {
    return <>{props.person.name} {props.person.number} <button id={props.person.id} onClick={props.handleDelete}>delete</button><br/></>
}

const Persons = (props) => {
    const personsList = props.persons.map((person) => { 
        return <Name key={person.id} person={person} handleDelete={props.handleDelete}/>
    })

    return(
      <div>
        {personsList}
      </div>  
    )
}

export default Persons