const _ = require('lodash')
const { logger } = require('./logger')

const dummy = (blogs) => {
  logger.info(blogs)
  return 1
}

const totalLikes = (blogs) => {
  if(blogs.length === 0) return 0
  if(blogs.length === 1) return blogs[0].likes
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favBlog = (blogs) => {
  if(blogs.length === 0) return { title: '', author: '', likes: 0 }
  else if(blogs.length === 1) return { title: blogs[0].title, author: blogs[0].author, likes: blogs[0].likes }
  let favBlog = { title: blogs[0].title, author: blogs[0].author, likes: blogs[0].likes }
  blogs.map(blog => {
    if(blog.likes > favBlog.likes){
      favBlog.title = blog.title
      favBlog.author = blog.author
      favBlog.likes = blog.likes
    }
  })
  return favBlog
}


const mostBlogs = (blogs) => {
  if(blogs.length === 0) return { author: '', blogs: 0 }
  else if(blogs.length === 1) return { author: blogs[0].author, blogs: 1 }

  const mostBlog = {
    author: blogs[0].author,
    blogs: 0
  }

  const partial = _.groupBy(blogs, 'author')

  _.forEach(partial, (val, key) => {
    if(val.length > mostBlog.blogs){
      mostBlog.author = key
      mostBlog.blogs = val.length
    }
  })
  return mostBlog
}

const mostLikes = (blogs) => {
  if(blogs.length === 0) return { author: '', likes: 0 }
  else if(blogs.length === 1) return { author: blogs[0].author, likes: blogs[0].likes }

  const mostBlog = {
    author: blogs[0].author,
    likes: blogs[0].likes
  }

  const partial = _.groupBy(blogs, 'author')

  _.forEach(partial, (val, key) => {
    const liked = val.reduce((sum, item) => {
      return sum + item.likes
    }, 0)

    if(liked > mostBlog.likes){
      mostBlog.author = key
      mostBlog.likes = liked
    }
  })
  return mostBlog
}

module.exports = { dummy, totalLikes, favBlog, mostBlogs, mostLikes }