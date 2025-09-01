const { test, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const {dummy, totalLikes, favoriteBlog} = require('../utils/list_helper')
const supertest = require('supertest')
const app = require('../app')
const blog = require('../models/blog')

const api = supertest(app)

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

describe('Blog Tests', () => {
  // test('dummy returns one', () => {
//   const blogs = []

//   const result = dummy(blogs)
//   assert.strictEqual(result, 1)
// })

  test('totalLikes returns the total number of likes in a collection', () => {
    const result = totalLikes(blogs)
    assert.strictEqual(result, 36)
  })

  test('favoriteBlog function returns blog with most likes', () => {
    const result = favoriteBlog(blogs)
    assert.deepStrictEqual(result, blogs[2])
  })
})

describe('Tests for exercise 4.8 - 4.12', () => {
  beforeEach(async () => {
    await blog.deleteMany({})
    await blog.insertMany(blogs)
  })

  test('Request to /api/blogs returns the correct amount of blog posts', async () => {
    const response = await api.
    get('/api/blogs').
    expect(200).
    expect('Content-Type', /application\/json/)
    assert.strictEqual(response.body.length, blogs.length)
  })

  test('All blogs have an id field', async () => {
    const response = await api.
    get('/api/blogs').
    expect(200).
    expect('Content-Type', /application\/json/)

    const result = response.body.every((blog) => 'id' in blog) 

    assert.strictEqual(result, true)
  })

  test('A new blog adds the amount of blogs by 1', async () => {
    const newBlog = {
      "title": "Aurora Borealis", 
      "author": "yoyomayo",
      "url": "hello!",
      "likes": 5
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, blogs.length + 1)
    assert(response.body.some(blog => blog.title === "Aurora Borealis"))
  })

  test('If a like property is missing then the like is 0', async () => {
    const newBlog = {
      "title": "Aurora Borealis", 
      "author": "yoyomayo",
      "url": "hello!"
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const returnedBlog = response.body.find(blog => blog.title === 'Aurora Borealis')
    const result = returnedBlog.likes === 0
    assert(result)
  })

  test('Title or Url properties ', async () => {
    const newBlog = {
      "title": "Aurora Borealis"
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)


  })
})