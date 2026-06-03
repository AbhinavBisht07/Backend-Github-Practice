const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// register
async function registerController(req, res) {
    const { username, email, password, bio, profileImage } = req.body;

    // checking username and email
    const doesUserExists = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (doesUserExists) {
        return res.status(409).json({
            message: (doesUserExists.email === email ? "User alreay exists with this email address" : "User already exists with this username")
        })
    }

    const hash = await bcrypt.hash(password, 10);

    // registering user :-
    const user = await userModel.create({
        username, email, password: hash, bio, profileImage
    })

    // creating token :-
    const token = jwt.sign(
        {
            id: user._id,
            username: user.username
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )
    res.cookie("token", token)

    // final response:-
    res.status(201).json({
        message: "User registered successfully",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
}


// Login
async function loginController(req, res) {
    const { username, email, password } = req.body;

    const user = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (!user) {
        return res.status(404).json({
            message: "User not found with this email / username."
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Invalid password"
        })
    }

    const token = jwt.sign(
        {
            id: user._id,
            username: user.username
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )
    res.cookie("token", token);


    // final response :-
    res.status(200).json({
        message: "User logged in successfully",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
}


module.exports = {
    registerController,
    loginController
}