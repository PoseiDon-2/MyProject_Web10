const express = require('express');
const path = require('path');
const app = express();
const PORT = 4000;
const ejs = require('ejs');
const mongoose = require('mongoose');
const expressSession = require('express-session');
const flash = require('connect-flash'); //เก็บข้อความ Error ไว้

//Connect to DB
mongoose.connect('mongodb+srv://admin:adminWEB10@cluster0.3obax.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useUnifiedTopology: true
});

global.loggedIn = null;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressSession({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(flash());

// Controller
const indexController = require('./controllers/indexController');
const loginController = require('./controllers/loginController');
const registerController = require('./controllers/registerController');
const storeUserController = require('./controllers/storeUserController');
const loginUserController = require('./controllers/loginUserController');
const logoutController = require('./controllers/logoutController');
const homeController = require('./controllers/homeController');

// Middleware
const redirectIfAuth = require('./middleware/redirectIfAuth');

// Routes
app.get('/', indexController);
app.get('/login', loginController);
app.get('/register', registerController);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});