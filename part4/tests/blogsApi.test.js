const { test, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const { initialBlogs } = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blogs')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  await Blog.create(initialBlogs[0])
  await Blog.create(initialBlogs[1])
  await Blog.create(initialBlogs[2])
})

test.only('if the response is json', async () => {
  await api
    .get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
})


test.only('there are 2 initial notes', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.blogs.length, initialBlogs.length)
})


test.only('check if the _id is changed to id', async () => {
  const response = await api.get('/api/blogs')

  // eslint-disable-next-line no-prototype-builtins
  const result = response.body.blogs.map(blog => blog.hasOwnProperty('id'))
  assert.deepStrictEqual(result, [ true, true, true ])
})


test.only('test to check if the post method is working correctly', async () => {
  const newBlog = {
    title: 'AYo yo boy is the best',
    author: 'ocboibvuweouqpIOBXOBCYIVCOVDVCOUBSPXINCPIBCUOVDOUB',
    url: 'github/com/devratdave',
    likes: 100
  }

  const response = await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)

  const blogsResponse = await api.get('/api/blogs')

  const blogConfirmation = await blogsResponse.body.blogs.filter(blog => blog.id === response.body.result.id)
  assert.strictEqual(response.body.result.id, blogConfirmation[0].id)
})


test.only('test to check if no number of likes is provided in the body, it defaults to 0', async () => {
  const newBlog = {
    title: '  PICDCIPSIPDCNP  ISBCP INPNPDIBV',
    author: 'Thaara bhai joginder',
    url: 'facebook.com'
  }
  const response = await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.result.likes, 0)
})

test.only('test to check if the status code is returned to be 400 if the body sent it incorrect', async () => {
  const newBlog = {
    author: 'aicubibqv[oc',
    likes: 10
  }
  const response = await api.post('/api/blogs').send(newBlog)
  assert.strictEqual(response.status, 400)
})