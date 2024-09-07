const blogRouter = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/users')
const logger = require('../utils/logger')


blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

  return response.status(200).json(blogs)
})


blogRouter.post('/', async (request, response) => {
  const body = request.body

  if( !(body.title && body.url)){
    return response.status(400).end()
  }

  const decodedTokenData = request.token
  if (!decodedTokenData.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedTokenData.id)

  const blog = await Blog.create({
    title: body.title,
    author: user.name,
    url: body.url,
    likes: body.likes || 0,
    user: user.id
  })

  await User.findByIdAndUpdate(user.id, { blogs: user.blogs.concat(blog.id) })

  return response.status(201).json({ blog })
})

blogRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  const decodedTokenData = request.token

  const blog = await Blog.findById(id)
  logger.info(decodedTokenData.id.toString())
  logger.info(blog.toString())
  logger.info(blog.user._id.toString())
  if(decodedTokenData.id.toString() === blog.user._id.toString()){
    await Blog.findByIdAndDelete(id)
    return response.status(204).end()
  } return response.status(401).json({ error: 'only owner has the right to the blog' })
})


blogRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const body = request.body
  const blogToUpdate = await Blog.findByIdAndUpdate(id, body, { new : true })

  return response.status(200).json(blogToUpdate)
})

module.exports = blogRouter