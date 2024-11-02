const express = require('express');
const { signup, login, verifyEmail } = require('../controllers/authController');
const router = express.Router();

// Signup route
router.post('/signup', signup);

// Login route
router.post('/login', login);

// Email verification route using GET
router.get('/verify-email', verifyEmail);

module.exports = router;
