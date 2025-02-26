const { test, after, describe, beforeEach, before } = require('node:test')
const assert = require('node:assert')
const Blog = require('../models/blog')
const User = require('../models/user')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const helper = require('./test_helper')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const app = require('../app')

const api = supertest(app)

describe('With initialBlogs saved', () => {
  before(async () => {
    await User.deleteMany({})
    // Create user
    const passwordHash = await bcrypt.hash('pass', 10)
    const user = new User({ username: 'user', passwordHash })

    const createdUser = await user.save()

    this.id = createdUser.id
    // Generate token with created id
    this.token = jwt.sign(
      {
        username: 'user',
        id: this.id,
      },
      config.SECRET
    )
  })

  beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs.map(blog => {
      blog.user = this.id
      return new Blog(blog)
    })

    const promises = blogObjects.map(blog => blog.save())
    await Promise.all(promises)
  })

  describe('Getting all blogs', () => {
    test('returns initialBlogs.length', async () => {
      const response = await api
        .get('/api/blogs')
        .set({ Authorization: `Bearer ${this.token}` })
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })
  })

  describe('Adding a blog', () => {
    test('returns a larger blogList containing it', async () => {
      await api
        .post('/api/blogs')
        .send(helper.blogToAdd)
        .set({ Authorization: `Bearer ${this.token}` })
        .expect(201)

      const blogsInDb = await helper.blogsInDb()

      assert.strictEqual(blogsInDb.length, helper.initialBlogs.length + 1)

      assert(blogsInDb.find(blog => blog.title === helper.blogToAdd.title))
    })

    test('without likes defaults to 0', async() => {
      const { likes, ...blogToAddWithoutLikes } = helper.blogToAdd

      await api
        .post('/api/blogs')
        .send(blogToAddWithoutLikes)
        .set({ Authorization: `Bearer ${this.token}` })
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
        .set({ Authorization: `Bearer ${this.token}` })
        .expect(400)

      const blogsInDb = await helper.blogsInDb()

      assert.strictEqual(blogsInDb.length, helper.initialBlogs.length)
    })

    test('without url fails and returns 400', async() => {
      const { url, ...blogToAddWithoutUrl } = helper.blogToAdd

      await api
        .post('/api/blogs')
        .send(blogToAddWithoutUrl)
        .set({ Authorization: `Bearer ${this.token}` })
        .expect(400)

      const blogsInDb = await helper.blogsInDb()

      assert.strictEqual(blogsInDb.length, helper.initialBlogs.length)
    })

    test('without token fails and returns 401', async () => {
      await api
        .post('/api/blogs')
        .send(helper.blogToAdd)
        .expect(401)
    })
  })

  describe('Deleting a blog', () => {
    test('returns initialBlogs.length-1 length', async() => {
      const initialBlogsInDb = await helper.blogsInDb()

      const idToDelete = initialBlogsInDb[0].id
      console.log(idToDelete)
      await api
        .delete(`/api/blogs/${idToDelete}`)
        .set({ Authorization: `Bearer ${this.token}` })
        .expect(204)

      const blogsInDb = await helper.blogsInDb()

      assert.strictEqual(blogsInDb.length, helper.initialBlogs.length - 1)
    })
  })

  describe('Updating a blog\'s likes', () => {
    test('returns blog with updated likes', async() => {
      const updatingLikes = {
        likes: 10
      }

      const initialBlogsInDb = await helper.blogsInDb()
      const idToUpdate = initialBlogsInDb[0].id

      const updatedBlog = await api
        .put(`/api/blogs/${idToUpdate}`)
        .send(updatingLikes)
        .set({ Authorization: `Bearer ${this.token}` })
        .expect(200)

      assert.strictEqual(updatedBlog.body.likes, updatingLikes.likes)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})