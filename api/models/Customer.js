const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true
    },
    address: {
        type: String,
        required: [true, 'Please add an address'],
    },
    salary: {
        type: Number,
        required: [true, 'Please add a salary'],
        min: [0, 'Salary cannot be negative']
    }
}, {timestamps: true});

module.exports = mongoose.model('Customer', customerSchema);