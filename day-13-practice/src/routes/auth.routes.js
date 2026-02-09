const express = require("express");
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const crypto = require("crypto");

const authRouter = express.Router();



// POST /register
// /api/auth/register
// register user
authRouter.post("/register", async (req,res)=>{
    // console.log("hello")
    const { name, email, password } = req.body;

    
    // checking email if already exists :-
    const userAlreadyExists = await userModel.findOne({email});

    // if exists return a message :-
    if(userAlreadyExists){
        return res.status(409).json({
            message: "User already exists with this email"
        })
    }

    // Hashing password before storing :-
    const hash = crypto.createHash("md5").update(password).digest("hex");

    // register user 
    const user = await userModel.create({
        name, email, password: hash
    })

    //create token
    const token = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET
    )
    //store token in cookies:-
    res.cookie("jwt_token", token);

    res.status(201).json({
        message: "User registered successfully",
        user,
        token
    })
})


// dummy API to check how server accesses cookie storage(req.cookies)
// GET /protected
authRouter.get("/protected", (req,res)=>{
    console.log(req.cookies);
})


// POST /login 
// /api/auth/login
// login user
authRouter.post("/login", async (req,res)=>{
    const { email, password } = req.body;

    // Check if Email exists :-
    const user = await userModel.findOne({email})

    // if doesnt exists .. give error :-
    if(!user){
        return res.status(404).json({
            message: "User not found with this email address"
        })
    }

    // checking if password matches :-
    const hash = crypto.createHash("md5").update(password).digest("hex");
    const isPasswordMatched = user.password === hash;
    if(!isPasswordMatched){
        res.status(401).json({
            message: "Invalid password."
        })
    }
    
    // creating token :-
    const token = jwt.sign(
        {id: user._id},
        process.env.JWT_SECRET
    )
    // storing token in cookie:-
    res.cookie("jwt_token", token);


    res.status(200).json({
        message: "User logged in successfully",
        user,
        token
    })
})


module.exports = authRouter