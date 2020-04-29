// Setting up dependencies
const path = require("path");
const express = require("express");
const fs = require("fs");

// Setting up Express app
const app = express();
const PORT = 3000;


// app use
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static(path.join(__dirname,"public")));


let newID = 0

app.get('/notes', function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"))
})

//app.get('*', function(req, res) {
  //res.sendFile(path.join(__dirname, "/public/index.html"))
//})

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.get('/api/notes', function(req, res) {
  fs.readFile(path.join(__dirname, 'db.json'), 'utf8', function (error, data) {
    if (error) {
      return console.log(error)
    }
    res.json(JSON.parse(data))
  })
})

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



// listen function
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});