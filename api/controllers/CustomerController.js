const Customer = require('../models/Customer');

// @desc    Get all customers
// @route   GET /api/v1/customers/:id
// @access  Private
const getCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json({
            success: true,
            count: customers.length,
            data: customers
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

}

// @desc    Get single customer
// @route   GET /api/v1/customers/:id
// @access  Private

const getCustomer = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            return res.status(404).json({
                success: false,
                message: 'Customer not found'
            });
        }
        res.status(200).json({
            success: true,
            data: customer
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// @desc    Create New Customer
// @route   POST /api/v1/customers
// @access  Private

const createCustomer = async (req, res) => {
    try {
        const customer = await Customer.create(req.body);
        res.status(201).json({
            success: true,
            data: customer
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}
  
// @desc    Update a New Customer
// @route   PUT /api/v1/customers/:id
// @access  Private

const updateCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!customer) {
            return res.status(404).json({
                success: true,
                message: 'Customer not found'
            });
        }
        res.status(200).json({
            success: true,
            data: customer
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
} 

// @desc    Delete a New Customer
// @route   DELETE /api/v1/customers/:id
// @access  Private

const deleteCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);
        if (!customer) {
            return res.status(404).json({
                success: true,
                message: 'Customer not found'
            });
        }
        res.status(200).json({
            success: true,
            data: {},
            message: 'Customer deleted successfully'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
} 

module.exports = {
    getCustomers,
    getCustomer,
    createCustomer,
    updateCustomer,
    deleteCustomer    
}