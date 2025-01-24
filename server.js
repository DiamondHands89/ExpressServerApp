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
