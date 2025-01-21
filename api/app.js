import express from 'express';
import { getNotes, getNoteById, createNote } from './database.js';

const app = express();
app.use(express.json());

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

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Something broke! 😞');
});

const PORT = 9091;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 