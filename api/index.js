const express = require('express');
const app = express();
const PORT = 4000;

// เส้นทางหลัก
app.get('/', (req, res) => {
    res.send('บักโง่โดนกูหลอก แต่ "/about" อาจจะมีอะไรเจ่งๆ');
});

app.get('/about', (req, res) => {
    res.send('มึงนี้มันโง่จริงๆ');
});

// ส่งออกฟังก์ชันเพื่อให้ Vercel ใช้งาน
module.exports = (req, res) => {
    app(req, res);
};
