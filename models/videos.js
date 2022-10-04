const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
    name: String,
    url: String
})

const Video = mongoose.model("Video", VideoSchema);

module.exports = Video;