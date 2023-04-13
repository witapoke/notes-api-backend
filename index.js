let notes = [
  {
    id: 1,
    content:
      'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    date: new Date(),
    important: true
  },

  {
    id: 2,
    content:
      'est rerum tempore vitae\nsequi sint nihil reprehenderitqui neque nisi nulla',
    date: new Date(),
    important: false
  },

  {
    id: 3,
    content:
      'et iustoendi aut ad\nvoluptatem doloribus vel  quis   eius odio et labore et velit aut',
    date: new Date(),
    important: true
  }
]
const express = require('express')

const app = express()

const logger = require('./loggerMiddleware')

const cors = require('cors')

app.use(cors())
app.use(express.json())

app.use(logger)

app.get('/', (request, response) => {
  response.send('<h1>Aguante la falopa</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find((note) => note.id === id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter((note) => note.id !== id)
  response.status(204).end()
})

app.post('/api/notes', (request, response) => {
  const note = request.body

  if (!note || !note.content) {
    return response.status(400).json({
      error: 'note.content is missing'
    })
  }

  const ids = notes.map((note) => note.id)
  const maxId = Math.max(...ids)

  const newNote = {
    id: maxId + 1,
    content: note.content,
    important: typeof note.important !== 'undefined' ? note.important : false,
    date: new Date().toISOString()
  }

  notes = notes.concat(newNote)

  response.json(newNote)
})

app.use((request, response) => {
  response.status(404).json({
    error: 'Not found'
  })
})
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
}) // Se pone asi porque el inicio del servidor en express es asincrono. Cuando termina el sever de levantarse se ejecuta eso
