import express from "express"
import mongooseConnect from "./utils/mongooseConnect.js"
import registerRouter from "./controllers/Register.js"
import loginRouter from "./controllers/Login.js" 
const app = express()

app.use(express.static('dist'))
 
app.use(auth)

app.use('/auth/register', )
app.use('/auth/login', Login)

mongooseConnect();

export default app