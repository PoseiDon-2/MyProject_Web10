const bcrypt = require('bcrypt');
const User = require('../models/User');
// const e = require('connect-flash');

module.exports = (req, res) => {
    const { email, password } = req.body; 

    User.findOne({ email: email}).then(user => {
        console.log(user)

        if(user){
            let cmp = bcrypt.compare(password, user.password).then((match) => {
                if (match) {
                    req.session.userId = user._id;
                    res.redirect('/home');
                } else {
                    res.redirect('/login');
                }
            })
        } else {
            return res.redirect('/login');
        }
    })
}
