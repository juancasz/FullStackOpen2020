import React from 'react'

const PersonForm = (props) => {
    return(
        <form onSubmit={props.addContact}>
        <div>
          name: <input value={props.newName} onChange={props.handleInputName}/>
        </div>
        <div>
          number: <input value={props.newNumber} onChange={props.handleInputNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm