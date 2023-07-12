const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const Note = require("./model/noteModel");
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("Connected To DB"))
  .catch((err) => console.error(err));
app.get("/", async (req, res) => {
  const allNotes = await Note.find().sort({ createdAt: -1 });
  res.json(allNotes);
});
app.post("/", (req, res) => {
  const newNote = new Note({
    noteTitle: req.body.noteTitle,
    noteBody: req.body.noteBody,
  });
  newNote.save();
  res.status(200).json(newNote);
});
app.delete("/:id", async (req, res) => {
  const note = await Note.findByIdAndDelete(req.params.id);
  res.json(note);
});
app.put("/", (req, res) => {
  const { _id, noteTitle, noteBody } = req.body;
  Note.findByIdAndUpdate(_id, { noteTitle, noteBody })
    .then(() => console.log("updated sucessfulyy"))
    .catch((err) => console.log(err));
  res.json({ sucess: "updated successfully" });
});
app.listen(3001, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
