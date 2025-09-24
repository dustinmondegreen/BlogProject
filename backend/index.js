import app from './app.js'
import { PORT } from './config/config.js'

app.listen(process.env.PORT, () => {
    console.log(`Server is runing on port ${PORT}`)
})