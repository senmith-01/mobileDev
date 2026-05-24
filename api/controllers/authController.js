const jwt= require('jsonwebtoken');
const User= require('../models/User');

//generate JWT Token
const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});
}; 

// @desc    Register new user
// @route   POST /api/v1/auth/signup
// @access  Public

const signup= async(req, res)=>{
    try{
        const {name, email, password}= req.body;

        //validate
        if(!name || !email || !password){
            return res.status(400).json({
                success: false,
                message: 'Please provide name, email and password'
            });
        }

        //check if user exists
        const userExists= await User.findOne({email});
        if(userExists){
            return res.status(400).json({
                success:false,
                message: 'User already exists'
            })
        }

        //create user
        const user= await User.create({
            name,
            email,
            password
        });
        if(user){
            res.status(201).json({
                success: true,
                message: 'User registered successfully',
                data: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    token: generateToken(user._id)
                }
            });
        }else{
            res.status(400).json({
                success: false,
                message: 'Invalid user data'
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message:error.message
        })
    }    
}