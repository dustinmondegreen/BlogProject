import bcrypt from 'bcrypt'
import express from 'express'
const registerRouter = express.Router()
import User from '../models/user.js'

// registerRouter.get('/', async )

registerRouter.post('/', async (request, response) => {
    try{
        const { username, password } = request.body

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)

        const user = await User.create({
            username, 
            passwordHash
        })

        return response.status(201).json(user)

    } catch (error) {
        response.status(404).json(error)
    }
})

export default registerRouter