require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const { Person } = require('./models/person')

const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)].join(' ')
}))
app.use(express.static('dist'))

app.get('/api/persons', (req, res) => {
  const persons = Person.find({})
  return persons.then(response => res.status(200).send(response))
})

app.get('/info', (req, res) => {
  const date = new Date()
  Person.find({}).then(response => {
    res.send(`<div>
            <p>The contact book has info of ${response.length} people</p>
            ${date}
        </div>`)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id

  const person = Person.findById(id)
  return person
    .then(response => res.json(response))
    .catch(e => next(e))
})

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  const individual = Person.findByIdAndDelete(id)
  return individual.then(response => res.json({
    message : 'contact deleted succesfully',
    id: response.id,
    name: response.name,
    number: response.number
  }))
    .catch(e => next(e))
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  if(!body.name || !body.number){
    return res.status(404).json({ message : 'Name or Number was missing from the given information.' })
  }

  const newPerson = {
    name : body.name,
    number : body.number
  }
  return Person.create(newPerson).then(response => res.json({ response })).catch(e => next(e))
})

app.put('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const body = req.body
  const person = Person.findByIdAndUpdate(id, { number: body.number }, { new: true })
  person.then(response => {
    console.log(response)
    res.json({ response })
  })
})


const errorHandler = (error, req, res, next) => {
  console.log(error.message)
  if(error.name === 'CastError' ) res.status(400).json({ message: 'malformatted id' })
  else if(error.name === 'ValidationError') res.status(400).json({ message: error.message })
  next(error)
}

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`)
})