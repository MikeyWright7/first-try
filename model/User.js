const mongoose = require('mongoose');

// Customer model

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        require: true
    },
    cart: [],
    register_date: {
        type: Date,
        default: Date.now
    }
});



const User = mongoose.model('User', UserSchema);
module.exports = User;