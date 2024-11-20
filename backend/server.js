const express = require('express');
const connectDB = require('./utils/db'); // Corrected path to your DB connection utility
const dotenv = require('dotenv');
const cors = require('cors'); // Enable Cross-Origin Resource Sharing
const authRoutes = require('./routes/authRoutes'); // Authentication routes
const contractorRoutes = require('./routes/contractorRoutes'); // Contractor-related routes

dotenv.config(); // Load environment variables

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(express.json()); // For parsing JSON bodies
app.use(cors()); // Enable CORS to allow requests from the frontend

// API Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/contractor', contractorRoutes); // Contractor routes

// Default Route for API
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
