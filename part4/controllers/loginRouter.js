const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/users')
const { SECRET_KEY } = require('../utils/config')


loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })

  const authentication = user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if(!(user && authentication)){
    return response.status(401).json({ error: 'invalid username or password' })
  }

  const token = jwt.sign({ id: user._id, username: user.username, name: user.name }, SECRET_KEY)
  return response.status(200).json({ token, message: 'signed in succesfully', username: user.username, name: user.name })
})

module.exports = loginRouter