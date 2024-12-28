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
                // หากรหัสผ่านถูกต้อง เก็บข้อมูล userId ใน session
                req.session.userId = user._id;
                res.json({ success: true, message: "Login successful" });  // ส่งผลลัพธ์กลับเป็น JSON
            } else {
                res.json({ success: false, message: "Invalid password" });
            }
        } else {
            res.json({ success: false, message: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Something went wrong" });
    }
};
