const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    try {
        // Get token from cookie
        const token = req.cookies.jwt || req.headers.authorization;
        console.log('Token from protect middleware:', token);
 
        if (!token) {
            return res.status(401).json({ message: 'Not authorized, no token' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Get user from token
        const user = await User.findById(decoded.userId).select('-password');

        if (!user) {
            console.log('User not found in protect middleware');
            return res.status(401).json({ message: 'User not found' });
        }


        // Attach user to request object
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Not authorized, token failed' });
        console.log("Error in protect middleware",error);
    }
};

module.exports = {
    protect
}; 