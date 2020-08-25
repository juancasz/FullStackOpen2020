import React from 'react'

const Name = ({person,handleDelete}) => {
    return <>{person.name} {person.number} <button id={person.id} onClick={handleDelete}>delete</button><br/></>
}

const Persons = ({persons,handleDelete}) => {
    
    if(persons === undefined){
      return <div></div>
    }

    const personsList = persons.map((person) => { 
        return <Name key={person.id} person={person} handleDelete={handleDelete}/>
    })

    return(
      <div>
        {personsList}
      </div>  
    )
}

export default Persons