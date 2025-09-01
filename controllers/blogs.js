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

blogsRouter.get('/:id', async (request, response) => {
    const blogs = await Blog.findById(request.params.id)
    if(blogs){
        response.json(blogs)
    } else {
        response.status(404).json({error: 'Blog not found'})
    }
})

blogsRouter.post('/', async (request, response) => {
    try{
    const blog = new Blog(request.body)
    const result = await blog.save()
    return response.status(201).json(result)
    } catch (error) {
        if (error.name === 'ValidationError') {
            return response.status(400).json({ error: error.message })
        }  
    }
})

blogsRouter.put('/:id', async (request, response) => {
    const {title, author, url, likes } = request.body
    const blog = await Blog.findById(request.params.id)

    blog.title = title
    blog.author = author
    blog.url = url
    blog.likes = likes

    const result = await blog.save()
    return response.status(200).json(result)
    
})

blogsRouter.delete('/:id', async (request, response) => {
    const blog = await Blog.findByIdAndDelete(request.params.id)
    response.status(204).json(blog)
})

blogsRouter.delete('/', async (request, response) => {
    const blog = await Blog.deleteMany({})
    response.status(204).json(blog)
})




module.exports = blogsRouter