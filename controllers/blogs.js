const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    if(blogs){
        response.json(blogs)
    } else {
        response.status(404).json({error: 'Resource not found'})
    }
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    const result = await blog.save()
    if(!blog){
        return response.status(400).error('Blog Couldn\'t be saved')
    }
    return response.status(201).json(result)
})



module.exports = blogsRouter