const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = async (req, res) => {
    const { email, password } = req.body;

    try {
        // ค้นหาผู้ใช้จากอีเมล
        const user = await User.findOne({ email: email });

        if (user) {
            // เปรียบเทียบรหัสผ่าน
            const match = await bcrypt.compare(password, user.password);

            if (match) {
                // หากรหัสผ่านถูกต้อง ให้เก็บ userId ใน session
                req.session.userId = user._id;
                res.redirect('/home');  // ไปยังหน้าหลัก
            } else {
                res.redirect('/login');  // รหัสผ่านไม่ถูกต้อง
            }
        } else {
            res.redirect('/login');  // หากไม่พบผู้ใช้
        }
    } catch (error) {
        console.error(error);
        res.redirect('/login');  // หากเกิดข้อผิดพลาดอื่นๆ
    }
};
