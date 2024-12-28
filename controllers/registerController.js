const User = require('../models/User');

module.exports = async (req, res) => {
    let email = "";
    let password = "";
    let data = req.flash('data')[0];

    if (typeof data != "undefined") {
        email = data.email;
        password = data.password;
    }

    // ตรวจสอบว่ามีผู้ใช้งานนี้อยู่ในระบบแล้วหรือไม่
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
        req.flash('validationErrors', ['Email is already in use']);
        req.flash('data', { email, password });
        return res.redirect('/register');
    }

    res.render('register', {
        errors: req.flash('validationErrors'),
        email: email,
        password: password
    });
};
