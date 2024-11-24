const express = require('express');
const connectDB = require('./utils/db'); // Your database connection utility
const dotenv = require('dotenv');
const cors = require('cors');
const contractorRoutes = require('./routes/contractorRoutes'); // Contractor routes

dotenv.config(); // Load environment variables

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON
app.use(cors()); // Enable CORS

// Routes
app.use('/api/contractor', contractorRoutes); // Contractor-related routes

// Default Route
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
