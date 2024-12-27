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
    useNewUrlParser: true,
    // useUnifiedTopology: true
});

global.loggedIn = null;


//Controller
const indexController = require('./controllers/indexController');
const loginController = require('./controllers/loginController');
const registerController = require('./controllers/registerController');
const storeUserController = require('./controllers/storeUserController');
const loginUserController = require('./controllers/loginUserController');
const logoutController = require('./controllers/logoutController');
const homeController = require('./controllers/homeController');

//Middleware
const redirectIfAuth = require('./middleware/redirectIfAuth');
const authMiddelware = require('./middleware/authMiddelware');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());
app.use(flash ());
app.use(expressSession({
    secret: 'node secret'
}));
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next();
});
app.set('view engine', 'ejs');

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/', indexController);
app.get('/home', authMiddelware, homeController);
app.get('/login', redirectIfAuth, loginController);
app.get('/register', redirectIfAuth, registerController);
app.post('/user/register', redirectIfAuth, storeUserController);
app.post('/user/login', redirectIfAuth, loginUserController);
app.get('/logout', logoutController);


// ส่งออกฟังก์ชันเพื่อให้ Vercel ใช้งาน
module.exports = (req, res) => {
    app(req, res);
};