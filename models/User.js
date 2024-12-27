const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');


const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Please provide an email']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password']

    }
});

userSchema.pre('save', function (next) {
    const user = this;
    bcrypt.hash(user.password, 10) .then(hash => {
        user.password = hash;
        next();
    }).catch(err => {
        console.err(err);
    });
});

const User = mongoose.model('User', userSchema);
module.exports = User;