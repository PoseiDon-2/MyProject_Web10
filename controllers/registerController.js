const User = require('../models/User');

module.exports = async (req, res) => {
    let email = "";
    let password = "";
    let data = req.flash('data')[0];

    if (typeof data != "undefined") {
        email = data.email;
        password = data.password;
    }
};
