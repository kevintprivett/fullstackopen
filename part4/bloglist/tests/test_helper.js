const blog = require('../models/blog')
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Test Blog',
    author: 'Me',
    url: 'www.example.com',
    likes: 24
  },
  {
    title: 'Bits and Peas',
    author: 'Oliver Stoneworth',
    url: 'www.bitsnpeas.uk',
    likes: 22
  },
  {
    title: 'Byte budgets',
    author: 'Linus Arelius',
    url: 'www.byte_budgets.com',
    likes: 69
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(note => note.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}