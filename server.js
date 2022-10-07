// ** Import Dependencies **
require("dotenv").config();
const { PORT = 4000, MONGODB_URL } = process.env;
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

// ** Google Firebase Middleware **
const admin = require("firebase-admin");
const { credential } = require("firebase-admin");
const serviceAccount = require("./services/serviceAccountKey.json")
admin.initializeApp(
    { credential: admin.credential.cert(serviceAccount) }
);
// retrive json token and authenticated user
app.use(async function (req, res, next) {
    const token = req.get("Authorization");
    if (!token) return next();
    const user = await admin.auth().verifyIdToken(token.replace("Bearer ", ""));
    if (user) {
        req.user = user;
    } else {
        return res.status(401).json({ error: "token invalid" })
    }
    next();
});
// check if the user is authenticated
function isAuthenticated(req, res, next) {
    if (req.user) return next();
    res.status(401).json({ error: "please login first" });
};

// ** Routes **

// ** I N D U C E S **
// Index
app.get("/", (req, res) => {
    res.send("It's a Vibe")
})
const Users = require("./models/user")
app.post('/user', async (req, res) => {
    const user = {
        createdById: req.body.uid,
        role: "member"
    }
    if (req.body) {
        try {
            const exists = await Users.findOne({ createdById: req.body.uid });
            if (exists && exists.createdById === req.body.uid) {
                console.log("user exists");
            } else {
                res.json(await Users.create(user))
                console.log("created")
            }
        } catch (error) {
            res.status(400).json(error)
        }
    }
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