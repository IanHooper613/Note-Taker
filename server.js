const http = require('http')
const fs = require('fs')

const express = require('express')
const path = require('path')

const app = express()
const PORT = 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

let note = []

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'))
  })

app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, 'notes.html'))
  })


app.get('/api/notes', function (req, res) {
    res.json(note)
})



app.post('/api/notes', function (req, res) {
   
    const newNote = req.body
  
    console.log(newNote)
  
    note.push(newNote)
  
    res.json(newNote)
    
  })

app.listen(PORT, () => console.log(`App is listening on PORT ${PORT}`))

