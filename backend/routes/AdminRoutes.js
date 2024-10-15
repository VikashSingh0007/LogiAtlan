const express = require('express');
const { getAllVehicles, getAnalytics } = require('../controllers/adminController');
// const { verifyToken } = require('../utils/verifyToken');

const router = express.Router();

// Admin fleet management: Get all vehicles
// router.get('/fleet', verifyToken, getAllVehicles);

// Admin data analytics

router.get('/analytics', getAnalytics);

module.exports = router;
