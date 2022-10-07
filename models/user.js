const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
    name: String,
    title: String,
    content: String,
})

const userSchema = new mongoose.Schema({
    createdById: String,
    role: String,
    noteList: [notesSchema]
})

const Users = mongoose.model("Users", userSchema);

module.exports = Users;