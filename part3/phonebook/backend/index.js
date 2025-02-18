require('dotenv').config()

const express = require('express')
const app = express()

const Person = require('./models/person')

app.use(express.json())

const cors = require('cors')

app.use(cors())

app.use(express.static('dist'))

const morgan = require('morgan')

morgan.token(
  'body',
  (request, response) => {
    return JSON.stringify(request.body)
  })

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/', (request, response) => {
  response.send('<h1>Hello, World!</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  }

  if (!body.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  }

  // if (persons.reduce(
  //       (found, person) => found || body.name === person.name,
  //       false)) {
  //   return response.status(400).json({
  //     error: 'name must be unique'
  //   })
  // }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

app.get('/info', (request, response) => {
  const todayDate = new Date(Date.now())
  const today = todayDate.toUTCString()

  response.send(`
    <div>Phonebook has info for ${persons.length} people</div>
    <br />
    <div>${today}</div>
  `)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
