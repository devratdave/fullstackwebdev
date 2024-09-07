const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/users')

userRouter.post('/', async (request, response) => {
  const { name, username, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = await User.create({
    name, username, passwordHash
  })

  return response.status(201).json({ user })
})

userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, url: 1, likes: 1 })
  return response.status(200).json(users)
})

module.exports = userRouter