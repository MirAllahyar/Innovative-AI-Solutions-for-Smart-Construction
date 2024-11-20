const express = require('express');
const { saveContractorData } = require('../controllers/contractorController');
const router = express.Router();

// POST route to save contractor data
router.post('/save', saveContractorData);

module.exports = router;
