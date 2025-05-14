const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const { request } = require('../app')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs')
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (password.length < 3) {
    return response.status(400).json({ error: 'Password length too short' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  
  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user
    .save()
    .then((savedUser) => {
      response.status(201).json(savedUser)
    }, error => {
      console.log(error)
      response.status(400).end()
    })

  // response.status(201).json(savedUser)
})

module.exports = usersRouter
