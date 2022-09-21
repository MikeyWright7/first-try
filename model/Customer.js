const mongoose = require('mongoose');

// Customer Model

const CustomerSchema = new mongoose.Schema({
    shippingAddress: {
        type: String,
        required: true
    },
    shippingCity: {
        type: String,
        required: true
    },
    shippingState: {
        type: String,
        required: true
    },
    shippingPostalCode: {
        type: String,
        required: true
    },
    preferredStatus: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Customer = mongoose.model('Customer', CustomerSchema);
model.exports = Customer;