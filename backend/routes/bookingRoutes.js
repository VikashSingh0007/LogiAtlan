// routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { createBooking, viewBookingHistory, cancelBooking, estimateBookingCost} = require('../controllers/bookingController');

// User routes
router.post('/', authMiddleware, createBooking);  // Create Booking
router.post('/cost', estimateBookingCost);
router.get('/history', authMiddleware, viewBookingHistory);  // View Booking History
router.delete('/cancel/:bookingId', authMiddleware, cancelBooking);  // Cancel Booking

module.exports = router;
