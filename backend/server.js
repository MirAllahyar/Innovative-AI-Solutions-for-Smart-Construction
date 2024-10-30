const express = require('express');
const connectDB = require('./utils/db');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Routes
app.use('/api/auth', authRoutes);

// Error handling middleware (optional)
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
