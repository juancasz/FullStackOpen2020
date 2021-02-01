import React from 'react'
import { Link } from 'react-router-dom'

const Users = ({ users }) => {
  const rows = users.map((user,index) => {
    return(
      <React.Fragment key={index}>
        <tr>
          <td><Link to={`users/${user.id}`}>{user.username}</Link></td>
          <td>{user.blogs.length}</td>
        </tr>
      </React.Fragment>
    )
  })
  return(
    <div>
      <table>
        <th></th>
        <th><b>blogs created</b></th>
        {rows}
      </table>
    </div>
  )
}

export default Users