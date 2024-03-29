// Set up requires for express and file system use.
const express = require("express");
const path = require("path");
//const fs = require("fs/promises");
//const fs = require("fs");
//const noteData = require("./db/db.json");
const notesFile = "./db/db.json";

// Helper method to generate unique/random ids
const uuid = require("./Helpers/uuid");

// Helper functions for reading and writing to the JSON file
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("./Helpers/fsUtils");

// Client port.
const PORT = process.env.PORT || 3001;

// Set up app for express/routing.
const app = express();

// Set up parsers to receive json and url encoded data
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

// POST: /api/notes - a request from the client was made to save the note that the client sent (in body)
app.post("/api/notes", async (req, res) => {
  // Destructure the data that was sent from the client
  const { title, text } = req.body;

  // If nothing was passed in then send error and return
  if (!(title && text)) {
    return res.status(400).json("Missing body information");
  }

  // Get existing data from current notes file.
  const currentNotes = await readFromFile(notesFile);
  const parsedCurrentNotes = JSON.parse(currentNotes);

  // Add new data to the current notes file.
  const newNote = {
    title,
    text,
    id: uuid(),
  };
  parsedCurrentNotes.push(newNote);

  // write new and existing data to file
  writeToFile(notesFile, parsedCurrentNotes);
  return res.status(200).json("Note saved successfully");
});

// DELETE: delete the note with id of :id
app.delete("/api/notes/:id", async (req, res) => {
  // Get the id for the record to be deleted.
  const deleteId = req.params.id.toLowerCase();

  // Destructure the data that was sent from the client, if any
  const { title, text } = req.body;

  // If no id was passed in then send error and return
  if (!deleteId) {
    return res.status(400).json("Missing record id");
  }

  // Get existing data from current notes file.
  const currentNotes = await readFromFile(notesFile);
  const parsedCurrentNotes = JSON.parse(currentNotes);
  const newCurrentNotes = [];
  let found = 0; // tracks whether the id passed in to delete is found

  // Iterate through current notes to find the one that needs to be deleted.
  // Push non-deleted notes to the newCurrentNotes.
  for (let i = 0; i < parsedCurrentNotes.length; i++) {
    if (deleteId === parsedCurrentNotes[i].id.toLowerCase()) {
      // note to delete found, so don't put it in the newCurrentNotes
      found++;
    } else {
      newCurrentNotes.push(parsedCurrentNotes[i]);
    }
  }

  // return an error if the delete id wasn't found
  if (!found) return res.status(400).json(`${deleteId} not found`);

  // write data without the deleted note to file
  writeToFile(notesFile, newCurrentNotes);
  return res.status(200).json("Note deleted successfully");
});

// GET: catchall - send index.html
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "public/index.html"))
);

app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);
