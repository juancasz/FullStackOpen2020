import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type){
  case 'INIT_BLOGS':
    return action.data
  case 'NEW_BLOG':
    return [...state,action.data]
  case 'LIKE':{
    const id = action.data.id
    let updatedBlog = state.find(blog => blog.id === id)
    updatedBlog = { ...updatedBlog,likes:updatedBlog.likes+1 }
    return state.map(blog => blog.id === id? updatedBlog:blog)
  }
  case 'DELETE':{
    const id = action.id
    return state.filter(blog => blog.id !== id)
  }
  case 'COMMENT':{
    const id = action.id
    let updatedBlog = state.find(blog => blog.id === id)
    updatedBlog = { ...updatedBlog,comments: action.comments }
    return state.map(blog => blog.id === id? updatedBlog:blog)
  }
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const newBlog = (content) => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type : 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const likeBlog = (id,blog) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(id,blog)
    dispatch({
      type: 'LIKE',
      data: updatedBlog
    })
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'DELETE',
      id: id
    })
  }
}

export const commentBlog = (id,comment) => {
  return async dispatch => {
    const commentedBlog = await blogService.comment(id,comment)
    const comments = commentedBlog.comments
    dispatch({
      type: 'COMMENT',
      id: id,
      comments: comments
    })
  }
}

export default reducer