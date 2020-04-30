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



const note = {
  title: 'Test Text',
  text: 'Test Text',
}


//Sends the user to the index.html page
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'))
})

//sends the user to the notes.html page
app.get('/notes', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/notes.html'))
})

//sends the user to the index.html page
/* app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'))
}) */

//Reading the db.json file and returning and returning all notes as JSON format
app.get('/api/notes', function(req, res) {
  fs.readFile('db.json', function (error, data) {
    if (error) throw error 
      console.log(error)
      const json = JSON.parse(data)
    res.json(json)
  })
})

//This post method saves a post to the page and adds it to the db.json file 
app.post('/api/notes', function(req, res) {
  console.log(req.body.title)
  fs.readFile('db.json', function(error, data) {
    if (error) throw error
    console.log(error)
    let json = JSON.parse(data)
    const newNote = {
      id: Date.now(),
      text: req.body.text,
      title: req.body.title
    }
    json.push(newNote)
    fs.writeFile('db.json', JSON.stringify(json), function(error, data) {
      if (error) throw error
      res.json(json)
    })
  })
})
//Should delete the posted note on the notes.html page
app.delete('/api/notes/:id', function(req, res) {
  const id = req.params.id
  fs.readFile('db.json', function(error, data) {
    if (error) throw error
    let json = JSON.parse(data)
    const newJson = json.filter((item)=> {
      return item.id != id
    })
    fs.writeFile('db.json', JSON.stringify(newJson), function(error, data) {
      if (error) throw error
      res.json(json)
    })
  })
})



// Listen function. The below code starts the server.
app.listen(PORT, function() {
  console.log('App listening on PORT ' + PORT);
});