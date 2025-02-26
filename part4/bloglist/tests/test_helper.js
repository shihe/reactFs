const blog = require('../models/blog')

const initialBlogs = [
  {
    id: '1',
    title: 'First',
    author: 'First',
    url: 'url',
    likes: 4,
  },
  {
    id: '2',
    title: 'Second',
    author: 'Second',
    url: 'url',
    likes: 5,
  }
]

const blogToAdd = {
  id: '3',
  title: 'Third',
  author: 'Third',
  url: 'url',
  likes: 3,
}

const blogsInDb = async () => {
  const blogs = await blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogToAdd, blogsInDb
}