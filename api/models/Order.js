const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: [true, 'Please add a customer']
    },
    date: {
        type: Date,
        default: Date.now,
    },
    totalAmount: {
        type: Number,
        required: [true, 'Please add a total amount'],
        min: [0, 'Total amount cannot be negative'],
    },
    productDetails: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: [true, 'Please add a product']
        },
        quantity: {
            type: Number,
            required: [true, 'Please add a quantity'],
            min: [1, 'Quantity must be at least 1']
        },
        price:{
            type: Number,
            required: [true, 'Please add a price'],
            min: [0, 'Price cannot be negative']
        }
    }]
}, {timestamps: true});

module.exports = mongoose.model('Order', orderSchema);