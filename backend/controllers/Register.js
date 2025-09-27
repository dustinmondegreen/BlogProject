import bcrypt from 'bcrypt'
import express from 'express'
const registerRouter = express.Router()
import User from '../models/user'

registerRouter.post('/', async (request, response) => {
    try{
        const { username, password } = request.body

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)

        const user = await User.create({
            username, 
            passwordHash
        })

    } catch (error) {
        console.log(error)
    }


})

export default registerRouter