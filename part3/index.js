const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 3001
let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


const generateId = () => {
    return Math.floor(Math.random() * 100000);
}


app.use(cors())
app.use(express.json())
app.use(morgan(function (tokens, req, res) {
        return [
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.status(req, res),
            tokens.res(req, res, 'content-length'), '-',
            tokens['response-time'](req, res), 'ms',
            JSON.stringify(req.body)
        ].join(' ')
}))
app.use(express.static('dist'))

app.get('/api/persons', (req, res)=>{
    return res.send(persons)
})

app.get('/info', (req, res)=>{
    const date = new Date()
    return res.send(`<div>
                        <p>The contact book has info of ${persons.length} people</p>
                        ${date}
                    </div>`)
})

app.get('/api/persons/:id', (req, res)=>{
    const id = req.params.id

    const person = persons.find(per=>per.id == id)
    if(person){
        return res.json({person})
    }
    return res.status(204).end()
})

app.delete('/api/persons/:id', (req, res)=>{
    const id = req.params.id
    const individual = persons.find(person => person.id == id)
    persons = persons.filter((person => person.id != id))
    return res.json({ message : "contact deleted succesfully",
        name: individual.name
     })
})

app.post('/api/persons', (req, res)=>{
    const body = req.body

    if(!body.name || !body.number){
        return res.status(404).json({ message : "Name or Number was missing from the given information." })
    }
    else if (persons.find(person => person.number == body.number)){
        return res.status(409).json({ message : "Contact with this number already exists." })
    }
    const newId = generateId()

    const person = {
        id : String(newId),
        name : body.name,
        number : body.number 
    }
    persons = persons.concat(person)

    return res.json(person)
})

app.listen(PORT, ()=>{
    console.log(`Listening to port ${PORT}`)
})