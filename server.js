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
    const authenticated = true;
    if (authenticated) {
        console.log('User authenticated');
        next();
    } else {
        res.status(403).send('Forbidden');
    }
};

// Call Middleware
app.use(logger);
app.use(authenticate);

app.get('/', (req, res) => {
    res.send('Welcome to the Diamond Verse');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

