const express = require('express');
const connectDB = require('./utils/db'); // Corrected path to DB connection
const dotenv = require('dotenv');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes'); // Auth routes
const contractorRoutes = require('./routes/contractorRoutes'); // Contractor routes
const serviceProviderRoutes = require('./routes/serviceProviderRoutes'); // Service provider routes

dotenv.config(); // Load environment variables

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS for cross-origin requests

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/contractor', contractorRoutes);
app.use('/api/service-provider', serviceProviderRoutes); // <-- Ensure this is mounted

// Default route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
