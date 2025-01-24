const express = require('express');
const app = express();
const port = 3000;

// Import data files
const users = require('./data/users');
const posts = require('./data/posts');
const comments = require('./data/comments');

// Import middleware
const logger = require('./middleware/logger');
const authenticate = require('./middleware/authenticate');
const errorHandler = require('./middleware/errorHandler');

// Use Middleware
app.use(logger);
app.use(authenticate);

// Define Routes
app.get('/users', (req, res) => {
    res.json(users);
});

app.get('/posts', (req, res) => {
    res.json(posts);
});
  
app.get('/comments', (req, res) => {
    res.json(comments);
});

// Define POST Routes
app.post('/users', (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    res.status(201).json(newUser);
});

app.post('/posts', (req, res) => {
    const newPost = req.body;
    posts.push(newPost);
    res.status(201).json(newPost);
});

app.post('/comments', (req, res) => {
    const newComment = req.body;
    comments.push(newComment);
    res.status(201).json(newComment);
});


// Call Middleware
app.use(logger);
app.use(authenticate);
app.use(errorHandler);

app.get('/', (req, res) => {
    res.send('Welcome to the Diamond Verse');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
