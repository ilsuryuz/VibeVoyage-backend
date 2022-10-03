// ** Dependencies **
const express = require("express");
const notesRouter = express.Router();
const Notes = require("../models/notes");

// ** I N D U C E S **
// Index
notesRouter.get("/", async (req, res) => {
    try {
        // send all notes
        res.json(await Notes.find({}));
    } catch (error) {
        // send error
        res.status(400).json(error);
    }
})


// Create
notesRouter.post('/', async (req,res)=>{
    try{
        res.json(await Notes.create(req.body))
    } catch (error){
        res.status(400).json(error)
    }
})
// Delete
notesRouter.delete('/:id', async (req,res)=>{
    try{
        res.json(await Notes.findByIdAndDelete(req.params.id))
    } catch(error){
        res.status(400).json(error)
    }
})
// Update

module.exports = notesRouter;