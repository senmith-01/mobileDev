const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    description: {
        type: String,
        required: [true, 'Please add a description'],
        trim: true
    },
    unitPrice: {
        type: Number,
        required: [true, 'Please add a unit price'],
        min: [0, 'Unit price cannot be negative']
    },
    qtyOnHand: {
        type: Number,
        required: [true, 'Please add a quantity'],
        min: [0, 'Quantity cannot be negative'],
        default: 0
    }
}, {timestamps: true});

module.exports = mongoose.model('Product', productSchema);