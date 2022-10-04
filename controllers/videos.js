// ** Dependencies **
const express = require("express");
const videosRouter = express.Router();
const Video = require("../models/videos");

// ** Routes **
// Index
videosRouter.get("/", async (req, res) => {
    try {
        // send all notes
        res.json(await Video.find({}));
    } catch (error) {
        // send error
        res.status(400).json(error);
    }
})

module.exports = videosRouter;