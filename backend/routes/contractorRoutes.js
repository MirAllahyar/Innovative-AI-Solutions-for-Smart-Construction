const express = require('express');
const { saveContractorData } = require('../controllers/contractorController');
const router = express.Router();

// POST route to save contractor data
router.post('/save', saveContractorData);

// Example GET route (if needed)
router.get('/test', (req, res) => {
  res.send('Contractor route is working!');
});

module.exports = router;
