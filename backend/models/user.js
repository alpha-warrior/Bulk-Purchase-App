const mongoose = require('mongoose');

let User = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    dimension: {
        type: String
    },
    rating: {
        type: Number
    }
});

module.exports = mongoose.model('User', User);