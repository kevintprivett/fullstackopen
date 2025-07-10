const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user')

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const user = request.user

  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0,
    user: user._id
  })

  try {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  }
  catch(exception) {
    response.status(400).end()
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  const user = request.user

  if (blog.user.toString() === user.id) {
    await Blog.deleteOne(blog)

    user.blogs = user.blogs.filter((list_blog) => list_blog.toString() !== blog.id)

    await user.save()

    return response.status(204).end()
  }
  else {
    return response
      .status(401)
      .json({
        error: 'Blogs can only be deleted by the creator of the blog'
      })
      .end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const existingBlog = await Blog.findById(request.params.id)

  const body = request.body

  const blog = {
    ...existingBlog,
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  const updatedBlog = await 
    Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  
  response.json(updatedBlog)
})

module.exports = blogsRouter
