// create server
// config server

const express = require("express");
const noteModel = require("./models/notes.model")

const app = express();
app.use(express.json()); //middleware


// - POST /api/notes
// - Create a note
// - req.body = {title,description}
app.post("/api/notes", async (req,res)=>{
    const { title, description } = req.body
    const note = await noteModel.create({
        title, description
    })

    res.status(201).json({
        message: "Note created successfully",
        note
    })
})

// - GET /api/notes
// - Fetch notes
app.get("/api/notes", async (req,res)=>{
    const notes = await noteModel.find()

    res.status(200).json({
        message: "Notes fetched successfully",
        notes
    })
})

// - DELETE /api/notes/:id
// - Delete a note
app.delete("/api/notes/:id", async (req,res)=>{
    const id = req.params.id
    await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message: "Note deleted successfully",
    })
})


// - PATCH /api/notes/:id
// - Update description of a note
// - req.body = { description }
app.patch("/api/notes/:id", async (req,res)=>{
    const id = req.params.id
    const { description } = req.body
    
    await noteModel.findByIdAndUpdate(id, { description })

    res.status(200).json({
        messsage: "Note updated successfully",
    })
})

module.exports = app