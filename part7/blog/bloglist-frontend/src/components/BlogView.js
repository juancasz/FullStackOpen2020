import React,{ useState } from 'react'

const BlogView = ({ blog,likeBlog,commentBlog }) => {
  const[comment,setComment] = useState('')
  if(!blog){
    return null
  }
  const likeThis = async() => {
    const newBlog={
      ...blog,
      likes:blog.likes+1,
    }

    await likeBlog(blog.id,newBlog)
  }
  const comments = blog.comments.map((comment,index) => {
    return <li key={index}>{comment}</li>
  })
  const addComment = (event) => {
    event.preventDefault()
    commentBlog(blog.id,comment)
    setComment('')
  }
  return(
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>{blog.likes} likes<button data-cy="buttonlike" onClick={likeThis}>like</button></p>
      <p>added by {blog.user.name}</p>
      <br/>
      <h3>comments</h3>
      <form onSubmit={addComment}>
        <input
          type="text"
          name="comment"
          className='comment'
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button type="submit">add comment</button><br/>
      </form>
      {blog.comments.length>0?<ul>{comments}</ul>:'No added comments'}
    </div>
  )
}

export default BlogView