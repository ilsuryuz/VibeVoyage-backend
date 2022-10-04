// ** Import Dependencies **
require("dotenv").config();
const { PORT = 4000, MONGODB_URL} = process.env;
const express = require("express");
const mongoose = require("mongoose");

// ** Initialize app **
const app = express();

// ** Import Middleware **
const cors = require("cors");
const morgan = require("morgan");

// ** Database Connection **
mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
// DB Connection Events
mongoose.connection
    .on("open", () => console.log("You are connect to mongoose"))
    .on("close", () => console.log("You are disconnected from mongoose"))
    .on("error", (error) => console.log(error));


// ** Middleware **
app.use(cors()); // Cors
app.use(morgan("dev")); //logging
app.use(express.json());  // parse json bodies


// ** Routes **

// ** I N D U C E S **
// Index
app.get("/", (req, res)=>{
    res.send("It's a Vibe")
})


// ** Controllers **
// Notes
const notesController = require("./controllers/notes");
app.use("/notes", notesController);

// Videos
const videosController = require("./controllers/videos");
app.use("/videos", videosController);
// ** Make App listen to port **
app.listen(PORT, () => console.log(`Vibing on port ${PORT}`));