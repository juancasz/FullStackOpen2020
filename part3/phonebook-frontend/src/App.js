import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [searchFor, setSearchFor] = useState("")
  const [message, setMessage] = useState(null)
  const [color,setColor] = useState("green")

  const hook = () =>{
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }

  useEffect(hook,[])

  const personsToDisplay = showAll
                  ?persons
                  :persons.filter((person) => person.name.toLowerCase().indexOf(searchFor) > -1 )

  const handleInputName = (event) => {
    setNewName(event.target.value)
  }

  const handleInputNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleInputSearch = (event) => {
    if(event.target.value === ""){
      setShowAll(true)
    }else{
      setShowAll(false)
      setSearchFor(event.target.value.toLowerCase())
    }
  }

  const addContact = (event) => {
    event.preventDefault()
    const personToAdd = persons.filter((person) => person.name === newName)
    if(personToAdd.length > 0){
      const add = window.confirm(`${newName} is already added to phonebook, replace the older number with a new one?`) 
      if(add){
        const person = persons.find(p => p.name === newName)
        const changedPerson = {...person,number:newNumber}
        const id = person.id
        personService
          .update(id,changedPerson)
          .then(returnedPerson =>{
            setPersons(persons.map(person => person.id === id ? returnedPerson : person ) )
            setMessage(`Updated ${newName}`)
            setTimeout(() =>{
              setMessage(null)
            },5000)
          })
          .catch(error => {
            setColor("red")
            //setMessage(`${personToAdd[0].name} has already been removed from the server`)
            setMessage(error.response.data.errorMessage)
            setTimeout(() =>{
              setMessage(null)
              setColor("green")
            },5000)  
          })
      }
      setNewName("") 
      setNewNumber("")
    }else{
      const person ={
        name: newName,
        number: newNumber,
      }
      personService
        .create(person)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setMessage(`Added ${person.name}`)
          setTimeout(() =>{
            setMessage(null)
          },5000)
          setNewName("")  
          setNewNumber("")
        })
        .catch(error => {
          setColor("red")
          //setMessage(`${person.name} has already been removed from the server`)
          setMessage(error.response.data.errorMessage)
          setTimeout(() =>{
            setMessage(null)
            setColor("green")
          },5000)  
        })
    }
  }

  const handleDelete = (event) =>{
      const idDelete = event.target.id
      const personToDelete = persons.find((person) => person.id === idDelete)
      const remove = window.confirm(`Delete ${personToDelete.name}?`)
      if(remove){
        let deleted = true
        personService
          .remove(personToDelete.id)
          .catch(error => {
            setColor("red")
            setMessage(`${personToDelete.name} has already been removed from the server`)
            setTimeout(() =>{
              setMessage(null)
              setColor("green")
            },5000)  
            deleted = false
          })
        if(deleted){
          const newPersons = persons.filter((person) => person.id !== personToDelete.id)
          setPersons(newPersons)
          setMessage(`Deleted ${personToDelete.name}`)
          setTimeout(() =>{
            setMessage(null)
          },5000)  
        }
      }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} color={color} />
      <Filter handleInputSearch={(event)=>handleInputSearch(event)}/>
      <PersonForm addContact={(event)=>addContact(event)} newName={newName} 
        handleInputName={(event) => handleInputName(event)} newNumber={newNumber} 
        handleInputNumber={(event) => handleInputNumber(event)} />
      <h2>Numbers</h2>
      <Persons persons={personsToDisplay} handleDelete={(event)=>handleDelete(event)} />
    </div>
  )
}

export default App