import express from 'express';
import { getNotes, getNoteById, createNote,register,getUser ,getUserById,login,createMessage,getMessageById, getMessages,getUnreadMessage, CountUsers} from './database.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';

 

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser())

//All about notes 
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

//All about messages
app.get('/messages/:id', async (req, res) => {
    const message = await getMessageById(req.params.id);
    res.json(message);
});
app.get('/messages', async (req, res) => {
    const message = await getMessages();
    res.json(message);
});
app.get('/messages/unread', async (req, res) => {
    const message = await getUnreadMessage();
    res.json(message);
});
app.post('/messages', async (req, res) => {
    const { name,email,messageContent } = req.body;
    const newMessage = await createMessage(name,email,messageContent);
    res.status(201).json(newMessage);
});

//All about users
app.post('/register', async (req, res) => {
    const {name,username,email,phone,password,address} = req.body;
    const newUser = await register(name,username,email,phone,password,address);
    res.status(201).json(newUser);
});
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const result = await login(email, password);
    
    if (result.success) {
           // Optional: Set up session or generate JWT
        res.cookie('token', result.token, { httpOnly: true, secure: false,sameSite:'strict',maxAge: 86400 }); 
   
      res.json(result);
    } else {
      res.status(401).json(result);
    }
  });
app.get('/Users', async (req, res) => {
    const users = await getUser();
    res.json(users);
});
app.get('/Users/:id', async (req, res) => {
    const user = await getUserById(req.params.id);
    res.json(user);
});
app.get('/User', async (req, res) => {
    const user = await CountUsers(req.params.id);
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