const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogRouter')
const userRouter = require('./controllers/userRouter')
const loginRouter = require('./controllers/loginRouter')
const { requestLogger, unknownEndpoint, userExtractor, errorHandler } = require('./utils/middleware')
require('express-async-errors')
const logger = require('./utils/logger')

const mongoose = require('mongoose')
const { MONGODB_URI } = require('./utils/config')

mongoose.set('strictQuery', false)

logger.info('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => logger.info('connect to MONGODB'))
  .catch((e) => logger.error(e.message))


app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use('/api/blogs', userExtractor, blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app