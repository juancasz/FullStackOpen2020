import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'
import BlogView from './components/BlogView'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import { setMessage } from '../src/reducers/notificationReducer'
import { initializeBlogs,newBlog,likeBlog,removeBlog,commentBlog } from '../src/reducers/blogReducer'
import { loginUser,logoutUser } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'
import { connect } from 'react-redux'
import { useDispatch } from 'react-redux'
import {
  Switch,
  Route,
  useRouteMatch,
  Link
} from 'react-router-dom'
import { Container,AppBar,Toolbar,Typography,Button } from '@material-ui/core'

const App = (props) => {
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')

  const blogFormRef = React.createRef()

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  },[dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.loginUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      props.loginUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      props.setMessage('wrong username or password','red',5)
    }
  }

  const handleLogout= () => {
    props.logoutUser()
  }

  const addNewBlog = (newBlog) => {
    blogFormRef.current.toggleVisibility()
    props.newBlog(newBlog)
    props.setMessage(`A new blog ${newBlog.title} by ${newBlog.author} added`,'green',5)
  }

  const removeBlog = (id) => {
    props.removeBlog(id)
  }

  const likeBlog = (id,newBlog) => {
    props.likeBlog(id,newBlog)
  }

  const blogForm = () => {
    return(
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <h2>create new</h2>
        <BlogForm addNewBlog={addNewBlog}/>
      </Togglable>
    )
  }

  if (props.user === null) {
    return (
      <Container>
        <h2>Log in to application</h2>
        <Notification />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              id='username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              id='password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit" id='login-button'>login</button>
        </form>
      </Container>
    )
  }

  const listBlogs = props.blogs.sort((a,b) => b.likes-a.likes)

  const DefaultView = () => {
    return(
      <React.Fragment>
        {blogForm()}
        {listBlogs.map(blog =>
          <Blog key={blog.id} blog={blog} removeBlog={removeBlog} likeBlog={likeBlog}/>
        )}
      </React.Fragment>
    )
  }

  const matchUser = useRouteMatch('/users/:id')
  const userSelected = matchUser?
    props.users.find(user => user.id ===matchUser.params.id):
    null

  const matchBlog = useRouteMatch('/blogs/:id')
  const blogSelected = matchBlog?
    props.blogs.find(blog => blog.id ===matchBlog.params.id):
    null

  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" noWrap>
            <Button><Link to="/" style={{ color:'white ' }}>blogs </Link></Button>
          </Typography>
          <Typography variant="h6" noWrap>
            <Button><Link to="/users" style={{ color:'white ' }}>users </Link></Button>
          </Typography>
          <span>{props.user.name} LOGGED IN <Button style={{ color:'white ' }} onClick={(event) => handleLogout(event)}>logout</Button></span>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop:'1em' }}>
        <Notification/>
        <Switch>
          <Route path="/blogs/:id">
            <BlogView blog={blogSelected} likeBlog={likeBlog} initializeUsers={initializeUsers} commentBlog={props.commentBlog}/>
          </Route>
          <Route path="/users/:id">
            <User user={userSelected}/>
          </Route>
          <Route path="/users">
            <Users users={props.users}/>
          </Route>
          <Route path="/">
            <DefaultView/>
          </Route>
        </Switch>
      </Container>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  // sometimes it is useful to console log from mapStateToProps
  console.log(state)
  return {
    blogs: state.blogs,
    user: state.user,
    users: state.users
  }
}

const mapDispatchToProps = {
  setMessage,
  newBlog,
  likeBlog,
  removeBlog,
  commentBlog,
  loginUser,
  logoutUser
}

const connectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default connectedApp