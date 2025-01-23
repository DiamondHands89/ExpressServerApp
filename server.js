const express = require('express');
const app = express();
const port = 3000;

// Cusom Logging Middleware
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
    next();
};

// Custom Authentication Middleware
const authenticate = (req, res, next) => {
    
}

app.get('/', (req, res) => {
    res.send('Welcome to the Diamond Verse');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

