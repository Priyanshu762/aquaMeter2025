const express = require('express');
const router = express.Router();
const { 
    register, 
    login, 
    oauthLogin, 
    logout, 
    getCurrentUser 
} = require('../controllers/authController.js');
const { protect } = require('../middleware/authMiddleware.js');

// Public routes
router.post('/register', register);
router.post('/login', login);
router.get('/oauth', oauthLogin);
router.post('/logout', logout);

// Protected routes
router.get('/me', protect, getCurrentUser);

module.exports = router;
