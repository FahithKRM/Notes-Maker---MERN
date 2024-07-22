const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const PORT = 4000;
const Notes = require('./models/Notes');
const app = express();


// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
    res.send('Welcome');
});

// Get all notes
app.get('/api/notes', async(req, res) => {
    try{
        const notes = await Notes.find();
        res.json(notes);
    }catch(error){
        res.status(500).json({message: error.message});
    }
});


// Create the new notes
app.post('/api/notes/new', async(req, res) => {
    const {title, content} = req.body;

    const note = new Notes({title, content});

    try{
        const newNote = await note.save();
        res.status(200).json(newNote);
    }catch(error){
        res.status(400).json({message: error.message});
    }
});

// Update the note
app.put('/api/notes/:id', async(req, res) => {
    const {title, content} = req.body;
    const noteId = req.params.id;

    try{
        const updateNote = await Notes.findByIdAndUpdate(
            noteId, 
            {title, content}, 
            {new: true}
        );
        res.json(updateNote);
    }catch(error){
        res.status(404).json({message: error.message});
    }
});

// Delete the note
app.delete('/api/notes/:id', async(req, res) => {
    try{
        await Notes.findByIdAndDelete(req.params.id);
        res.json({message: `Note deleted successfully`});
    }catch(error){
        res.status(404).json({message: "Note not found"});
    }
});


mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Mongodb connected successfully...');
        app.listen(PORT, ( console.log(`Server is running on http://localhost:${PORT}`)));
    })
    .catch((error) => {
        console.log(error.message);
    });

