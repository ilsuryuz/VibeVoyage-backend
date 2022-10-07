const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
    name: String,
    title: String,
    content: String,
})

const Notes = mongoose.model("Notes", notesSchema);

module.exports = Notes;