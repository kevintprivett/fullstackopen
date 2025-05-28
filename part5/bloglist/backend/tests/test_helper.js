const User = require('../models/user')
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

const initialUsers = [
  {
    username: 'username1',
    name: 'name1',
    passwordHash: '$2a$10$qLhWzcvDFsdIO9ac1Uo9l.Szb59a0uhLP52VWSzfjUjApg7eUh8eG'
    // password: 'password1'
  },
  {
    username: 'username2',
    name: 'name2',
    passwordHash: '$2a$10$k1VZRbLSz.fl/vENX.TVbe8ZBd8QbU.Vx5I1GkY1WLf/UOhON7Eye'
    // password: 'password2'
  }
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb,
  initialUsers, usersInDb
}
