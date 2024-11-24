const express = require('express');
const Contractor = require('../models/Contractor');
const router = express.Router();

// Get all contractors with optional filters
router.get('/', async (req, res) => {
  try {
    const { location, rating } = req.query; // Add filters as needed
    const filter = {};

    if (location) filter.location = location;
    if (rating) filter.rating = { $gte: rating }; // Example filter

    const contractors = await Contractor.find(filter);
    res.status(200).json(contractors);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch contractors', error: error.message });
  }
});

module.exports = router;
