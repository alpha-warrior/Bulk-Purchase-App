const mongoose = require('mongoose');

let Product = new mongoose.Schema({
    username: {
        type: String
    },
    name: {
        type: String
    },
    price: {
        type: Number
    },
    quantity: {
        type: Number
    },
    status: {
        type: String
    },
    rating: {
        type: Number
    }
});

module.exports = mongoose.model('Product', Product,'product');