import React from 'react'

const User = ({ user }) => {
  if(!user){
    return null
  }
  const blogs = user.blogs.map(blog => {
    return(
      <div key={blog.id}>
        <li>{blog.title}</li>
      </div>
    )
  })
  return(
    <div>
      <h2>{user.username}</h2>
      <h3>added blogs</h3>
      {blogs.length>0?<ul>{blogs}</ul>:'No added blogs'}
    </div>
  )
}

export default User