const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables

// Configure Nodemailer for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS, // Your Gmail app password
  },
  tls: {
    rejectUnauthorized: false, // Add this for SSL issues
  },
});

// Signup function with email verification link
exports.signup = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user (not yet verified)
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      isVerified: false, // Track verification status
    });

    // Save the user to the database
    await user.save();

    // Generate a verification token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    // Create the verification link
    const verificationLink = `http://localhost:5000/api/auth/verify-email?token=${token}`;

    // Send the verification email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Email Verification for Smart Construction',
      text: `Please click the following link to verify your email: ${verificationLink}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ error: 'Error sending verification email' });
      }
      console.log('Email sent:', info.response);
      res.status(201).json({ message: 'User registered successfully. Please check your email to verify your account.' });
    });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'Error registering user' });
  }
};

// Email verification function using link
exports.verifyEmail = async (req, res) => {
  const { token } = req.query;
  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the user is already verified
    if (user.isVerified) {
      return res.status(400).json({ error: 'Email is already verified' });
    }

    // Mark the user as verified
    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: 'Email verified successfully. You can now log in.' });
  } catch (error) {
    console.error('Error during email verification:', error);
    res.status(500).json({ error: 'Error verifying email' });
  }
};

// Login function with verification check
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Check if the user's email is verified
    if (!user.isVerified) {
      return res.status(400).json({ error: 'Email not verified. Please check your email for the verification link.' });
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
