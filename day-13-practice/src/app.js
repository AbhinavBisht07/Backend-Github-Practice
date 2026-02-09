// create server
// config server

const express = require("express")
const authRouter = require("./routes/auth.routes")
const cookieParser = require("cookie-parser");


const app = express();

app.use(express.json()); //middleware
app.use(cookieParser()); //middleware for parsing cookies
app.use("/api/auth", authRouter); //routes


module.exports = app 