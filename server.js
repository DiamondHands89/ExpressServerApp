const express = require('express');
const app = express();
const port = 3000;

// Middleware to prepare JSON 
app.use(express.json());

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


// Define PATCH Routes
app.patch('/users/:id', (req, res) => {
    const userId = req.params.id;
    const updatedUser = req.body;
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...updatedUser };
        res.json(users[userIndex]);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// Define PUT Routes
app.patch('/posts/:id', (req, res) => {
    const postId = req.params.id;
    const updatedPost = req.body;
    const postIndex = posts.findIndex(post => post.id === postId);
    if (postIndex !== -1) {
        posts[postIndex] = updatedPost;
        res.json(posts[postIndex]);
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
});

// Define DELETE Routes
app.delete('/comments/:id', (req, res) => {
    const commentId = req.params.id;
    const commentIndex = comments.findIndex(comment => comment.id === commentId);
    if (commentIndex !== -1) {
        const deletedComment = comments.splice(commentIndex, 1);
        res.json(deletedComment);
    } else {
        res.status(404).json({ message: 'Comment not found' });
    }
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
