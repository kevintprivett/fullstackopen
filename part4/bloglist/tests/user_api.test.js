const { test, after, beforeEach } = require('node:test')
const User = require('../models/user')
const assert = require('node:assert')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const { title } = require('node:process')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  const userObjects = helper.initialUsers
    .map(user => new User(user))
  const promiseArray = userObjects.map(user => user.save()) 
  await Promise.all(promiseArray)
})

test('users are returned as json', async () => {
  await api
    .get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('id is NOT _id!', async () => {
  const response = await api.get('/api/users')

  const first = response.body[0]

  assert(!first.hasOwnProperty('_id'))

  assert(first.hasOwnProperty('id'))
})

test('POST works', async () => {
  const newUser = {
    username: 'username3',
    name: 'user3',
    password: 'password3'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const usersAtEnd = await helper.usersInDb()
  assert.strictEqual(usersAtEnd.length, helper.initialUsers.length + 1)

  const names = usersAtEnd.map(user => user.name)
  assert(names.includes('user3'))
})

test('Short username error handling', async () => {
  const newUser = {
    username: 'us',
    name: 'user3',
    password: 'password3'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  const usersAtEnd = await helper.usersInDb()
  assert.strictEqual(usersAtEnd.length, helper.initialUsers.length)
})

test('Repeat username error handling', async () => {
  const newUser = {
    username: 'username2',
    name: 'user3',
    password: 'password3'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  const usersAtEnd = await helper.usersInDb()
  assert.strictEqual(usersAtEnd.length, helper.initialUsers.length)
})

test('Short password error handling', async () => {
  const newUser = {
    username: 'username3',
    name: 'user3',
    password: 'pa'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  const usersAtEnd = await helper.usersInDb()
  assert.strictEqual(usersAtEnd.length, helper.initialUsers.length)
})

/*
test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  const titles = blogsAtEnd.map(r => r.title)

  assert(!titles.includes(blogToDelete.title))

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
}) 

test('a blog can be updated', async () => {
  const blogsAtStart = await helper.blogsInDb()
  let firstBlog = blogsAtStart[0]

  firstBlog.likes += 1

  const returnedBlog = await api
    .put(`/api/blogs/${firstBlog.id}`)
    .send(firstBlog)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)

  const savedBlog = blogsAtEnd.find(blog => blog.title === firstBlog.title)
  assert.strictEqual(savedBlog.likes, firstBlog.likes)
})
*/

after(async () => {
  await mongoose.connection.close()
})