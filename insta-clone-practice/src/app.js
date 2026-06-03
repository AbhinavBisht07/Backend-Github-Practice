const express = require("express");
const cookieParser = require("cookie-parser");

globalThis.File = require('node:buffer').File;

const app = express();
app.use(express.json());
app.use(cookieParser());

// requiring routers :-
const authRouter = require("./routes/auth.routes");
const postRouter = require("./routes/post.routes");
const userRouter = require("./routes/user.routes");

// Using routers :-
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);


module.exports = app;