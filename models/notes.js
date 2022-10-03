const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema({
    name: String,
    title: String,
    content: String,
})

const Notes = mongoose.model("Notes", NotesSchema);

module.exports = Notes;