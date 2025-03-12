const { test, after, beforeEach } = require('node:test')
const Blog = require('../models/blog')
const assert = require('node:assert')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const { title } = require('node:process')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save()) 
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('id is NOT _id!', async () => {
  const response = await api.get('/api/blogs')

  const first = response.body[0]

  assert(!first.hasOwnProperty('_id'))

  assert(first.hasOwnProperty('id'))
})

test('POST works', async () => {
  const newBlog = {
    title: 'test title',
    author: 'test author',
    url: 'test.url.com',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(blog => blog.title)
  assert(titles.includes('test title'))
})

test('Likes missing => zero likes', async () => {
  const newBlog = {
    title: 'test title',
    author: 'test author',
    url: 'test.url.com'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  const savedNewBlog = blogsAtEnd.find(blog => blog.title === 'test title')

  assert(savedNewBlog)

  assert.strictEqual(savedNewBlog.likes, 0)
})

test('invalid blog is not added', async () => {
  const newBlog1 = {
    title: 'test title',
    author: 'test author',
    likes: 0
  }
  
  const newBlog2 = {
    author: 'test author',
    url: 'test.url.com',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog1)
    .expect(400)

  await api
    .post('/api/blogs')
    .send(newBlog2)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

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

after(async () => {
  await mongoose.connection.close()
})