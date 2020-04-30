//Adding dependencies
const path = require('path');
const express = require('express');
const fs = require('fs');

//Setting up express app
const app = express();

//The application wil run on port 3000
const PORT = 3000;

//Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static(path.join(__dirname,'public')));



//Starting number for the id
let newID = 0

//sends the user to the notes.html page
app.get('/notes', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/notes.html'))
})

//sends the user to the index.html page
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'))
})

//Sends the user to the index.html page
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'))
})

//Reading the db.json file and returning and returning all notes as JSON format
app.get('/api/notes', function(req, res) {
  fs.readFile(path.join(__dirname, 'db.json'), 'utf8', function (error, data) {
    if (error) {
      return console.log(error)
    }
    res.json(JSON.parse(data))
  })
})

//This post method saves a post to the page and adds it to the db.json file 
app.post('/api/notes', function(req, res) {
  fs.readFile(path.join(__dirname, 'db.json'), 'utf8', function(error, data) {
    if (error) {
      return console.log(error)
    }
    const notes = JSON.parse(data)
    req.body.id = newID
    newID++
    notes.push(req.body)
    fs.writeFile(path.join(__dirname, 'db.json'), JSON.stringify(notes),
      function(error) {
        if (error) {
          return console.log(error)
        }
        console.log('new note')
        res.json(req.body)
    })
  })
})

//Should delete the posted note on the notes.html page
app.delete('/api/notes/:id', function(req, res) {
  fs.readFile(path.join(__dirname, 'db.json'), 'utf8', function(error, data) {
    const id = Number(req.params.id)
    if (error) {
      return console.log(error)
    }
    const notes = JSON.parse(data)
    const deleteNotes = notes.filter(note => note.id !== id)
    fs.writeFile(path.join(__dirname, 'db.json'), JSON.stringify(notes),
    function(error) {
      if (error) {
        return console.log(error)
      }
      console.log('deleted note')
      res.json(deleteNotes)
    })
  })
})



// Listen function. The below code starts the server.
app.listen(PORT, function() {
  console.log('App listening on PORT ' + PORT);
});