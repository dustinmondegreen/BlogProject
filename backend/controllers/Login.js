import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import express from 'express'
const loginRouter = express.Router()
import User from '../models/user'
import { SECRET_KEY } from '../config/config'


loginRouter.post('/', async (request, response) => {
    try{
        const { username, password } = request.body
        const user = await User.findOne({username })
        const passwordCorrect = await bcrypt.compare(password, user.passwordHash)
        if(!(user) || !(passwordCorrect)){
            return response.status(401).json({error: 'Invalid username or password'})
        }

        const userInfo = {
            id: user.id,
            username: user.username
        }

        const token = jwt.sign(userInfo, SECRET_KEY)

        response.status(200).send({token, username})
    } catch (error) {
        console.log(error)
    }
})

export default loginRouter