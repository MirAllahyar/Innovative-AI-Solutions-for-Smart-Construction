const express = require('express');
const connectDB = require('./utils/db'); // Corrected path to your DB connection
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors'); // Import cors

dotenv.config();

// Connect to the database
connectDB();

const app = express();
app.use(express.json());

// Use CORS to allow requests from your frontend
app.use(cors());

// Use the auth routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
