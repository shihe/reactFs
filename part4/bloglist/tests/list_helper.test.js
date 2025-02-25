const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })
})

describe('favorite blog', () => {
  const blogList = [
    {
      _id: '1',
      title: 'First',
      author: 'First',
      url: 'url',
      likes: 4,
      __v: 0
    },
    {
      _id: '2',
      title: 'Second',
      author: 'Second',
      url: 'url',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has multiple blogs, equals the blog with most likes', () => {
    const result = listHelper.favoriteBlog(blogList)
    assert.deepStrictEqual(result, blogList[1])
  })
})