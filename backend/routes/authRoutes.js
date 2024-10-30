const express = require('express');
const { signup, login } = require('../controllers/authController'); // Make sure these imports are correct
const router = express.Router();

router.post('/signup', signup); // Route for signup
router.post('/login', login);    // Route for login

module.exports = router;
