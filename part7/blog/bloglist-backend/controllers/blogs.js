const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response,next) => {
    try{
      const blogs = await Blog
      .find({}).populate('user',{username:1,name:1})

      response.json(blogs.map(blog => blog.toJSON()))
    }catch(error){
      next(error)
    }
})
  
blogsRouter.post('/', async (request, response,next) => {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {    
      return response.status(401).json({ error: 'token missing or invalid' })  
    }  
    
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url : body.url,
      likes : body.likes,
      user: user._id
    })

    if(blog.title === undefined || blog.url === undefined){
      return response.status(400).json({error:"Missing title or url"})
    }

    try{
      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
      response.status(201).json(savedBlog.toJSON())
    }catch(error){
      next(error)
    }
})

blogsRouter.get('/:id', async (request, response, next) => {
  try{
    const blog = await Blog.findById(request.params.id)

    if (blog) {
      response.json(blog.toJSON())
    } else {
      response.status(404).end()
    }
  }catch(error){
    next(error)
  }

})

blogsRouter.delete('/:id', async (request, response,next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {    
    return response.status(401).json({ error: 'token missing or invalid' })  
  }  
  
  const blog = await Blog.findById(request.params.id)
  const user = await User.findById(decodedToken.id)
  
  try{
    if(blog.user.toString() === user.id.toString()){
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    }else{
      response.status(401).json({error:"You can't delete this blog"})
    }
  }catch(error){
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  try{
    const body = request.body

    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }
  
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  
    if(updatedBlog){
      response.status(200).json(updatedBlog.toJSON())
    }else{
      response.status(404).end()
    }
  }catch(error){
    next(error)
  }
})

blogsRouter.post('/:id/comments', async(request,response,next) => {
  try{
    const body = request.body.comment
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {    
      return response.status(401).json({ error: 'token missing or invalid' })  
    }

    if(typeof body !== 'string'){
      return response.status(401).json({ error: 'comment is not a string' })  
    }

    const blog = await Blog.findById(request.params.id)
    if(blog){
      blog.comments = blog.comments.concat(body)
      const savedBlog = await blog.save()
      await savedBlog
      .populate({ path: "user", select: ["name", "username"] })
      .execPopulate();
      response.status(200).json(savedBlog.toJSON());
    }else{
      response.status(404).end();
    }
  }catch(error){
    next(error)
  }
})

module.exports=blogsRouter