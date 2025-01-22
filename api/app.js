import express from 'express';
import { getNotes, getNoteById, createNote,register,getUser } from './database.js';
import cors from 'cors'
import jwt from 'jsonwebtoken'

import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser())

app.get('/notes', async (req, res) => {
    const notes = await getNotes();
    res.json(notes);
});
 
app.get('/notes/:id', async (req, res) => {
    const note = await getNoteById(req.params.id);
    res.json(note);
});

app.post('/notes', async (req, res) => {
    const { title, contents } = req.body;
    const newNote = await createNote(title, contents);
    res.status(201).json(newNote);
});
app.post('/register', async (req, res) => {
    const {name,username,email,phone,password,address} = req.body;
    const newUser = await register(name,username,email,phone,password,address);
    res.status(201).json(newUser);
});
app.get('/users', async (req, res) => {
    const user = await getUser(req.params.id);
    res.json(user);
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Something broke! 😞');
});

const PORT = 9091;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 