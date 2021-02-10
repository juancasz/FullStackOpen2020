import React,{ useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR,ALL_AUTHORS } from '../queries'
import Select from 'react-select'

const Authors = (props) => {
  const[name,setName] = useState("")
  const[born,setBorn] = useState("")
  const [ changeAuthor ] = useMutation(EDIT_AUTHOR,{
    refetchQueries: [{ query: ALL_AUTHORS }],
  })
  const authors = props.authors
  const authorsSelect = authors?authors.map(author => author.name):[]
  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    
    changeAuthor({variables:{name:name,setBornTo:born}})

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      {props.token &&
        <div>
        <h3>Set birthyear</h3>
        <form onSubmit={submit}>
          <div>
            <Select 
              isClearable
              options={authorsSelect} 
              getOptionLabel={option => option}  
              onChange={(value) => setName(value)}
              value={authorsSelect.filter(function(option) {
                return option === name;
              })}
            />
          </div>
          <div>
            born
            <input
              type='number'
              value={born}
              onChange={({ target }) => setBorn(Number(target.value))}
            />
          </div>
          <button type='submit'>update author</button>
        </form>
        </div>
      }
    </div>
  )
}

export default Authors
