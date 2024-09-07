const Blog = require('../models/blogs')

const initialBlogs = [
  {
    title: 'Devrat Dave is the best',
    author: 'Devrat Dave',
    url: 'https://www.linkedin.com/in/devratdave',
    likes: 12
  },
  {
    title: 'Devraobodbvsodubvhe docibdocubdsvovdbs',
    author: 'Smrati Dae',
    url: 'https://www.linkedin.com/in/AbhIhOncb',
    likes: 5
  },
  {
    title: 'Ahbhodcb Dave is idbcpbvpdvb bestve is idbcpbvpdvb bestve is idbcpbvpdvb bestve is idbcpbvpdvb bestve is idbcpbvpdvb best',
    author: 'Abhidobco Dave',
    url: 'https://www.linkedin.com/in/bcousdb',
    likes: 31
  }
]

const blogsInDB = async () => {
  const blogs = await Blog.find({})
  const blogList = blogs.map(blog => blog.toJSON())
  console.log(blogList)
  return blogList
}

module.exports = {
  initialBlogs, blogsInDB
}