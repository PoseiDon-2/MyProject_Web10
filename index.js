const express = require('express');
const app = express();
const PORT = 4000;

// เส้นทางหลัก
app.get('/', (req, res) => {
    res.send('This is my API running...');
});

app.get('/about', (req, res) => {
    res.send('This is my about route');
});

// ส่งออกฟังก์ชันเพื่อให้ Vercel ใช้งาน
module.exports = (req, res) => {
    app(req, res);
};
