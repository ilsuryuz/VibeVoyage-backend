// ** Import Dependencies **
const express = require("express");
const cors = require("cors");

// ** Initialize app **
const app = express();

// ** Middleware **
app.use(cors()); // Cors

// ** Routes **

// ** Make App listen to port **
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Vibing on port ${PORT}`));