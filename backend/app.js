import express from "express"
import { mongooseConnect } from "./utils/middleware.js"
import registerRouter from "./controllers/Register.js"
import loginRouter from "./controllers/Login.js" 
const app = express()

app.use(express.static('dist'))
app.use(express.json())
 
// app.use(auth)

app.use('/auth/register', registerRouter)
app.use('/auth/login', loginRouter)

mongooseConnect();

export default app