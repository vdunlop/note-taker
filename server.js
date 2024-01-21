// Set up requires for express and file system use.
const express = require("express");
const path = require("path");
const fs = require("fs/promises");
//const fs = require("fs");
//const noteData = require("./db/db.json");
const notesFile = "./db/db.json";

// Helper method to generate unique/random ids
const uuid = require("./Helpers/uuid");
//const fsUtil = require("./Helpers/fsUtils");

// Helper functions for reading and writing to the JSON file
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("./Helpers/fsUtils");

// Client port.
const PORT = 3001 || process.env.PORT;

// Set up app for express/routing.
const app = express();

// Set up to receive json and url encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up public to be the root for routing
app.use(express.static("public"));

// GET: /notes - send notes.html
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);

// GET: /api/notes - request from client for "us" to send it all notes
app.get("/api/notes", async (req, res) => {
  const notes = await readFromFile(notesFile);
  const parsedNotes = JSON.parse(notes);
  res.json(parsedNotes);
});

// POST: /api/notes - request from client to save the note that was sent by the client
app.post("/api/notes", async (req, res) => {
  // Destructure the data that was sent from the client
  const { title, text } = req.body;

  // If nothing was passed in then send error and return
  if (!req.body) {
    return res.status(400).json("Missing body information");
  }

  // Get existing data from current notes file.
  const currentNotes = await readFromFile(notesFile);
  const parsedCurrentNotes = JSON.parse(currentNotes);
  console.log(parsedCurrentNotes);

  // Add new data to the current notes file.
  const newNote = {
    title,
    text,
  };
  parsedCurrentNotes.push(newNote);
  console.log(parsedCurrentNotes);

  // write new + existing data to file
  writeToFile(notesFile, parsedCurrentNotes);
  return res.status(200).json("Note saved successfully");
});

// GET: catchall - send index.html
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "public/index.html"))
);

app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);
