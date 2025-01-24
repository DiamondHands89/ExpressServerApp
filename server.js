const express = require('express');
const app = express();
const port = 3000;

// Import data files
const users = require('./data/users');
const posts = require('./data/posts');
const comments = require('./data/comments');

// Define Routes
app.get('users', (req, res) => {
    res.json(users);
});

app.get('/posts', (req, res) => {
    res.json(posts);
});
  
app.get('/comments', (req, res) => {
    res.json(comments);
});

// Cusom Logging Middleware
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
    next();
};

// Custom Authentication Middleware
const authenticate = (req, res, next) => {
    const authenticated = true;
    if (authenticated) {
        console.log('User authenticated');
        next();
    } else {
        res.status(403).send('Forbidden');
    }
};

// Error-Handling Middleware
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
};

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
