const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 4000; // ใช้ PORT จาก Environment Variable หรือ 4000
const ejs = require('ejs');
const mongoose = require('mongoose');
const expressSession = require('express-session');
const flash = require('connect-flash'); // เก็บข้อความ Error ไว้

// เชื่อมต่อฐานข้อมูล MongoDB
mongoose
  .connect('mongodb+srv://admin:adminWEB10@cluster0.3obax.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

global.loggedIn = null;

// Import Controllers
const indexController = require('./controllers/indexController');
const loginController = require('./controllers/loginController');
const registerController = require('./controllers/registerController');
const storeUserController = require('./controllers/storeUserController');
const loginUserController = require('./controllers/loginUserController');
const logoutController = require('./controllers/logoutController');
const homeController = require('./controllers/homeController');

// Import Middleware
const redirectIfAuth = require('./middleware/redirectIfAuth');
const authMiddleware = require('./middleware/authMiddleware');

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // รองรับ nested objects
app.use(flash());
app.use(
  expressSession({
    secret: 'node secret',
    resave: false, // ป้องกันการเขียน session ซ้ำถ้าไม่มีการเปลี่ยนแปลง
    saveUninitialized: false, // ไม่บันทึก session ที่ไม่ได้ใช้งาน
  })
);
app.use('*', (req, res, next) => {
  loggedIn = req.session.userId;
  next();
});

// กำหนด View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
app.get('/', indexController);
app.get('/home', authMiddleware, homeController);
app.get('/login', redirectIfAuth, loginController);
app.get('/register', redirectIfAuth, registerController);
app.post('/user/register', redirectIfAuth, storeUserController);
app.post('/user/login', redirectIfAuth, loginUserController);
app.get('/logout', logoutController);

// จัดการ Error 404
app.use((req, res) => {
  res.status(404).render('404', { loggedIn });
});

// จัดการ Error อื่น ๆ
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// ส่งออกแอปพลิเคชันเพื่อให้ Vercel ใช้งาน
module.exports = app;

// เริ่มต้นเซิร์ฟเวอร์ในโหมด Local
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
