const mongoose = require('mongoose');

let Order = new mongoose.Schema({
    username_customer: {
        type: String
    },
    username_vendor: {
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
    product_id:{
        type: String
    },
    product_name:{
        type: String
    },
    quantity_remaining:{
        type: Number
    }
});

module.exports = mongoose.model('Order', Order,'order');