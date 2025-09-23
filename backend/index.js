const app = require('./app')

app.listen(config.PORT, () => {
    print(`Server is runing on port ${process.env.PORT}`)
})