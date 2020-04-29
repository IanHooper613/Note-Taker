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





// routes
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'))
})

//app.get('*', function(req, res) {
  //res.sendFile(path.join(__dirname, "/public/index.html"))
//})

app.get('/notes', function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"))
})

app.get('/api/notes', function(req, res) {
  fs.readFile(path.join(__dirname, 'db.json'), 'utf8', function (error, data) {
    if (error) {
      return console.log(error)
    }
    res.json(JSON.parse(data))
  })
})


// listen function
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});