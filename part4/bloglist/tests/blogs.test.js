const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promises = blogObjects.map(blog => blog.save())
  await Promise.all(promises)
})

test('get all blogs returns initialBlogs.length', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('adding a blog returns a larger blogList containing it', async () => {
  await api
    .post('/api/blogs')
    .send(helper.blogToAdd)
    .expect(201)

  const blogsInDb = await helper.blogsInDb()

  assert.strictEqual(blogsInDb.length, helper.initialBlogs.length + 1)

  assert(blogsInDb.find(blog => blog.title === helper.blogToAdd.title))
})

describe('Adding a blog', () => {
  test('without likes defaults to 0', async() => {
    const { likes, ...blogToAddWithoutLikes } = helper.blogToAdd

    await api
      .post('/api/blogs')
      .send(blogToAddWithoutLikes)
      .expect(201)

    const blogsInDb = await helper.blogsInDb()

    assert.strictEqual(blogsInDb.length, helper.initialBlogs.length + 1)

    assert(blogsInDb.find(blog => blog.title === blogToAddWithoutLikes.title).likes === 0)
  })

  test('without title fails and returns 400', async() => {
    const { title, ...blogToAddWithoutTitle } = helper.blogToAdd

    await api
      .post('/api/blogs')
      .send(blogToAddWithoutTitle)
      .expect(400)

    const blogsInDb = await helper.blogsInDb()

    assert.strictEqual(blogsInDb.length, helper.initialBlogs.length)
  })

  test('without url fails and returns 400', async() => {
    const { url, ...blogToAddWithoutUrl } = helper.blogToAdd

    await api
      .post('/api/blogs')
      .send(blogToAddWithoutUrl)
      .expect(400)

    const blogsInDb = await helper.blogsInDb()

    assert.strictEqual(blogsInDb.length, helper.initialBlogs.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})