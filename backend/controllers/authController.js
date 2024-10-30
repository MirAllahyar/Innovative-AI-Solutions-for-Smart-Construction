const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Signup function to register a new user
exports.signup = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists with this email');
      return res.status(400).json({ error: 'Email is already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({ name, email, password: hashedPassword, role });
    console.log('Attempting to save user:', user);

    // Save the user to the database
    await user.save();

    console.log('User saved successfully');
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    // Handle duplicate key error
    if (error.code === 11000 && error.keyPattern.email) {
      console.log('Duplicate email error:', error);
      return res.status(400).json({ error: 'Email is already registered' });
    }

    console.error('Error during signup:', error);
    res.status(500).json({ error: 'Error registering user' });
  }
};

// Login function to authenticate a user
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    res.status(200).json({ message: 'Login successful', token, role: user.role });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Error logging in' });
  }
};
