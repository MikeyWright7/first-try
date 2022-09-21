const mongoose = require('mongoose');

// Product model 

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    availability: {
        type: Boolean,
        default: false
    },
    image: {
        type: String,
        require: true
    }
});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
