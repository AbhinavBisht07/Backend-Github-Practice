const express = require("express");
const authRouter = express.Router();
const authConntroller = require("../controllers/auth.controller")


/**
 * @route POST /api/auth/register
 * @description Register user
 * @access Public 
 */
authRouter.post("/register", authConntroller.registerController);


/**
 * @route POST /api/auth/login
 * @description Login user
 * @access Public
 */
authRouter.post("/login", authConntroller.loginController);


module.exports = authRouter;