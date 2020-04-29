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
// notes .json
let notesAPI = [{ title: "Test Text", text: "Test Text" }];

// routes
app.get("/", (req, res) => {
  return res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
  return res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  res.json(notesAPI);
});

app.post("/api/notes", (req, res) => {
  console.log("Posting note to the server!");
  let newNote = req.body;
  notesAPI.push(newNote);
  fs.writeFile("db.json", JSON.stringify(notesAPI), err => {
    if (err) throw err;
  });
});

app.delete("/api/notes/:id", (req, res) => {
  let thisNote = req.body;
  notesAPI;
});

// listen function
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});