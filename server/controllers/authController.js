const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateAndSetCookies, clearCookies } = require('../utils/generateAndSetCookies');
const { oauth2client } = require('../utils/googleConfig');
const axios = require('axios');

// Register new user
const register = async (req, res) => {
    try {
        const { email, password, name, phone } = req.body;
        console.log(email, password, name, phone);
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const existingPhone = await User.findOne({ phone });
        if (existingPhone) {
            return res.status(400).json({ message: 'Phone number already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = new User({
            email,
            password: hashedPassword,
            name,
            phone
        });

        await user.save();

        // Generate and set cookie
        const token = generateAndSetCookies(user._id, res);

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user._id,
                email: user.email,
                name: user.name
            },
            token: token
        });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
        console.log(error);
        
    }
};

// Login user
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Check if user has a password (was created through regular registration)
        if (!user.password) {
            return res.status(400).json({ 
                message: 'This email is registered with Google. Please use Google login instead.' 
            });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Update last login
        user.lastLogin = new Date();
        await user.save();

        // Generate and set cookie
        const token = generateAndSetCookies(user._id, res);
        res.json({
            message: 'Login successful',
            user: {
                id: user._id,
                email: user.email,
                name: user.name
            },
            token: token
        });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

const oauthLogin = async (req,res)=>{
    try {
        const {code} = req.query;
        const googleRes = await oauth2client.getToken(code);
        oauth2client.setCredentials(googleRes.tokens);
        const userRes = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
        );
        const {email, name, picture} = userRes.data;
        console.log(email, name, picture);
        
        // Find existing user
        let user = await User.findOne({ email });
        
        if(!user){
            user = await User.create({
                email,
                name,
                profilePicture: picture,
                googleId: userRes.data.id
            });
        }
        
        const {_id} = user;
        const token = generateAndSetCookies(_id,res);
        res.json({
            message: 'OAuth login successful',
            user: {
                id: _id,
                email,
                name,
                profilePicture: picture
            },
            token: token
        });
    } catch (error) {
        res.status(500).json({ message: 'Error with OAuth login', error: error.message });
        console.log(error.message);
    }
}

// Logout user
const logout = async (req, res) => {
    try {
        clearCookies(res);
        res.json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging out', error: error.message });
    }
};

// Get current user
const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
};

module.exports = {
    register,
    login,
    oauthLogin,
    logout,
    getCurrentUser
};
